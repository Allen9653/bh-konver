import { CvData, WorkExperience, Education, SkillItem, LanguageItem } from "@/types/cv";

/**
 * Intelligent parser that extracts structured CV data from raw pasted text.
 */
export function parseRawCvText(text: string, currentData: CvData): Partial<CvData> {
  const result: Partial<CvData> = {};
  const personal = { ...currentData.personal };

  if (!text || text.trim().length === 0) {
    return result;
  }

  // 1. Extract Email
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  const emailMatch = text.match(emailRegex);
  if (emailMatch && emailMatch[1]) {
    personal.email = emailMatch[1].trim();
  }

  // 2. Extract Phone
  const phoneRegex = /(?:tel(?:efon)?|mob(?:itel)?|phone)?[:\s]*(\+?[\d\s().-]{7,22}\d)/i;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch && phoneMatch[1]) {
    personal.phone = phoneMatch[1].trim();
  }

  // 3. Extract LinkedIn & Website
  const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9-_]+)/i;
  const linkedinMatch = text.match(linkedinRegex);
  if (linkedinMatch) {
    personal.linkedin = `linkedin.com/in/${linkedinMatch[1]}`;
  }

  const websiteRegex = /(https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/i;
  const websiteMatch = text.match(websiteRegex);
  if (websiteMatch && !websiteMatch[1].includes("linkedin.com")) {
    personal.website = websiteMatch[1].trim();
  }

  // 4. Extract Date of Birth
  const birthRegex = /(?:datum rođenja|geboren|date of birth|doğum tarihi|rođen[a]?)[:\s]*(\d{1,2}[./-]\d{1,2}[./-]\d{2,4})/i;
  const birthMatch = text.match(birthRegex);
  if (birthMatch && birthMatch[1]) {
    personal.birthDate = birthMatch[1].trim();
  }

  // 5. Extract Full Name (from first few lines or explicit label)
  const nameLabelRegex = /(?:ime i prezime|full name|name|ad soyad|vor- und nachname)[:\s]*([^\n\r]+)/i;
  const nameLabelMatch = text.match(nameLabelRegex);
  if (nameLabelMatch && nameLabelMatch[1]) {
    personal.fullName = nameLabelMatch[1].trim();
  } else {
    // Look at first 3 non-empty lines that aren't emails or headers
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 2 && !l.includes("@") && !l.startsWith("http"));
    if (lines.length > 0 && lines[0].length < 50 && !/cv|curriculum|životopis|lebenslauf/i.test(lines[0])) {
      personal.fullName = lines[0];
    }
  }

  // 6. Extract Driving License
  const licenseRegex = /(?:vozačka dozvola|driving licen[cs]e|führerschein|ehliyet)[:\s]*([A-Za-z0-9,\s+]+)/i;
  const licenseMatch = text.match(licenseRegex);
  if (licenseMatch && licenseMatch[1]) {
    result.drivingLicense = licenseMatch[1].trim();
  }

  // 7. Parse sections: Experience, Education, Skills, Languages
  const lines = text.split(/\r?\n/);
  let currentSection: "unknown" | "experience" | "education" | "skills" | "languages" | "summary" = "unknown";
  const experienceLines: string[] = [];
  const educationLines: string[] = [];
  const skillLines: string[] = [];
  const languageLines: string[] = [];
  const summaryLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Detect section headers
    if (/^(radno iskustvo|work experience|berufserfahrung|iş deneyimi|iskustvo|professional experience)/i.test(trimmed)) {
      currentSection = "experience";
      continue;
    }
    if (/^(obrazovanje|education|ausbildung|eğitim|edukacija|školovanje)/i.test(trimmed)) {
      currentSection = "education";
      continue;
    }
    if (/^(vještine|skills|fähigkeiten|beceriler|stručne vještine|kompetencije)/i.test(trimmed)) {
      currentSection = "skills";
      continue;
    }
    if (/^(jezici|languages|sprachen|diller|strani jezici)/i.test(trimmed)) {
      currentSection = "languages";
      continue;
    }
    if (/^(o meni|profil|summary|profile|über mich|hakkımda|biografija)/i.test(trimmed)) {
      currentSection = "summary";
      continue;
    }

    if (currentSection === "experience") experienceLines.push(trimmed);
    else if (currentSection === "education") educationLines.push(trimmed);
    else if (currentSection === "skills") skillLines.push(trimmed);
    else if (currentSection === "languages") languageLines.push(trimmed);
    else if (currentSection === "summary") summaryLines.push(trimmed);
  }

  if (summaryLines.length > 0) {
    personal.summary = summaryLines.slice(0, 5).join(" ");
  }

  // Parse experiences
  if (experienceLines.length > 0) {
    const experiences: WorkExperience[] = [];
    let currentExp: Partial<WorkExperience> | null = null;

    for (const expLine of experienceLines) {
      const dateMatch = expLine.match(/(\d{4}|\d{2}\/\d{4})\s*[-–—]\s*(\d{4}|\d{2}\/\d{4}|present|trenutno|heute|günümüz)/i);
      if (dateMatch) {
        if (currentExp && (currentExp.position || currentExp.company)) {
          experiences.push({
            id: `exp-${Date.now()}-${experiences.length}`,
            position: currentExp.position || "Radna pozicija",
            company: currentExp.company || "Kompanija / Poslodavac",
            city: currentExp.city || "",
            startDate: currentExp.startDate || "",
            endDate: currentExp.endDate || "Trenutno",
            isCurrent: currentExp.isCurrent || false,
            description: currentExp.description || "",
          });
        }
        currentExp = {
          startDate: dateMatch[1],
          endDate: dateMatch[2],
          isCurrent: /present|trenutno|heute|günümüz/i.test(dateMatch[2]),
          description: "",
        };
      } else if (currentExp) {
        if (!currentExp.position) {
          const parts = expLine.split(/[-,|]/);
          currentExp.position = parts[0]?.trim() || expLine;
          if (parts[1]) currentExp.company = parts[1].trim();
        } else if (!currentExp.company) {
          currentExp.company = expLine;
        } else {
          currentExp.description = (currentExp.description ? currentExp.description + " " : "") + expLine;
        }
      }
    }

    if (currentExp && (currentExp.position || currentExp.company)) {
      experiences.push({
        id: `exp-${Date.now()}-${experiences.length}`,
        position: currentExp.position || "Radna pozicija",
        company: currentExp.company || "Kompanija / Poslodavac",
        city: currentExp.city || "",
        startDate: currentExp.startDate || "",
        endDate: currentExp.endDate || "Trenutno",
        isCurrent: currentExp.isCurrent || false,
        description: currentExp.description || "",
      });
    }

    if (experiences.length > 0) {
      result.experiences = experiences;
    }
  }

  // Parse educations
  if (educationLines.length > 0) {
    const educations: Education[] = [];
    for (let i = 0; i < educationLines.length; i += 2) {
      const line1 = educationLines[i];
      const line2 = educationLines[i + 1] || "";
      const dateMatch = (line1 + " " + line2).match(/(\d{4})\s*[-–—]\s*(\d{4}|present|trenutno|danas)?/i);

      educations.push({
        id: `edu-${Date.now()}-${educations.length}`,
        degree: line1.replace(/(\d{4})\s*[-–—]\s*(\d{4}|present|trenutno)?/gi, "").trim() || "Diploma / Stepen",
        institution: line2 || "Obrazovna ustanova / Fakultet",
        city: "",
        startDate: dateMatch ? dateMatch[1] : "",
        endDate: dateMatch && dateMatch[2] ? dateMatch[2] : "",
        description: "",
      });
      if (educations.length >= 4) break;
    }
    if (educations.length > 0) {
      result.educations = educations;
    }
  }

  // Parse skills
  if (skillLines.length > 0) {
    const skillsList: SkillItem[] = [];
    const allSkillsText = skillLines.join(", ");
    const splitSkills = allSkillsText.split(/[,;\n•·|]/).map((s) => s.trim()).filter((s) => s.length > 1);

    for (const s of splitSkills.slice(0, 10)) {
      skillsList.push({
        id: `sk-${Date.now()}-${skillsList.length}`,
        name: s,
        level: "advanced",
      });
    }
    if (skillsList.length > 0) {
      result.skills = skillsList;
    }
  }

  // Parse languages
  if (languageLines.length > 0) {
    const langs: LanguageItem[] = [];
    const allLangText = languageLines.join(", ");
    const splitLangs = allLangText.split(/[,;\n•·|]/).map((s) => s.trim()).filter((s) => s.length > 1);

    for (const l of splitLangs.slice(0, 5)) {
      let level: LanguageItem["level"] = "B2";
      if (/maternji|native|ana dil|muttersprache/i.test(l)) level = "native";
      else if (/c2/i.test(l)) level = "C2";
      else if (/c1/i.test(l)) level = "C1";
      else if (/b2/i.test(l)) level = "B2";
      else if (/b1/i.test(l)) level = "B1";
      else if (/a2/i.test(l)) level = "A2";
      else if (/a1/i.test(l)) level = "A1";

      const cleanName = l.replace(/\((?:native|maternji|c1|c2|b1|b2|a1|a2)[^)]*\)/gi, "").trim();
      langs.push({
        id: `lang-${Date.now()}-${langs.length}`,
        language: cleanName || l,
        level,
      });
    }
    if (langs.length > 0) {
      result.languages = langs;
    }
  }

  result.personal = personal;
  return result;
}
