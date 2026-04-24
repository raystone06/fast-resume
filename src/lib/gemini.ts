import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuid } from 'uuid';
import { CVData } from '../types/cv';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

function getClient() {
  if (!apiKey || apiKey === 'ton_api_key_ici') {
    throw new Error('Clé API Gemini non configurée. Ajoutez VITE_GEMINI_API_KEY dans .env');
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function improveText(fieldLabel: string, currentText: string): Promise<string> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `Tu es un expert en rédaction de CV professionnels en français.
Reformule et améliore le texte suivant pour le champ "${fieldLabel}" d'un CV.
Le texte doit être professionnel, percutant, concis et orienté résultats.
Réponds UNIQUEMENT avec le texte amélioré, sans explication ni introduction.

Texte original :
${currentText}`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

export async function analyzeATS(cv: CVData, jobDescription: string): Promise<ATSResult> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const cvJson = JSON.stringify(cv, null, 2);

  const prompt = `Tu es un expert ATS (Applicant Tracking System) et recrutement.
Analyse ce CV par rapport à la description de poste fournie.
Réponds UNIQUEMENT en JSON valide avec cette structure exacte :
{
  "score": <nombre entre 0 et 100>,
  "matchedKeywords": [<liste des mots-clés trouvés>],
  "missingKeywords": [<liste des mots-clés manquants importants>],
  "strengths": [<liste des points forts>],
  "improvements": [<liste des améliorations suggérées>],
  "summary": "<résumé de l'analyse en 2-3 phrases>"
}

CV :
${cvJson}

Description du poste :
${jobDescription}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Réponse Gemini invalide');

  return JSON.parse(jsonMatch[0]) as ATSResult;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

export async function extractCVFromFile(file: File): Promise<Partial<CVData>> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const buffer = await file.arrayBuffer();
  const base64 = arrayBufferToBase64(buffer);

  const prompt = `Tu es un parseur de CV expert. Extrais TOUTES les informations de ce document.
Réponds UNIQUEMENT avec du JSON valide (pas de markdown, pas d'explication) avec cette structure :
{
  "personalInfo": {
    "firstName": "",
    "lastName": "",
    "title": "",
    "email": "",
    "phone": "",
    "location": "",
    "website": "",
    "linkedin": "",
    "summary": ""
  },
  "experiences": [
    {
      "company": "",
      "position": "",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "current": false,
      "description": "",
      "achievements": []
    }
  ],
  "educations": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "current": false,
      "description": ""
    }
  ],
  "skills": [
    {
      "name": "",
      "level": "expert",
      "category": ""
    }
  ]
}
Niveaux de compétence possibles : débutant, intermédiaire, avancé, expert.
Dates au format YYYY-MM. Si seule l'année est connue, utilise YYYY-01.
Si un champ est absent du document, laisse une chaîne vide "".`;

  const result = await model.generateContent([
    prompt,
    { inlineData: { mimeType: file.type, data: base64 } },
  ]);

  const text = result.response.text().trim();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Gemini n\'a pas retourné de JSON valide');

  const parsed = JSON.parse(jsonMatch[0]);

  return {
    personalInfo: parsed.personalInfo ?? {},
    experiences: (parsed.experiences ?? []).map((e: object) => ({ ...e, id: uuid() })),
    educations: (parsed.educations ?? []).map((e: object) => ({ ...e, id: uuid() })),
    skills: (parsed.skills ?? []).map((s: object) => ({ ...s, id: uuid() })),
  };
}

export interface ATSResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  improvements: string[];
  summary: string;
}
