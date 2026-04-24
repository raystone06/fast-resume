import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

const levelWidth: Record<string, string> = {
  débutant: '25%',
  intermédiaire: '50%',
  avancé: '75%',
  expert: '100%',
};

const fontSizeMap = { small: '10px', medium: '11px', large: '12px' };

interface Props { cv: CVData }

export function TemplateModern({ cv }: Props) {
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
      className="a4-page flex overflow-hidden"
      style={{ fontFamily: font, fontSize }}
    >
      {/* Sidebar */}
      <div
        className="w-[34%] shrink-0 flex flex-col"
        style={{ backgroundColor: color, color: 'white', padding: '28px 20px' }}
      >
        {/* Photo placeholder */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
            {p.firstName.charAt(0)}{p.lastName.charAt(0)}
          </div>
        </div>

        <h1 className="text-lg font-bold text-center leading-tight mb-0.5">
          {p.firstName} {p.lastName}
        </h1>
        <p className="text-center text-white/80 text-xs mb-5 leading-tight">{p.title}</p>

        {/* Contact */}
        <div className="mb-5">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-white/60">Contact</h3>
          <div className="space-y-1.5">
            {p.email && <div className="flex items-center gap-1.5 text-xs"><Mail className="h-3 w-3 shrink-0" /><span className="break-all">{p.email}</span></div>}
            {p.phone && <div className="flex items-center gap-1.5 text-xs"><Phone className="h-3 w-3 shrink-0" /><span>{p.phone}</span></div>}
            {p.location && <div className="flex items-center gap-1.5 text-xs"><MapPin className="h-3 w-3 shrink-0" /><span>{p.location}</span></div>}
            {p.website && <div className="flex items-center gap-1.5 text-xs"><Globe className="h-3 w-3 shrink-0" /><span>{p.website}</span></div>}
            {p.linkedin && <div className="flex items-center gap-1.5 text-xs"><Linkedin className="h-3 w-3 shrink-0" /><span>{p.linkedin}</span></div>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-white/60">Compétences</h3>
            {Object.entries(skillsByCategory).map(([cat, items]) => (
              <div key={cat} className="mb-3">
                <p className="text-xs font-semibold mb-1.5 text-white/80">{cat}</p>
                {items.map((s) => (
                  <div key={s.id} className="mb-1.5">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span>{s.name}</span>
                      <span className="text-white/60 capitalize">{s.level}</span>
                    </div>
                    <div className="h-1 bg-white/20 rounded-full">
                      <div
                        className="h-1 bg-white rounded-full"
                        style={{ width: levelWidth[s.level] || '50%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden" style={{ padding: '28px 24px', color: '#1f2937' }}>
        {/* Summary */}
        {p.summary && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-1.5" style={{ color }}>
              Profil
            </h2>
            <div className="w-8 h-0.5 mb-2" style={{ backgroundColor: color }} />
            <p className="text-gray-600 leading-relaxed">{p.summary}</p>
          </div>
        )}

        {/* Experiences */}
        {experiences.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-1.5" style={{ color }}>
              Expériences
            </h2>
            <div className="w-8 h-0.5 mb-2" style={{ backgroundColor: color }} />
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-gray-900">{exp.position}</p>
                      <p className="font-medium" style={{ color }}>{exp.company}</p>
                    </div>
                    <p className="text-gray-500 text-xs shrink-0 mt-0.5">
                      {exp.startDate && formatDate(exp.startDate)} – {exp.current ? 'Présent' : exp.endDate ? formatDate(exp.endDate) : ''}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                  )}
                  {exp.achievements.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {exp.achievements.filter(Boolean).map((a, i) => (
                        <li key={i} className="text-gray-600 flex items-start gap-1.5">
                          <span className="mt-1 shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
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

        {/* Education */}
        {educations.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-1.5" style={{ color }}>
              Formations
            </h2>
            <div className="w-8 h-0.5 mb-2" style={{ backgroundColor: color }} />
            <div className="space-y-2">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-gray-900">{edu.degree} {edu.field && `— ${edu.field}`}</p>
                      <p style={{ color }}>{edu.institution}</p>
                    </div>
                    <p className="text-gray-500 text-xs shrink-0 mt-0.5">
                      {edu.startDate && formatDate(edu.startDate)} – {edu.current ? 'Présent' : edu.endDate ? formatDate(edu.endDate) : ''}
                    </p>
                  </div>
                  {edu.description && (
                    <p className="text-gray-600 mt-0.5 leading-relaxed">{edu.description}</p>
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

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  return `${months[parseInt(month) - 1] ?? ''} ${year}`;
}
