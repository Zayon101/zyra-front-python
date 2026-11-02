import { Link } from 'react-router';

type CartaoAcessoProps = {
    numero: string;
    titulo: string;
    descricao: string;
    recursos: string[];
    destino: string;
    rotuloLink: string;
    variante: 'administracao' | 'pessoal';
};

export default function CartaoAcesso({
    numero,
    titulo,
    descricao,
    recursos,
    destino,
    rotuloLink,
    variante,
}: CartaoAcessoProps) {
    const administrativo = variante === 'administracao';

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-[2.4rem] border border-separator-light bg-white shadow-[0_10px_35px_rgba(35,30,35,0.05)] transition-shadow duration-300 hover:shadow-[0_14px_40px_rgba(35,30,35,0.1)]">
            <div className={`flex items-center justify-between px-8 py-6 tablet:px-10 ${administrativo ? 'bg-nav' : 'bg-brand'}`}>
                <p className="text-[1.3rem] font-bold uppercase tracking-[0.18em] text-white/90">
                    {administrativo ? 'Gestão do sistema' : 'Seu espaço'}
                </p>
                <span className="font-title text-[2.8rem] text-white/60" aria-hidden="true">{numero}</span>
            </div>
            <div className="flex flex-1 flex-col p-8 tablet:p-10">
                <h2 className="font-title text-[2.5rem] font-bold text-title tablet:text-[2.8rem]">{titulo}</h2>
                <p className="mt-4 text-[1.5rem] leading-[1.7] text-text-dark">{descricao}</p>
                <ul className="mt-8 flex flex-1 flex-col gap-4" aria-label={`Recursos da ${titulo.toLowerCase()}`}>
                    {recursos.map((recurso) => (
                        <li key={recurso} className="flex items-start gap-4 text-[1.5rem] text-text-dark">
                            <span className={`mt-[0.9rem] h-[0.7rem] w-[0.7rem] shrink-0 rounded-full ${administrativo ? 'bg-nav' : 'bg-brand'}`} aria-hidden="true" />
                            <span>{recurso}</span>
                        </li>
                    ))}
                </ul>
                <Link
                    to={destino}
                    className={`mt-10 inline-flex min-h-[4.8rem] items-center justify-center gap-3 rounded-xl px-6 py-3 text-center text-[1.5rem] font-bold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${administrativo ? 'bg-nav hover:bg-card-dark-green focus-visible:outline-nav' : 'bg-brand hover:bg-hover focus-visible:outline-brand'}`}
                >
                    {rotuloLink}
                    <span aria-hidden="true">→</span>
                </Link>
            </div>
        </article>
    );
}
