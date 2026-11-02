import type { ReactNode } from 'react';
import { Link } from 'react-router';

type EstruturaPainelProps = {
    area: string;
    titulo: string;
    descricao: string;
    children: ReactNode;
};

/** Estrutura compartilhada pelas duas áreas do painel durante a etapa visual. */
export default function EstruturaPainel({ area, titulo, descricao, children }: EstruturaPainelProps) {
    return (
        <main className="flex-1">
            <section className="mx-auto max-w-[120rem] px-6 pb-20 pt-12 mobile-lg:px-8 tablet:px-12 tablet:pt-16 desktop:px-16 desktop:pb-28">
                <nav aria-label="Caminho do painel" className="mb-10 text-[1.4rem]">
                    <Link to="/painel" className="font-semibold text-nav underline-offset-4 hover:underline focus-visible:underline">
                        Painel Zyra
                    </Link>
                    <span className="mx-3 text-separator-dark" aria-hidden="true">/</span>
                    <span aria-current="page" className="text-text-dark">{area}</span>
                </nav>

                <div className="mb-10 max-w-[78rem]">
                    <p className="mb-4 text-[1.3rem] font-bold uppercase tracking-[0.2em] text-brand">{area}</p>
                    <h1 className="font-title text-[3rem] font-bold leading-[1.2] text-title tablet:text-[4.2rem]">{titulo}</h1>
                    <p className="mt-5 text-[1.6rem] leading-[1.75] text-text-dark tablet:text-[1.8rem]">{descricao}</p>
                </div>

                <div role="status" className="mb-10 rounded-xl border border-separator-light bg-card-light-yellow px-6 py-5 text-[1.4rem] leading-[1.65] text-text-dark tablet:px-8">
                    <strong>Prévia de interface:</strong> esta etapa apresenta apenas a estrutura das páginas. Ainda não há login nem consultas ou alterações no Oracle por esta interface.
                </div>
                {children}
            </section>
        </main>
    );
}
