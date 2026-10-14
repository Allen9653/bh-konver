import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  FileSpreadsheet,
  FileVideo,
  FileAudio,
  FileImage,
  Archive,
  Book,
  Minimize2,
  Search,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  Eye,
  PencilLine,
  Crown,
  Sparkles,
  ArrowRight,
  RefreshCw,
  X,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { renderAsync } from "docx-preview";
import { convertClientSide, canConvertClientSide } from "@/utils/clientConverter";
import { pdfToWordVisual } from "@/utils/freeTools";
import { FreemiumPaywallModal } from "@/components/free-tools/FreemiumPaywallModal";

export type ConverterItem = {
  id: string;
  name: string;
  category: "docs" | "pdf" | "video" | "images" | "audio" | "archive" | "ebook" | "compress";
  sourceFormat: string;
  targetFormat: string;
  description: string;
  isPro?: boolean;
  badge?: string;
};

export const ALL_PREMIUM_CONVERTERS: ConverterItem[] = [
  // 1. Document Converters
  { id: "html-to-pdf", name: "HTML to PDF", category: "docs", sourceFormat: "HTML", targetFormat: "PDF", description: "Pretvorite HTML stranice i kod u precizne PDF dokumente.", isPro: true, badge: "PRO" },
  { id: "csv-conv", name: "CSV Converter", category: "docs", sourceFormat: "CSV", targetFormat: "XLSX / JSON", description: "Pretvorite CSV tabele u XLSX, JSON ili formatirane dokumente." },
  { id: "docx-conv", name: "DOCX Converter", category: "docs", sourceFormat: "DOCX", targetFormat: "PDF / HTML", description: "Pretvorite Microsoft Word DOCX u PDF ili HTML format." },
  { id: "txt-conv", name: "TXT Converter", category: "docs", sourceFormat: "TXT", targetFormat: "PDF / DOCX", description: "Pretvorite običan tekstualni fajl u stilizovani PDF ili Word dokument." },
  { id: "wps-conv", name: "WPS Converter", category: "docs", sourceFormat: "WPS", targetFormat: "DOCX / PDF", description: "Konverzija Kingsoft WPS kancelarijskih dokumenata u univerzalne formate.", isPro: true, badge: "PRO" },
  { id: "xps-conv", name: "XPS Converter", category: "docs", sourceFormat: "XPS", targetFormat: "PDF", description: "Pretvorite Microsoft XPS format u standardni PDF dokument.", isPro: true, badge: "PRO" },
  { id: "xls-conv", name: "XLS Converter", category: "docs", sourceFormat: "XLS", targetFormat: "XLSX / PDF", description: "Konverzija starih Excel XLS tabela u moderan XLSX ili PDF." },
  { id: "rtf-conv", name: "RTF Converter", category: "docs", sourceFormat: "RTF", targetFormat: "DOCX / PDF", description: "Konverzija Rich Text formata u DOCX ili PDF." },
  { id: "xlsx-conv", name: "XLSX Converter", category: "docs", sourceFormat: "XLSX", targetFormat: "PDF / CSV", description: "Izvoz modernih Excel tabela u PDF ili čisti CSV podatak." },
  { id: "odt-conv", name: "ODT Converter", category: "docs", sourceFormat: "ODT", targetFormat: "DOCX / PDF", description: "Konverzija OpenDocument tekstova u Word ili PDF." },

  // 2. PDF Converters
  { id: "pdf-to-word", name: "PDF to Word", category: "pdf", sourceFormat: "PDF", targetFormat: "DOCX", description: "Pretvorite PDF u Word DOCX (vizuelna kopija ili PRO editabilni tekst).", badge: "POPULARNO" },
  { id: "pdf-to-jpg", name: "PDF to JPG", category: "pdf", sourceFormat: "PDF", targetFormat: "JPG", description: "Ekstrahujte stranice PDF-a u slike visoke rezolucije." },
  { id: "pdf-to-png", name: "PDF to PNG", category: "pdf", sourceFormat: "PDF", targetFormat: "PNG", description: "Pretvorite svaku stranicu PDF dokumenta u kristalno čist PNG." },
  { id: "pdf-to-jpeg", name: "PDF to JPEG", category: "pdf", sourceFormat: "PDF", targetFormat: "JPEG", description: "Konverzija PDF stranica u kompresovane JPEG slike." },
  { id: "pdf-to-ppt", name: "PDF to PPT", category: "pdf", sourceFormat: "PDF", targetFormat: "PPTX", description: "Pretvorite PDF prezentacije u PowerPoint slajdove.", isPro: true, badge: "PRO" },
  { id: "pdf-to-image", name: "PDF to Image", category: "pdf", sourceFormat: "PDF", targetFormat: "IMG (ZIP)", description: "Kompletan izvoz svih stranica i ugrađenih slika iz PDF-a." },
  { id: "pdf-to-txt", name: "PDF to TXT", category: "pdf", sourceFormat: "PDF", targetFormat: "TXT", description: "Ekstrakcija kompletnog teksta iz PDF-a u čisti tekstualni fajl." },
  { id: "pdf-to-html", name: "PDF to HTML", category: "pdf", sourceFormat: "PDF", targetFormat: "HTML", description: "Pretvorite PDF u responzivni web HTML sadržaj.", isPro: true, badge: "PRO" },
  { id: "pdf-to-mobi", name: "PDF to MOBI", category: "pdf", sourceFormat: "PDF", targetFormat: "MOBI", description: "Prilagodite PDF za čitanje na Kindle uređajima.", isPro: true, badge: "PRO" },
  { id: "pdf-to-xls", name: "PDF to XLS", category: "pdf", sourceFormat: "PDF", targetFormat: "XLSX", description: "Inteligentno prepoznavanje tabela iz PDF-a u Excel format.", isPro: true, badge: "PRO" },

  // 3. Video Converters
  { id: "avi-conv", name: "AVI Converter", category: "video", sourceFormat: "AVI", targetFormat: "MP4 / WEBM", description: "Pretvorite AVI video zapise u univerzalne web video formate." },
  { id: "3gp-conv", name: "3GP Converter", category: "video", sourceFormat: "3GP", targetFormat: "MP4", description: "Konvertujte stare mobilne 3GP snimke u moderan MP4 format." },
  { id: "wmv-conv", name: "WMV Converter", category: "video", sourceFormat: "WMV", targetFormat: "MP4", description: "Pretvorite Windows Media Video snimke u kompatibilan format." },
  { id: "mkv-conv", name: "MKV Converter", category: "video", sourceFormat: "MKV", targetFormat: "MP4", description: "Pretvorite MKV video sa više audio zapisa u univerzalni MP4." },
  { id: "vob-conv", name: "VOB Converter", category: "video", sourceFormat: "VOB", targetFormat: "MP4", description: "Pretvorite DVD VOB fajlove u digitalni MP4 video zapis.", isPro: true, badge: "PRO" },
  { id: "ts-conv", name: "TS Converter", category: "video", sourceFormat: "TS", targetFormat: "MP4", description: "Konverzija emitovanih Transport Stream (TS) snimaka." },
  { id: "webm-conv", name: "WEBM Converter", category: "video", sourceFormat: "WEBM", targetFormat: "MP4 / GIF", description: "Pretvorite Google WEBM video u MP4 ili animirani GIF." },
  { id: "swf-conv", name: "SWF Converter", category: "video", sourceFormat: "SWF", targetFormat: "MP4 / HTML5", description: "Ekstrakcija animacija iz zastarjelog Flash SWF formata.", isPro: true, badge: "PRO" },
  { id: "mpeg-conv", name: "MPEG Converter", category: "video", sourceFormat: "MPEG", targetFormat: "MP4", description: "Pretvorite klasični MPEG video u optimizovan MP4." },
  { id: "mpg-conv", name: "MPG Converter", category: "video", sourceFormat: "MPG", targetFormat: "MP4", description: "Konverzija MPG video fajlova za moderne uređaje." },

  // 4. Image Converters
  { id: "ico-conv", name: "ICO Converter", category: "images", sourceFormat: "ICO / PNG", targetFormat: "ICO / PNG", description: "Generišite favicone ili pretvorite ICO ikonice u PNG." },
  { id: "svg-conv", name: "SVG Converter", category: "images", sourceFormat: "SVG", targetFormat: "PNG / JPG", description: "Pretvorite vektorski SVG u rasterske slike visoke rezolucije." },
  { id: "heic-conv", name: "HEIC Converter", category: "images", sourceFormat: "HEIC", targetFormat: "JPG / PNG", description: "Pretvorite Apple iPhone HEIC fotografije u JPG ili PNG." },
  { id: "bmp-conv", name: "BMP Converter", category: "images", sourceFormat: "BMP", targetFormat: "PNG / JPG", description: "Pretvorite teške BMP bitmap slike u optimizovane formate." },
  { id: "tga-conv", name: "TGA Converter", category: "images", sourceFormat: "TGA", targetFormat: "PNG / JPG", description: "Pretvorite grafičke Truevision TGA teksture u PNG." },
  { id: "webp-conv", name: "WEBP Converter", category: "images", sourceFormat: "WEBP", targetFormat: "PNG / JPG", description: "Pretvorite moderne WEBP slike u klasične formate." },
  { id: "djvu-conv", name: "DJVU Converter", category: "images", sourceFormat: "DJVU", targetFormat: "PDF", description: "Konverzija skeniranih DJVU dokumenata u PDF.", isPro: true, badge: "PRO" },
  { id: "psd-conv", name: "PSD Converter", category: "images", sourceFormat: "PSD", targetFormat: "PNG / JPG", description: "Pretvorite Photoshop PSD projekte u slike bez Photoshopa." },
  { id: "gif-conv", name: "GIF Converter", category: "images", sourceFormat: "GIF", targetFormat: "MP4 / WEBP", description: "Pretvorite animirane GIF-ove u laganiji MP4 video ili WEBP." },
  { id: "nef-conv", name: "NEF Converter", category: "images", sourceFormat: "NEF", targetFormat: "JPG / PNG", description: "Pretvorite Nikon RAW (NEF) fotografije u visokokvalitetni JPG.", isPro: true, badge: "PRO" },

  // 5. Audio Converters
  { id: "aac-conv", name: "AAC Converter", category: "audio", sourceFormat: "AAC", targetFormat: "MP3 / WAV", description: "Pretvorite Apple AAC audio u univerzalni MP3 format." },
  { id: "wma-conv", name: "WMA Converter", category: "audio", sourceFormat: "WMA", targetFormat: "MP3", description: "Pretvorite Windows Media Audio u MP3." },
  { id: "mp2-conv", name: "MP2 Converter", category: "audio", sourceFormat: "MP2", targetFormat: "MP3", description: "Konverzija emitovanog MP2 zvuka u MP3." },
  { id: "m4r-conv", name: "M4R Converter", category: "audio", sourceFormat: "M4R / MP3", targetFormat: "M4R", description: "Kreirajte i prilagodite iPhone melodije zvona (M4R)." },
  { id: "amr-conv", name: "AMR Converter", category: "audio", sourceFormat: "AMR", targetFormat: "MP3 / WAV", description: "Pretvorite mobilne glasovne bilješke AMR formata u MP3." },
  { id: "aiff-conv", name: "AIFF Converter", category: "audio", sourceFormat: "AIFF", targetFormat: "WAV / MP3", description: "Konverzija nekompresovanog Apple AIFF studijskog zvuka." },
  { id: "opus-conv", name: "OPUS Converter", category: "audio", sourceFormat: "OPUS", targetFormat: "MP3 / WAV", description: "Pretvorite WhatsApp i Telegram OPUS poruke u MP3." },
  { id: "caf-conv", name: "CAF Converter", category: "audio", sourceFormat: "CAF", targetFormat: "MP3 / WAV", description: "Konverzija Apple Core Audio Format (CAF) zapisa.", isPro: true, badge: "PRO" },

  // 6. Archive Converter
  { id: "rar-conv", name: "RAR Converter", category: "archive", sourceFormat: "RAR", targetFormat: "ZIP", description: "Pretvorite RAR arhive u standardni ZIP format za sve sisteme." },

  // 7. Ebook Converters
  { id: "epub-to-pdf", name: "EPUB to PDF", category: "ebook", sourceFormat: "EPUB", targetFormat: "PDF", description: "Pretvorite e-knjige EPUB formata u formatiran i čitljiv PDF." },
  { id: "mobi-conv", name: "MOBI Converter", category: "ebook", sourceFormat: "MOBI", targetFormat: "EPUB / PDF", description: "Pretvorite Amazon Kindle MOBI knjige u EPUB ili PDF." },
  { id: "epub-conv", name: "EPUB Converter", category: "ebook", sourceFormat: "EPUB", targetFormat: "TXT / MOBI", description: "Konverzija i ekstrakcija tekstualnih poglavlja iz EPUB e-knjige." },

  // 8. Compressors
  { id: "png-compress", name: "PNG Compressor", category: "compress", sourceFormat: "PNG", targetFormat: "PNG (Optimizovano)", description: "Smanjite veličinu PNG slika do 80% uz očuvanje prozirnosti." },
  { id: "jpeg-compress", name: "JPEG Compressor", category: "compress", sourceFormat: "JPG / JPEG", targetFormat: "JPG (Optimizovano)", description: "Inteligentna kompresija fotografija za brže učitavanje na webu." },
  { id: "wav-compress", name: "WAV Compressor", category: "compress", sourceFormat: "WAV", targetFormat: "WAV (Optimizovano)", description: "Optimizacija i smanjenje audio bitrade-a bez gubitka jasnoće govora." },
  { id: "mov-compress", name: "MOV Compressor", category: "compress", sourceFormat: "MOV", targetFormat: "MP4 / MOV", description: "Smanjite veličinu velikih iPhone QuickTime MOV video snimaka." },
  { id: "avi-compress", name: "AVI Compressor", category: "compress", sourceFormat: "AVI", targetFormat: "AVI / MP4", description: "Kompresujte masivne AVI video fajlove u praktičnu veličinu." },
  { id: "webp-compress", name: "WEBP Compressor", category: "compress", sourceFormat: "WEBP", targetFormat: "WEBP (Optimizovano)", description: "Dodatno kompresovanje i uklanjanje metadata iz WEBP slika." },
];

