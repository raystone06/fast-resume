import { useCVStore } from '@/store/useCVStore';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TemplateId, FontFamily, FontSize } from '@/types/cv';
import { cn } from '@/lib/utils';

const templates: { id: TemplateId; label: string; description: string; preview: string }[] = [
  {
    id: 'modern',
    label: 'Moderne',
    description: 'Sidebar colorée, design épuré',
    preview: 'bg-gradient-to-br from-blue-500 to-blue-700',
  },
  {
    id: 'classic',
    label: 'Classique',
    description: 'En-tête professionnel, deux colonnes',
    preview: 'bg-gradient-to-br from-gray-700 to-gray-900',
  },
  {
    id: 'minimal',
    label: 'Minimaliste',
    description: 'Une colonne, noir et blanc',
    preview: 'bg-gradient-to-br from-gray-100 to-gray-300',
  },
];

const colors = [
  { value: '#2563eb', label: 'Bleu' },
  { value: '#dc2626', label: 'Rouge' },
  { value: '#16a34a', label: 'Vert' },
  { value: '#9333ea', label: 'Violet' },
  { value: '#ea580c', label: 'Orange' },
  { value: '#0891b2', label: 'Cyan' },
  { value: '#374151', label: 'Gris foncé' },
  { value: '#111827', label: 'Noir' },
];

export function StyleEditor() {
  const { cv, updateStyle } = useCVStore();
  const { style } = cv;

  return (
    <div className="space-y-6">
      <h2 className="text-base font-semibold text-gray-800">Style du CV</h2>

      <div className="space-y-3">
        <Label>Template</Label>
        <div className="grid grid-cols-1 gap-3">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => updateStyle({ template: t.id })}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-colors',
                style.template === t.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <div className={cn('w-10 h-12 rounded shrink-0', t.preview)} />
              <div>
                <p className="font-medium text-sm text-gray-800">{t.label}</p>
                <p className="text-xs text-gray-500">{t.description}</p>
              </div>
              {style.template === t.id && (
                <div className="ml-auto w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Couleur principale</Label>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c.value}
              title={c.label}
              onClick={() => updateStyle({ primaryColor: c.value })}
              style={{ backgroundColor: c.value }}
              className={cn(
                'w-8 h-8 rounded-full transition-transform',
                style.primaryColor === c.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-105'
              )}
            />
          ))}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={style.primaryColor}
              onChange={(e) => updateStyle({ primaryColor: e.target.value })}
              className="w-8 h-8 rounded-full cursor-pointer border border-gray-200"
              title="Couleur personnalisée"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Police</Label>
        <Select
          value={style.fontFamily}
          onValueChange={(v) => updateStyle({ fontFamily: v as FontFamily })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter">Inter (moderne)</SelectItem>
            <SelectItem value="Playfair Display">Playfair Display (élégant)</SelectItem>
            <SelectItem value="Roboto">Roboto (lisible)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Taille du texte</Label>
        <Select
          value={style.fontSize}
          onValueChange={(v) => updateStyle({ fontSize: v as FontSize })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Petite</SelectItem>
            <SelectItem value="medium">Moyenne</SelectItem>
            <SelectItem value="large">Grande</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
