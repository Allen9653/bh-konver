import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface GeneratePdfOptions {
  elementId: string;
  fileName?: string;
  onProgress?: (progress: number, statusText: string) => void;
}

/**
 * High-resolution A4 PDF generator using html2canvas & jsPDF.
 * Preserves full UTF-8 diacritics (č, ć, š, đ, ž) and Cyrillic glyphs.
 */
export async function generateCvPdf({
  elementId,
  fileName = "Europass_CV.pdf",
  onProgress,
}: GeneratePdfOptions): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element #${elementId} nije pronađen.`);
  }

  onProgress?.(10, "Priprema dokumenta za štampu...");

  // Save current scroll position
  const originalScrollTop = window.scrollY;

  try {
    onProgress?.(30, "Renderovanje elemenata visoke rezolucije...");

    // Create high-DPI canvas
    const canvas = await html2canvas(element, {
      scale: 2.2, // ~210 DPI for crisp text and graphics
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (clonedDoc) => {
        const clonedEl = clonedDoc.getElementById(elementId);
        if (clonedEl) {
          clonedEl.style.transform = "none";
          clonedEl.style.boxShadow = "none";
          clonedEl.style.margin = "0";
          clonedEl.style.width = "794px"; // Standard A4 width at 96 DPI
          clonedEl.style.minHeight = "1123px"; // Standard A4 height at 96 DPI
        }
      },
    });

    onProgress?.(70, "Generisanje PDF stranica (A4 standard)...");

    const imgData = canvas.toDataURL("image/jpeg", 0.96);

    // Standard A4 dimensions in mm
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pageHeight;

    // Subsequent pages if CV exceeds single A4 page
    while (heightLeft > 5) { // small tolerance
      position = -(imgHeight - heightLeft);
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pageHeight;
    }

    onProgress?.(95, "Preuzimanje fajla...");

    // Sanitize file name
    const cleanFileName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    pdf.save(cleanFileName);

    onProgress?.(100, "Uspješno generisano!");
    return true;
  } catch (error) {
    console.error("Greška pri generisanju CV PDF dokumenta:", error);
    throw error;
  } finally {
    window.scrollTo(0, originalScrollTop);
  }
}

/**
 * Native browser print fallback for 100% vector typography
 */
export function printCvDocument(): void {
  window.print();
}
