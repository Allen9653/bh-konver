import { useState, useRef, useEffect } from "react";
import {
  CvData,
  CvLanguage,
  PhotoShape,
  WorkExperience,
  Education,
  SkillItem,
  LanguageItem,
  CertificateItem,
  INITIAL_CV_DATA,
} from "@/types/cv";
import { CvLanguageSelector } from "./cv/CvLanguageSelector";
import { CvPhotoUploader } from "./cv/CvPhotoUploader";
import { CvTextImportModal } from "./cv/CvTextImportModal";
import { CvPayPalPayment } from "./cv/CvPayPalPayment";
import { ModernEuropassPreview } from "./cv/ModernEuropassPreview";
import { generateCvPdf, printCvDocument } from "@/utils/cvPdfGenerator";
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  RotateCcw,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  Wand2,
  Eye,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ModernEuropassCvGenerator() {
  const [cvData, setCvData] = useState<CvData>(() => {
    try {
      const saved = localStorage.getItem("bh_cv_generator_data");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not load stored CV data:", e);
    }
    return INITIAL_CV_DATA;
  });

  // Track unlocked premium languages
  const [unlockedLanguages, setUnlockedLanguages] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("bh_unlocked_cv_langs");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not load unlocked languages:", e);
    }
    return {};
  });

  // Active form section tab
  const [activeTab, setActiveTab] = useState<"personal" | "experience" | "education" | "skills" | "certificates">("personal");
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(0.82);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressText, setProgressText] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  // Auto-save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("bh_cv_generator_data", JSON.stringify(cvData));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  }, [cvData]);

  const currentLang = cvData.language;
  const isBosnian = currentLang === "bs" || currentLang === "bs-Cyrl";
  const isCurrentLangUnlocked = isBosnian || !!unlockedLanguages[currentLang];

  const handleLanguageChange = (lang: CvLanguage) => {
    setCsvData((prev) => ({ ...prev, language: lang }));
  };

  const handlePaymentSuccess = (txId: string) => {
    const updated = { ...unlockedLanguages, [currentLang]: true };
    setUnlockedLanguages(updated);
    try {
      localStorage.setItem("bh_unlocked_cv_langs", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save unlocked state:", e);
    }
  };

  // Helper updates for personal details
  const updatePersonal = (field: keyof CvData["personal"], value: string | PhotoShape) => {
    setCsvData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  // Work experience helpers
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      position: "",
      company: "",
      city: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    };
    setCsvData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }));
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    setCsvData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setCsvData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  // Education helpers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: "",
      institution: "",
      city: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setCsvData((prev) => ({
      ...prev,
      educations: [newEdu, ...prev.educations],
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setCsvData((prev) => ({
      ...prev,
      educations: prev.educations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setCsvData((prev) => ({
      ...prev,
      educations: prev.educations.filter((edu) => edu.id !== id),
    }));
  };

  // Skills helpers
  const addSkill = () => {
    const newSkill: SkillItem = {
      id: `sk-${Date.now()}`,
      name: "",
      level: "advanced",
    };
    setCsvData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (id: string, field: keyof SkillItem, value: any) => {
    setCsvData((prev) => ({
      ...prev,
      skills: prev.skills.map((sk) =>
        sk.id === id ? { ...sk, [field]: value } : sk
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setCsvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((sk) => sk.id !== id),
    }));
  };

  // Languages helpers
  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: "",
      level: "B2",
    };
    setCsvData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLang],
    }));
  };

  const updateLanguage = (id: string, field: keyof LanguageItem, value: any) => {
    setCsvData((prev) => ({
      ...prev,
      languages: prev.languages.map((l) =>
        l.id === id ? { ...l, [field]: value } : l
      ),
    }));
  };

  const removeLanguage = (id: string) => {
    setCsvData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id),
    }));
  };

  // Certificates helpers
  const addCertificate = () => {
    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      title: "",
      issuer: "",
      year: "",
    };
    setCsvData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, newCert],
    }));
  };

  const updateCertificate = (id: string, field: keyof CertificateItem, value: any) => {
    setCsvData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  const removeCertificate = (id: string) => {
    setCsvData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id),
    }));
  };

  // Reset to sample template
  const handleResetToSample = () => {
    if (confirm("Da li želite učitati primjerni Europass obrazac? Svi trenutni unosi bit će zamijenjeni.")) {
      setCsvData(INITIAL_CV_DATA);
      toast.info("Učitan je ogledni Europass primjer!");
    }
  };

  // Clear all fields
  const handleClearAll = () => {
    if (confirm("Da li sigurno želite isprazniti sva polja obrasca?")) {
      setCsvData({
        language: "bs",
        personal: {
          fullName: "",
          jobTitle: "",
          email: "",
          phone: "",
          address: "",
          birthDate: "",
          nationality: "",
          website: "",
          linkedin: "",
          summary: "",
          photoUrl: "",
          photoShape: "rounded",
        },
        experiences: [],
        educations: [],
        skills: [],
        languages: [],
        certificates: [],
        drivingLicense: "",
      });
      toast.info("Obrazac je očišćen.");
    }
  };

  // Download high-res PDF
  const handleDownloadPdf = async () => {
    if (!isCurrentLangUnlocked) {
      toast.error("Preuzimanje na stranom jeziku zahtijeva jednokratnu uplatu od 2.00 BAM.", {
        description: "Uplatite putem PayPal dugmeta u nastavku za trenutno otključavanje.",
      });
      return;
    }

    setIsGenerating(true);
    setProgressText("Inicijalizacija...");
    try {
      const cleanName = (cvData.personal.fullName || "Europass_CV")
        .trim()
        .replace(/[^a-zA-Z0-9_\u0400-\u04FF\u0100-\u017F]/g, "_");
      const fileName = `${cleanName}_Europass_${currentLang.toUpperCase()}.pdf`;

      await generateCvPdf({
        elementId: "europass-cv-printable",
        fileName,
        onProgress: (_prog, status) => {
          setProgressText(status);
        },
      });

      toast.success("Vaš Europass CV je uspješno preuzet!", {
        description: `Fajl: ${fileName} (A4 format visoke rezolucije)`,
      });
    } catch (err) {
      console.error(err);
      toast.error("Došlo je do greške pri kreiranju PDF dokumenta.", {
        description: "Možete iskoristiti i opciju direktnog štampanja (Print/Save as PDF).",
      });
    } finally {
      setIsGenerating(false);
      setProgressText("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Feature Description */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-blue-500/10 p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>EUROPASS STANDARD 2026</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mt-2">
              Moderni Europass CV Generator (A4 PDF)
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              Izradite besprijekoran, dvostubačni Europass životopis usklađen sa standardima Evropske unije i domaćeg tržišta. Podrška za bosanski (latinica i ćirilica), engleski, njemački i turski jezik uz trenutno preuzimanje u PDF formatu za štampu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setImportModalOpen(true)}
              className="gap-2 font-bold text-xs bg-background shadow-xs hover:border-primary"
            >
              <Wand2 className="h-4 w-4 text-primary" />
              Zalijepi stari CV (Auto-map)
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleResetToSample}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Primjer
            </Button>
          </div>
        </div>
      </div>

      {/* KORAK 1: Izbor jezika i pisma */}
      <CvLanguageSelector
        language={currentLang}
        onLanguageChange={handleLanguageChange}
        isUnlocked={isCurrentLangUnlocked}
      />

      {/* Main Grid: Form Left, Live Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Forms (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step 3: Photo Uploader */}
          <CvPhotoUploader
            photoUrl={cvData.personal.photoUrl}
            photoShape={cvData.personal.photoShape}
            onPhotoChange={(url) => updatePersonal("photoUrl", url)}
            onShapeChange={(shape) => updatePersonal("photoShape", shape)}
          />

          {/* Step 2: Multi-input tabs */}
          <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px]">2</span>
                  <span>KORAK 2: UNOS PODATAKA</span>
                </div>
                <h3 className="text-base font-bold text-foreground mt-0.5">
                  Strukturirana polja životopisa
                </h3>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-[11px] text-destructive hover:bg-destructive/10 h-7 px-2"
              >
                Isprazni
              </Button>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-5 gap-1 p-1 bg-muted/60 rounded-xl border border-border/80">
              <button
                type="button"
                onClick={() => setActiveTab("personal")}
                className={`py-2 px-1 text-[11px] font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${
                  activeTab === "personal"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
                }`}
              >
                <User className="h-3.5 w-3.5" />
                <span>Osobno</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("experience")}
                className={`py-2 px-1 text-[11px] font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${
                  activeTab === "experience"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
                }`}
              >
                <Briefcase className="h-3.5 w-3.5" />
                <span>Iskustvo</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("education")}
                className={`py-2 px-1 text-[11px] font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${
                  activeTab === "education"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Fakultet</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("skills")}
                className={`py-2 px-1 text-[11px] font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${
                  activeTab === "skills"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
                }`}
              >
                <Wrench className="h-3.5 w-3.5" />
                <span>Vještine</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("certificates")}
                className={`py-2 px-1 text-[11px] font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${
                  activeTab === "certificates"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
                }`}
              >
                <Award className="h-3.5 w-3.5" />
                <span>Diplome</span>
              </button>
            </div>

            {/* TAB CONTENT: Personal */}
            {activeTab === "personal" && (
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Ime i prezime *</Label>
                    <Input
                      value={cvData.personal.fullName}
                      onChange={(e) => updatePersonal("fullName", e.target.value)}
                      placeholder="npr. Mirza Hodžić"
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Željena pozicija / Zvanje *</Label>
                    <Input
                      value={cvData.personal.jobTitle}
                      onChange={(e) => updatePersonal("jobTitle", e.target.value)}
                      placeholder="npr. Senior Software Engineer"
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">E-mail adresa *</Label>
                    <Input
                      type="email"
                      value={cvData.personal.email}
                      onChange={(e) => updatePersonal("email", e.target.value)}
                      placeholder="ime@example.com"
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Broj telefona</Label>
                    <Input
                      value={cvData.personal.phone}
                      onChange={(e) => updatePersonal("phone", e.target.value)}
                      placeholder="+387 61 000 000"
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Grad i država</Label>
                    <Input
                      value={cvData.personal.address}
                      onChange={(e) => updatePersonal("address", e.target.value)}
                      placeholder="Sarajevo, Bosna i Hercegovina"
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Datum rođenja</Label>
                    <Input
                      value={cvData.personal.birthDate}
                      onChange={(e) => updatePersonal("birthDate", e.target.value)}
                      placeholder="15.04.1993."
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Državljanstvo</Label>
                    <Input
                      value={cvData.personal.nationality}
                      onChange={(e) => updatePersonal("nationality", e.target.value)}
                      placeholder="Državljanstvo BiH"
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Vozačka dozvola</Label>
                    <Input
                      value={cvData.drivingLicense}
                      onChange={(e) => setCsvData((prev) => ({ ...prev, drivingLicense: e.target.value }))}
                      placeholder="B kategorija"
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">LinkedIn profil</Label>
                    <Input
                      value={cvData.personal.linkedin}
                      onChange={(e) => updatePersonal("linkedin", e.target.value)}
                      placeholder="linkedin.com/in/profil"
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Web stranica</Label>
                    <Input
                      value={cvData.personal.website}
                      onChange={(e) => updatePersonal("website", e.target.value)}
                      placeholder="https://mojportfolio.ba"
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">O meni / Profesionalni profil</Label>
                  <Textarea
                    rows={4}
                    value={cvData.personal.summary}
                    onChange={(e) => updatePersonal("summary", e.target.value)}
                    placeholder="Sažeti opis vašeg stručnog profila, ciljeva i ključnih postignuća..."
                    className="text-xs leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* TAB CONTENT: Experience */}
            {activeTab === "experience" && (
              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">
                    Radno iskustvo ({cvData.experiences.length})
                  </span>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={addExperience}
                    className="gap-1 text-xs h-8"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Dodaj iskustvo
                  </Button>
                </div>

                {cvData.experiences.length === 0 ? (
                  <div className="p-6 text-center rounded-xl border border-dashed border-border text-xs text-muted-foreground">
                    Nema unesenog radnog iskustva. Kliknite na &quot;Dodaj iskustvo&quot;.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cvData.experiences.map((exp, idx) => (
                      <div
                        key={exp.id}
                        className="p-4 rounded-xl border border-border/80 bg-background/80 space-y-3 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-primary">
                            #{idx + 1} Radna pozicija
                          </span>
                          <button
                            type="button"
                            onClick={() => removeExperience(exp.id)}
                            className="text-destructive hover:bg-destructive/10 p-1 rounded transition-colors"
                            title="Obriši"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Input
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                            placeholder="Pozicija (npr. Frontend Dev)"
                            className="text-xs"
                          />
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            placeholder="Kompanija / Poslodavac"
                            className="text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                            placeholder="Početak (03/2021)"
                            className="text-xs"
                          />
                          <Input
                            value={exp.isCurrent ? "Trenutno" : exp.endDate}
                            disabled={exp.isCurrent}
                            onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                            placeholder="Kraj (08/2023)"
                            className="text-xs"
                          />
                          <Input
                            value={exp.city}
                            onChange={(e) => updateExperience(exp.id, "city", e.target.value)}
                            placeholder="Grad (Sarajevo)"
                            className="text-xs"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            checked={exp.isCurrent}
                            onChange={(e) => updateExperience(exp.id, "isCurrent", e.target.checked)}
                            className="rounded border-border text-primary focus:ring-primary h-3.5 w-3.5"
                          />
                          <label htmlFor={`current-${exp.id}`} className="text-xs text-muted-foreground select-none">
                            Još uvijek radim na ovoj poziciji
                          </label>
                        </div>

                        <Textarea
                          rows={2}
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                          placeholder="Opis zadataka, tehnologija i odgovornosti..."
                          className="text-xs leading-relaxed"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: Education */}
            {activeTab === "education" && (
              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">
                    Obrazovanje i osposobljavanje ({cvData.educations.length})
                  </span>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={addEducation}
                    className="gap-1 text-xs h-8"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Dodaj obrazovanje
                  </Button>
                </div>

                {cvData.educations.length === 0 ? (
                  <div className="p-6 text-center rounded-xl border border-dashed border-border text-xs text-muted-foreground">
                    Nema unesenog obrazovanja. Kliknite na &quot;Dodaj obrazovanje&quot;.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cvData.educations.map((edu, idx) => (
                      <div
                        key={edu.id}
                        className="p-4 rounded-xl border border-border/80 bg-background/80 space-y-3 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            #{idx + 1} Zvanje / Diploma
                          </span>
                          <button
                            type="button"
                            onClick={() => removeEducation(edu.id)}
                            className="text-destructive hover:bg-destructive/10 p-1 rounded transition-colors"
                            title="Obriši"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                          placeholder="Stečeni naziv / Zvanje (npr. Bachelor elektrotehnike)"
                          className="text-xs"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                            placeholder="Ustanova (Univerzitet / Fakultet)"
                            className="text-xs"
                          />
                          <Input
                            value={edu.city}
                            onChange={(e) => updateEducation(edu.id, "city", e.target.value)}
                            placeholder="Grad (npr. Tuzla)"
                            className="text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                            placeholder="Godina upisa (2015)"
                            className="text-xs"
                          />
                          <Input
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                            placeholder="Godina diplomiranja (2019)"
                            className="text-xs"
                          />
                        </div>

                        <Textarea
                          rows={2}
                          value={edu.description}
                          onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                          placeholder="Smjer, stečene kompetencije ili opis rada..."
                          className="text-xs leading-relaxed"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: Skills & Languages */}
            {activeTab === "skills" && (
              <div className="space-y-5 pt-1">
                {/* Skills Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      Digitalne i stručne vještine ({cvData.skills.length})
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSkill}
                      className="gap-1 text-xs h-7"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Dodaj vještinu
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {cvData.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-2">
                        <Input
                          value={skill.name}
                          onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                          placeholder="Naziv vještine (npr. React, SQL, Photoshop)"
                          className="text-xs flex-1"
                        />
                        <select
                          value={skill.level}
                          onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                          className="h-9 px-2 text-xs rounded-md border border-input bg-background font-medium"
                        >
                          <option value="expert">Ekspert</option>
                          <option value="advanced">Napredni</option>
                          <option value="intermediate">Srednji</option>
                          <option value="beginner">Početni</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill.id)}
                          className="text-destructive hover:bg-destructive/10 p-1.5 rounded transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages Section */}
                <div className="space-y-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      Poznavanje jezika ({cvData.languages.length})
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addLanguage}
                      className="gap-1 text-xs h-7"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Dodaj jezik
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {cvData.languages.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <Input
                          value={item.language}
                          onChange={(e) => updateLanguage(item.id, "language", e.target.value)}
                          placeholder="Jezik (npr. Engleski, Njemački)"
                          className="text-xs flex-1"
                        />
                        <select
                          value={item.level}
                          onChange={(e) => updateLanguage(item.id, "level", e.target.value)}
                          className="h-9 px-2 text-xs rounded-md border border-input bg-background font-medium"
                        >
                          <option value="native">Maternji</option>
                          <option value="C2">C2 (Savršeno)</option>
                          <option value="C1">C1 (Napredno)</option>
                          <option value="B2">B2 (Samostalno)</option>
                          <option value="B1">B1 (Srednje)</option>
                          <option value="A2">A2 (Osnovno)</option>
                          <option value="A1">A1 (Početno)</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => removeLanguage(item.id)}
                          className="text-destructive hover:bg-destructive/10 p-1.5 rounded transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Certificates */}
            {activeTab === "certificates" && (
              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">
                    Certifikati i licence ({cvData.certificates.length})
                  </span>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={addCertificate}
                    className="gap-1 text-xs h-8"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Dodaj certifikat
                  </Button>
                </div>

                {cvData.certificates.length === 0 ? (
                  <div className="p-6 text-center rounded-xl border border-dashed border-border text-xs text-muted-foreground">
                    Nema unesenih certifikata. Kliknite na &quot;Dodaj certifikat&quot;.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cvData.certificates.map((cert) => (
                      <div key={cert.id} className="p-3 rounded-xl border border-border bg-background space-y-2">
                        <div className="flex items-center justify-between">
                          <Input
                            value={cert.title}
                            onChange={(e) => updateCertificate(cert.id, "title", e.target.value)}
                            placeholder="Naziv certifikata (npr. AWS Certified Solutions Architect)"
                            className="text-xs font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => removeCertificate(cert.id)}
                            className="text-destructive hover:bg-destructive/10 p-1.5 rounded ml-2"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            value={cert.issuer}
                            onChange={(e) => updateCertificate(cert.id, "issuer", e.target.value)}
                            placeholder="Izdavač (npr. Amazon Web Services)"
                            className="text-xs"
                          />
                          <Input
                            value={cert.year}
                            onChange={(e) => updateCertificate(cert.id, "year", e.target.value)}
                            placeholder="Godina (2023)"
                            className="text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* KORAK 5: Monetizacija & PayPal checkout (if foreign language) */}
          {!isBosnian && (
            <CvPayPalPayment
              language={currentLang}
              isUnlocked={isCurrentLangUnlocked}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}

          {/* Download & Print Actions */}
          <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                  KORAK 5: PREUZIMANJE ŽIVOTOPISA
                </span>
                <h4 className="text-sm sm:text-base font-bold text-foreground">
                  Izvoz u PDF visoke rezolucije (A4)
                </h4>
              </div>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  isCurrentLangUnlocked
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}
              >
                {isCurrentLangUnlocked ? "Spremno za preuzimanje ✓" : "Potrebna uplata 2.00 KM"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                type="button"
                variant="default"
                size="lg"
                onClick={handleDownloadPdf}
                disabled={isGenerating || !isCurrentLangUnlocked}
                className="gap-2 font-bold fluid-cta shadow-md"
              >
                {!isCurrentLangUnlocked ? (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Otključaj PDF (2.00 BAM)</span>
                  </>
                ) : isGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin" />
                    <span>{progressText || "Generisanje PDF-a..."}</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Preuzmi PDF {isBosnian ? "(Besplatno)" : ""}</span>
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => printCvDocument()}
                className="gap-2 font-semibold"
              >
                <Printer className="h-4 w-4" />
                <span>Štampaj / Snimi (Print)</span>
              </Button>
            </div>

            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>
                Generisani PDF sadrži potpunu UTF-8 podršku za naša slova (č, ć, š, đ, ž) i ćirilične znakove bez distorzije.
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Preview (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-3 sticky top-6">
          <div className="flex items-center justify-between bg-card p-3 rounded-xl border border-border/80 shadow-xs">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-foreground">
                KORAK 4: INTERAKTIVNI LIVE PREVIEW (A4)
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.max(0.45, prev - 0.1))}
                className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Smanji prikaz"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="text-[11px] font-mono font-bold px-1.5 text-muted-foreground min-w-[3rem] text-center">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.min(1.2, prev + 0.1))}
                className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Povećaj prikaz"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomScale(0.82)}
                className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ml-1"
                title="Optimalno (A4)"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Document Viewport */}
          <div className="rounded-2xl border border-border/80 bg-slate-900/10 dark:bg-slate-950/60 p-4 sm:p-6 overflow-x-auto flex justify-center shadow-inner min-h-[600px]">
            <ModernEuropassPreview
              ref={previewRef}
              data={cvData}
              scale={zoomScale}
            />
          </div>
        </div>
      </div>

      {/* Raw text import modal */}
      <CvTextImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        currentData={cvData}
        onApplyParsedData={(parsed) => {
          setCsvData((prev) => ({
            ...prev,
            ...parsed,
            personal: {
              ...prev.personal,
              ...(parsed.personal || {}),
            },
          }));
        }}
      />
    </div>
  );
}
