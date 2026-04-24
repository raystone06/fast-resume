# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # tsc + vite build (production)
npm run preview  # Preview production build
```

No lint or test commands configured.

## Architecture

React 18 + TypeScript SPA — AI-powered CV editor. French-language UI throughout.

**Data flow:** Editor components → Zustand store → Preview templates (real-time)

**State:** `/src/store/useCVStore.ts` — single Zustand store for all CV data. No persistence (client-side only).

**Types:** `/src/types/cv.ts` — core interfaces: `CVData`, `PersonalInfo`, `Experience`, `Education`, `Skill`, `CVStyle`, `TemplateId`.

**AI layer:** `/src/lib/gemini.ts` — three Gemini 2.5-Flash functions:
- `improveText()` — enhance CV field text
- `analyzeATS()` — score CV against job description
- `extractCVFromFile()` — parse uploaded PDF/image into CV JSON

**PDF export:** `/src/lib/pdfExport.ts` — html2canvas → jsPDF pipeline from rendered preview DOM.

**Templates:** 6 templates in `/src/components/preview/` (Modern, Classic, Minimal, Creative, Executive, Tech). Each reads from store, renders independently.

**Components tree:**
```
App
├── Header          — ATS, AI import, JSON import, PDF export buttons
├── Sidebar         — section navigation (profile/experience/education/skills/style)
├── Editor section  — ProfileEditor, ExperienceEditor, EducationEditor, SkillsEditor, StyleEditor + AIOptimizeButton
└── Preview pane    — active template component
```

**UI:** Radix UI primitives + custom Shadcn-style wrappers in `/src/components/ui/`. Icons via Lucide React.

## Config

- Path alias: `@/*` → `src/*` (configured in both `vite.config.ts` and `tsconfig.json`)
- Tailwind with custom fonts: Inter, Playfair Display, Roboto (loaded via Google Fonts in `index.html`)
- Gemini API key in `.env` as `VITE_GEMINI_API_KEY`
- Docker + Nginx configs present but not wired into npm scripts
