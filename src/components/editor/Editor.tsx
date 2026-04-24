import { useCVStore } from '@/store/useCVStore';
import { ProfileEditor } from './ProfileEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { EducationEditor } from './EducationEditor';
import { SkillsEditor } from './SkillsEditor';
import { StyleEditor } from './StyleEditor';

export function Editor() {
  const { activeSection } = useCVStore();

  const panels = {
    profile: <ProfileEditor />,
    experience: <ExperienceEditor />,
    education: <EducationEditor />,
    skills: <SkillsEditor />,
    style: <StyleEditor />,
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
        {panels[activeSection as keyof typeof panels]}
      </div>
    </div>
  );
}
