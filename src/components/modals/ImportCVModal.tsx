import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, Image, Loader2, CheckCircle2, AlertTriangle, Wand2 } from 'lucide-react';
import { useCVStore } from '@/store/useCVStore';
import { extractCVFromFile } from '@/lib/gemini';
import { CVData } from '@/types/cv';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Step = 'upload' | 'analyzing' | 'preview' | 'error';

const ACCEPTED = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];

export function ImportCVModal({ open, onClose }: Props) {
  const { cv, importCV } = useCVStore();
  const [step, setStep] = useState<Step>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [extracted, setExtracted] = useState<Partial<CVData> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleClose() {
    onClose();
    setStep('upload');
    setFile(null);
    setExtracted(null);
    setError(null);
  }

  async function processFile(f: File) {
    if (!ACCEPTED.includes(f.type)) {
      setError(`Format non supporté : ${f.type}. Accepté : PDF, PNG, JPG, WEBP`);
      setStep('error');
      return;
    }
    setFile(f);
    setStep('analyzing');
    setError(null);
    try {
      const result = await extractCVFromFile(f);
      setExtracted(result);
      setStep('preview');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de l\'analyse');
      setStep('error');
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) processFile(f);
  }, []);

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) processFile(f);
    e.target.value = '';
  }

  function handleImport() {
    if (!extracted) return;
    importCV({
      ...cv,
      personalInfo: { ...cv.personalInfo, ...extracted.personalInfo },
      experiences: extracted.experiences ?? cv.experiences,
      educations: extracted.educations ?? cv.educations,
      skills: extracted.skills ?? cv.skills,
    });
    handleClose();
  }

  const p = extracted?.personalInfo;
  const expCount = extracted?.experiences?.length ?? 0;
  const eduCount = extracted?.educations?.length ?? 0;
  const skillCount = extracted?.skills?.length ?? 0;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-600" />
            Importer un CV avec l'IA
          </DialogTitle>
          <DialogDescription>
            Gemini analyse votre CV existant et extrait automatiquement toutes les données.
          </DialogDescription>
        </DialogHeader>

        {step === 'upload' && (
          <div className="space-y-4">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onClick={() => fileRef.current?.click()}
              className={cn(
                'border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors',
                dragging ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
              )}
            >
              <Upload className="h-10 w-10 mx-auto mb-3 text-gray-300" />
              <p className="font-medium text-gray-700">Déposez votre CV ici</p>
              <p className="text-sm text-gray-400 mt-1">ou cliquez pour choisir un fichier</p>
              <div className="flex justify-center gap-3 mt-4">
                <span className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  <FileText className="h-3 w-3" /> PDF
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  <Image className="h-3 w-3" /> PNG / JPG / WEBP
                </span>
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        )}

        {step === 'analyzing' && (
          <div className="flex flex-col items-center py-10 gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-800">Gemini analyse votre CV...</p>
              <p className="text-sm text-gray-400 mt-1">
                {file?.name} — extraction en cours
              </p>
            </div>
            <div className="w-full max-w-xs space-y-1.5 text-xs text-gray-400">
              {['Lecture du document', 'Extraction des données', 'Structuration JSON'].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin text-purple-400" />
                  {s}...
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'preview' && extracted && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800">Extraction réussie !</p>
                <p className="text-xs text-green-600">Depuis : {file?.name}</p>
              </div>
            </div>

            <div className="border rounded-lg divide-y">
              <div className="p-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Identité</p>
                <p className="font-medium text-gray-900">
                  {p?.firstName} {p?.lastName}
                </p>
                {p?.title && <p className="text-sm text-gray-500">{p.title}</p>}
                {p?.email && <p className="text-xs text-gray-400">{p.email}</p>}
              </div>

              <div className="p-3 grid grid-cols-3 divide-x text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{expCount}</p>
                  <p className="text-xs text-gray-400">Expérience{expCount > 1 ? 's' : ''}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{eduCount}</p>
                  <p className="text-xs text-gray-400">Formation{eduCount > 1 ? 's' : ''}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{skillCount}</p>
                  <p className="text-xs text-gray-400">Compétence{skillCount > 1 ? 's' : ''}</p>
                </div>
              </div>

              {(extracted.experiences ?? []).length > 0 && (
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Expériences</p>
                  <div className="space-y-0.5">
                    {extracted.experiences!.slice(0, 3).map((e) => (
                      <p key={e.id} className="text-sm text-gray-700">
                        {e.position} <span className="text-gray-400">@{e.company}</span>
                      </p>
                    ))}
                    {expCount > 3 && <p className="text-xs text-gray-400">+{expCount - 3} autres</p>}
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-400 text-center">
              Ces données vont remplacer le contenu actuel de l'éditeur.
            </p>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('upload')}>
                Choisir un autre fichier
              </Button>
              <Button onClick={handleImport} className="flex-1 bg-purple-600 hover:bg-purple-700">
                <CheckCircle2 className="h-4 w-4" />
                Importer dans l'éditeur
              </Button>
            </div>
          </div>
        )}

        {step === 'error' && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Erreur d'analyse</p>
                <p className="text-sm text-red-600 mt-0.5">{error}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setStep('upload')}>
              Réessayer avec un autre fichier
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
