/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_APP_MODE: string;
  readonly VITE_DEFAULT_USER: string;
  readonly VITE_DEFAULT_PASS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
