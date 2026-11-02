import type { ResumoZyra } from '../../types/zyra';

const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export default function ResumoIndicadores({ resumo }: { resumo: ResumoZyra }) {
    const indicadores = [
        { nome: 'Usuários cadastrados', valor: resumo.total_usuarios.toLocaleString('pt-BR') },
        { nome: 'Pontos em circulação', valor: resumo.total_pontos.toLocaleString('pt-BR') },
        { nome: 'Trocas realizadas', valor: resumo.total_trocas.toLocaleString('pt-BR') },
        { nome: 'Viagens resgatadas', valor: resumo.total_viagens.toLocaleString('pt-BR') },
        { nome: 'Saldo equivalente', valor: reais.format(resumo.valor_total_saldo_reais) },
        { nome: 'Valor resgatado', valor: reais.format(resumo.valor_total_resgatado_reais) },
    ];
    return <div className="grid grid-cols-1 gap-4 mobile-lg:grid-cols-2 desktop:grid-cols-3">
        {indicadores.map((dado) => <div key={dado.nome} className="rounded-xl bg-card-light-green px-6 py-5">
            <p className="text-[1.3rem] text-nav">{dado.nome}</p>
            <p className="mt-1 break-words font-title text-[2.2rem] font-bold text-title">{dado.valor}</p>
        </div>)}
    </div>;
}
