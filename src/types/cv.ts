export type CvLanguage = "bs" | "bs-Cyrl" | "en" | "de" | "tr";

export type PhotoShape = "circle" | "rounded" | "square";
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type LanguageLevel = "native" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  city: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  city: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevel;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: LanguageLevel;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
}

export interface CvData {
  language: CvLanguage;
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string; // npr. "Sarajevo, Bosna i Hercegovina"
    birthDate: string;
    nationality: string;
    website: string;
    linkedin: string;
    summary: string;
    photoUrl: string;
    photoShape: PhotoShape;
  };
  experiences: WorkExperience[];
  educations: Education[];
  skills: SkillItem[];
  languages: LanguageItem[];
  certificates: CertificateItem[];
  drivingLicense: string; // npr. "B, B1"
}

export const INITIAL_CV_DATA: CvData = {
  language: "bs",
  personal: {
    fullName: "Mirza Hodžić",
    jobTitle: "Senior Software Engineer & Project Lead",
    email: "mirza.hodzic@example.ba",
    phone: "+387 61 234 567",
    address: "Sarajevo, Bosna i Hercegovina",
    birthDate: "15.04.1993.",
    nationality: "Državljanstvo BiH",
    website: "https://mirza-dev.ba",
    linkedin: "linkedin.com/in/mirzahodzic",
    summary: "Iskusni softverski inženjer sa više od 7 godina rada na razvoju web aplikacija, skalabilnih cloud sistema i vođenju tehničkih timova. Posvećen modernim standardima, čistom kodu i agilnim procesima.",
    photoUrl: "",
    photoShape: "rounded",
  },
  experiences: [
    {
      id: "exp-1",
      position: "Lead Full-Stack Developer",
      company: "Tech Solutions d.o.o.",
      city: "Sarajevo",
      startDate: "03/2021",
      endDate: "Trenutno",
      isCurrent: true,
      description: "Vođenje tima od 6 inženjera na razvoju SaaS platforme. Arhitektura mikroservisa, integracija platnih sistema i optimizacija performansi aplikacije.",
    },
    {
      id: "exp-2",
      position: "Frontend Developer",
      company: "Digital Innovations",
      city: "Tuzla",
      startDate: "09/2018",
      endDate: "02/2021",
      isCurrent: false,
      description: "Razvoj korisničkih interfejsa u React i TypeScript okruženju, implementacija dizajnerskih sistema i saradnja sa UX dizajnerima.",
    },
  ],
  educations: [
    {
      id: "edu-1",
      degree: "Magistar elektrotehnike i računarstva",
      institution: "Univerzitet u Sarajevu - Elektrotehnički fakultet",
      city: "Sarajevo",
      startDate: "2015",
      endDate: "2017",
      description: "Smjer: Računarstvo i informatika. Fokus na distribuirane baze podataka i algoritme.",
    },
    {
      id: "edu-2",
      degree: "Bakalaureat / Bachelor elektrotehnike",
      institution: "Univerzitet u Tuzli - Fakultet elektrotehnike",
      city: "Tuzla",
      startDate: "2011",
      endDate: "2015",
      description: "Softverski inženjering i programiranje.",
    },
  ],
  skills: [
    { id: "sk-1", name: "React / Next.js / TypeScript", level: "expert" },
    { id: "sk-2", name: "Node.js & Express REST API", level: "advanced" },
    { id: "sk-3", name: "PostgreSQL & Supabase", level: "advanced" },
    { id: "sk-4", name: "Tailwind CSS & UI/UX Design", level: "expert" },
    { id: "sk-5", name: "Git, CI/CD & Docker", level: "intermediate" },
  ],
  languages: [
    { id: "lang-1", language: "Bosanski / Hrvatski / Srpski", level: "native" },
    { id: "lang-2", language: "Engleski", level: "C1" },
    { id: "lang-3", language: "Njemački", level: "B1" },
  ],
  certificates: [
    { id: "cert-1", title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
    { id: "cert-2", title: "Scrum Master Professional (PSM I)", issuer: "Scrum.org", year: "2022" },
  ],
  drivingLicense: "B kategorija",
};
