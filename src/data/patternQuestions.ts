export interface PatternPuzzle {
  id: string;
  type: "number" | "letter" | "shape" | "matrix";
  prompt: {
    bs: string;
    "bs-Cyrl": string;
    en: string;
    de: string;
    tr: string;
  };
  sequenceDisplay: string[]; // text or SVG token representation
  options: {
    id: string;
    label: string;
  }[];
  correctOptionId: string;
  explanation: {
    bs: string;
    "bs-Cyrl": string;
    en: string;
    de: string;
    tr: string;
  };
}

export const PATTERN_QUESTIONS: PatternPuzzle[] = [
  {
    id: "pat-1",
    type: "number",
    prompt: {
      bs: "Koji broj nastavlja niz?",
      "bs-Cyrl": "Који број наставља низ?",
      en: "Which number continues the sequence?",
      de: "Welche Zahl setzt die Reihe fort?",
      tr: "Diziyi hangi sayı devam ettirir?",
    },
    sequenceDisplay: ["2", "6", "12", "20", "30", "?"],
    options: [
      { id: "opt-1", label: "42" },
      { id: "opt-2", label: "40" },
      { id: "opt-3", label: "38" },
      { id: "opt-4", label: "44" },
    ],
    correctOptionId: "opt-1",
    explanation: {
      bs: "Razlika među brojevima se povećava za 2: +4, +6, +8, +10, pa sljedbenik dobija +12 (30 + 12 = 42). Alternativno: n × (n + 1).",
      "bs-Cyrl": "Разлика међу бројевима се повећава за 2: +4, +6, +8, +10, па сљедбеник добија +12 (30 + 12 = 42). Алтернативно: n × (n + 1).",
      en: "The step difference increases by 2: +4, +6, +8, +10, next is +12 (30 + 12 = 42). Alternatively: n × (n + 1).",
      de: "Die Schrittdifferenz wächst um 2: +4, +6, +8, +10, nächste ist +12 (30 + 12 = 42).",
      tr: "Farklar 2'şer artmaktadır: +4, +6, +8, +10; sıradaki +12'dir (30 + 12 = 42).",
    },
  },
  {
    id: "pat-2",
    type: "shape",
    prompt: {
      bs: "Posmatrajte rotaciju strelice. Koji položaj slijedi?",
      "bs-Cyrl": "Посматрајте ротацију стрелице. Који положај слиједи?",
      en: "Observe the rotation of the arrow. Which position comes next?",
      de: "Beachten Sie die Drehung des Pfeils. Welche Position folgt?",
      tr: "Okun dönüşünü gözlemleyin. Hangi yön sırada?",
    },
    sequenceDisplay: ["↑", "↗", "→", "↘", "?"],
    options: [
      { id: "opt-1", label: "↓" },
      { id: "opt-2", label: "↙" },
      { id: "opt-3", label: "←" },
      { id: "opt-4", label: "↖" },
    ],
    correctOptionId: "opt-1",
    explanation: {
      bs: "Strelica se rotira u smjeru kazaljke na satu za tačno 45 stepeni u svakom koraku. Nakon ↘ slijedi vertikalno prema dolje (↓).",
      "bs-Cyrl": "Стрелица се ротира у смјеру казаљке на сату за тачно 45 степени у сваком кораку. Након ↘ слиједи вертикално према доље (↓).",
      en: "The arrow rotates clockwise by 45 degrees at each step. After ↘ comes straight down (↓).",
      de: "Der Pfeil dreht sich im Uhrzeigersinn um jeweils 45 Grad. Nach ↘ folgt direkt nach unten (↓).",
      tr: "Ok saat yönünde her adımda 45 derece dönmektedir. ↘ sonrasında tam aşağı (↓) gelir.",
    },
  },
  {
    id: "pat-3",
    type: "letter",
    prompt: {
      bs: "Koji par slova logički dopunjava niz?",
      "bs-Cyrl": "Који пар слова логички допуњава низ?",
      en: "Which pair of letters logically completes the pattern?",
      de: "Welches Buchstabenpaar ergänzt das Muster?",
      tr: "Hangi harf çifti deseni tamamlar?",
    },
    sequenceDisplay: ["AZ", "BY", "CX", "DW", "?"],
    options: [
      { id: "opt-1", label: "EV" },
      { id: "opt-2", label: "EU" },
      { id: "opt-3", label: "FU" },
      { id: "opt-4", label: "FV" },
    ],
    correctOptionId: "opt-1",
    explanation: {
      bs: "Prvo slovo se kreće naprijed kroz abecedu (A, B, C, D -> E), a drugo se kreće unazad s kraja (Z, Y, X, W -> V). Rezultat je EV.",
      "bs-Cyrl": "Прво слово се креће напријед кроз абецеду (A, B, C, D -> E), а друго се креће уназад с краја (Z, Y, X, W -> V). Резултат је EV.",
      en: "The first letter advances (A, B, C, D -> E) while the second reverses from Z (Z, Y, X, W -> V). The result is EV.",
      de: "Der erste Buchstabe geht vorwärts (A, B, C, D -> E), der zweite rückwärts von Z (Z, Y, X, W -> V).",
      tr: "İlk harf alfabede ileri (A, B, C, D -> E), ikinci harf sondan geri gider (Z, Y, X, W -> V).",
    },
  },
  {
    id: "pat-4",
    type: "number",
    prompt: {
      bs: "Otkrijte pravilo i odredite broj na mjestu upitnika:",
      "bs-Cyrl": "Откријте правило и одредите број на мјесту упитника:",
      en: "Find the hidden rule and determine the number at the question mark:",
      de: "Finden Sie die Regel und bestimmen Sie die gesuchte Zahl:",
      tr: "Kuralı bulun ve soru işaretli sayıyı belirleyin:",
    },
    sequenceDisplay: ["3", "5", "9", "17", "33", "?"],
    options: [
      { id: "opt-1", label: "65" },
      { id: "opt-2", label: "66" },
      { id: "opt-3", label: "64" },
      { id: "opt-4", label: "49" },
    ],
    correctOptionId: "opt-1",
    explanation: {
      bs: "Svaki naredni broj se dobija množenjem prethodnog sa 2 i oduzimanjem 1: (3×2)-1=5, (5×2)-1=9, (9×2)-1=17, (17×2)-1=33, (33×2)-1 = 65.",
      "bs-Cyrl": "Сваки наредни број се добија множењем претходног са 2 и одузимањем 1: (3×2)-1=5, (5×2)-1=9, (9×2)-1=17, (17×2)-1=33, (33×2)-1 = 65.",
      en: "Each term is generated by (previous × 2) - 1: (33 × 2) - 1 = 65.",
      de: "Jede Zahl entsteht durch (vorherige × 2) - 1: (33 × 2) - 1 = 65.",
      tr: "Her terim (önceki × 2) - 1 şeklinde oluşur: (33 × 2) - 1 = 65.",
    },
  },
  {
    id: "pat-5",
    type: "shape",
    prompt: {
      bs: "Koji geometrijski element logično zaokružuje niz prema broju stranica?",
      "bs-Cyrl": "Који геометријски елемент логично заокружује низ према броју страница?",
      en: "Which shape logically follows the geometric vertex progression?",
      de: "Welche Form setzt die Eckenzahl logisch fort?",
      tr: "Köşe sayısına göre hangi geometrik şekil sıradadır?",
    },
    sequenceDisplay: ["Trokut (3)", "Kvadrat (4)", "Pentagon (5)", "Heksagon (6)", "?"],
    options: [
      { id: "opt-1", label: "Heptagon (7)" },
      { id: "opt-2", label: "Oktagon (8)" },
      { id: "opt-3", label: "Krug (0)" },
      { id: "opt-4", label: "Romb (4)" },
    ],
    correctOptionId: "opt-1",
    explanation: {
      bs: "Broj uglova i stranica se linearno povećava za 1: 3, 4, 5, 6, pa je sljedeći sedmougao / heptagon (7).",
      "bs-Cyrl": "Број углова и страница се линеарно повећава за 1: 3, 4, 5, 6, па је сљедећи седмоугао / хептагон (7).",
      en: "The vertex/side count increases linearly: 3, 4, 5, 6, so 7 (Heptagon) comes next.",
      de: "Die Anzahl der Ecken steigt um 1: 3, 4, 5, 6, es folgt das Heptagon mit 7 Ecken.",
      tr: "Köşe sayısı birer birer artmaktadır: 3, 4, 5, 6; sırada 7 kenarlı heptagon vardır.",
    },
  },
  {
    id: "pat-6",
    type: "matrix",
    prompt: {
      bs: "Matrica 3x3: Sabiranje vrijednosti u redovima daje konstantan zbir 15. Koji broj nedostaje u polju sa upitnikom?",
      "bs-Cyrl": "Матрица 3x3: Сабирање вриједности у редовима даје константан збир 15. Који број недостаје у пољу са упитником?",
      en: "3x3 Matrix: Row sums are constantly 15. Which number replaces the question mark?",
      de: "3x3-Matrix: Jede Zeilensumme ist 15. Welche Zahl gehört an die Stelle des Fragezeichens?",
      tr: "3x3 Matris: Satır toplamları sabit 15'tir. Soru işaretinin yerine hangi sayı gelmelidir?",
    },
    sequenceDisplay: ["[8, 1, 6]", "[3, 5, 7]", "[4, ?, 2]"],
    options: [
      { id: "opt-1", label: "9" },
      { id: "opt-2", label: "8" },
      { id: "opt-3", label: "6" },
      { id: "opt-4", label: "5" },
    ],
    correctOptionId: "opt-1",
    explanation: {
      bs: "U trećem redu je 4 + ? + 2 = 15. Zato je ? = 15 - (4 + 2) = 9. Ovo je ujedno i klasični magični kvadrat reda 3.",
      "bs-Cyrl": "У трећем реду је 4 + ? + 2 = 15. Зато је ? = 15 - (4 + 2) = 9. Ово је уједно и класични магични квадрат реда 3.",
      en: "In the 3rd row, 4 + ? + 2 = 15, so ? = 15 - 6 = 9. This corresponds to the Lo Shu magic square.",
      de: "In der dritten Zeile gilt 4 + ? + 2 = 15, also 15 - 6 = 9.",
      tr: "3. satırda 4 + ? + 2 = 15 olduğundan ? = 9'dur (Lo Shu sihirli karesi).",
    },
  },
  {
    id: "pat-7",
    type: "number",
    prompt: {
      bs: "Fibonacci-jev derivat: zbir prethodna dva broja daje sljedeći. Koji broj nedostaje?",
      "bs-Cyrl": "Фибоначијев дериват: збир претходна два броја даје сљедећи. Који број недостаје?",
      en: "Fibonacci pattern: sum of previous two terms generates the next. What is the missing number?",
      de: "Fibonacci-Muster: Summe der zwei Vorherigen ergibt die nächste Zahl. Welche Zahl fehlt?",
      tr: "Fibonacci kuralı: önceki iki sayının toplamı sıradakini verir. Eksik sayı hangisidir?",
    },
    sequenceDisplay: ["1", "1", "2", "3", "5", "8", "13", "?"],
    options: [
      { id: "opt-1", label: "21" },
      { id: "opt-2", label: "19" },
      { id: "opt-3", label: "24" },
      { id: "opt-4", label: "20" },
    ],
    correctOptionId: "opt-1",
    explanation: {
      bs: "8 + 13 = 21. Klasični Fibonaccijev niz.",
      "bs-Cyrl": "8 + 13 = 21. Класични Фибоначијев низ.",
      en: "8 + 13 = 21. The classic Fibonacci sequence.",
      de: "8 + 13 = 21. Die klassische Fibonacci-Folge.",
      tr: "8 + 13 = 21. Klasik Fibonacci dizisi.",
    },
  },
  {
    id: "pat-8",
    type: "letter",
    prompt: {
      bs: "Preskakanje slova: B, D, G, K, P, ? Koji je sljedeći član?",
      "bs-Cyrl": "Прескакање слова: B, D, G, K, P, ? Који је сљедећи члан?",
      en: "Expanding letter skips: B, D, G, K, P, ? What is the next letter?",
      de: "Wachsende Buchstabensprünge: B, D, G, K, P, ? Welcher Buchstabe folgt?",
      tr: "Genişleyen harf atlama: B, D, G, K, P, ? Sıradaki harf nedir?",
    },
    sequenceDisplay: ["B (+1)", "D (+2)", "G (+3)", "K (+4)", "P (+5)", "?"],
    options: [
      { id: "opt-1", label: "V" },
      { id: "opt-2", label: "U" },
      { id: "opt-3", label: "W" },
      { id: "opt-4", label: "T" },
    ],
    correctOptionId: "opt-1",
    explanation: {
      bs: "Broj preskočenih slova abecede raste: B(+1 preskok C)=D, D(+2 E,F)=G, G(+3 H,I,J)=K, K(+4 L,M,N,O)=P, P(+5 Q,R,S,T,U) = V.",
      "bs-Cyrl": "Број прескочених слова абецеде расте: B(+1)=D, D(+2)=G, G(+3)=K, K(+4)=P, P(+5 preskoka) = V.",
      en: "The skip count increases by 1 each time (+1, +2, +3, +4, +5 letters skipped), leading to V.",
      de: "Die Anzahl übersprungener Buchstaben steigt schrittweise um 1, folglich ist V die Lösung.",
      tr: "Atlanan harf sayısı birer artmaktadır (+1, +2, +3, +4, +5 harf atlama), sonuç V harfidir.",
    },
  },
];
