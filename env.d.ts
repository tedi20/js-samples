/// <reference types="vite/client" />

/**
 *  @external https://vitejs.dev/guide/env-and-mode.html
 */
interface ImportMetaEnv {
  readonly KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
