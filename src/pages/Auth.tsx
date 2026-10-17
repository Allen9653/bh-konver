import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  signInWithCredentials,
  signUpWithCredentials,
  checkIsAdminEmail,
} from "@/lib/authService";
import {
  Loader2,
  Lock,
  Mail,
  User as UserIcon,
  Shield,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  LogIn,
  UserPlus,
} from "lucide-react";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";
import logo from "@/assets/bh-konver-logo.png";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackButton } from "@/components/common/BackButton";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Auth() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const { user, isAdmin, signOut, loading: authLoading } = useAdminAuth();

  // Selected tab: 'login' | 'signup' | 'admin'
  const tabFromUrl = searchParams.get("tab");
  const initialTab =
    tabFromUrl === "signup"
      ? "signup"
      : tabFromUrl === "admin"
      ? "admin"
      : "login";
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Sync tab with URL
  useEffect(() => {
    if (tabFromUrl && ["login", "signup", "admin"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("tab", val);
      return next;
    });
  };

  // Safe redirect path
  const rawNext = searchParams.get("next") ?? "";
  const nextPath =
    rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/";

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(true);

  // Admin form
  const [adminEmail, setAdminEmail] = useState("alenj9653@gmail.com");
  const [adminPassword, setAdminPassword] = useState("");

  // UI helpers
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("");
      return false;
    }
    if (!emailRegex.test(value.trim())) {
      setEmailError(t("auth.invalidEmail", "Unesite ispravnu email adresu"));
      return false;
    }
    setEmailError("");
    return true;
  };

  // 1. Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast({
        title: t("common.error", "Greška"),
        description: t("auth.enterValidEmail", "Unesite ispravnu email adresu."),
        variant: "destructive",
      });
      return;
    }

    if (!password) {
      toast({
        title: t("common.error", "Greška"),
        description: t("auth.enterPassword", "Unesite lozinku."),
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await signInWithCredentials(email, password);
      if (res.success && res.user) {
        toast({
          title: t("auth.loginSuccess", "Uspješna prijava"),
          description:
            res.message ||
            t("auth.welcomeBack", `Dobrodošli nazad, ${res.user.email}!`),
        });

        // If user is admin or target is admin, route accordingly
        const userIsAdmin =
          checkIsAdminEmail(res.user.email) ||
          res.user.app_metadata?.role === "admin";
        if (nextPath !== "/" && nextPath !== "/auth") {
          navigate(nextPath, { replace: true });
        } else if (userIsAdmin) {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        toast({
          title: t("auth.loginFailed", "Prijava nije uspjela"),
          description:
            res.error || t("auth.invalidCredentials", "Neispravan email ili lozinka."),
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 2. Handle Sign Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast({
        title: t("common.error", "Greška"),
        description: t("auth.enterValidEmail", "Unesite ispravnu email adresu."),
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: t("common.error", "Greška"),
        description: t(
          "auth.passwordMinLength",
          "Lozinka mora imati najmanje 6 znakova."
        ),
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: t("common.error", "Greška"),
        description: t("auth.passwordsDoNotMatch", "Lozinke se ne podudaraju."),
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: t("common.error", "Greška"),
        description: t(
          "auth.acceptTermsRequired",
          "Morate prihvatiti Uslove korištenja."
        ),
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await signUpWithCredentials(email, password, fullName);
      if (res.success && res.user) {
        toast({
          title: t("auth.signupSuccess", "Registracija uspješna!"),
          description:
            res.message ||
            t("auth.accountReady", "Vaš račun je kreiran i aktiviran. Dobrodošli!"),
        });

        if (nextPath !== "/" && nextPath !== "/auth") {
          navigate(nextPath, { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        toast({
          title: t("auth.signupFailed", "Greška pri registraciji"),
          description:
            res.error ||
            t("auth.unexpectedError", "Došlo je do greške. Pokušajte ponovo."),
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Handle Admin Login (Strict password & role verification)
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      toast({
        title: "Nepotpuni podaci",
        description: "Molimo unesite email i lozinku administratora.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await signInWithCredentials(adminEmail, adminPassword);
      if (res.success && res.user) {
        const userIsAdmin =
          checkIsAdminEmail(res.user.email) ||
          res.user.app_metadata?.role === "admin" ||
          res.user.user_metadata?.role === "admin";

        if (!userIsAdmin) {
          await supabase.auth.signOut();
          toast({
            title: "Pristup odbijen",
            description: "Ovaj nalog nema administratorske privilegije.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Admin pristup odobren",
          description: `Prijavljeni ste kao administrator (${res.user.email}).`,
        });
        navigate("/admin", { replace: true });
      } else {
        toast({
          title: "Greška pri prijavi administratora",
          description: res.error || "Neispravan email ili lozinka.",
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 5. Handle Forgot Password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || !emailRegex.test(resetEmail.trim())) {
      toast({
        title: t("common.error", "Greška"),
        description: t("auth.enterValidEmail", "Unesite ispravnu email adresu."),
        variant: "destructive",
      });
      return;
    }

    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: t("auth.resetSentTitle", "Email poslan"),
        description: t(
          "auth.resetSentDesc",
          "Provjerite inbox za link za ponovno postavljanje lozinke."
        ),
      });
      setIsForgotPassword(false);
    } catch (err: any) {
      toast({
        title: t("auth.resetSentTitle", "Zahtjev evidentiran"),
        description:
          "Ukoliko račun postoji, instrukcije za resetovanje su poslane na email.",
      });
      setIsForgotPassword(false);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SEO
        title="Prijava i registracija | BH KONVER"
        description="Prijavite se na svoj BH KONVER račun ili se besplatno registrujte za pristup naprednim konverterima, kalkulatorima i generatorima."
        path="/auth"
      />
      <Navbar />

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="w-full max-w-md mb-4 flex items-center justify-start">
          <BackButton label={t("auth.backToHome", "← Povratak na početnu")} fallbackTo="/" />
        </div>

        {/* ALREADY LOGGED IN VIEW */}
        {user && !authLoading ? (
          <Card className="w-full max-w-md border-border/80 bg-card/95 shadow-2xl backdrop-blur">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                {isAdmin ? (
                  <Shield className="h-8 w-8 text-amber-400" />
                ) : (
                  <UserIcon className="h-8 w-8 text-primary" />
                )}
              </div>
              <CardTitle className="text-2xl font-bold">
                {t("auth.alreadySignedInTitle", "Već ste prijavljeni")}
              </CardTitle>
              <CardDescription className="text-sm">
                {t("auth.signedInAs", "Aktivna sesija za račun:")}
              </CardDescription>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/60 px-3.5 py-1 text-xs font-semibold text-foreground mx-auto">
                <span className="truncate max-w-[240px]">{user.email}</span>
                {isAdmin && (
                  <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-400">
                    Admin
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
              {isAdmin && (
                <Button
                  onClick={() => navigate("/admin")}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Otvori Admin Dashboard
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => navigate("/history")}
                className="w-full"
              >
                <ClockIcon className="mr-2 h-4 w-4 text-primary" />
                Historija konverzija
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full"
              >
                Idi na početnu stranicu
              </Button>
              <div className="pt-2 border-t border-border/60">
                <Button
                  variant="ghost"
                  onClick={async () => {
                    await signOut();
                    toast({
                      title: t("auth.signedOut", "Uspješno ste se odjavili"),
                    });
                  }}
                  className="w-full text-destructive hover:bg-destructive/10"
                >
                  Odjavi se s ovog računa
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : isForgotPassword ? (
          /* FORGOT PASSWORD CARD */
          <Card className="w-full max-w-md border-border/80 bg-card/95 shadow-2xl backdrop-blur">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-2 flex justify-center">
                <img
                  src={logo}
                  alt="BH Konver Logo"
                  width={64}
                  height={64}
                  className="h-14 w-auto object-contain"
                />
              </div>
              <CardTitle className="text-2xl font-bold">
                {t("auth.forgotPasswordTitle", "Zaboravljena lozinka")}
              </CardTitle>
              <CardDescription>
                {t(
                  "auth.forgotPasswordDesc",
                  "Unesite email adresu i poslat ćemo vam link za postavljanje nove lozinke."
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">{t("auth.email", "Email adresa")}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="vas.email@domena.ba"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      className="pl-9"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={resetLoading}>
                  {resetLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("auth.sendResetLink", "Pošalji link za reset lozinke")}
                </Button>
              </form>
              <div className="mt-5 text-center text-sm">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  ← {t("auth.backToLogin", "Nazad na prijavu")}
                </button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* MAIN AUTH CARD WITH TABS */
          <Card className="w-full max-w-md border-border/80 bg-card/95 shadow-2xl backdrop-blur">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-2 flex justify-center">
                <img
                  src={logo}
                  alt="BH Konver Logo"
                  width={64}
                  height={64}
                  className="h-14 w-auto object-contain"
                />
              </div>
              <CardTitle className="font-display text-2xl font-bold tracking-tight">
                BH <span className="text-primary">KONVER</span> Račun
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {t(
                  "auth.subtitle",
                  "Prijavite se ili kreirajte račun za pristup svim naprednim alatima"
                )}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/60 p-1">
                  <TabsTrigger value="login" className="flex items-center gap-1 text-xs sm:text-sm">
                    <LogIn className="h-3.5 w-3.5" />
                    {t("nav.login", "Prijava")}
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="flex items-center gap-1 text-xs sm:text-sm">
                    <UserPlus className="h-3.5 w-3.5" />
                    {t("nav.signup", "Registracija")}
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="flex items-center gap-1 text-xs sm:text-sm text-amber-400">
                    <Shield className="h-3.5 w-3.5" />
                    Admin
                  </TabsTrigger>
                </TabsList>

                {/* 1. LOGIN TAB */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">{t("auth.email", "Email adresa")}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="ime@domena.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (e.target.value) validateEmail(e.target.value);
                          }}
                          required
                          className={`pl-9 ${emailError ? "border-destructive" : ""}`}
                          autoComplete="email"
                        />
                      </div>
                      {emailError && (
                        <p className="text-xs text-destructive">{emailError}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">
                          {t("auth.password", "Lozinka")}
                        </Label>
                        <button
                          type="button"
                          onClick={() => {
                            setResetEmail(email);
                            setIsForgotPassword(true);
                          }}
                          className="text-xs text-primary hover:underline font-medium"
                        >
                          {t("auth.forgotPassword", "Zaboravili ste lozinku?")}
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-9 pr-10"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("auth.signingIn", "Prijava u toku...")}
                        </>
                      ) : (
                        <>
                          <LogIn className="mr-2 h-4 w-4" />
                          {t("nav.login", "Prijavi se")}
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-5 text-center text-xs sm:text-sm text-muted-foreground">
                    {t("auth.noAccount", "Nemate račun?")}{" "}
                    <button
                      type="button"
                      onClick={() => handleTabChange("signup")}
                      className="text-primary hover:underline font-semibold"
                    >
                      {t("auth.registerHere", "Registrujte se besplatno")}
                    </button>
                  </div>
                </TabsContent>

                {/* 2. SIGN UP TAB */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-3.5">
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-name">
                        {t("auth.fullName", "Ime i prezime")} <span className="text-muted-foreground text-xs">(opcionalno)</span>
                      </Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Npr. Amir Hodžić"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-9"
                          autoComplete="name"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="signup-email">{t("auth.email", "Email adresa")}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="vas.email@domena.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (e.target.value) validateEmail(e.target.value);
                          }}
                          required
                          className={`pl-9 ${emailError ? "border-destructive" : ""}`}
                          autoComplete="email"
                        />
                      </div>
                      {emailError && (
                        <p className="text-xs text-destructive">{emailError}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="signup-password">
                        {t("auth.password", "Lozinka")}
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Najmanje 6 karaktera"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                          className="pl-9 pr-10"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <PasswordStrengthIndicator password={password} />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="signup-confirm-password">
                        {t("auth.confirmPassword", "Potvrdite lozinku")}
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signup-confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Ponovite istu lozinku"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="pl-9"
                          autoComplete="new-password"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                      <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(Boolean(checked))}
                        className="mt-0.5"
                      />
                      <label
                        htmlFor="terms"
                        className="text-xs text-muted-foreground leading-snug cursor-pointer select-none"
                      >
                        Prihvatam{" "}
                        <Link to="/uslovi-koristenja" target="_blank" className="text-primary hover:underline">
                          Uslove korištenja
                        </Link>{" "}
                        i{" "}
                        <Link to="/privatnost" target="_blank" className="text-primary hover:underline">
                          Politiku privatnosti
                        </Link>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 mt-2"
                      disabled={submitting || !acceptTerms}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("auth.creatingAccount", "Kreiranje računa...")}
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          {t("nav.signup", "Kreiraj račun")}
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-5 text-center text-xs sm:text-sm text-muted-foreground">
                    {t("auth.haveAccount", "Već imate račun?")}{" "}
                    <button
                      type="button"
                      onClick={() => handleTabChange("login")}
                      className="text-primary hover:underline font-semibold"
                    >
                      {t("auth.loginHere", "Prijavite se")}
                    </button>
                  </div>
                </TabsContent>

                {/* 3. ADMIN PORTAL TAB */}
                <TabsContent value="admin">
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 mb-4 text-xs text-amber-300">
                    <div className="flex items-center gap-2 font-semibold mb-1">
                      <Shield className="h-4 w-4 text-amber-400" />
                      BH KONVER Admin Portal
                    </div>
                    Pristup za ovlaštene administratore platforme (upravljanje korisnicima, konverzijama i postavkama).
                  </div>

                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Admin Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400/80" />
                        <Input
                          id="admin-email"
                          type="email"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          required
                          className="pl-9 border-amber-500/30 focus-visible:ring-amber-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Admin Lozinka</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400/80" />
                        <Input
                          id="admin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Lozinka administratora"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          className="pl-9 pr-10 border-amber-500/30 focus-visible:ring-amber-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Provjera prava...
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2 h-4 w-4" />
                          Prijavi se kao Administrator
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
