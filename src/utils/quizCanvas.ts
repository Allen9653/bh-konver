/**
 * Client-side Canvas rendering utilities for social share infographics and the Flag King 2027 certificate.
 * No external CDNs or AI APIs are used.
 * Branding: dark navy #0A1628, teal #00C9A7, gold #C9A84C.
 */

export interface ShareInfographicOptions {
  quizTitle: string;
  scoreText: string;
  accuracyOrWpm?: string;
  nickname?: string;
  rank?: number | null;
  dateStr?: string;
}

export interface FlagKingCertificateOptions {
  nickname: string;
  dateStr?: string;
  totalCorrect?: number;
}

/**
 * Generates formatted copy-paste social share text.
 */
export function generateShareText(quizSlug: string, quizTitle: string, scoreText: string): string {
  const url = `https://www.bh-konver.com/testovi/${quizSlug}`;
  return `Osvojio sam ${scoreText} na BH KONVER testu: ${quizTitle}! Možeš li me pobijediti? ${url}`;
}

/**
 * Triggers native Web Share API if supported, or falls back to clipboard.
 */
export async function shareQuizResult(
  shareText: string,
  title: string,
  url: string
): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: `BH KONVER - ${title}`,
        text: shareText,
        url,
      });
      return "shared";
    } catch (err: any) {
      if (err.name === "AbortError") return "failed";
      // fall through to clipboard
    }
  }

  try {
    await navigator.clipboard.writeText(shareText);
    return "copied";
  } catch {
    return "failed";
  }
}

/**
 * Generates a 1080x1080 PNG micro-infographic on an offscreen HTML5 canvas.
 */
export async function generateQuizInfographic(
  options: ShareInfographicOptions
): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not initialize 2D canvas context");

  // Background - Dark Navy
  ctx.fillStyle = "#0A1628";
  ctx.fillRect(0, 0, 1080, 1080);

  // Gradient accents
  const bgGlow = ctx.createRadialGradient(540, 480, 50, 540, 540, 600);
  bgGlow.addColorStop(0, "rgba(0, 201, 167, 0.15)"); // Teal
  bgGlow.addColorStop(0.6, "rgba(201, 168, 76, 0.08)"); // Gold
  bgGlow.addColorStop(1, "rgba(10, 22, 40, 0)");
  ctx.fillStyle = bgGlow;
  ctx.fillRect(0, 0, 1080, 1080);

  // Double gold decorative border
  ctx.strokeStyle = "#C9A84C";
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1000, 1000);

  ctx.strokeStyle = "rgba(201, 168, 76, 0.35)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(55, 55, 970, 970);

  // Corner ornaments
  drawCornerDiamond(ctx, 40, 40, 12, "#C9A84C");
  drawCornerDiamond(ctx, 1040, 40, 12, "#C9A84C");
  drawCornerDiamond(ctx, 40, 1040, 12, "#C9A84C");
  drawCornerDiamond(ctx, 1040, 1040, 12, "#C9A84C");

  // Header Brand Tag
  ctx.textAlign = "center";
  ctx.fillStyle = "#00C9A7";
  ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("BH KONVER · DIGITALNI TESTOVI", 540, 140);

  // Quiz Name
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(options.quizTitle, 540, 230);

  // Horizontal divider with gold star
  ctx.strokeStyle = "rgba(201, 168, 76, 0.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(240, 280);
  ctx.lineTo(840, 280);
  ctx.stroke();

  ctx.fillStyle = "#C9A84C";
  ctx.font = "26px serif";
  ctx.fillText("✦", 540, 288);

  // Score Badge Circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(540, 520, 190, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(10, 30, 56, 0.85)";
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#00C9A7";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(540, 520, 175, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(201, 168, 76, 0.6)";
  ctx.stroke();
  ctx.restore();

  // Score Label
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("OSTVARENI REZULTAT", 540, 440);

  // Score Value
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 96px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(options.scoreText, 540, 555);

  // Secondary stat (accuracy or wpm or streak)
  if (options.accuracyOrWpm) {
    ctx.fillStyle = "#00C9A7";
    ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(options.accuracyOrWpm, 540, 620);
  }

  // Nickname & Rank Bar
  if (options.nickname || options.rank) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.fillRect(200, 760, 680, 80);
    ctx.strokeStyle = "rgba(201, 168, 76, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(200, 760, 680, 80);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "600 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    const nickText = options.nickname ? `Korisnik: ${options.nickname}` : "Takmičar";
    const rankText = options.rank ? ` · Rang #${options.rank}` : "";
    ctx.fillText(`${nickText}${rankText}`, 540, 812);
  }

  // Footer URL & verification
  ctx.fillStyle = "#C9A84C";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("www.bh-konver.com/testovi", 540, 920);

  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const dateStr = options.dateStr || new Date().toLocaleDateString("bs-BA");
  ctx.fillText(`Verifikovano · Datum: ${dateStr}`, 540, 960);

  return canvas.toDataURL("image/png");
}

