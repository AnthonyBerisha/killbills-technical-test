declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DB_USER: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_DRIVER: string;
    DB_PASSWORD: string;
    NODE_ENV: string;
  }
}
