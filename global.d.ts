/// <reference types="vite/client" />

declare module "*.css" {
  const content: string;
  export default content;
}

declare module "*.min.css" {
  const content: string;
  export default content;
}