import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { parseRawCvText } from "@/utils/cvParser";
import { CvData } from "@/types/cv";
import { Wand2, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface CvTextImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentData: CvData;
  onApplyParsedData: (data: Partial<CvData>) => void;
}

export function CvTextImportModal({
  open,
  onOpenChange,
  currentData,
  onApplyParsedData,
}: CvTextImportModalProps) {
  const [rawText, setRawText] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  const sampleCvText = `Mirza Hodžić
Senior Software Engineer
Email: mirza.hodzic@example.ba
Telefon: +387 61 234 567
Adresa: Sarajevo, Bosna i Hercegovina
Datum rođenja: 15.04.1993.
LinkedIn: linkedin.com/in/mirzahodzic

O MENI
Iskusni inženjer sa više od 7 godina radnog iskustva na web sistemima i cloud arhitekturi.

RADNO ISKUSTVO
03/2021 - Trenutno
Lead Full-Stack Developer - Tech Solutions d.o.o. Sarajevo
Vođenje inženjerskog tima, mikroservisi i moderni UI frontend sistemi.

09/2018 - 02/2021
Frontend Developer - Digital Innovations Tuzla
Razvoj korisničkih interfejsa u React i TypeScript okruženju.

OBRAZOVANJE
2015 - 2017
Magistar elektrotehnike i računarstva - Elektrotehnički fakultet Sarajevo

2011 - 2015
Bachelor elektrotehnike - Fakultet elektrotehnike Tuzla

VJEŠTINE
React, TypeScript, Node.js, Express, PostgreSQL, Tailwind CSS, Docker, Git

JEZICI
Bosanski (maternji), Engleski (C1), Njemački (B1)

VOZAČKA DOZVOLA
B kategorija`;

  const handleParseAndApply = () => {
    if (!rawText.trim()) {
      toast.error("Molimo unesite ili zalijepite tekst Vašeg CV-ja.");
      return;
    }

    setIsParsing(true);
    try {
      const parsed = parseRawCvText(rawText, currentData);
      onApplyParsedData(parsed);

      const itemsFound = [
        parsed.personal?.fullName && "Ime i prezime",
        parsed.personal?.email && "Email",
        parsed.personal?.phone && "Telefon",
        parsed.experiences && `${parsed.experiences.length} radna iskustva`,
        parsed.educations && `${parsed.educations.length} obrazovanja`,
        parsed.skills && `${parsed.skills.length} vještina`,
        parsed.languages && `${parsed.languages.length} jezika`,
      ].filter(Boolean);

      toast.success("Uspješno uvezeno i mapirano!", {
        description: `Prepoznato: ${itemsFound.join(", ")}`,
      });

      onOpenChange(false);
    } catch (e) {
      console.error("Greška pri parsiranju CV teksta:", e);
      toast.error("Došlo je do greške pri parsiranju teksta.");
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
            <Wand2 className="h-4 w-4" />
            <span>Automatski uvoz i mapiranje</span>
          </div>
          <DialogTitle className="text-xl font-bold">
            Zalijepite sirovi tekst Vašeg postojećeg CV-ja
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Sistem automatski prepoznaje lične podatke, radno iskustvo po datumima, fakultete, vještine i jezike te ih raspoređuje u odgovarajuće Europass tabove.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground">
              Tekst životopisa / biografije:
            </span>
            <button
              type="button"
              onClick={() => setRawText(sampleCvText)}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <FileText className="h-3.5 w-3.5" />
              Učitaj primjer teksta
            </button>
          </div>

          <Textarea
            rows={12}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Ovdje zalijepite tekst starog CV-ja (iz Worda, PDF-a ili bilješki)..."
            className="font-mono text-xs sm:text-sm leading-relaxed"
          />

          <div className="rounded-xl bg-muted/40 p-3 border border-border text-xs text-muted-foreground space-y-1">
            <span className="font-bold text-foreground block">
              💡 Savjet za najbolje rezultate mapiranja:
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-[11px]">
              <li>Naznačite sekcije: <strong>RADNO ISKUSTVO</strong>, <strong>OBRAZOVANJE</strong>, <strong>VJEŠTINE</strong>, <strong>JEZICI</strong>.</li>
              <li>Datume odvojite crticom, npr: <code>2020 - Trenutno</code> ili <code>05/2019 - 10/2022</code>.</li>
              <li>Nakon automatskog mapiranja, u tabovima uvijek možete ručno izmijeniti i dopuniti bilo koji podatak.</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            size="sm"
          >
            Odustani
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={handleParseAndApply}
            disabled={isParsing || !rawText.trim()}
            className="gap-2 font-bold"
            size="sm"
          >
            <CheckCircle2 className="h-4 w-4" />
            {isParsing ? "Mapiranje podataka..." : "Analiziraj i primijeni na obrazac"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
