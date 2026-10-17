import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./": os caminhos ficam relativos e o site funciona em
// https://<usuario>.github.io/<repositorio>/ sem configurar o nome do repositório.
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: { fs: { allow: [".."] } }, // o motor fica em ../motor
});
