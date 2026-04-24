import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { improveText } from '@/lib/gemini';

interface AIOptimizeButtonProps {
  fieldLabel: string;
  currentText: string;
  onResult: (text: string) => void;
}

export function AIOptimizeButton({ fieldLabel, currentText, onResult }: AIOptimizeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (!currentText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const improved = await improveText(fieldLabel, currentText);
      onResult(improved);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur Gemini');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleClick}
        disabled={loading || !currentText.trim()}
        className="gap-1.5 text-purple-600 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Sparkles className="h-3.5 w-3.5" />
        )}
        {loading ? 'Optimisation...' : '✨ Optimiser avec Gemini'}
      </Button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
