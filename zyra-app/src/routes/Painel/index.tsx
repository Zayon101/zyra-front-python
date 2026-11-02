import CartaoAcesso from '../../components/Painel/CartaoAcesso';

export default function Painel() {
    return (
        <main className="flex-1">
            <section className="relative overflow-hidden bg-nav px-6 pb-24 pt-20 text-white tablet:px-12 tablet:pb-28 tablet:pt-24 desktop:px-16">
                <div className="pointer-events-none absolute -right-24 -top-32 h-[32rem] w-[32rem] rounded-full border border-white/15" aria-hidden="true" />
                <div className="pointer-events-none absolute -right-8 -top-16 h-[23rem] w-[23rem] rounded-full border border-white/15" aria-hidden="true" />
                <div className="relative mx-auto max-w-[110rem]">
                    <p className="mb-6 text-[1.3rem] font-bold uppercase tracking-[0.22em] text-white/75">SoulUp + mobilidade urbana</p>
                    <h1 className="max-w-[75rem] font-title text-[3.5rem] font-bold leading-[1.2] mobile-lg:text-[4.2rem] tablet:text-[5.2rem]">
                        Seu caminho começa aqui.
                    </h1>
                    <p className="mt-6 max-w-[68rem] text-[1.7rem] leading-[1.7] text-white/85 tablet:text-[1.9rem]">
                        Conheça as áreas do painel Zyra para acompanhar pontos, passagens e a gestão do projeto.
                    </p>
                    <p className="mt-8 inline-flex rounded-full border border-white/30 px-5 py-2 text-[1.3rem] text-white/90">
                        Área administrativa conectada ao Python local
                    </p>
                </div>
            </section>

            <section aria-labelledby="titulo-acessos" className="mx-auto max-w-[120rem] px-6 pb-24 pt-16 mobile-lg:px-8 tablet:px-12 tablet:pt-20 desktop:px-16 desktop:pb-28">
                <div className="mb-10 max-w-[72rem]">
                    <p className="mb-3 text-[1.3rem] font-bold uppercase tracking-[0.18em] text-brand">Escolha sua área</p>
                    <h2 id="titulo-acessos" className="font-title text-[2.8rem] font-bold text-title tablet:text-[3.6rem]">Um painel para cada necessidade</h2>
                    <p className="mt-4 text-[1.6rem] leading-[1.7] text-text-dark">
                        A área administrativa permite operações reais no Oracle via API Python local. A área pessoal será conectada na próxima etapa.
                    </p>
                </div>
                <div className="grid grid-cols-1 items-stretch gap-8 tablet:grid-cols-2 tablet:gap-10">
                    <CartaoAcesso
                        numero="01"
                        titulo="Administração"
                        descricao="Visão geral do projeto e das ferramentas de gerenciamento do sistema."
                        recursos={['Gerenciamento de usuários', 'Crédito de pontos e resgate de passagens', 'Histórico e relatórios de utilização']}
                        destino="/painel/admin"
                        rotuloLink="Explorar área administrativa"
                        variante="administracao"
                    />
                    <CartaoAcesso
                        numero="02"
                        titulo="Minha área"
                        descricao="Seu espaço para acompanhar pontos, passagens e dados pessoais."
                        recursos={['Identificação por nome ou ID (em breve)', 'Consulta ao próprio saldo e histórico', 'Resgate de passagens com seus pontos']}
                        destino="/painel/usuario"
                        rotuloLink="Explorar área pessoal"
                        variante="pessoal"
                    />
                </div>
                <p className="mt-10 text-[1.3rem] leading-[1.6] text-text-dark">
                    Uso acadêmico local: a área administrativa ainda não possui autenticação e não deve ser publicada. A identificação por nome ou ID também não comprova identidade.
                </p>
            </section>
        </main>
    );
}
