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

export function TemplateMinimal({ cv }: Props) {
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
      style={{ fontFamily: font, fontSize, color: '#111827', padding: '32px 40px' }}
    >
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-300">
        <h1 className="text-3xl font-light tracking-tight text-gray-900">
          {p.firstName} <strong className="font-bold">{p.lastName}</strong>
        </h1>
        {p.title && (
          <p className="text-sm mt-1" style={{ color }}>{p.title}</p>
        )}
        <div className="flex flex-wrap gap-4 mt-2">
          {p.email && <span className="flex items-center gap-1 text-xs text-gray-500"><Mail className="h-3 w-3" />{p.email}</span>}
          {p.phone && <span className="flex items-center gap-1 text-xs text-gray-500"><Phone className="h-3 w-3" />{p.phone}</span>}
          {p.location && <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin className="h-3 w-3" />{p.location}</span>}
          {p.website && <span className="flex items-center gap-1 text-xs text-gray-500"><Globe className="h-3 w-3" />{p.website}</span>}
          {p.linkedin && <span className="flex items-center gap-1 text-xs text-gray-500"><Linkedin className="h-3 w-3" />{p.linkedin}</span>}
        </div>
      </div>

      {p.summary && (
        <p className="text-gray-600 leading-relaxed mb-5 italic border-l-2 pl-3" style={{ borderColor: color }}>
          {p.summary}
        </p>
      )}

      {experiences.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-gray-400">
            Expériences
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="pl-4 border-l border-gray-200">
                <div className="flex justify-between items-baseline">
                  <p className="font-semibold text-gray-900">{exp.position}</p>
                  <p className="text-xs text-gray-400">
                    {exp.startDate && formatDate(exp.startDate)} – {exp.current ? 'Présent' : exp.endDate ? formatDate(exp.endDate) : ''}
                  </p>
                </div>
                <p className="text-xs mb-1" style={{ color }}>{exp.company}</p>
                {exp.description && <p className="text-gray-600 leading-relaxed">{exp.description}</p>}
                {exp.achievements.filter(Boolean).length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {exp.achievements.filter(Boolean).map((a, i) => (
                      <li key={i} className="text-gray-500 flex gap-2">
                        <span className="text-gray-300 mt-0.5">—</span>{a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {educations.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-gray-400">
              Formation
            </h2>
            <div className="space-y-2">
              {educations.map((edu) => (
                <div key={edu.id} className="pl-4 border-l border-gray-200">
                  <p className="font-semibold text-gray-900">{edu.degree}</p>
                  {edu.field && <p className="text-gray-600">{edu.field}</p>}
                  <p className="text-xs" style={{ color }}>{edu.institution}</p>
                  <p className="text-xs text-gray-400">
                    {edu.startDate && formatDate(edu.startDate)} – {edu.current ? 'Présent' : edu.endDate ? formatDate(edu.endDate) : ''}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-gray-400">
              Compétences
            </h2>
            {Object.entries(skillsByCategory).map(([cat, items]) => (
              <div key={cat} className="mb-2">
                <p className="text-xs text-gray-400 mb-1">{cat}</p>
                <p className="text-gray-700">{items.map((s) => s.name).join(' · ')}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
