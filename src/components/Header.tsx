import { useRef } from 'react';
import { Upload, FileDown, Target, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCVStore } from '@/store/useCVStore';
import { exportToPDF } from '@/lib/pdfExport';
import { CVData } from '@/types/cv';

interface HeaderProps {
  onOpenATS: () => void;
  onOpenImportAI: () => void;
}

export function Header({ onOpenATS, onOpenImportAI }: HeaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const { cv, importCV } = useCVStore();

  function handleImportJSON(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string) as CVData;
        importCV(data);
      } catch {
        alert('Fichier JSON invalide');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  async function handleExport() {
    const name = `${cv.personalInfo.firstName}_${cv.personalInfo.lastName}_CV.pdf`;
    try {
      await exportToPDF('cv-preview', name);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Erreur export PDF');
    }
  }

  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
            <FileDown className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-gray-900">Fast Resume</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImportJSON}
        />

        <Button
          variant="outline"
          size="sm"
          onClick={onOpenImportAI}
          className="gap-1.5 text-purple-600 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
        >
          <Wand2 className="h-4 w-4" />
          Importer avec IA
        </Button>

        <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
          <Upload className="h-4 w-4" />
          JSON
        </Button>

        <Button variant="outline" size="sm" onClick={onOpenATS}>
          <Target className="h-4 w-4" />
          Score ATS
        </Button>

        <Button size="sm" onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
          <FileDown className="h-4 w-4" />
          Exporter PDF
        </Button>
      </div>
    </header>
  );
}
