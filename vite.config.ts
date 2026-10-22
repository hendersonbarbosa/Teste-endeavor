import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        impacto: "pages/impacto.html",
        empreendedores: "pages/empreendedores.html",
        empresas: "pages/empresas.html",
        processoSeletivo: "pages/processo-seletivo.html",
        rede: "pages/rede.html",
        parceiros: "pages/parceiros.html",
        sobre: "pages/sobre.html",
        carreiras: "pages/carreiras.html",
      },
    },
  },
});