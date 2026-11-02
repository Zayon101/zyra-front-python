import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 5173,
        strictPort: true,
        // Encaminha /api ao Python, mantendo o front e o backend em repositórios separados.
        proxy: { '/api': 'http://127.0.0.1:8765' },
    },
});
