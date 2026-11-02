type CartaoRecursoProps = {
    titulo: string;
    descricao: string;
    marcador: string;
};

export default function CartaoRecurso({ titulo, descricao, marcador }: CartaoRecursoProps) {
    return (
        <article className="rounded-[1.8rem] border border-separator-light bg-white p-7 shadow-[0_4px_20px_rgba(35,30,35,0.03)] tablet:p-8">
            <span className="inline-flex min-h-[3.5rem] items-center rounded-lg bg-card-light-green px-4 text-[1.2rem] font-bold tracking-wide text-nav" aria-hidden="true">
                {marcador}
            </span>
            <h3 className="mt-6 font-title text-[1.9rem] font-bold text-title">{titulo}</h3>
            <p className="mt-3 text-[1.4rem] leading-[1.7] text-text-dark">{descricao}</p>
        </article>
    );
}
