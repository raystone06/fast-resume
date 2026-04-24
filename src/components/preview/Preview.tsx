import { useCVStore } from '@/store/useCVStore';
import { TemplateModern } from './TemplateModern';
import { TemplateClassic } from './TemplateClassic';
import { TemplateMinimal } from './TemplateMinimal';
import { TemplateCreative } from './TemplateCreative';
import { TemplateExecutive } from './TemplateExecutive';
import { TemplateTech } from './TemplateTech';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CVData, TemplateId } from '@/types/cv';

const templates: { id: TemplateId; label: string }[] = [
  { id: 'modern', label: 'Moderne' },
  { id: 'classic', label: 'Classique' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'creative', label: 'Créatif' },
  { id: 'executive', label: 'Executive' },
  { id: 'tech', label: 'Tech' },
];

const components: Record<TemplateId, React.ComponentType<{ cv: CVData }>> = {
  modern: TemplateModern,
  classic: TemplateClassic,
  minimal: TemplateMinimal,
  creative: TemplateCreative,
  executive: TemplateExecutive,
  tech: TemplateTech,
};

export function Preview() {
  const { cv, updateStyle } = useCVStore();
  const { style } = cv;

  const Template = components[style.template] ?? TemplateModern;

  return (
    <div className="flex flex-col h-full bg-gray-100 overflow-hidden">
      {/* Template switcher */}
      <div className="flex items-center gap-1 p-2 bg-white border-b shrink-0 overflow-x-auto">
        {templates.map(({ id, label }) => (
          <Button
            key={id}
            variant={style.template === id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => updateStyle({ template: id })}
            className={cn('text-xs h-7 shrink-0', style.template === id && 'bg-blue-600')}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto p-4 flex justify-center">
        <div style={{ transform: 'scale(0.72)', transformOrigin: 'top center' }}>
          <Template cv={cv} />
        </div>
      </div>
    </div>
  );
}
