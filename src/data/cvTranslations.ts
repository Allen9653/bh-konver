import { CvLanguage } from "@/types/cv";
import { latinToCyrillic } from "@/utils/scriptText";

export interface CvLabels {
  curriculumVitae: string;
  europassTagline: string;
  contactInfo: string;
  personalDetails: string;
  workExperience: string;
  educationAndTraining: string;
  skills: string;
  digitalSkills: string;
  languages: string;
  motherTongue: string;
  otherLanguages: string;
  certificates: string;
  drivingLicense: string;
  profile: string;
  present: string;
  phone: string;
  email: string;
  address: string;
  birthDate: string;
  nationality: string;
  website: string;
  linkedin: string;
  levelExpert: string;
  levelAdvanced: string;
  levelIntermediate: string;
  levelBeginner: string;
}

export const CV_TRANSLATIONS: Record<CvLanguage, CvLabels> = {
  bs: {
    curriculumVitae: "Curriculum Vitae",
    europassTagline: "Evropski standard formata životopisa (Europass)",
    contactInfo: "KONTAKT INFORMACIJE",
    personalDetails: "LIČNI PODACI",
    workExperience: "RADNO ISKUSTVO",
    educationAndTraining: "OBRAZOVANJE I OSPOSOBLJAVANJE",
    skills: "VJEŠTINE I KOMPETENCIJE",
    digitalSkills: "Digitalne i stručne vještine",
    languages: "POZNAVANJE JEZIKA",
    motherTongue: "Maternji jezik",
    otherLanguages: "Ostali jezici",
    certificates: "CERTIFIKATI I DIPLOME",
    drivingLicense: "VOZAČKA DOZVOLA",
    profile: "O MENI / PROFESIONALNI PROFIL",
    present: "Trenutno",
    phone: "Telefon",
    email: "E-mail",
    address: "Adresa",
    birthDate: "Datum rođenja",
    nationality: "Državljanstvo",
    website: "Web stranica",
    linkedin: "LinkedIn",
    levelExpert: "Ekspert",
    levelAdvanced: "Napredni",
    levelIntermediate: "Srednji",
    levelBeginner: "Početni",
  },
  "bs-Cyrl": {
    curriculumVitae: "Curriculum Vitae",
    europassTagline: "Европски стандард формата животописа (Europass)",
    contactInfo: "КОНТАКТ ИНФОРМАЦИЈЕ",
    personalDetails: "ЛИЧНИ ПОДАЦИ",
    workExperience: "РАДНО ИСКУСТВО",
    educationAndTraining: "ОБРАЗОВАЊЕ И ОСПОСОБЉАВАЊЕ",
    skills: "ВЈЕШТИНЕ И КОМПЕТЕНЦИЈЕ",
    digitalSkills: "Дигиталне и стручне вјештине",
    languages: "ПОЗНАВАЊЕ ЈЕЗИКА",
    motherTongue: "Матерњи језик",
    otherLanguages: "Остали језици",
    certificates: "СЕРТИФИКАТИ И ДИПЛОМЕ",
    drivingLicense: "ВОЗАЧКА ДОЗВОЛА",
    profile: "О МЕНИ / ПРОФЕСИОНАЛНИ ПРОФИЛ",
    present: "Тренутно",
    phone: "Телефон",
    email: "Е-маил",
    address: "Адреса",
    birthDate: "Датум рођења",
    nationality: "Држављанство",
    website: "Веб страница",
    linkedin: "LinkedIn",
    levelExpert: "Експерт",
    levelAdvanced: "Напредни",
    levelIntermediate: "Средњи",
    levelBeginner: "Почетни",
  },
  en: {
    curriculumVitae: "Curriculum Vitae",
    europassTagline: "European Standard CV Format (Europass)",
    contactInfo: "CONTACT INFORMATION",
    personalDetails: "PERSONAL DETAILS",
    workExperience: "WORK EXPERIENCE",
    educationAndTraining: "EDUCATION AND TRAINING",
    skills: "SKILLS & COMPETENCES",
    digitalSkills: "Digital & professional skills",
    languages: "LANGUAGE SKILLS",
    motherTongue: "Mother tongue",
    otherLanguages: "Other languages",
    certificates: "CERTIFICATES & LICENSES",
    drivingLicense: "DRIVING LICENCE",
    profile: "PROFILE / ABOUT ME",
    present: "Present",
    phone: "Phone",
    email: "Email",
    address: "Address",
    birthDate: "Date of birth",
    nationality: "Nationality",
    website: "Website",
    linkedin: "LinkedIn",
    levelExpert: "Expert",
    levelAdvanced: "Advanced",
    levelIntermediate: "Intermediate",
    levelBeginner: "Beginner",
  },
  de: {
    curriculumVitae: "Lebenslauf (Europass)",
    europassTagline: "Europäisches Standard-Format für Lebensläufe",
    contactInfo: "KONTAKTINFORMATIONEN",
    personalDetails: "PERSÖNLICHE ANGABEN",
    workExperience: "BERUFSERFAHRUNG",
    educationAndTraining: "SCHUL- UND BERUFSBILDUNG",
    skills: "FÄHIGKEITEN & KOMPETENZEN",
    digitalSkills: "Digitale & fachliche Kompetenzen",
    languages: "SPRACHKENNTNISSE",
    motherTongue: "Muttersprache",
    otherLanguages: "Weitere Sprachen",
    certificates: "ZERTIFIKATE & ABSCHLÜSSE",
    drivingLicense: "FÜHRERSCHEIN",
    profile: "ÜBER MICH / KURZPROFIL",
    present: "Heute",
    phone: "Telefon",
    email: "E-Mail",
    address: "Adresse",
    birthDate: "Geburtsdatum",
    nationality: "Staatsangehörigkeit",
    website: "Webseite",
    linkedin: "LinkedIn",
    levelExpert: "Experte",
    levelAdvanced: "Fortgeschritten",
    levelIntermediate: "Mittelstufe",
    levelBeginner: "Grundkenntnisse",
  },
  tr: {
    curriculumVitae: "Özgeçmiş (Europass)",
    europassTagline: "Avrupa Standart Özgeçmiş Formatı (Europass)",
    contactInfo: "İLETİŞİM BİLGİLERİ",
    personalDetails: "KİŞİSEL BİLGİLER",
    workExperience: "İŞ DENEYİMİ",
    educationAndTraining: "EĞİTİM VE ÖĞRETİM",
    skills: "BECERİLER VE YETKİNLİKLER",
    digitalSkills: "Dijital ve mesleki beceriler",
    languages: "DİL BECERİLERİ",
    motherTongue: "Ana dil",
    otherLanguages: "Diğer diller",
    certificates: "SERTİFİKALAR VE BELGELER",
    drivingLicense: "SÜRÜCÜ BELGESİ",
    profile: "HAKKIMDA / PROFİL",
    present: "Günümüz",
    phone: "Telefon",
    email: "E-posta",
    address: "Adres",
    birthDate: "Doğum tarihi",
    nationality: "Uyruk",
    website: "Web sitesi",
    linkedin: "LinkedIn",
    levelExpert: "Uzman",
    levelAdvanced: "İleri düzey",
    levelIntermediate: "Orta düzey",
    levelBeginner: "Temel düzey",
  },
};

/**
 * Format dynamic user text: if language is Cyrillic, transliterate from Latin
 */
export function formatCvText(text: string | undefined | null, lang: CvLanguage): string {
  if (!text) return "";
  if (lang === "bs-Cyrl") {
    return latinToCyrillic(text);
  }
  return text;
}