/**
 * Generates the official "FLAG KING 2027" Certificate (1200x800) on HTML5 canvas.
 */
export async function generateFlagKingCertificate(
  options: FlagKingCertificateOptions
): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not initialize 2D canvas context");

  // Premium Dark Navy Background
  ctx.fillStyle = "#0A1628";
  ctx.fillRect(0, 0, 1200, 800);

  // Royal glow
  const certGlow = ctx.createRadialGradient(600, 400, 60, 600, 400, 650);
  certGlow.addColorStop(0, "rgba(201, 168, 76, 0.18)"); // Gold
  certGlow.addColorStop(0.5, "rgba(0, 201, 167, 0.08)"); // Teal
  certGlow.addColorStop(1, "rgba(10, 22, 40, 0)");
  ctx.fillStyle = certGlow;
  ctx.fillRect(0, 0, 1200, 800);

  // Outer gold borders
  ctx.strokeStyle = "#C9A84C";
  ctx.lineWidth = 5;
  ctx.strokeRect(40, 40, 1120, 720);

  ctx.strokeStyle = "rgba(201, 168, 76, 0.4)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(55, 55, 1090, 690);

  // Ornamental corner diamonds
  drawCornerDiamond(ctx, 40, 40, 14, "#C9A84C");
  drawCornerDiamond(ctx, 1160, 40, 14, "#C9A84C");
  drawCornerDiamond(ctx, 40, 760, 14, "#C9A84C");
  drawCornerDiamond(ctx, 1160, 760, 14, "#C9A84C");

  // Top header seal
  ctx.textAlign = "center";
  ctx.fillStyle = "#00C9A7";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillText("BH KONVER · ZVANIČNO PRIZNANJE", 600, 120);

  // Main Crown & Title
  ctx.fillStyle = "#C9A84C";
  ctx.font = "bold 56px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("👑 FLAG KING 2027 👑", 600, 200);

  // Subtitle
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.font = "italic 24px Georgia, serif";
  ctx.fillText("Certifikat o izuzetnom poznavanju zastava i država svijeta", 600, 250);

  // Thin ornamental divider
  ctx.strokeStyle = "rgba(201, 168, 76, 0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(300, 280);
  ctx.lineTo(900, 280);
  ctx.stroke();

  // "Dodjeljuje se"
  ctx.fillStyle = "#94A3B8";
  ctx.font = "20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Ovo počasno priznanje se ponosno dodjeljuje:", 600, 335);

  // User Nickname in large gold
  ctx.fillStyle = "#C9A84C";
  ctx.font = "900 54px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(options.nickname || "Vrhunski Poznavalac", 600, 410);

  // Body text
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const correctCount = options.totalCorrect || 50;
  ctx.fillText(
    `Za uspješno osvojenih preko ${correctCount} tačnih odgovora na testu nacionalnih zastava`,
    600,
    470
  );
  ctx.fillText(
    "i demonstriranu enciklopedijsku brzinu prepoznavanja svjetske geografije.",
    600,
    505
  );

  // Seal & Stamp
  ctx.save();
  ctx.beginPath();
  ctx.arc(600, 600, 48, 0, Math.PI * 2);
  ctx.strokeStyle = "#C9A84C";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "rgba(201, 168, 76, 0.12)";
  ctx.fill();

  ctx.fillStyle = "#00C9A7";
  ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("VERIFIED", 600, 595);
  ctx.fillStyle = "#C9A84C";
  ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("2027", 600, 615);
  ctx.restore();

  // Footer: Left date, Right Verification URL
  ctx.textAlign = "left";
  ctx.fillStyle = "#94A3B8";
  ctx.font = "18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const dateStr = options.dateStr || new Date().toLocaleDateString("bs-BA");
  ctx.fillText(`Datum izdavanja: ${dateStr}`, 100, 710);

  ctx.textAlign = "right";
  ctx.fillStyle = "#C9A84C";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("www.bh-konver.com", 1100, 710);

  return canvas.toDataURL("image/png");
}

function drawCornerDiamond(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x - size, y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Downloads a data URL as a file in the browser.
 */
export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
