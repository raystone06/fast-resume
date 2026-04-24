import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

const fontSizeMap = { small: '10px', medium: '11px', large: '12px' };

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  return `${months[parseInt(month) - 1] ?? ''} ${year}`;
}

interface Props { cv: CVData }

export function TemplateClassic({ cv }: Props) {
  const { personalInfo: p, experiences, educations, skills, style } = cv;
  const color = style.primaryColor;
  const font = style.fontFamily;
  const fontSize = fontSizeMap[style.fontSize];

  const skillsByCategory = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    const cat = s.category || 'Autres';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <div
      id="cv-preview"
      className="a4-page flex flex-col overflow-hidden"
      style={{ fontFamily: font, fontSize, color: '#1f2937' }}
    >
      {/* Header */}
      <div style={{ backgroundColor: color, padding: '24px 32px', color: 'white' }}>
        <h1 className="text-2xl font-bold tracking-tight">
          {p.firstName} {p.lastName}
        </h1>
        {p.title && <p className="text-white/80 text-sm mt-0.5">{p.title}</p>}
        <div className="flex flex-wrap gap-4 mt-3">
          {p.email && (
            <div className="flex items-center gap-1 text-xs text-white/80">
              <Mail className="h-3 w-3" />{p.email}
            </div>
          )}
          {p.phone && (
            <div className="flex items-center gap-1 text-xs text-white/80">
              <Phone className="h-3 w-3" />{p.phone}
            </div>
          )}
          {p.location && (
            <div className="flex items-center gap-1 text-xs text-white/80">
              <MapPin className="h-3 w-3" />{p.location}
            </div>
          )}
          {p.website && (
            <div className="flex items-center gap-1 text-xs text-white/80">
              <Globe className="h-3 w-3" />{p.website}
            </div>
          )}
          {p.linkedin && (
            <div className="flex items-center gap-1 text-xs text-white/80">
              <Linkedin className="h-3 w-3" />{p.linkedin}
            </div>
          )}
        </div>
      </div>

      {/* Body — 2 columns */}
      <div className="flex flex-1 overflow-hidden" style={{ padding: '20px 32px', gap: '24px' }}>
        {/* Left column */}
        <div className="flex-1 space-y-4 min-w-0">
          {p.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-2" style={{ borderColor: color, color }}>
                Profil
              </h2>
              <p className="text-gray-600 leading-relaxed">{p.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-2" style={{ borderColor: color, color }}>
                Expériences
              </h2>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-bold text-gray-900">{exp.position}</p>
                        <p className="font-medium" style={{ color }}>{exp.company}</p>
                      </div>
                      <p className="text-gray-500 text-xs shrink-0 mt-0.5 whitespace-nowrap">
                        {exp.startDate && formatDate(exp.startDate)} – {exp.current ? 'Présent' : exp.endDate ? formatDate(exp.endDate) : ''}
                      </p>
                    </div>
                    {exp.description && <p className="text-gray-600 mt-1 leading-relaxed">{exp.description}</p>}
                    {exp.achievements.filter(Boolean).length > 0 && (
                      <ul className="mt-1 space-y-0.5 list-disc list-inside">
                        {exp.achievements.filter(Boolean).map((a, i) => (
                          <li key={i} className="text-gray-600">{a}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right column */}
        <div className="w-[36%] shrink-0 space-y-4">
          {educations.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-2" style={{ borderColor: color, color }}>
                Formation
              </h2>
              <div className="space-y-2">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-gray-900">{edu.degree}</p>
                    {edu.field && <p className="text-gray-600">{edu.field}</p>}
                    <p className="font-medium" style={{ color }}>{edu.institution}</p>
                    <p className="text-gray-500 text-xs">
                      {edu.startDate && formatDate(edu.startDate)} – {edu.current ? 'Présent' : edu.endDate ? formatDate(edu.endDate) : ''}
                    </p>
                    {edu.description && <p className="text-gray-600 mt-0.5">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-2" style={{ borderColor: color, color }}>
                Compétences
              </h2>
              {Object.entries(skillsByCategory).map(([cat, items]) => (
                <div key={cat} className="mb-2">
                  <p className="text-xs font-semibold text-gray-500 mb-1">{cat}</p>
                  <div className="flex flex-wrap gap-1">
                    {items.map((s) => (
                      <span
                        key={s.id}
                        className="text-xs px-2 py-0.5 rounded-full border"
                        style={{ borderColor: color, color }}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
