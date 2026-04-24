import { v4 as uuid } from 'uuid';
import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '@/store/useCVStore';
import { Skill, SkillLevel } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const levels: SkillLevel[] = ['débutant', 'intermédiaire', 'avancé', 'expert'];

const levelColors: Record<SkillLevel, string> = {
  débutant: 'bg-gray-200',
  intermédiaire: 'bg-blue-200',
  avancé: 'bg-blue-400',
  expert: 'bg-blue-600',
};

function SkillRow({ skill }: { skill: Skill }) {
  const { updateSkill, removeSkill } = useCVStore();

  return (
    <div className="flex items-center gap-2 p-2 bg-white border rounded-lg">
      <div className="flex-1 grid grid-cols-3 gap-2">
        <Input
          value={skill.name}
          onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
          placeholder="React"
          className="h-8 text-sm"
        />
        <Input
          value={skill.category}
          onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
          placeholder="Frontend"
          className="h-8 text-sm"
        />
        <Select
          value={skill.level}
          onValueChange={(v) => updateSkill(skill.id, { level: v as SkillLevel })}
        >
          <SelectTrigger className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {levels.map((l) => (
              <SelectItem key={l} value={l}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${levelColors[l]}`} />
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <button
        onClick={() => removeSkill(skill.id)}
        className="text-red-400 hover:text-red-600 p-1 shrink-0"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function SkillsEditor() {
  const { cv, addSkill } = useCVStore();

  const categories = [...new Set(cv.skills.map((s) => s.category).filter(Boolean))];

  function handleAdd() {
    addSkill({
      id: uuid(),
      name: '',
      level: 'intermédiaire',
      category: '',
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Compétences</h2>
        <Button type="button" size="sm" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {cv.skills.length > 0 && (
        <div className="grid grid-cols-3 gap-2 px-2 text-xs font-medium text-gray-500">
          <span>Compétence</span>
          <span>Catégorie</span>
          <span>Niveau</span>
        </div>
      )}

      {cv.skills.length === 0 ? (
        <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg">
          <p className="text-sm">Aucune compétence. Cliquez sur "Ajouter".</p>
        </div>
      ) : (
        <div className="space-y-2">
          {categories.length > 0
            ? categories.map((cat) => (
                <div key={cat}>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 px-2">
                    {cat}
                  </p>
                  {cv.skills.filter((s) => s.category === cat).map((s) => (
                    <div key={s.id} className="mb-1">
                      <SkillRow skill={s} />
                    </div>
                  ))}
                </div>
              ))
            : cv.skills.map((s) => <SkillRow key={s.id} skill={s} />)}

          {cv.skills.filter((s) => !s.category).length > 0 && (
            <div>
              {cv.skills.filter((s) => !s.category).map((s) => (
                <div key={s.id} className="mb-1">
                  <SkillRow skill={s} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 flex-wrap pt-2">
        {levels.map((l) => (
          <div key={l} className="flex items-center gap-1 text-xs text-gray-500">
            <div className={`w-2.5 h-2.5 rounded-full ${levelColors[l]}`} />
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
}
