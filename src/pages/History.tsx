import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  Trash2, 
  Clock, 
  ArrowLeft, 
  AlertTriangle,
  RefreshCw,
  Eye,
  Search,
  Sparkles,
  Repeat2,
  WandSparkles,
  CheckCircle2,
  Filter,
  Shield,
  Layers,
  FileCheck,
  Calendar,
  ExternalLink,
  ChevronRight,
  UserCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/Footer";
import { DocumentPreviewEnhanced } from "@/components/DocumentPreviewEnhanced";
import { trackHistoryDownload } from "@/lib/analytics";
import { 
  getLocalRecentActivities, 
  deleteRecentActivity, 
  clearAllRecentActivities, 
  formatRelativeTime, 
  formatBytes,
  type RecentActivityItem 
} from "@/utils/recentActivity";
import { listHistory as listLocalImgPdfHistory } from "@/utils/conversionHistory";

interface CloudDocument {
  id: string;
  filename: string;
  file_type: string;
  file_size_bytes: number | null;
  storage_path: string | null;
  created_at: string;
  updated_at: string;
}

interface CloudConversion {
  id: string;
  original_filename: string;
  original_format: string;
  target_format: string;
  status: string;
  converted_url: string | null;
  created_at: string;
}

// Unified Activity Item for the 'My Recent Activity' section
interface UnifiedActivity {
  id: string;
  source: "cloud_doc" | "cloud_conv" | "local_act" | "local_imgpdf";
  type: "document" | "conversion";
  title: string;
  toolName: string;
  sourceFormat?: string;
  targetFormat?: string;
  fileSize?: number | null;
  formattedSize?: string;
  status: "completed" | "processing" | "failed";
  createdAt: string;
  timestamp: number;
  downloadUrl?: string | null;
  previewUrl?: string | null;
  rawDoc?: CloudDocument;
}

