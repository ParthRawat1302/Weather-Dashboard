/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string; // Add all your env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
