import { useRef, ChangeEvent } from "react";
import { PhotoShape } from "@/types/cv";
import { Camera, Trash2, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Molimo odaberite sliku (JPG, PNG ili WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Fotografija ne smije biti veća od 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onPhotoChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const shapes: Array<{ id: PhotoShape; label: string }> = [
    { id: "circle", label: "Krug (Europass standard)" },
    { id: "rounded", label: "Zaobljeni kvadrat" },
    { id: "square", label: "Kvadrat" },
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
          Standardizovani Europass format preporučuje portret sa svijetlom neutralnom pozadinom.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-dashed border-border/80 bg-muted/20">
        {/* Preview Frame */}
        <div className="relative group shrink-0">
          <div
            className={`h-28 w-28 sm:h-32 sm:w-32 overflow-hidden border-2 border-primary/40 bg-muted/60 shadow-md flex items-center justify-center transition-all ${
              photoShape === "circle"
                ? "rounded-full"
                : photoShape === "rounded"
                ? "rounded-2xl"
                : "rounded-none"
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
                <Camera className="h-8 w-8 mb-1 opacity-60" />
                <span className="text-[11px] font-medium leading-tight">Nema slike</span>
              </div>
            )}
          </div>

          {photoUrl && (
            <button
              type="button"
              onClick={() => onPhotoChange("")}
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
              className="gap-2 font-semibold"
            >
              <Upload className="h-4 w-4" />
              {photoUrl ? "Promijeni fotografiju" : "Učitaj fotografiju (JPG / PNG)"}
            </Button>

            {photoUrl && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onPhotoChange("")}
                className="text-destructive hover:bg-destructive/10"
              >
                Ukloni
              </Button>
            )}
          </div>

          {/* Shape Selection */}
          <div>
            <span className="text-xs font-semibold text-muted-foreground block mb-1.5">
              Oblik okvira fotografije:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {shapes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onShapeChange(s.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border text-center transition-all ${
                    photoShape === s.id
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                      : "border-border/80 bg-background hover:bg-muted/50 text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-primary" />
            Fotografija se obrađuje 100% lokalno u vašem browseru i ne šalje se na server.
          </p>
        </div>
      </div>
    </div>
  );
}
