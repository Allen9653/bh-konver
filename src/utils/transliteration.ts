/**
 * Bidirectional Latin <-> Cyrillic transliterator for Bosnian / Croatian / Serbian (BCS).
 * Accurately handles digraphs: dž/Dž/DŽ, lj/Lj/LJ, nj/Nj/NJ.
 */

// Digraph mappings (order matters: check digraphs first!)
const LATIN_TO_CYRILLIC_DIGRAPHS: [string, string][] = [
  ["DŽ", "Џ"],
  ["Dž", "Џ"],
  ["dž", "џ"],
  ["LJ", "Љ"],
  ["Lj", "Љ"],
  ["lj", "љ"],
  ["NJ", "Њ"],
  ["Nj", "Њ"],
  ["nj", "њ"],
];

const LATIN_TO_CYRILLIC_MAP: Record<string, string> = {
  A: "А", a: "а",
  B: "Б", b: "б",
  V: "В", v: "в",
  G: "Г", g: "г",
  D: "Д", d: "д",
  Đ: "Ђ", đ: "ђ",
  E: "Е", e: "е",
  Ž: "Ж", ž: "ж",
  Z: "З", z: "з",
  I: "И", i: "и",
  J: "Ј", j: "ј",
  K: "К", k: "к",
  L: "Л", l: "л",
  M: "М", m: "м",
  N: "Н", n: "н",
  O: "О", o: "о",
  P: "П", p: "п",
  R: "Р", r: "р",
  S: "С", s: "с",
  T: "Т", t: "т",
  Ć: "Ћ", ć: "ћ",
  U: "У", u: "у",
  F: "Ф", f: "ф",
  H: "Х", h: "х",
  C: "Ц", c: "ц",
  Č: "Ч", č: "ч",
  Š: "Ш", š: "ш",
};

const CYRILLIC_TO_LATIN_MAP: Record<string, string> = {
  А: "A", а: "a",
  Б: "B", б: "b",
  В: "V", в: "v",
  Г: "G", г: "g",
  Д: "D", д: "d",
  Ђ: "Đ", ђ: "đ",
  Е: "E", е: "e",
  Ж: "Ž", ж: "ž",
  З: "Z", з: "z",
  И: "I", и: "i",
  Ј: "J", j: "j",
  К: "K", к: "k",
  Л: "L", л: "l",
  Љ: "Lj", љ: "lj",
  М: "M", м: "m",
  Н: "N", н: "n",
  Њ: "Nj", њ: "nj",
  О: "O", о: "o",
  П: "P", п: "p",
  Р: "R", р: "r",
  С: "S", с: "s",
  Т: "T", т: "t",
  Ћ: "Ć", ћ: "ć",
  У: "U", у: "u",
  Ф: "F", ф: "f",
  Х: "H", х: "h",
  Ц: "C", ц: "c",
  Ч: "Č", ч: "č",
  Џ: "Dž", џ: "dž",
  Ш: "Š", ш: "š",
};

/**
 * Transliterates Latin BCS text to Cyrillic.
 */
export function latinToCyrillic(text: string): string {
  let result = text;
  for (const [latinDigraph, cyrillicChar] of LATIN_TO_CYRILLIC_DIGRAPHS) {
    result = result.split(latinDigraph).join(cyrillicChar);
  }
  let out = "";
  for (let i = 0; i < result.length; i++) {
    const ch = result[i];
    out += LATIN_TO_CYRILLIC_MAP[ch] ?? ch;
  }
  return out;
}

/**
 * Transliterates Cyrillic BCS text to Latin.
 */
export function cyrillicToLatin(text: string): string {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    out += CYRILLIC_TO_LATIN_MAP[ch] ?? ch;
  }
  return out;
}

/**
 * Normalizes text for typo-tolerant or accent-tolerant comparison if needed,
 * while trimming whitespace.
 */
export function normalizeScriptText(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

/**
 * Detects if a text contains Cyrillic characters.
 */
export function isCyrillic(text: string): boolean {
  return /[\u0400-\u04FF]/.test(text);
}
