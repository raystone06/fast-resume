import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Editor } from '@/components/editor/Editor';
import { Preview } from '@/components/preview/Preview';
import { ATSModal } from '@/components/modals/ATSModal';
import { ImportCVModal } from '@/components/modals/ImportCVModal';

export default function App() {
  const [atsOpen, setATSOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <Header onOpenATS={() => setATSOpen(true)} onOpenImportAI={() => setImportOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="w-[380px] shrink-0 border-r flex flex-col overflow-hidden bg-gray-50">
          <Editor />
        </div>

        <div className="flex-1 overflow-hidden">
          <Preview />
        </div>
      </div>

      <ATSModal open={atsOpen} onClose={() => setATSOpen(false)} />
      <ImportCVModal open={importOpen} onClose={() => setImportOpen(false)} />
    </div>
  );
}
