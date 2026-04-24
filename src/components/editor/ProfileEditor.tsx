import { useCVStore } from '@/store/useCVStore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AIOptimizeButton } from './AIOptimizeButton';

export function ProfileEditor() {
  const { cv, updatePersonalInfo } = useCVStore();
  const { personalInfo: p } = cv;

  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-gray-800">Informations personnelles</h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Prénom</Label>
          <Input
            value={p.firstName}
            onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
            placeholder="Jean"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Nom</Label>
          <Input
            value={p.lastName}
            onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
            placeholder="Dupont"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Titre / Poste souhaité</Label>
        <Input
          value={p.title}
          onChange={(e) => updatePersonalInfo({ title: e.target.value })}
          placeholder="Développeur Full-Stack Senior"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input
            type="email"
            value={p.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            placeholder="jean@email.com"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Téléphone</Label>
          <Input
            value={p.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            placeholder="+33 6 12 34 56 78"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Localisation</Label>
          <Input
            value={p.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            placeholder="Paris, France"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Site web</Label>
          <Input
            value={p.website}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            placeholder="monsite.dev"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>LinkedIn</Label>
        <Input
          value={p.linkedin}
          onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
          placeholder="linkedin.com/in/jeandupont"
        />
      </div>

      <div className="space-y-1.5">
        <Label>Résumé / Accroche</Label>
        <Textarea
          value={p.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          rows={4}
          placeholder="Décrivez votre profil en 3-4 phrases percutantes..."
        />
        <AIOptimizeButton
          fieldLabel="Résumé professionnel"
          currentText={p.summary}
          onResult={(text) => updatePersonalInfo({ summary: text })}
        />
      </div>
    </div>
  );
}
