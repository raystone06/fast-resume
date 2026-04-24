import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useCVStore } from '@/store/useCVStore';
import { Experience } from '@/types/cv';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AIOptimizeButton } from './AIOptimizeButton';

function ExperienceCard({ exp }: { exp: Experience }) {
  const { updateExperience, removeExperience } = useCVStore();
  const [open, setOpen] = useState(true);

  function update(field: Partial<Experience>) {
    updateExperience(exp.id, field);
  }

  function updateAchievement(index: number, value: string) {
    const achievements = [...exp.achievements];
    achievements[index] = value;
    update({ achievements });
  }

  function addAchievement() {
    update({ achievements: [...exp.achievements, ''] });
  }

  function removeAchievement(index: number) {
    update({ achievements: exp.achievements.filter((_, i) => i !== index) });
  }

  return (
    <div className="border rounded-lg bg-white">
      <div
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <p className="font-medium text-sm text-gray-800">
            {exp.position || 'Nouveau poste'}
          </p>
          <p className="text-xs text-gray-500">{exp.company || 'Entreprise'}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }}
            className="text-red-400 hover:text-red-600 p-1"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          {open ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
        </div>
      </div>

      {open && (
        <div className="px-3 pb-3 space-y-3 border-t pt-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Entreprise</Label>
              <Input value={exp.company} onChange={(e) => update({ company: e.target.value })} placeholder="TechCorp" />
            </div>
            <div className="space-y-1.5">
              <Label>Poste</Label>
              <Input value={exp.position} onChange={(e) => update({ position: e.target.value })} placeholder="Lead Dev" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label>Début</Label>
              <Input type="month" value={exp.startDate} onChange={(e) => update({ startDate: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Fin</Label>
              <Input type="month" value={exp.endDate} onChange={(e) => update({ endDate: e.target.value })} disabled={exp.current} />
            </div>
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => update({ current: e.target.checked, endDate: '' })}
                  className="rounded"
                />
                En cours
              </label>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              value={exp.description}
              onChange={(e) => update({ description: e.target.value })}
              rows={3}
              placeholder="Décrivez vos responsabilités..."
            />
            <AIOptimizeButton
              fieldLabel="Description de poste"
              currentText={exp.description}
              onResult={(text) => update({ description: text })}
            />
          </div>

          <div className="space-y-2">
            <Label>Réalisations clés</Label>
            {exp.achievements.map((ach, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={ach}
                  onChange={(e) => updateAchievement(i, e.target.value)}
                  placeholder="Ex: Réduit le temps de chargement de 40%"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAchievement(i)}
                  className="shrink-0 text-red-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addAchievement}>
              <Plus className="h-3.5 w-3.5" />
              Ajouter une réalisation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ExperienceEditor() {
  const { cv, addExperience } = useCVStore();

  function handleAdd() {
    addExperience({
      id: uuid(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Expériences professionnelles</h2>
        <Button type="button" size="sm" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {cv.experiences.length === 0 ? (
        <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg">
          <p className="text-sm">Aucune expérience. Cliquez sur "Ajouter".</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cv.experiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      )}
    </div>
  );
}
