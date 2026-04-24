import { useState } from 'react';
import { Target, Loader2, CheckCircle2, XCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { useCVStore } from '@/store/useCVStore';
import { analyzeATS, ATSResult } from '@/lib/gemini';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ATSModal({ open, onClose }: Props) {
  const { cv } = useCVStore();
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    if (!jobDescription.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await analyzeATS(cv, jobDescription);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de l\'analyse');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    onClose();
    setResult(null);
    setError(null);
    setJobDescription('');
  }

  const scoreColor =
    !result ? '#6b7280'
    : result.score >= 80 ? '#16a34a'
    : result.score >= 60 ? '#d97706'
    : '#dc2626';

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Analyse ATS — Compatibilité CV / Offre
          </DialogTitle>
          <DialogDescription>
            Collez la description du poste pour analyser la compatibilité de votre CV avec les systèmes ATS.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Description du poste</Label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              placeholder="Collez ici la description complète de l'offre d'emploi..."
              className="resize-none"
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={loading || !jobDescription.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyse en cours...
              </>
            ) : (
              <>
                <Target className="h-4 w-4" />
                Analyser avec Gemini AI
              </>
            )}
          </Button>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-4 animate-in fade-in">
              {/* Score */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border">
                <div>
                  <p className="text-sm font-medium text-gray-600">Score de compatibilité ATS</p>
                  <p className="text-xs text-gray-400 mt-0.5">{result.summary}</p>
                </div>
                <div className="text-right">
                  <div
                    className="text-4xl font-bold"
                    style={{ color: scoreColor }}
                  >
                    {result.score}
                    <span className="text-lg">/100</span>
                  </div>
                </div>
              </div>

              {/* Keywords matched */}
              {result.matchedKeywords.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <p className="text-sm font-medium text-gray-700">Mots-clés présents ({result.matchedKeywords.length})</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedKeywords.map((kw) => (
                      <Badge key={kw} variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Keywords missing */}
              {result.missingKeywords.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <p className="text-sm font-medium text-gray-700">Mots-clés manquants ({result.missingKeywords.length})</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((kw) => (
                      <Badge key={kw} variant="outline" className="text-red-600 border-red-200">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Strengths */}
              {result.strengths.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <p className="text-sm font-medium text-gray-700">Points forts</p>
                  </div>
                  <ul className="space-y-1">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {result.improvements.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <p className="text-sm font-medium text-gray-700">Améliorations suggérées</p>
                  </div>
                  <ul className="space-y-1">
                    {result.improvements.map((s, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
