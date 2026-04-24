import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useCVStore } from '@/store/useCVStore';
import { Education } from '@/types/cv';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AIOptimizeButton } from './AIOptimizeButton';

function EducationCard({ edu }: { edu: Education }) {
  const { updateEducation, removeEducation } = useCVStore();
  const [open, setOpen] = useState(true);

  function update(field: Partial<Education>) {
    updateEducation(edu.id, field);
  }

  return (
    <div className="border rounded-lg bg-white">
      <div
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <p className="font-medium text-sm text-gray-800">
            {edu.degree || 'Diplôme'} {edu.field && `— ${edu.field}`}
          </p>
          <p className="text-xs text-gray-500">{edu.institution || 'Établissement'}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); removeEducation(edu.id); }}
            className="text-red-400 hover:text-red-600 p-1"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          {open ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
        </div>
      </div>

      {open && (
        <div className="px-3 pb-3 space-y-3 border-t pt-3">
          <div className="space-y-1.5">
            <Label>Établissement</Label>
            <Input value={edu.institution} onChange={(e) => update({ institution: e.target.value })} placeholder="École Polytechnique" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Diplôme</Label>
              <Input value={edu.degree} onChange={(e) => update({ degree: e.target.value })} placeholder="Master / Licence..." />
            </div>
            <div className="space-y-1.5">
              <Label>Spécialité</Label>
              <Input value={edu.field} onChange={(e) => update({ field: e.target.value })} placeholder="Informatique" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label>Début</Label>
              <Input type="month" value={edu.startDate} onChange={(e) => update({ startDate: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Fin</Label>
              <Input type="month" value={edu.endDate} onChange={(e) => update({ endDate: e.target.value })} disabled={edu.current} />
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={edu.current}
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
              value={edu.description}
              onChange={(e) => update({ description: e.target.value })}
              rows={2}
              placeholder="Mémoire, projets notables..."
            />
            <AIOptimizeButton
              fieldLabel="Description de formation"
              currentText={edu.description}
              onResult={(text) => update({ description: text })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function EducationEditor() {
  const { cv, addEducation } = useCVStore();

  function handleAdd() {
    addEducation({
      id: uuid(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Formations</h2>
        <Button type="button" size="sm" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {cv.educations.length === 0 ? (
        <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg">
          <p className="text-sm">Aucune formation. Cliquez sur "Ajouter".</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cv.educations.map((edu) => (
            <EducationCard key={edu.id} edu={edu} />
          ))}
        </div>
      )}
    </div>
  );
}
