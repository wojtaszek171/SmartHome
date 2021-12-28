export {};

declare global {
   interface Window {
        REACT_APP_API_HOST: string;
        REACT_APP_API_PORT: string;
        REACT_APP_API_PATH: string;
   }
}
