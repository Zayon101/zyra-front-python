import type { TrocaZyra } from '../../types/zyra';

const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
function dataFormatada(data: string) {
    const valor = new Date(data);
    return Number.isNaN(valor.getTime()) ? data : valor.toLocaleString('pt-BR');
}

export default function HistoricoUsuario({ historico }: { historico: TrocaZyra[] }) {
    if (historico.length === 0) {
        return <p className="rounded-xl bg-card-light-yellow p-5 text-[1.4rem]">Ainda não há passagens resgatadas por este usuário.</p>;
    }
    return <div className="overflow-x-auto rounded-xl border border-separator-light">
        <table className="min-w-[62rem] w-full text-left text-[1.4rem]">
            <thead className="bg-card-light-green text-nav"><tr>
                <th scope="col" className="px-4 py-3">Troca</th><th scope="col" className="px-4 py-3">Passagem</th><th scope="col" className="px-4 py-3">Viagens</th><th scope="col" className="px-4 py-3">Pontos</th><th scope="col" className="px-4 py-3">Valor</th><th scope="col" className="px-4 py-3">Data</th>
            </tr></thead>
            <tbody>{historico.map((troca) => <tr key={troca.id} className="border-t border-separator-light/50">
                <td className="px-4 py-3">#{troca.id}</td><td className="px-4 py-3">{troca.passagem}</td>
                <td className="px-4 py-3">{troca.viagens}</td><td className="px-4 py-3">{troca.custo}</td>
                <td className="px-4 py-3">{reais.format(troca.valor)}</td><td className="px-4 py-3">{dataFormatada(troca.data)}</td>
            </tr>)}</tbody>
        </table>
    </div>;
}
