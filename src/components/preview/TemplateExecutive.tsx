import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

const fontSizeMap = { small: '10px', medium: '11px', large: '12px' };

function formatDate(d: string) {
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  return `${months[parseInt(m) - 1] ?? ''} ${y}`;
}

const levelPct: Record<string, number> = { débutant: 25, intermédiaire: 50, avancé: 75, expert: 100 };

interface Props { cv: CVData }

export function TemplateExecutive({ cv }: Props) {
  const { personalInfo: p, experiences, educations, skills, style } = cv;
  const color = style.primaryColor;
  const font = style.fontFamily;
  const fontSize = fontSizeMap[style.fontSize];

  const categories = [...new Set(skills.map((s) => s.category || 'Autres'))];

  return (
    <div
      id="cv-preview"
      className="a4-page flex flex-col overflow-hidden"
      style={{ fontFamily: font, fontSize, color: '#1a1a2e' }}
    >
      {/* Dark premium header */}
      <div style={{ background: '#1a1a2e', padding: '28px 36px', color: 'white' }}>
        <div className="flex justify-between items-end">
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '0.05em', lineHeight: 1.1 }}>
              {p.firstName}
            </h1>
            <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '0.05em', lineHeight: 1.1, color }}>
              {p.lastName.toUpperCase()}
            </h1>
            {p.title && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-4 h-px" style={{ backgroundColor: color }} />
                <p style={{ color: `${color}cc`, fontSize: '11px', letterSpacing: '0.1em', fontWeight: 500 }}>
                  {p.title.toUpperCase()}
                </p>
              </div>
            )}
          </div>
          <div className="text-right space-y-1">
            {p.email && <p className="flex items-center justify-end gap-1.5 text-xs text-white/60"><Mail className="h-3 w-3" />{p.email}</p>}
            {p.phone && <p className="flex items-center justify-end gap-1.5 text-xs text-white/60"><Phone className="h-3 w-3" />{p.phone}</p>}
            {p.location && <p className="flex items-center justify-end gap-1.5 text-xs text-white/60"><MapPin className="h-3 w-3" />{p.location}</p>}
            {p.website && <p className="flex items-center justify-end gap-1.5 text-xs text-white/60"><Globe className="h-3 w-3" />{p.website}</p>}
            {p.linkedin && <p className="flex items-center justify-end gap-1.5 text-xs text-white/60"><Linkedin className="h-3 w-3" />{p.linkedin}</p>}
          </div>
        </div>
      </div>

      {/* Accent bar */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${color}, ${color}40)` }} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden" style={{ padding: '20px 36px', gap: '28px' }}>
        {/* Main column */}
        <div className="flex-1 space-y-5 min-w-0">
          {p.summary && (
            <div>
              <p className="text-gray-600 leading-relaxed italic border-l-2 pl-3" style={{ borderColor: color }}>
                {p.summary}
              </p>
            </div>
          )}

          {experiences.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color }}>
                  Parcours professionnel
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="font-bold text-gray-900">{exp.position}</p>
                        <p className="font-semibold text-sm" style={{ color }}>{exp.company}</p>
                      </div>
                      <p className="text-xs text-gray-400 shrink-0 mt-0.5 font-mono">
                        {exp.startDate && formatDate(exp.startDate)} — {exp.current ? 'Présent' : exp.endDate ? formatDate(exp.endDate) : ''}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                    )}
                    {exp.achievements.filter(Boolean).length > 0 && (
                      <div className="mt-1.5 grid grid-cols-1 gap-0.5">
                        {exp.achievements.filter(Boolean).map((a, i) => (
                          <div key={i} className="flex items-start gap-2 text-gray-600">
                            <span style={{ color }} className="font-bold mt-0.5 shrink-0">›</span>
                            {a}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="w-[34%] shrink-0 space-y-5">
          {educations.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color }}>
                  Formation
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="space-y-3">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-gray-900">{edu.degree}</p>
                    {edu.field && <p className="text-gray-600">{edu.field}</p>}
                    <p className="font-semibold text-sm" style={{ color }}>{edu.institution}</p>
                    <p className="text-xs text-gray-400 font-mono">
                      {edu.startDate && formatDate(edu.startDate)} — {edu.current ? 'Présent' : edu.endDate ? formatDate(edu.endDate) : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color }}>
                  Compétences
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              {categories.map((cat) => {
                const items = skills.filter((s) => (s.category || 'Autres') === cat);
                return (
                  <div key={cat} className="mb-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">{cat}</p>
                    {items.map((s) => (
                      <div key={s.id} className="mb-1.5">
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="text-gray-800">{s.name}</span>
                        </div>
                        <div className="h-0.5 bg-gray-100 rounded">
                          <div
                            className="h-0.5 rounded"
                            style={{ width: `${levelPct[s.level] ?? 50}%`, backgroundColor: color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
