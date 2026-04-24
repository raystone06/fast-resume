import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Terminal } from 'lucide-react';

const fontSizeMap = { small: '10px', medium: '11px', large: '12px' };

function formatDate(d: string) {
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  return `${months[parseInt(m) - 1] ?? ''} ${y}`;
}

const levelPct: Record<string, number> = { débutant: 25, intermédiaire: 50, avancé: 75, expert: 100 };

interface Props { cv: CVData }

export function TemplateTech({ cv }: Props) {
  const { personalInfo: p, experiences, educations, skills, style } = cv;
  const color = style.primaryColor;
  const font = style.fontFamily;
  const fontSize = fontSizeMap[style.fontSize];
  const darkBg = '#0d1117';
  const categories = [...new Set(skills.map((s) => s.category || 'Autres'))];

  return (
    <div
      id="cv-preview"
      className="a4-page flex overflow-hidden"
      style={{ fontFamily: font, fontSize }}
    >
      {/* Dark sidebar */}
      <div
        className="w-[35%] shrink-0 flex flex-col"
        style={{ background: darkBg, color: '#e6edf3', padding: '24px 18px' }}
      >
        {/* Terminal-style header */}
        <div
          className="rounded-lg p-3 mb-5"
          style={{ background: '#161b22', border: '1px solid #30363d' }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <p className="text-xs font-mono" style={{ color: '#7d8590' }}>
            <span style={{ color: '#79c0ff' }}>const</span>{' '}
            <span style={{ color: '#e6edf3' }}>dev</span>{' '}
            <span style={{ color: '#ff7b72' }}>=</span>{' '}
            <span style={{ color: '#a5d6ff' }}>{'{'}</span>
          </p>
          <p className="text-xs font-mono pl-3" style={{ color: '#7d8590' }}>
            name: <span style={{ color: '#a5d6ff' }}>"{p.firstName} {p.lastName}"</span>,
          </p>
          {p.title && (
            <p className="text-xs font-mono pl-3" style={{ color: '#7d8590' }}>
              role: <span style={{ color: '#a5d6ff' }}>"{p.title}"</span>,
            </p>
          )}
          <p className="text-xs font-mono" style={{ color: '#a5d6ff' }}>{'}'}</p>
        </div>

        {/* Contact */}
        <div className="mb-5">
          <p
            className="text-xs font-mono font-bold mb-2"
            style={{ color }}
          >
            // contact
          </p>
          <div className="space-y-1.5">
            {p.email && (
              <p className="flex items-center gap-1.5 text-xs font-mono" style={{ color: '#8b949e' }}>
                <Mail className="h-3 w-3 shrink-0" style={{ color }} />{p.email}
              </p>
            )}
            {p.phone && (
              <p className="flex items-center gap-1.5 text-xs font-mono" style={{ color: '#8b949e' }}>
                <Phone className="h-3 w-3 shrink-0" style={{ color }} />{p.phone}
              </p>
            )}
            {p.location && (
              <p className="flex items-center gap-1.5 text-xs font-mono" style={{ color: '#8b949e' }}>
                <MapPin className="h-3 w-3 shrink-0" style={{ color }} />{p.location}
              </p>
            )}
            {p.website && (
              <p className="flex items-center gap-1.5 text-xs font-mono" style={{ color: '#8b949e' }}>
                <Globe className="h-3 w-3 shrink-0" style={{ color }} />{p.website}
              </p>
            )}
            {p.linkedin && (
              <p className="flex items-center gap-1.5 text-xs font-mono" style={{ color: '#8b949e' }}>
                <Linkedin className="h-3 w-3 shrink-0" style={{ color }} />{p.linkedin}
              </p>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex-1">
            <p className="text-xs font-mono font-bold mb-3" style={{ color }}>
              // stack
            </p>
            {categories.map((cat) => {
              const items = skills.filter((s) => (s.category || 'Autres') === cat);
              return (
                <div key={cat} className="mb-3">
                  <p className="text-xs font-mono mb-1.5" style={{ color: '#8b949e' }}>
                    <span style={{ color: '#ff7b72' }}>{'<'}</span>
                    <span style={{ color: '#7ee787' }}>{cat}</span>
                    <span style={{ color: '#ff7b72' }}>{'>'}</span>
                  </p>
                  {items.map((s) => (
                    <div key={s.id} className="mb-1.5 pl-2">
                      <div className="flex justify-between mb-0.5">
                        <span className="text-xs font-mono" style={{ color: '#e6edf3' }}>{s.name}</span>
                        <span className="text-xs font-mono" style={{ color }}>
                          {levelPct[s.level] ?? 50}%
                        </span>
                      </div>
                      <div
                        className="h-1 rounded"
                        style={{ background: '#21262d' }}
                      >
                        <div
                          className="h-1 rounded"
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

      {/* Main content */}
      <div
        className="flex-1 overflow-hidden flex flex-col"
        style={{ background: '#f6f8fa', padding: '24px 22px', color: '#1f2937' }}
      >
        {p.summary && (
          <div className="mb-4 p-3 rounded-lg" style={{ background: '#ffffff', border: '1px solid #d1d9e0' }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Terminal className="h-3.5 w-3.5" style={{ color }} />
              <p className="text-xs font-mono font-bold" style={{ color }}>README.md</p>
            </div>
            <p className="text-gray-600 leading-relaxed">{p.summary}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold" style={{ color }}>{'>'}</span>
              <p className="text-xs font-mono font-bold text-gray-700 uppercase tracking-wider">experience.log</p>
            </div>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-lg p-3"
                  style={{ background: '#ffffff', border: '1px solid #d1d9e0' }}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-bold text-gray-900">{exp.position}</p>
                      <p className="text-xs font-mono font-semibold" style={{ color }}>{exp.company}</p>
                    </div>
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded shrink-0"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                    >
                      {exp.startDate && formatDate(exp.startDate)} → {exp.current ? 'now' : exp.endDate ? formatDate(exp.endDate) : '?'}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-600 mt-1.5 leading-relaxed">{exp.description}</p>
                  )}
                  {exp.achievements.filter(Boolean).length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.achievements.filter(Boolean).map((a, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-gray-600">
                          <span className="font-mono text-xs shrink-0" style={{ color }}>$</span>
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

        {educations.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold" style={{ color }}>{'>'}</span>
              <p className="text-xs font-mono font-bold text-gray-700 uppercase tracking-wider">education.json</p>
            </div>
            <div className="space-y-2">
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-lg p-3"
                  style={{ background: '#ffffff', border: '1px solid #d1d9e0' }}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-bold text-gray-900">{edu.degree} {edu.field && `— ${edu.field}`}</p>
                      <p className="text-xs font-mono" style={{ color }}>{edu.institution}</p>
                    </div>
                    <span className="text-xs font-mono text-gray-400 shrink-0">
                      {edu.startDate && formatDate(edu.startDate)} → {edu.current ? 'now' : edu.endDate ? formatDate(edu.endDate) : ''}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-gray-600 mt-1 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
