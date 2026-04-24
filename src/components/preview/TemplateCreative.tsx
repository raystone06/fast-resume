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

export function TemplateCreative({ cv }: Props) {
  const { personalInfo: p, experiences, educations, skills, style } = cv;
  const color = style.primaryColor;
  const font = style.fontFamily;
  const fontSize = fontSizeMap[style.fontSize];

  const categories = [...new Set(skills.map((s) => s.category || 'Autres'))];

  return (
    <div
      id="cv-preview"
      className="a4-page flex flex-col overflow-hidden"
      style={{ fontFamily: font, fontSize }}
    >
      {/* Hero header with diagonal clip */}
      <div
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
          padding: '28px 32px 36px',
          position: 'relative',
          clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)',
          marginBottom: '-12px',
        }}
      >
        <div className="flex items-start gap-6">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black shrink-0"
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
          >
            {p.firstName.charAt(0)}{p.lastName.charAt(0)}
          </div>
          <div style={{ color: 'white' }}>
            <h1 className="text-2xl font-black tracking-tight leading-none">
              {p.firstName} <span style={{ opacity: 0.85 }}>{p.lastName}</span>
            </h1>
            {p.title && (
              <p className="text-sm font-semibold mt-1" style={{ opacity: 0.8 }}>{p.title}</p>
            )}
            <div className="flex flex-wrap gap-3 mt-2">
              {p.email && <span className="flex items-center gap-1 text-xs opacity-75"><Mail className="h-3 w-3" />{p.email}</span>}
              {p.phone && <span className="flex items-center gap-1 text-xs opacity-75"><Phone className="h-3 w-3" />{p.phone}</span>}
              {p.location && <span className="flex items-center gap-1 text-xs opacity-75"><MapPin className="h-3 w-3" />{p.location}</span>}
              {p.website && <span className="flex items-center gap-1 text-xs opacity-75"><Globe className="h-3 w-3" />{p.website}</span>}
              {p.linkedin && <span className="flex items-center gap-1 text-xs opacity-75"><Linkedin className="h-3 w-3" />{p.linkedin}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden" style={{ padding: '16px 32px 28px', gap: '24px' }}>
        {/* Left */}
        <div className="flex-1 space-y-5 min-w-0">
          {p.summary && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-[0.15em] mb-2 flex items-center gap-2"
                style={{ color }}
              >
                <span className="w-5 h-0.5 rounded" style={{ backgroundColor: color }} />
                À propos
              </h2>
              <p className="text-gray-600 leading-relaxed">{p.summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-[0.15em] mb-3 flex items-center gap-2"
                style={{ color }}
              >
                <span className="w-5 h-0.5 rounded" style={{ backgroundColor: color }} />
                Expériences
              </h2>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="pl-3" style={{ borderLeft: `2px solid ${color}20` }}>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-bold text-gray-900">{exp.position}</p>
                        <p className="font-semibold text-sm" style={{ color }}>{exp.company}</p>
                      </div>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full shrink-0 mt-0.5"
                        style={{ background: `${color}15`, color }}
                      >
                        {exp.startDate && formatDate(exp.startDate)} – {exp.current ? 'Présent' : exp.endDate ? formatDate(exp.endDate) : ''}
                      </span>
                    </div>
                    {exp.description && <p className="text-gray-600 mt-1 leading-relaxed">{exp.description}</p>}
                    {exp.achievements.filter(Boolean).length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {exp.achievements.filter(Boolean).map((a, i) => (
                          <li key={i} className="text-gray-500 flex items-start gap-1.5">
                            <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
                            {a}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="w-[38%] shrink-0 space-y-5">
          {skills.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-[0.15em] mb-3 flex items-center gap-2"
                style={{ color }}
              >
                <span className="w-5 h-0.5 rounded" style={{ backgroundColor: color }} />
                Compétences
              </h2>
              {categories.map((cat) => {
                const items = skills.filter((s) => (s.category || 'Autres') === cat);
                return (
                  <div key={cat} className="mb-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">{cat}</p>
                    {items.map((s) => (
                      <div key={s.id} className="mb-1.5">
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="text-gray-700 font-medium">{s.name}</span>
                          <span className="text-gray-400">{levelPct[s.level] ?? 50}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-100">
                          <div
                            className="h-1.5 rounded-full transition-all"
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

          {educations.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-[0.15em] mb-3 flex items-center gap-2"
                style={{ color }}
              >
                <span className="w-5 h-0.5 rounded" style={{ backgroundColor: color }} />
                Formation
              </h2>
              <div className="space-y-2">
                {educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-2.5 rounded-lg"
                    style={{ background: `${color}08`, border: `1px solid ${color}20` }}
                  >
                    <p className="font-bold text-gray-900">{edu.degree}</p>
                    {edu.field && <p className="text-xs text-gray-600">{edu.field}</p>}
                    <p className="text-xs font-semibold mt-0.5" style={{ color }}>{edu.institution}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {edu.startDate && formatDate(edu.startDate)} – {edu.current ? 'Présent' : edu.endDate ? formatDate(edu.endDate) : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