const History = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAdminAuth();
  const { toast } = useToast();
  
  // Cloud data
  const [documents, setDocuments] = useState<CloudDocument[]>([]);
  const [conversions, setConversions] = useState<CloudConversion[]>([]);
  
  // Local data
  const [localActivities, setLocalActivities] = useState<RecentActivityItem[]>([]);
  const [localImgPdfCount, setLocalImgPdfCount] = useState<number>(0);
  
  const [loading, setLoading] = useState(true);
  const [previewDoc, setPreviewDoc] = useState<CloudDocument | null>(null);

  // Search & Filters in Activity Section
  const [activitySearchQuery, setActivitySearchQuery] = useState("");
  const [activityTypeFilter, setActivityTypeFilter] = useState<"all" | "document" | "conversion">("all");

  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Load local activities from localStorage
      const localActs = getLocalRecentActivities();
      setLocalActivities(localActs);

      // 2. Load count of local image-to-pdf conversions from IndexedDB
      try {
        const idbList = await listLocalImgPdfHistory();
        setLocalImgPdfCount(idbList.length);
      } catch (e) {
        console.warn("Could not read local img/pdf history", e);
      }

      // 3. Load user's cloud documents & conversions from Supabase
      if (user?.id) {
        const { data: docs, error: docsError } = await supabase
          .from("documents")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (docsError) throw docsError;
        setDocuments(docs || []);

        const { data: convs, error: convsError } = await supabase
          .from("conversions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (convsError) throw convsError;
        setConversions(convs || []);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast({
        title: t("history.loadErrorTitle", "Greška pri učitavanju"),
        description: t("history.loadErrorDesc", "Nije moguće učitati podatke aktivnosti sa servera."),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user?.id, t, toast]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    loadAllData();

    // Listen for custom activity events triggered by generators and converters in real-time
    const handleActivityUpdated = () => {
      setLocalActivities(getLocalRecentActivities());
    };
    window.addEventListener("bhk_activity_updated", handleActivityUpdated);
    return () => {
      window.removeEventListener("bhk_activity_updated", handleActivityUpdated);
    };
  }, [loadAllData]);

  // Combine and deduplicate Cloud + Local activities into a unified feed
  const unifiedActivities: UnifiedActivity[] = useMemo(() => {
    const list: UnifiedActivity[] = [];
    const seenTitles = new Set<string>();

    // 1. Add cloud documents
    for (const doc of documents) {
      const ts = new Date(doc.created_at).getTime();
      seenTitles.add(doc.filename.toLowerCase());
      list.push({
        id: `cloud_doc_${doc.id}`,
        source: "cloud_doc",
        type: "document",
        title: doc.filename,
        toolName: doc.file_type ? `${doc.file_type.toUpperCase()} Dokument` : "Generisani Dokument",
        targetFormat: doc.file_type || "PDF",
        fileSize: doc.file_size_bytes,
        status: "completed",
        createdAt: doc.created_at,
        timestamp: ts,
        downloadUrl: doc.storage_path,
        rawDoc: doc,
      });
    }

    // 2. Add cloud conversions
    for (const conv of conversions) {
      const ts = new Date(conv.created_at).getTime();
      list.push({
        id: `cloud_conv_${conv.id}`,
        source: "cloud_conv",
        type: "conversion",
        title: conv.original_filename,
        toolName: `Konverzija (${conv.original_format.toUpperCase()} → ${conv.target_format.toUpperCase()})`,
        sourceFormat: conv.original_format,
        targetFormat: conv.target_format,
        status: conv.status === "completed" ? "completed" : "processing",
        createdAt: conv.created_at,
        timestamp: ts,
        downloadUrl: conv.converted_url,
      });
    }

    // 3. Add local recent activities (e.g. Europass CV exports, QR codes, Barcodes)
    for (const act of localActivities) {
      if (!seenTitles.has(act.title.toLowerCase())) {
        list.push({
          id: `local_act_${act.id}`,
          source: "local_act",
          type: act.type,
          title: act.title,
          toolName: act.toolName,
          sourceFormat: act.sourceFormat,
          targetFormat: act.targetFormat,
          fileSize: act.sizeBytes,
          formattedSize: act.formattedSize,
          status: act.status,
          createdAt: act.createdAt,
          timestamp: act.timestamp,
          downloadUrl: act.downloadUrl,
          previewUrl: act.previewUrl,
        });
      }
    }

    // Sort chronologically descending (newest first)
    return list.sort((a, b) => b.timestamp - a.timestamp);
  }, [documents, conversions, localActivities]);

  // Filtered activities based on search query and type filter
  const filteredActivities = useMemo(() => {
    return unifiedActivities.filter((act) => {
      // Type filter
      if (activityTypeFilter !== "all" && act.type !== activityTypeFilter) {
        return false;
      }
      // Search filter
      if (activitySearchQuery.trim()) {
        const q = activitySearchQuery.toLowerCase();
        const matchTitle = act.title.toLowerCase().includes(q);
        const matchTool = act.toolName.toLowerCase().includes(q);
        const matchTarget = act.targetFormat?.toLowerCase().includes(q) || false;
        const matchSource = act.sourceFormat?.toLowerCase().includes(q) || false;
        if (!matchTitle && !matchTool && !matchTarget && !matchSource) {
          return false;
        }
      }
      return true;
    });
  }, [unifiedActivities, activityTypeFilter, activitySearchQuery]);

  // Metrics counts
  const totalGeneratedDocs = useMemo(() => {
    return unifiedActivities.filter((a) => a.type === "document").length;
  }, [unifiedActivities]);

  const totalConversions = useMemo(() => {
    return unifiedActivities.filter((a) => a.type === "conversion").length + localImgPdfCount;
  }, [unifiedActivities, localImgPdfCount]);

  const resolveDownloadUrl = async (rawUrl: string): Promise<string | null> => {
    let bucket = "user-documents";
    let objectPath = rawUrl;

    if (/^https?:\/\//i.test(rawUrl)) {
      try {
        const parsed = new URL(rawUrl);
        const match = parsed.pathname.match(/\/object\/(?:sign|public|authenticated)\/([^/]+)\/(.+)$/);
        if (!match) return rawUrl;
        bucket = match[1];
        objectPath = decodeURIComponent(match[2]);
      } catch {
        return rawUrl;
      }
    }

    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(objectPath, 900);
    if (error || !data?.signedUrl) return /^https?:\/\//i.test(rawUrl) ? rawUrl : null;
    return data.signedUrl;
  };

  const handleDownload = async (
    rawUrl: string,
    filename: string,
    source: "document" | "conversion" = "document"
  ) => {
    const url = await resolveDownloadUrl(rawUrl);
    if (!url) {
      toast({
        title: t("history.loadErrorTitle", "Greška"),
        description: t("history.downloadExpired", "Fajl više nije dostupan (automatski je obrisan po isteku 24h)."),
        variant: "destructive",
      });
      return;
    }
    trackHistoryDownload({ source, format: filename.split(".").pop()?.toLowerCase() });
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDeleteItem = async (activity: UnifiedActivity) => {
    if (activity.source === "cloud_doc" && activity.rawDoc) {
      try {
        const { error } = await supabase.from("documents").delete().eq("id", activity.rawDoc.id);
        if (error) throw error;
        setDocuments((prev) => prev.filter((d) => d.id !== activity.rawDoc?.id));
        toast({
          title: t("history.deletedTitle", "Obrisano"),
          description: t("history.deletedDesc", "Dokument je uspješno uklonjen."),
        });
      } catch (err) {
        console.error("Delete error:", err);
        toast({
          title: "Greška",
          description: "Nije moguće obrisati dokument sa servera.",
          variant: "destructive",
        });
      }
    } else if (activity.source === "local_act") {
      const localId = activity.id.replace("local_act_", "");
      deleteRecentActivity(localId);
      setLocalActivities(getLocalRecentActivities());
      toast({
        title: "Uklonjeno",
        description: "Aktivnost je uklonjena iz Vaše lokalne historije.",
      });
    }
  };

  const handleClearAllLocal = () => {
    if (confirm("Da li ste sigurni da želite očistiti lokalnu historiju aktivnosti na ovom uređaju?")) {
      clearAllRecentActivities();
      setLocalActivities([]);
      toast({
        title: "Očišćeno",
        description: "Lokalna historija aktivnosti je ispražnjena.",
      });
    }
  };

  const getTimeUntilDeletion = () => {
    const now = new Date();
    const deletion = new Date();
    deletion.setHours(10, 0, 0, 0);
    if (now.getHours() >= 10) {
      deletion.setDate(deletion.getDate() + 1);
    }
    const diff = deletion.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const username = user?.email?.split("@")[0] || "Korisnik";

  return (
    <div className="min-h-screen bg-background relative z-10 flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-6xl flex-1 space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              aria-label="Nazad na početnu"
              className="h-9 w-9 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <UserCheck className="h-3.5 w-3.5" />
                <span>Korisnički Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                Pregled računa i Moje aktivnosti
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadAllData}
              disabled={loading}
              className="gap-2 text-xs font-semibold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>{t("history.refresh", "Osvježi")}</span>
            </Button>

            {localActivities.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAllLocal}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                Očisti lokalno
              </Button>
            )}
          </div>
        </div>

        {/* User Greeting & Status Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-slate-900 via-card to-card p-6 shadow-md">
          <div className="absolute right-0 top-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Prijava aktivna
                </span>
                <Badge variant="outline" className="text-[11px] border-primary/30 text-primary">
                  {isAdmin ? "Admin Nalog" : "Standardni Nalog"}
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Dobrodošli nazad, <span className="text-primary">{username}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Ovdje imate kompletan uvid u historiju svih generisanih dokumenata (Europass CV, barkodovi, QR kodovi) i izvršenih konverzija sa direktnim preuzimanjem.
              </p>
            </div>

            {/* Quick Action Launchpad */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link to="/category/generatori?tab=cv">
                <Button size="sm" className="gap-2 font-bold shadow-xs">
                  <FileText className="h-4 w-4" />
                  Novi Europass CV
                </Button>
              </Link>
              <Link to="/category/konvertori">
                <Button size="sm" variant="outline" className="gap-2 font-bold bg-background/50 hover:bg-background">
                  <Repeat2 className="h-4 w-4 text-primary" />
                  Konvertori
                </Button>
              </Link>
              <Link to="/slika-pdf">
                <Button size="sm" variant="ghost" className="gap-2 text-xs text-slate-300 hover:text-white">
                  Slika u PDF
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 border-border/80 bg-card/60 backdrop-blur-sm shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Generisani dokumenti
              </p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-foreground">{totalGeneratedDocs}</span>
                <span className="text-[11px] text-muted-foreground">u historiji</span>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-border/80 bg-card/60 backdrop-blur-sm shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 flex items-center justify-center shrink-0">
              <Repeat2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Izvršene konverzije
              </p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-foreground">{totalConversions}</span>
                <span className="text-[11px] text-muted-foreground">obrađeno</span>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-border/80 bg-card/60 backdrop-blur-sm shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Privatnost i sigurnost
              </p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-sm font-bold text-emerald-500">100% Zaštićeno</span>
              </div>
              <span className="text-[10px] text-muted-foreground">Klijentska obrada</span>
            </div>
          </Card>

          <Card className="p-5 border-border/80 bg-card/60 backdrop-blur-sm shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Dnevno čišćenje (10:00)
              </p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-base font-bold text-amber-500">{getTimeUntilDeletion()}</span>
              </div>
              <span className="text-[10px] text-muted-foreground">Server cache reset</span>
            </div>
          </Card>
        </div>

        {/* Transparency Notice (Project Architecture Requirement) */}
        <Card className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-amber-200/90">
              <strong className="font-semibold text-amber-300">Napomena o privatnosti i brisanju podataka:</strong>{" "}
              {t("history.transparencyNotice", "Svi privremeni server conversion fajlovi se brišu automatski svakog dana u 10:00 sati radi Vaše privatnosti. Preuzmite svoje konvertovane dokumente na vrijeme.")}
            </div>
          </div>
        </Card>

        {/* ========================================================================= */}
        {/* 'MY RECENT ACTIVITY' / 'MOJE NEDAVNE AKTIVNOSTI' SECTION                   */}
        {/* ========================================================================= */}
        <section aria-labelledby="recent-activity-title" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>MY RECENT ACTIVITY · HISTORIJA</span>
              </div>
              <h2 id="recent-activity-title" className="text-xl sm:text-2xl font-black text-foreground">
                Moje nedavne aktivnosti
              </h2>
              <p className="text-xs text-muted-foreground">
                Hronološki pregled svih kreiranih dokumenata, biografija i završenih konverzija.
              </p>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="text"
                  value={activitySearchQuery}
                  onChange={(e) => setActivitySearchQuery(e.target.value)}
                  placeholder="Pretraži aktivnosti..."
                  className="pl-8 text-xs h-9 bg-card"
                />
              </div>

              {/* Type Filter Buttons */}
              <div className="flex items-center bg-muted/60 p-1 rounded-lg border border-border/70 text-xs">
                <button
                  type="button"
                  onClick={() => setActivityTypeFilter("all")}
                  className={`px-3 py-1 rounded-md font-semibold transition-all ${
                    activityTypeFilter === "all"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sve ({unifiedActivities.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActivityTypeFilter("document")}
                  className={`px-3 py-1 rounded-md font-semibold transition-all ${
                    activityTypeFilter === "document"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Dokumenti ({totalGeneratedDocs})
                </button>
                <button
                  type="button"
                  onClick={() => setActivityTypeFilter("conversion")}
                  className={`px-3 py-1 rounded-md font-semibold transition-all ${
                    activityTypeFilter === "conversion"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Konverzije ({totalConversions})
                </button>
              </div>
            </div>
          </div>

          {/* Activity Feed List */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <RefreshCw className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredActivities.length === 0 ? (
            <Card className="p-10 text-center border-dashed border-2 border-border/80 bg-card/40 rounded-2xl">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-muted/60 flex items-center justify-center mb-3 text-muted-foreground">
                <Layers className="h-7 w-7 opacity-60" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                {activitySearchQuery ? "Nema pronađenih aktivnosti za zadati pojam" : "Još uvijek nemate zabilježenih aktivnosti"}
              </h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto mt-1 mb-5">
                {activitySearchQuery
                  ? "Pokušajte sa drugačijim nazivom fajla ili očistite pretragu."
                  : "Generišite svoj prvi Europass CV ili pretvorite slike u PDF – Vaša historija će se automatski pojaviti ovdje."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Link to="/category/generatori?tab=cv">
                  <Button size="sm" className="gap-2 text-xs font-bold">
                    <FileText className="h-4 w-4" />
                    Kreiraj Europass CV
                  </Button>
                </Link>
                <Link to="/slika-pdf">
                  <Button size="sm" variant="outline" className="gap-2 text-xs font-bold">
                    <Repeat2 className="h-4 w-4 text-primary" />
                    Pretvori slike u PDF
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredActivities.map((act) => {
                const isDoc = act.type === "document";
                return (
                  <Card
                    key={act.id}
                    className="p-4 sm:p-5 border-border/80 bg-card hover:border-primary/40 transition-all shadow-xs group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: Icon & Info */}
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div
                          className={`h-10 w-10 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${
                            isDoc
                              ? "bg-blue-500/10 border-blue-500/20 text-blue-500"
                              : "bg-cyan-500/10 border-cyan-500/20 text-cyan-500"
                          }`}
                        >
                          {isDoc ? <FileText className="h-5 w-5" /> : <Repeat2 className="h-5 w-5" />}
                        </div>

                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-sm sm:text-base text-foreground truncate max-w-[280px] sm:max-w-md">
                              {act.title}
                            </span>
                            <Badge
                              variant="outline"
                              className={`text-[10px] font-bold uppercase tracking-wider ${
                                isDoc
                                  ? "border-blue-500/30 text-blue-500 bg-blue-500/5"
                                  : "border-cyan-500/30 text-cyan-500 bg-cyan-500/5"
                              }`}
                            >
                              {act.toolName}
                            </Badge>
                            {act.targetFormat && (
                              <span className="text-[10px] font-semibold text-muted-foreground uppercase bg-muted/60 px-1.5 py-0.5 rounded">
                                {act.targetFormat}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{formatRelativeTime(act.timestamp)}</span>
                            </span>
                            <span>•</span>
                            <span>{act.formattedSize || formatBytes(act.fileSize)}</span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Završeno
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        {act.rawDoc && (
                          <Button
                            variant="ghost"
                            size="sm"
                            aria-label={`Pregledaj ${act.title}`}
                            onClick={() => setPreviewDoc(act.rawDoc!)}
                            className="h-8 gap-1.5 text-xs"
                          >
                            <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>Pregled</span>
                          </Button>
                        )}

                        {act.downloadUrl && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleDownload(act.downloadUrl!, act.title, act.type)}
                            className="h-8 gap-1.5 text-xs font-semibold shadow-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Preuzmi</span>
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteItem(act)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          title="Ukloni iz historije"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Document Preview Modal */}
      {previewDoc && (
        <DocumentPreviewEnhanced
          file={null}
          fileUrl={previewDoc.storage_path || undefined}
          fileName={previewDoc.filename}
          open={!!previewDoc}
          onOpenChange={() => setPreviewDoc(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default History;
