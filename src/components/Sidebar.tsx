import { User, Briefcase, GraduationCap, Zap, Palette } from 'lucide-react';
import { useCVStore } from '@/store/useCVStore';
import { SectionId } from '@/types/cv';
import { cn } from '@/lib/utils';

const sections: { id: SectionId; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { id: 'profile', icon: User, label: 'Profil' },
  { id: 'experience', icon: Briefcase, label: 'Expériences' },
  { id: 'education', icon: GraduationCap, label: 'Formations' },
  { id: 'skills', icon: Zap, label: 'Compétences' },
  { id: 'style', icon: Palette, label: 'Style' },
];

export function Sidebar() {
  const { activeSection, setActiveSection } = useCVStore();

  return (
    <aside className="w-16 border-r bg-gray-50 flex flex-col items-center py-4 gap-2 shrink-0">
      {sections.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setActiveSection(id)}
          title={label}
          className={cn(
            'w-11 h-11 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-colors text-[9px] font-medium',
            activeSection === id
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-500 hover:bg-gray-200 hover:text-gray-800'
          )}
        >
          <Icon className="h-5 w-5" />
          <span className="leading-none">{label.slice(0, 5)}</span>
        </button>
      ))}
    </aside>
  );
}
