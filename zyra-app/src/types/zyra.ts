/** Contratos JSON expostos pela API local do backend Python. */
export type TrocaZyra = {
    id: number;
    data: string;
    passagem: string;
    viagens: number;
    custo: number;
    valor: number;
};

export type UsuarioZyra = {
    id: number;
    nome: string;
    pontos: number;
    historico: TrocaZyra[];
};

export type ResumoZyra = {
    total_usuarios: number;
    total_pontos: number;
    valor_total_saldo_reais: number;
    total_trocas: number;
    total_viagens: number;
    valor_total_resgatado_reais: number;
};

export type PassagemZyra = {
    tipo: number;
    nome: string;
    viagens: number;
    custo_pontos: number;
};

export type CatalogoPassagensZyra = {
    pontos_por_passagem: number;
    valor_passagem_reais: number;
    passagens: PassagemZyra[];
};
