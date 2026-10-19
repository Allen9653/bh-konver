import { forwardRef } from "react";
import { CvData } from "@/types/cv";
import { CV_TRANSLATIONS, formatCvText } from "@/data/cvTranslations";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Linkedin,
  Flag,
  Car,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";

interface ModernEuropassPreviewProps {
  data: CvData;
  scale?: number;
}

export const ModernEuropassPreview = forwardRef<HTMLDivElement, ModernEuropassPreviewProps>(
  ({ data, scale = 1 }, ref) => {
    const lang = data.language;
    const labels = CV_TRANSLATIONS[lang] || CV_TRANSLATIONS.bs;

    // Helper to format text with Cyrillic transliteration if selected
    const t = (text: string | undefined | null) => formatCvText(text, lang);

    const getSkillLevelPercent = (level: string) => {
      switch (level) {
        case "expert":
          return "100%";
        case "advanced":
          return "80%";
        case "intermediate":
          return "60%";
        case "beginner":
          return "40%";
        default:
          return "75%";
      }
    };

    const getSkillLevelLabel = (level: string) => {
      switch (level) {
        case "expert":
          return labels.levelExpert;
        case "advanced":
          return labels.levelAdvanced;
        case "intermediate":
          return labels.levelIntermediate;
        case "beginner":
          return labels.levelBeginner;
        default:
          return level;
      }
    };

    return (
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
        className="transition-transform duration-150"
      >
        {/* Exact Standard A4 dimensions: 794px x 1123px */}
        <div
          ref={ref}
          id="europass-cv-printable"
          className="w-[794px] min-h-[1123px] bg-white text-slate-900 font-sans shadow-xl border border-slate-200 relative print:shadow-none print:border-none print:w-full print:m-0 print:p-0 flex flex-col justify-between"
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          }}
        >
          {/* Top Europass Brand Bar */}
          <div className="bg-[#003399] text-white px-8 py-3 flex items-center justify-between border-b-2 border-[#ffcc00]">
            <div className="flex items-center gap-2.5">
              {/* European Flag representation */}
              <div className="h-6 w-9 bg-[#003399] border border-blue-400/40 rounded flex items-center justify-center relative overflow-hidden">
                <span className="text-[#ffcc00] text-xs font-black tracking-tighter">★ ★ ★</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-wider leading-none text-white">
                  europass
                </span>
                <span className="text-[9px] font-medium text-blue-200 tracking-wide mt-0.5">
                  {labels.curriculumVitae}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-blue-100 font-medium">
                {labels.europassTagline}
              </span>
            </div>
          </div>

          {/* Main 2-Column Content */}
          <div className="flex-1 grid grid-cols-12 min-h-0">
            {/* LEFT COLUMN: 4 columns (~33%) */}
            <div className="col-span-4 bg-[#f8fafc] border-r border-slate-200 p-6 space-y-6 text-xs text-slate-700">
              {/* Candidate Photo */}
              {data.personal.photoUrl ? (
                <div className="flex justify-center mb-4">
                  <div
                    className={`overflow-hidden border-2 border-[#003399] shadow-md bg-white ${
                      data.personal.photoShape === "circle"
                        ? "h-36 w-36 rounded-full"
                        : data.personal.photoShape === "passport"
                        ? "w-32 h-[164px] rounded-md"
                        : data.personal.photoShape === "rounded"
                        ? "h-36 w-36 rounded-2xl"
                        : "h-36 w-36 rounded-none"
                    }`}
                  >
                    <img
                      src={data.personal.photoUrl}
                      alt={data.personal.fullName || "CV Profil"}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              ) : null}

              {/* Contact Information */}
              <div>
                <h4 className="text-[11px] font-bold text-[#003399] tracking-wider uppercase border-b border-[#003399]/20 pb-1 mb-2.5 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#003399]" />
                  <span>{labels.contactInfo}</span>
                </h4>

                <ul className="space-y-2 text-[11px] text-slate-600">
                  {data.personal.email && (
                    <li className="flex items-start gap-2">
                      <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="break-all">{data.personal.email}</span>
                    </li>
                  )}
                  {data.personal.phone && (
                    <li className="flex items-start gap-2">
                      <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{t(data.personal.phone)}</span>
                    </li>
                  )}
                  {data.personal.address && (
                    <li className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{t(data.personal.address)}</span>
                    </li>
                  )}
                  {data.personal.birthDate && (
                    <li className="flex items-start gap-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-800">{labels.birthDate}:</strong> {t(data.personal.birthDate)}
                      </span>
                    </li>
                  )}
                  {data.personal.nationality && (
                    <li className="flex items-start gap-2">
                      <Flag className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{t(data.personal.nationality)}</span>
                    </li>
                  )}
                  {data.personal.website && (
                    <li className="flex items-start gap-2">
                      <Globe className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="break-all text-[#003399]">{data.personal.website}</span>
                    </li>
                  )}
                  {data.personal.linkedin && (
                    <li className="flex items-start gap-2">
                      <Linkedin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="break-all">{data.personal.linkedin}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Skills Section */}
              {data.skills && data.skills.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-[#003399] tracking-wider uppercase border-b border-[#003399]/20 pb-1 mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#003399]" />
                    <span>{labels.skills}</span>
                  </h4>

                  <div className="space-y-2.5">
                    {data.skills.map((skill) => (
                      <div key={skill.id} className="text-[11px]">
                        <div className="flex justify-between font-medium text-slate-800 mb-1">
                          <span>{t(skill.name)}</span>
                          <span className="text-[9px] text-slate-500 font-semibold">
                            {getSkillLevelLabel(skill.level)}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#003399] rounded-full"
                            style={{ width: getSkillLevelPercent(skill.level) }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages Section */}
              {data.languages && data.languages.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-[#003399] tracking-wider uppercase border-b border-[#003399]/20 pb-1 mb-2.5 flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-[#003399]" />
                    <span>{labels.languages}</span>
                  </h4>

                  <div className="space-y-2">
                    {data.languages.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-800">{t(item.language)}</span>
                        <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[#003399] font-bold text-[10px]">
                          {item.level === "native" ? labels.motherTongue : item.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Driving License */}
              {data.drivingLicense && (
                <div>
                  <h4 className="text-[11px] font-bold text-[#003399] tracking-wider uppercase border-b border-[#003399]/20 pb-1 mb-2 flex items-center gap-1.5">
                    <Car className="h-3.5 w-3.5 text-[#003399]" />
                    <span>{labels.drivingLicense}</span>
                  </h4>
                  <p className="text-[11px] font-semibold text-slate-700 bg-white p-2 rounded border border-slate-200 inline-block">
                    {t(data.drivingLicense)}
                  </p>
                </div>
              )}

              {/* Certificates */}
              {data.certificates && data.certificates.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-[#003399] tracking-wider uppercase border-b border-[#003399]/20 pb-1 mb-2 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-[#003399]" />
                    <span>{labels.certificates}</span>
                  </h4>
                  <ul className="space-y-2 text-[10px] text-slate-600">
                    {data.certificates.map((cert) => (
                      <li key={cert.id} className="bg-white p-2 rounded border border-slate-200">
                        <span className="font-bold text-slate-800 block text-[11px]">{t(cert.title)}</span>
                        <span className="text-slate-500 block">{t(cert.issuer)} {cert.year ? `· ${cert.year}` : ""}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: 8 columns (~67%) */}
            <div className="col-span-8 p-8 space-y-6 text-slate-800">
              {/* Header: Candidate Name & Target Title */}
              <div className="border-b-2 border-slate-100 pb-5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003399] tracking-tight">
                  {data.personal.fullName.trim() ? (
                    t(data.personal.fullName)
                  ) : (
                    <span className="text-slate-300 italic font-normal text-xl sm:text-2xl">
                      [Vaše Ime i Prezime]
                    </span>
                  )}
                </h1>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">
                  {data.personal.jobTitle.trim() ? (
                    t(data.personal.jobTitle)
                  ) : (
                    <span className="text-slate-400 italic font-normal normal-case text-xs">
                      [Željeno Zvanje / Radna Pozicija]
                    </span>
                  )}
                </p>
              </div>

              {/* Profile / Summary */}
              <div>
                <h3 className="text-xs font-bold text-[#003399] uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b border-[#003399]/20 pb-1">
                  <span>{labels.profile}</span>
                </h3>
                {data.personal.summary.trim() ? (
                  <p className="text-xs leading-relaxed text-slate-600 text-justify">
                    {t(data.personal.summary)}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 italic bg-slate-50 p-2.5 rounded border border-dashed border-slate-200">
                    [Ovdje se prikazuje vaš profesionalni profil i rezime čim popunite polje &quot;O meni&quot; u formi lijevo]
                  </p>
                )}
              </div>

              {/* Work Experience */}
              <div>
                <h3 className="text-xs font-bold text-[#003399] uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b border-[#003399]/20 pb-1">
                  <Briefcase className="h-3.5 w-3.5 text-[#003399]" />
                  <span>{labels.workExperience}</span>
                </h3>

                {data.experiences.filter((e) => e.position.trim() || e.company.trim()).length > 0 ? (
                  <div className="space-y-4">
                    {data.experiences
                      .filter((e) => e.position.trim() || e.company.trim())
                      .map((exp) => (
                        <div key={exp.id} className="relative pl-4 border-l-2 border-blue-200 space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                            <span className="font-bold text-slate-900 text-[13px]">
                              {t(exp.position) || "Radna pozicija"}
                            </span>
                            {(exp.startDate || exp.endDate || exp.isCurrent) && (
                              <span className="text-[10px] font-bold text-[#003399] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 self-start sm:self-auto">
                                {exp.startDate ? t(exp.startDate) : ""} {exp.startDate && (exp.endDate || exp.isCurrent) ? "–" : ""}{" "}
                                {exp.isCurrent ? labels.present : t(exp.endDate)}
                              </span>
                            )}
                          </div>

                          {(exp.company || exp.city) && (
                            <div className="text-xs font-semibold text-slate-600">
                              {t(exp.company)} {exp.city ? `· ${t(exp.city)}` : ""}
                            </div>
                          )}

                          {exp.description && (
                            <p className="text-xs text-slate-600 leading-relaxed pt-1">
                              {t(exp.description)}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="p-3 border border-dashed border-blue-200 bg-blue-50/20 rounded text-xs text-slate-400 italic">
                    [Unesite radno iskustvo (poziciju, firmu, period) u sekciji &quot;Iskustvo&quot; u formi lijevo]
                  </div>
                )}
              </div>

              {/* Education & Training */}
              <div>
                <h3 className="text-xs font-bold text-[#003399] uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b border-[#003399]/20 pb-1">
                  <GraduationCap className="h-3.5 w-3.5 text-[#003399]" />
                  <span>{labels.educationAndTraining}</span>
                </h3>

                {data.educations.filter((edu) => edu.degree.trim() || edu.institution.trim()).length > 0 ? (
                  <div className="space-y-4">
                    {data.educations
                      .filter((edu) => edu.degree.trim() || edu.institution.trim())
                      .map((edu) => (
                        <div key={edu.id} className="relative pl-4 border-l-2 border-emerald-200 space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                            <span className="font-bold text-slate-900 text-[13px]">
                              {t(edu.degree) || "Diploma / Stepen"}
                            </span>
                            {(edu.startDate || edu.endDate) && (
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 self-start sm:self-auto">
                                {edu.startDate ? t(edu.startDate) : ""} {edu.startDate && edu.endDate ? "–" : ""}{" "}
                                {t(edu.endDate)}
                              </span>
                            )}
                          </div>

                          {(edu.institution || edu.city) && (
                            <div className="text-xs font-semibold text-slate-600">
                              {t(edu.institution)} {edu.city ? `· ${t(edu.city)}` : ""}
                            </div>
                          )}

                          {edu.description && (
                            <p className="text-xs text-slate-600 leading-relaxed pt-1">
                              {t(edu.description)}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="p-3 border border-dashed border-emerald-200 bg-emerald-50/20 rounded text-xs text-slate-400 italic">
                    [Unesite obrazovanje (fakultet, školu, smjer) u sekciji &quot;Fakultet&quot; u formi lijevo]
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer of A4 page */}
          <div className="border-t border-slate-200 px-8 py-2.5 bg-slate-50 flex items-center justify-between text-[10px] text-slate-400">
            <span>© Europass · bh-konver.com/category/generatori?tab=cv</span>
            <span>Stranica 1 / 1 (A4 Standard)</span>
          </div>
        </div>
      </div>
    );
  }
);

ModernEuropassPreview.displayName = "ModernEuropassPreview";