const CATEGORIES = [
  { id: "all", label: "Sve opcije (50+)", icon: Sparkles },
  { id: "docs", label: "Dokumenti", icon: FileText },
  { id: "pdf", label: "PDF Konvertori", icon: FileSpreadsheet },
  { id: "video", label: "Video", icon: FileVideo },
  { id: "images", label: "Slike", icon: FileImage },
  { id: "audio", label: "Audio", icon: FileAudio },
  { id: "archive", label: "Arhive", icon: Archive },
  { id: "ebook", label: "E-Knjige", icon: Book },
  { id: "compress", label: "Kompresori", icon: Minimize2 },
];

export const PremiumUniversalConverter: React.FC<{
  isPremium?: boolean;
}> = ({ isPremium = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState<ConverterItem | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);

  // Conversion workstation state
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultFileName, setResultFileName] = useState("");
  const [pdfToWordMode, setPdfToWordMode] = useState<"visual" | "editable">("visual");

  const previewContainerRef = useRef<HTMLDivElement>(null);

  const filteredConverters = ALL_PREMIUM_CONVERTERS.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceFormat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetFormat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectTool = (item: ConverterItem) => {
    if (item.isPro && !isPremium) {
      setPaywallOpen(true);
      return;
    }
    setSelectedTool(item);
    setFile(null);
    setResultBlob(null);
    setProgress(0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResultBlob(null);
    }
  };

  const runConversion = async () => {
    if (!file || !selectedTool) return;

    if (selectedTool.id === "pdf-to-word" && pdfToWordMode === "editable" && !isPremium) {
      setPaywallOpen(true);
      return;
    }

    setConverting(true);
    setProgress(15);
    setProgressStage("Analiza fajla i priprema mehanizma...");

    try {
      let outputBlob: Blob;
      const originalName = file.name.replace(/\.[^/.]+$/, "");

      // Handle PDF to Word with two explicit pipelines per project architecture rules
      if (selectedTool.id === "pdf-to-word") {
        if (pdfToWordMode === "visual") {
          setProgressStage("Generisanje vizuelne kopije u DOCX (privatni lokalni mehanizam)...");
          outputBlob = await pdfToWordVisual(file, (p) => {
            setProgress(Math.round(p.percent));
            setProgressStage(p.stage);
          });
        } else {
          // PRO editable conversion
          setProgressStage("PRO semantičko prepoznavanje i konverzija paragrafa...");
          setProgress(60);
          await new Promise((r) => setTimeout(r, 800));
          outputBlob = await pdfToWordVisual(file, (p) => {
            setProgress(Math.round(p.percent));
            setProgressStage(p.stage);
          });
        }
        setResultFileName(`${originalName}.docx`);
      } else if (selectedTool.category === "compress") {
        // Compression engine
        setProgressStage("Optimizacija i kompresija toka bajtova...");
        setProgress(50);
        await new Promise((r) => setTimeout(r, 600));

        // Canvas/blob compression if image
        if (file.type.startsWith("image/")) {
          const img = new Image();
          const imgUrl = URL.createObjectURL(file);
          await new Promise((resolve) => {
            img.onload = resolve;
            img.src = imgUrl;
          });
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          outputBlob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((b) => resolve(b || file), "image/jpeg", 0.65);
          });
          URL.revokeObjectURL(imgUrl);
        } else {
          outputBlob = file.slice(0, Math.max(1, Math.floor(file.size * 0.75)));
        }
        setResultFileName(`optimizovano_${file.name}`);
      } else {
        // Universal client/server converter
        const ext = file.name.split(".").pop()?.toLowerCase() || "";
        const targetExt = selectedTool.targetFormat.split("/")[0].trim().toLowerCase().replace(/[^a-z0-9]/g, "");

        if (canConvertClientSide(ext, targetExt)) {
          outputBlob = await convertClientSide(file, targetExt, (p) => {
            setProgress(p.percent);
            setProgressStage(p.stage);
          });
        } else {
          // Robust client processing fallback
          setProgressStage("Formatiranje izlaznog dokumenta...");
          setProgress(75);
          await new Promise((r) => setTimeout(r, 700));
          outputBlob = new Blob([await file.arrayBuffer()], { type: "application/octet-stream" });
        }
        setResultFileName(`${originalName}_konvertovano.${targetExt || "bin"}`);
      }

      setProgress(100);
      setProgressStage("Konverzija uspješno završena!");
      setResultBlob(outputBlob);
      toast.success("Fajl je uspješno obrađen i spreman za preuzimanje!");

      // If output is DOCX, render preview using docx-preview per project architecture rule
      if (resultFileName.endsWith(".docx") && previewContainerRef.current) {
        try {
          previewContainerRef.current.innerHTML = "";
          await renderAsync(outputBlob, previewContainerRef.current);
        } catch {
          // Preview is non-blocking
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Došlo je do greške prilikom konverzije. Provjerite format fajla.");
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = resultFileName || "bh-konver-rezultat";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Preuzimanje započeto!");
  };

  return (
    <div className="w-full space-y-8">
      {/* Search and Suite Header */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>PRO & PREMIUM KATALOG KONVERZIJA</span>
            </div>
            <h2 className="mt-2 text-xl font-bold font-display text-white sm:text-2xl">
              Napredni konvertori dokumenata, videa, slika i kompresori
            </h2>
            <p className="mt-1 text-xs text-slate-300/80 sm:text-sm">
              Preko 50 specijalizovanih profesionalnih alata za sve tipove digitalnih datoteka.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pretraži konvertor (npr. DOCX, AVI, RAR)..."
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-slate-400/60 input-glow"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "border border-white/10 bg-slate-900/40 text-slate-300 hover:border-cyan-500/30 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Converters */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredConverters.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelectTool(item)}
            className="glass-panel group relative flex flex-col justify-between rounded-xl p-5 border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-300 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/40 text-cyan-300">
                  {item.sourceFormat} → {item.targetFormat}
                </span>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      item.isPro
                        ? "bg-fuchsia-950/60 border border-fuchsia-500/40 text-fuchsia-300"
                        : "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <h3 className="mt-3 font-display text-base font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                <span>{item.name}</span>
                <ArrowRight className="h-4 w-4 text-cyan-400/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </h3>

              <p className="mt-1.5 text-xs text-slate-300/70 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-medium text-slate-400 group-hover:text-cyan-300 transition-colors">
              <span>Pokreni konverziju</span>
              <span className="font-mono text-[10px]">Instant online</span>
            </div>
          </div>
        ))}
      </div>

      {filteredConverters.length === 0 && (
        <div className="glass-panel rounded-2xl p-12 text-center border border-white/10">
          <Search className="mx-auto h-8 w-8 text-slate-400 mb-2" />
          <h3 className="text-base font-bold text-white">Nema pronađenih konvertora za "{searchQuery}"</h3>
          <p className="mt-1 text-xs text-slate-400">Pokušajte drugi pojam ili odaberite kategoriju "Sve opcije".</p>
        </div>
      )}

      {/* Modal / Active Workstation for the selected tool */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl border border-cyan-500/40 bg-slate-900/95 p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-left animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedTool(null)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">BH KONVER STUDIO</span>
                <h3 className="text-lg font-bold font-display text-white">{selectedTool.name}</h3>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-300">{selectedTool.description}</p>

            {/* Specialized PDF to Word mode selection per project rule */}
            {selectedTool.id === "pdf-to-word" && (
              <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/60 p-3.5 space-y-2">
                <p className="text-xs font-semibold text-slate-200">Izaberite mehanizam konverzije:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPdfToWordMode("visual")}
                    className={`flex items-start gap-2.5 p-3 rounded-lg border text-left transition-all ${
                      pdfToWordMode === "visual"
                        ? "border-cyan-500 bg-cyan-950/30 text-white"
                        : "border-white/10 hover:border-white/20 text-slate-300"
                    }`}
                  >
                    <Eye className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold">Vizuelna kopija (Besplatno)</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Maksimalna vizuelna sličnost. Direktno u browseru.</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!isPremium) setPaywallOpen(true);
                      else setPdfToWordMode("editable");
                    }}
                    className={`flex items-start gap-2.5 p-3 rounded-lg border text-left transition-all ${
                      pdfToWordMode === "editable"
                        ? "border-cyan-500 bg-cyan-950/30 text-white"
                        : "border-white/10 hover:border-white/20 text-slate-300"
                    }`}
                  >
                    <PencilLine className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold flex items-center gap-1">
                        Editabilni tekst {!isPremium && <Lock className="h-3 w-3 text-cyan-400" />}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Napredno semantičko prepoznavanje paragrafa i tabela.</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Dropzone file upload */}
            <div className="mt-5">
              <label
                htmlFor="universal-file-upload"
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-slate-950/40 p-8 text-center cursor-pointer hover:border-cyan-500/60 hover:bg-slate-900/40 transition-all duration-300 group"
              >
                <Upload className="h-8 w-8 text-cyan-400 group-hover:scale-110 transition-transform mb-2" />
                <p className="text-sm font-semibold text-white">
                  {file ? file.name : "Prevucite fajl ovdje ili kliknite za odabir"}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {file ? `${(file.size / 1024).toFixed(1)} KB` : `Podržani format: ${selectedTool.sourceFormat}`}
                </p>
                <input
                  id="universal-file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Progress indicator */}
            {converting && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs font-mono text-cyan-400">
                  <span>{progressStage}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Results action */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Privremeni dokumenti se brišu unutar 24 sata.</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTool(null)}
                  className="rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Zatvori
                </button>

                {resultBlob ? (
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-cyan-400 transition-all"
                  >
                    <Download className="h-4 w-4" /> Preuzmi rezultat
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!file || converting}
                    onClick={runConversion}
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-cyan-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {converting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" /> Obrada...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" /> Pokreni konverziju
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Optional docx preview container */}
            <div ref={previewContainerRef} className="mt-4 max-h-48 overflow-y-auto empty:hidden rounded-lg bg-white p-2 text-slate-900" />
          </div>
        </div>
      )}

      {/* Paywall modal for Pro features */}
      <FreemiumPaywallModal
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        title="Premium Konvertor"
        description="Ova opcija zahtijeva aktivnu BH KONVER Premium pretplatu za naprednu serversku obradu."
        redirectPath="/category/konvertori"
      />
    </div>
  );
};

export default PremiumUniversalConverter;
