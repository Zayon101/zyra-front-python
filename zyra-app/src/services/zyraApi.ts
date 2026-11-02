import type { CatalogoPassagensZyra, ResumoZyra, UsuarioZyra } from '../types/zyra';

// Em desenvolvimento, /api é encaminhado ao Python pelo proxy do Vite.
// VITE_ZYRA_API_URL pode sobrescrever a URL em outros ambientes.
const BASE_API = (import.meta.env.VITE_ZYRA_API_URL || '/api').replace(/\/+$/, '');

export class ErroApiZyra extends Error {
    constructor(mensagem: string, public readonly status?: number) {
        super(mensagem);
        this.name = 'ErroApiZyra';
    }
}

async function requisitar<T>(rota: string, metodo: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET', dados?: unknown): Promise<T> {
    let resposta: Response;
    try {
        resposta = await fetch(`${BASE_API}${rota}`, {
            method: metodo,
            headers: {
                Accept: 'application/json',
                ...(metodo === 'GET' ? {} : { 'X-Zyra-Cliente': 'painel-web' }),
                ...(dados === undefined ? {} : { 'Content-Type': 'application/json' }),
            },
            ...(dados === undefined ? {} : { body: JSON.stringify(dados) }),
            cache: 'no-store',
        });
    } catch {
        throw new ErroApiZyra('Não foi possível conectar ao Python. Confirme se servidor_web.py está em execução.');
    }

    let conteudo: unknown;
    try {
        conteudo = await resposta.json();
    } catch {
        throw new ErroApiZyra('A API retornou uma resposta que não é JSON.', resposta.status);
    }

    if (!resposta.ok) {
        const mensagem = typeof conteudo === 'object' && conteudo !== null && 'erro' in conteudo
            && typeof conteudo.erro === 'string' ? conteudo.erro : `Erro HTTP ${resposta.status}.`;
        throw new ErroApiZyra(mensagem, resposta.status);
    }
    return conteudo as T;
}

export const zyraApi = {
    listarUsuarios: () => requisitar<{ usuarios: UsuarioZyra[] }>('/usuarios'),
    consultarUsuario: (id: number) => requisitar<{ usuario: UsuarioZyra }>(`/usuarios/${id}`),
    cadastrarUsuario: (nome: string) => requisitar<{ usuario: UsuarioZyra }>('/usuarios', 'POST', { nome }),
    alterarNome: (id: number, nome: string) => requisitar<{ usuario: UsuarioZyra }>(`/usuarios/${id}`, 'PATCH', { nome }),
    definirSaldo: (id: number, pontos: number) => requisitar<{ usuario: UsuarioZyra }>(`/usuarios/${id}`, 'PATCH', { pontos }),
    creditarPontos: (id: number, quantidade: number) => requisitar<{ usuario: UsuarioZyra }>(`/usuarios/${id}/pontos`, 'POST', { quantidade }),
    resgatarPassagem: (id: number, tipo: number) => requisitar<{ usuario: UsuarioZyra }>(`/usuarios/${id}/resgates`, 'POST', { tipo }),
    excluirUsuario: (id: number) => requisitar<{ excluido: boolean; id: number }>(`/usuarios/${id}`, 'DELETE'),
    obterResumo: () => requisitar<ResumoZyra>('/resumo'),
    listarPassagens: () => requisitar<CatalogoPassagensZyra>('/passagens'),
};
