/** Baixa os dados consultados pela API em JSON, sem modificar registros do Oracle. */
export function exportarJson(nome: string, dados: unknown): void {
    const texto = JSON.stringify(dados, null, 2);
    const arquivo = new Blob([texto], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(arquivo);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${nome}-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    document.body.appendChild(link);
    try {
        link.click();
    } finally {
        link.remove();
        // Dá ao navegador tempo para iniciar o download antes de liberar a URL.
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
}
