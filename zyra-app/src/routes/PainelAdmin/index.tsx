import EstruturaPainel from '../../components/Painel/EstruturaPainel';
import CartaoRecurso from '../../components/Painel/CartaoRecurso';

const RECURSOS = [
    { marcador: '01 / CRUD', titulo: 'Usuários', descricao: 'Cadastrar, consultar, editar e excluir cadastros com os dados armazenados no Oracle.' },
    { marcador: '02 / PONTOS', titulo: 'Pontos e passagens', descricao: 'Gerenciar saldos, créditos e resgates de passagens com validações de negócio.' },
    { marcador: '03 / HISTÓRICO', titulo: 'Movimentações', descricao: 'Consultar trocas realizadas e acompanhar o histórico dos usuários.' },
    { marcador: '04 / DADOS', titulo: 'Relatórios', descricao: 'Visualizar indicadores gerais e exportar resultados de consultas para JSON.' },
];

export default function PainelAdmin() {
    return (
        <EstruturaPainel
            area="Administração"
            titulo="Gestão do Zyra"
            descricao="Um espaço para acompanhar o funcionamento do sistema e organizar suas operações em um único lugar."
        >
            <section aria-labelledby="recursos-administrativos">
                <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                    <h2 id="recursos-administrativos" className="font-title text-[2.3rem] font-bold text-title">Recursos previstos</h2>
                    <span className="rounded-full bg-card-light-green px-5 py-2 text-[1.2rem] font-bold text-nav">Integração pendente</span>
                </div>
                <div className="grid grid-cols-1 gap-6 mobile-lg:grid-cols-2 desktop:grid-cols-4">
                    {RECURSOS.map((recurso) => <CartaoRecurso key={recurso.titulo} {...recurso} />)}
                </div>
            </section>
            <section aria-labelledby="dados-admin" className="mt-12 rounded-[2rem] border border-separator-light bg-card-light-green p-8 tablet:p-12">
                <div className="max-w-[75rem]">
                    <h2 id="dados-admin" className="font-title text-[2.2rem] font-bold text-title">Dados do sistema</h2>
                    <p className="mt-4 text-[1.5rem] leading-[1.7] text-text-dark">
                        Aqui serão exibidos o total de usuários, pontos em circulação, viagens resgatadas e outros indicadores, consultados diretamente na API Python.
                    </p>
                    <p className="mt-5 text-[1.4rem] font-semibold text-nav">Nenhum dado foi carregado nesta prévia.</p>
                </div>
            </section>
        </EstruturaPainel>
    );
}
