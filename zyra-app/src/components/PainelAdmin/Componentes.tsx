import type { ReactNode } from 'react';

export const CAMPO = 'w-full rounded-xl border border-separator-light bg-white px-5 py-3 text-[1.5rem] text-title outline-offset-2 focus-visible:outline-2 focus-visible:outline-nav disabled:cursor-not-allowed disabled:bg-card-gray/40';
export const BOTAO = 'rounded-xl bg-nav px-6 py-3 text-[1.4rem] font-bold text-white transition-colors hover:bg-card-dark-green/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nav disabled:cursor-not-allowed disabled:opacity-50';
export const BOTAO_SECUNDARIO = 'rounded-xl border border-nav px-5 py-3 text-[1.4rem] font-bold text-nav transition-colors hover:bg-card-light-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nav disabled:cursor-not-allowed disabled:opacity-50';
export const BOTAO_PERIGO = 'rounded-xl bg-brand px-6 py-3 text-[1.4rem] font-bold text-white hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50';

export function Secao({ id, titulo, descricao, children }: { id: string; titulo: string; descricao?: string; children: ReactNode }) {
    return (
        <section aria-labelledby={id} className="rounded-[2rem] border border-separator-light bg-white p-6 shadow-sm mobile-lg:p-8 tablet:p-10">
            <h2 id={id} className="font-title text-[2.2rem] font-bold text-title">{titulo}</h2>
            {descricao && <p className="mb-7 mt-2 text-[1.4rem] leading-[1.6] text-text-dark">{descricao}</p>}
            {!descricao && <div className="mb-7" />}
            {children}
        </section>
    );
}

export function CampoRotulado({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-[1.4rem] font-bold text-title">{titulo}</label>
            {children}
        </div>
    );
}

export function Aviso({ tipo, children }: { tipo: 'erro' | 'sucesso'; children: ReactNode }) {
    return (
        <div role={tipo === 'erro' ? 'alert' : 'status'} className={`rounded-xl border px-6 py-4 text-[1.4rem] leading-[1.6] ${tipo === 'erro' ? 'border-brand/40 bg-card-light-yellow text-brand' : 'border-nav/30 bg-card-light-green text-nav'}`}>
            {children}
        </div>
    );
}
