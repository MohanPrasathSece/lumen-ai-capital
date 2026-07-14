/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CRM_ENDPOINT: string;
  readonly VITE_CRM_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
