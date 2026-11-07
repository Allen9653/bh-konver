import { useRef, useState, ChangeEvent, DragEvent } from "react";
import { PhotoShape } from "@/types/cv";
import { Camera, Trash2, Upload, Sparkles, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CvPhotoUploaderProps {
  photoUrl: string;
  photoShape: PhotoShape;
  onPhotoChange: (url: string) => void;
  onShapeChange: (shape: PhotoShape) => void;
}

export function CvPhotoUploader({
  photoUrl,
  photoShape,
  onPhotoChange,
  onShapeChange,
}: CvPhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Molimo odaberite validan format slike (JPG, PNG ili WEBP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Fotografija ne smije biti veća od 10 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onPhotoChange(result);
        toast.success("Fotografija je uspješno učitana u Vaš CV!");
      }
    };
    reader.onerror = () => {
      toast.error("Došlo je do greške pri čitanju datoteke fotografije.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // Reset file input so user can re-upload same file if desired
    e.target.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const shapes: Array<{ id: PhotoShape; label: string; sub: string }> = [
    { id: "passport", label: "Pasoš / CV", sub: "35x45 mm" },
    { id: "circle", label: "Krug", sub: "Europass" },
    { id: "rounded", label: "Zaobljeno", sub: "Moderan" },
    { id: "square", label: "Kvadrat", sub: "Klasični" },
  ];

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-sm space-y-4">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px]">3</span>
          <span>KORAK 3: FOTOGRAFIJA KANDIDATA</span>
        </div>
        <h3 className="text-base font-bold text-foreground mt-0.5">
          Profesionalna profilna slika za CV
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Učitajte Vašu sliku klikom ili prevlačenjem. Slika se trenutno integriše u dokument.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col sm:flex-row items-center gap-6 p-4 sm:p-5 rounded-xl border-2 border-dashed transition-all ${
          isDragging
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-border/80 bg-muted/20 hover:bg-muted/30"
        }`}
      >
        {/* Preview Frame */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative group shrink-0 cursor-pointer"
          title="Kliknite za odabir fotografije"
        >
          <div
            className={`overflow-hidden border-2 border-primary/40 bg-background shadow-md flex items-center justify-center transition-all group-hover:border-primary ${
              photoShape === "circle"
                ? "h-28 w-28 sm:h-32 sm:w-32 rounded-full"
                : photoShape === "passport"
                ? "w-24 sm:w-28 h-32 sm:h-36 rounded-lg aspect-[35/45]"
                : photoShape === "rounded"
                ? "h-28 w-28 sm:h-32 sm:w-32 rounded-2xl"
                : "h-28 w-28 sm:h-32 sm:w-32 rounded-none"
            }`}
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="CV Profil"
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground p-3 text-center">
                <Camera className="h-8 w-8 mb-1 text-primary/70 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-semibold text-foreground leading-tight">
                  Učitaj sliku
                </span>
                <span className="text-[9px] text-muted-foreground mt-0.5">
                  Klikni ili prevuci
                </span>
              </div>
            )}
          </div>

          {photoUrl && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPhotoChange("");
                toast.info("Fotografija je uklonjena iz CV-ja.");
              }}
              title="Ukloni fotografiju"
              className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Action Buttons & Shape selector */}
        <div className="flex-1 space-y-3 w-full">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2 font-semibold shadow-xs"
            >
              <Upload className="h-4 w-4" />
              {photoUrl ? "Promijeni fotografiju" : "Izaberi fotografiju s računara / mobitela"}
            </Button>

            {photoUrl && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  onPhotoChange("");
                  toast.info("Fotografija je uklonjena.");
                }}
                className="text-destructive hover:bg-destructive/10"
              >
                Ukloni
              </Button>
            )}
          </div>

          {/* Shape Selection */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-muted-foreground">
                Oblik i proporcije fotografije:
              </span>
              <span className="text-[10px] text-primary font-medium">
                Standard za pasoš / CV: 35×45 mm
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {shapes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onShapeChange(s.id)}
                  className={`px-2.5 py-2 text-xs rounded-lg border text-center transition-all flex flex-col items-center justify-center ${
                    photoShape === s.id
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-xs ring-1 ring-primary/40"
                      : "border-border/80 bg-background hover:bg-muted/50 text-foreground"
                  }`}
                >
                  <span className="leading-tight font-semibold">{s.label}</span>
                  <span className="text-[10px] opacity-75 font-normal">{s.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-0.5">
            <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>
              Fotografija se obrađuje 100% lokalno u Vašem pregledniku (maksimalna privatnost).
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
