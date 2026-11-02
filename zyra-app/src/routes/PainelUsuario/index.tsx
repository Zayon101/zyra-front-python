import EstruturaPainel from '../../components/Painel/EstruturaPainel';
import CartaoRecurso from '../../components/Painel/CartaoRecurso';

const RECURSOS = [
    { marcador: '01 / PERFIL', titulo: 'Meus dados', descricao: 'Conferir o cadastro selecionado e solicitar atualização do próprio nome.' },
    { marcador: '02 / SALDO', titulo: 'Meus pontos', descricao: 'Acompanhar o saldo de pontos SoulUp disponível para novas viagens.' },
    { marcador: '03 / VIAGENS', titulo: 'Resgatar passagens', descricao: 'Escolher a modalidade de passagem e validar o saldo antes do resgate.' },
    { marcador: '04 / HISTÓRICO', titulo: 'Minhas trocas', descricao: 'Consultar as passagens resgatadas e os pontos utilizados.' },
];

export default function PainelUsuario() {
    return (
        <EstruturaPainel
            area="Área pessoal"
            titulo="Seu espaço no Zyra"
            descricao="Uma visão individual dos pontos acumulados e das viagens que poderão ser resgatadas."
        >
            <section aria-labelledby="identificacao-usuario" className="rounded-[2rem] border border-separator-light bg-white p-8 shadow-[0_4px_20px_rgba(35,30,35,0.03)] tablet:p-12">
                <div className="grid grid-cols-1 gap-8 tablet:grid-cols-[1fr_auto] tablet:items-center">
                    <div>
                        <p className="mb-3 text-[1.2rem] font-bold uppercase tracking-[0.18em] text-brand">Etapa futura</p>
                        <h2 id="identificacao-usuario" className="font-title text-[2.3rem] font-bold text-title">Identificação do usuário</h2>
                        <p className="mt-4 max-w-[73rem] text-[1.5rem] leading-[1.7] text-text-dark">
                            O acesso demonstrativo por nome ou ID será implementado no próximo lote. Ainda não há formulário de identificação ativo.
                        </p>
                    </div>
                    <div className="rounded-xl bg-card-light-yellow px-6 py-4 text-center text-[1.3rem] font-semibold text-text-dark">Acesso não implementado</div>
                </div>
                <p className="mt-7 border-t border-separator-light pt-5 text-[1.3rem] leading-[1.7] text-text-dark">
                    Atenção: nome e ID são identificadores públicos, não credenciais seguras. A futura área pessoal será adequada apenas à demonstração local até existir autenticação real no backend.
                </p>
            </section>

            <section aria-labelledby="recursos-pessoais" className="mt-12">
                <h2 id="recursos-pessoais" className="mb-7 font-title text-[2.3rem] font-bold text-title">O que você encontrará aqui</h2>
                <div className="grid grid-cols-1 gap-6 mobile-lg:grid-cols-2 desktop:grid-cols-4">
                    {RECURSOS.map((recurso) => <CartaoRecurso key={recurso.titulo} {...recurso} />)}
                </div>
            </section>
        </EstruturaPainel>
    );
}
