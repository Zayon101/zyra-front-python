import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import EstruturaPainel from '../../components/Painel/EstruturaPainel';
import { Aviso, BOTAO, BOTAO_PERIGO, BOTAO_SECUNDARIO, CAMPO, CampoRotulado, Secao } from '../../components/PainelAdmin/Componentes';
import ListaUsuarios from '../../components/PainelAdmin/ListaUsuarios';
import HistoricoUsuario from '../../components/PainelAdmin/HistoricoUsuario';
import ResumoIndicadores from '../../components/PainelAdmin/ResumoIndicadores';
import { zyraApi } from '../../services/zyraApi';
import type { CatalogoPassagensZyra, ResumoZyra, UsuarioZyra } from '../../types/zyra';
import { exportarJson } from '../../utils/exportarJson';

type Aba = 'usuarios' | 'operacoes' | 'relatorios';
const LIMITE_PONTOS = 999_999_999_999; // NUMBER(12) do Oracle
const OPCOES: { id: Aba; titulo: string }[] = [
    { id: 'usuarios', titulo: 'Usuários e CRUD' },
    { id: 'operacoes', titulo: 'Pontos e passagens' },
    { id: 'relatorios', titulo: 'Relatórios e JSON' },
];

function numeroInteiro(texto: string, minimo: number): number {
    // Não usa Number('') (que retornaria zero) nem aceita valores fracionários.
    if (!/^\d+$/.test(texto.trim())) {
        throw new Error('Informe um número inteiro válido.');
    }
    const numero = Number(texto.trim());
    if (!Number.isSafeInteger(numero) || numero < minimo || numero > LIMITE_PONTOS) {
        throw new Error(`Informe um número inteiro entre ${minimo} e ${LIMITE_PONTOS.toLocaleString('pt-BR')}.`);
    }
    return numero;
}

function nomeValido(valor: string): string {
    const nome = valor.trim();
    if (nome.length < 3 || nome.length > 120) {
        throw new Error('O nome precisa ter entre 3 e 120 caracteres.');
    }
    return nome;
}

function mensagemErro(erro: unknown): string {
    return erro instanceof Error ? erro.message : 'Ocorreu um erro inesperado. Tente novamente.';
}

export default function PainelAdmin() {
    const [aba, setAba] = useState<Aba>('usuarios');
    const [usuarios, setUsuarios] = useState<UsuarioZyra[]>([]);
    const [resumo, setResumo] = useState<ResumoZyra | null>(null);
    const [catalogo, setCatalogo] = useState<CatalogoPassagensZyra | null>(null);
    const [selecionado, setSelecionado] = useState<UsuarioZyra | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [ocupado, setOcupado] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    const [sucesso, setSucesso] = useState<string | null>(null);

    const [filtro, setFiltro] = useState('');
    const [novoNome, setNovoNome] = useState('');
    const [nomeEdicao, setNomeEdicao] = useState('');
    const [novoSaldo, setNovoSaldo] = useState('');
    const [quantidadeCredito, setQuantidadeCredito] = useState('');
    const [tipoPassagem, setTipoPassagem] = useState('1');
    const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
    const [textoConfirmacao, setTextoConfirmacao] = useState('');

    useEffect(() => {
        let ativo = true;
        Promise.all([zyraApi.listarUsuarios(), zyraApi.obterResumo(), zyraApi.listarPassagens()])
            .then(([lista, resumoRecebido, passagens]) => {
                if (!ativo) return;
                setUsuarios(lista.usuarios);
                setResumo(resumoRecebido);
                setCatalogo(passagens);
            })
            .catch((falha: unknown) => {
                if (ativo) setErro(mensagemErro(falha));
            })
            .finally(() => { if (ativo) setCarregando(false); });
        return () => { ativo = false; };
    }, []);

    function atualizarSelecao(usuario: UsuarioZyra | null) {
        setSelecionado(usuario);
        setNomeEdicao(usuario?.nome ?? '');
        setNovoSaldo(usuario ? String(usuario.pontos) : '');
        setQuantidadeCredito('');
        setConfirmandoExclusao(false);
        setTextoConfirmacao('');
    }

    async function consultarUsuario(id: number) {
        setErro(null);
        setSucesso(null);
        setOcupado(true);
        try {
            const resultado = await zyraApi.consultarUsuario(id);
            atualizarSelecao(resultado.usuario);
        } catch (falha) {
            setErro(mensagemErro(falha));
        } finally {
            setOcupado(false);
        }
    }

    async function recarregar(idFoco: number | null) {
        const [lista, resumoRecebido, passagens] = await Promise.all([
            zyraApi.listarUsuarios(), zyraApi.obterResumo(), zyraApi.listarPassagens(),
        ]);
        // Verifica o registro selecionado novamente pela rota individual (READ).
        const usuarioAtualizado = idFoco === null || !lista.usuarios.some((usuario) => usuario.id === idFoco)
            ? null : (await zyraApi.consultarUsuario(idFoco)).usuario;
        setUsuarios(lista.usuarios);
        setResumo(resumoRecebido);
        setCatalogo(passagens);
        atualizarSelecao(usuarioAtualizado);
    }

    async function executar(operacao: () => Promise<number | null>, mensagem: string) {
        setErro(null);
        setSucesso(null);
        setOcupado(true);
        try {
            const idFoco = await operacao();
            await recarregar(idFoco);
            setSucesso(mensagem);
        } catch (falha) {
            setErro(`${mensagemErro(falha)} Se a operação chegou ao banco, use Atualizar dados para conferir o resultado.`);
        } finally {
            setOcupado(false);
        }
    }

    function cadastrar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        try {
            const nome = nomeValido(novoNome);
            void executar(async () => {
                const resultado = await zyraApi.cadastrarUsuario(nome);
                setNovoNome('');
                return resultado.usuario.id;
            }, 'Usuário cadastrado no Oracle com 500 pontos de bônus.');
        } catch (falha) { setErro(mensagemErro(falha)); setSucesso(null); }
    }

    function alterarNome(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        if (!selecionado) return;
        try {
            const nome = nomeValido(nomeEdicao);
            void executar(async () => { await zyraApi.alterarNome(selecionado.id, nome); return selecionado.id; }, 'Nome atualizado no Oracle.');
        } catch (falha) { setErro(mensagemErro(falha)); setSucesso(null); }
    }

    function definirSaldo(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        if (!selecionado) return;
        try {
            const pontos = numeroInteiro(novoSaldo, 0);
            void executar(async () => { await zyraApi.definirSaldo(selecionado.id, pontos); return selecionado.id; }, 'Saldo definido no Oracle.');
        } catch (falha) { setErro(mensagemErro(falha)); setSucesso(null); }
    }

    function adicionarPontos(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        if (!selecionado) return;
        try {
            const quantidade = numeroInteiro(quantidadeCredito, 1);
            void executar(async () => { await zyraApi.creditarPontos(selecionado.id, quantidade); return selecionado.id; }, 'Pontos creditados com sucesso.');
        } catch (falha) { setErro(mensagemErro(falha)); setSucesso(null); }
    }

    function resgatar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        if (!selecionado || !catalogo) return;
        const tipo = Number(tipoPassagem);
        if (!catalogo.passagens.some((passagem) => passagem.tipo === tipo)) {
            setErro('Selecione uma modalidade de passagem válida.');
            return;
        }
        void executar(async () => { await zyraApi.resgatarPassagem(selecionado.id, tipo); return selecionado.id; }, 'Passagem resgatada e registrada no Oracle.');
    }

    function excluir() {
        if (!selecionado || textoConfirmacao !== 'EXCLUIR') return;
        const id = selecionado.id;
        void executar(async () => { await zyraApi.excluirUsuario(id); return null; }, `Usuário #${id} e seu histórico foram excluídos.`);
    }

    function atualizar() {
        setErro(null);
        setSucesso(null);
        setOcupado(true);
        void recarregar(selecionado?.id ?? null).then(() => {
            setSucesso('Dados atualizados a partir do Oracle.');
        }).catch((falha: unknown) => setErro(mensagemErro(falha)))
            .finally(() => setOcupado(false));
    }

    const desabilitado = ocupado || carregando;

    return (
        <EstruturaPainel
            area="Administração"
            titulo="Gestão do Zyra"
            descricao="Cadastros, pontos, passagens e relatórios conectados ao Oracle através da API Python local."
            aviso="Ambiente acadêmico local: este painel administrativo não possui autenticação. Qualquer pessoa com acesso ao serviço local pode executar operações administrativas. Não publique a API na internet sem implementar controle de acesso real."
        >
            <div className="space-y-7">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-[1.4rem] font-semibold text-nav">Fonte dos dados: Oracle via API Python</p>
                    <button type="button" className={BOTAO_SECUNDARIO} onClick={atualizar} disabled={desabilitado}>Atualizar dados</button>
                </div>

                {erro && <Aviso tipo="erro">{erro}</Aviso>}
                {sucesso && <Aviso tipo="sucesso">{sucesso}</Aviso>}
                {carregando && <p role="status" className="rounded-xl bg-card-light-green p-6 text-[1.5rem]">Carregando dados do Oracle...</p>}

                {!carregando && <>
                    <nav aria-label="Seções administrativas" className="flex flex-wrap gap-3">
                        {OPCOES.map((opcao) => <button key={opcao.id} type="button" onClick={() => setAba(opcao.id)} aria-current={aba === opcao.id ? 'page' : undefined} className={aba === opcao.id ? BOTAO : BOTAO_SECUNDARIO}>{opcao.titulo}</button>)}
                    </nav>

                    {aba === 'usuarios' && <div className="grid gap-7 desktop:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                        <div className="space-y-7">
                            <Secao id="novo-cadastro" titulo="Cadastrar usuário" descricao="Novo cadastro recebe automaticamente 500 pontos de bônus.">
                                <form onSubmit={cadastrar} className="space-y-4">
                                    <CampoRotulado id="nome-cadastro" titulo="Nome do usuário">
                                        <input id="nome-cadastro" className={CAMPO} type="text" minLength={3} maxLength={120} required value={novoNome} onChange={(e) => setNovoNome(e.target.value)} placeholder="Nome completo" disabled={desabilitado} />
                                    </CampoRotulado>
                                    <button className={BOTAO} type="submit" disabled={desabilitado}>Cadastrar no Oracle</button>
                                </form>
                            </Secao>
                            <Secao id="lista-usuarios" titulo={`Usuários (${usuarios.length})`} descricao="Selecione um cadastro para consultar seus dados, editar ou gerenciar pontos.">
                                <ListaUsuarios usuarios={usuarios} idSelecionado={selecionado?.id ?? null} filtro={filtro} aoFiltrar={setFiltro} aoSelecionar={(id) => { void consultarUsuario(id); }} desabilitado={desabilitado} />
                            </Secao>
                        </div>
                        <div className="space-y-7">
                            <Secao id="detalhes-usuario" titulo="Consultar e alterar" descricao="Selecione um usuário na lista para visualizar e modificar o cadastro.">
                                {!selecionado ? <p className="text-[1.4rem]">Nenhum usuário selecionado.</p> : <div className="space-y-6">
                                    <div className="rounded-xl bg-card-light-green p-5 text-[1.5rem]">
                                        <p><strong>ID:</strong> {selecionado.id}</p>
                                        <p><strong>Nome:</strong> {selecionado.nome}</p>
                                        <p><strong>Pontos:</strong> {selecionado.pontos.toLocaleString('pt-BR')}</p>
                                        <p><strong>Trocas:</strong> {selecionado.historico.length}</p>
                                    </div>
                                    <form onSubmit={alterarNome} className="space-y-4">
                                        <CampoRotulado id="alterar-nome" titulo="Alterar nome">
                                            <input id="alterar-nome" className={CAMPO} type="text" minLength={3} maxLength={120} required value={nomeEdicao} onChange={(e) => setNomeEdicao(e.target.value)} disabled={desabilitado} />
                                        </CampoRotulado>
                                        <button className={BOTAO} type="submit" disabled={desabilitado || selecionado.nome === nomeEdicao.trim()}>Salvar nome</button>
                                    </form>
                                    <div className="border-t border-separator-light pt-6">
                                        {!confirmandoExclusao ? <button type="button" className={BOTAO_PERIGO} onClick={() => setConfirmandoExclusao(true)} disabled={desabilitado}>Excluir usuário</button> : <div className="space-y-4 rounded-xl border border-brand/40 bg-card-light-yellow p-5">
                                            <p className="text-[1.4rem]"><strong>Atenção:</strong> a exclusão de #{selecionado.id} remove também todo o histórico. Digite <strong>EXCLUIR</strong> para confirmar.</p>
                                            <CampoRotulado id="confirmar-exclusao" titulo="Confirmação">
                                                <input id="confirmar-exclusao" className={CAMPO} value={textoConfirmacao} onChange={(e) => setTextoConfirmacao(e.target.value)} autoComplete="off" disabled={desabilitado} />
                                            </CampoRotulado>
                                            <div className="flex flex-wrap gap-3">
                                                <button type="button" className={BOTAO_PERIGO} disabled={desabilitado || textoConfirmacao !== 'EXCLUIR'} onClick={excluir}>Excluir definitivamente</button>
                                                <button type="button" className={BOTAO_SECUNDARIO} disabled={desabilitado} onClick={() => { setConfirmandoExclusao(false); setTextoConfirmacao(''); }}>Cancelar</button>
                                            </div>
                                        </div>}
                                    </div>
                                </div>}
                            </Secao>
                        </div>
                    </div>}

                    {aba === 'operacoes' && <div className="space-y-7">
                        {!selecionado ? <Secao id="selecionar-operacoes" titulo="Selecione um usuário" descricao="Primeiro consulte um cadastro na seção Usuários e CRUD.">
                            <button type="button" className={BOTAO} onClick={() => setAba('usuarios')}>Ir para usuários</button>
                        </Secao> : <>
                            <div className="rounded-xl bg-card-light-green px-6 py-5 text-[1.5rem]"><strong>Usuário #{selecionado.id}:</strong> {selecionado.nome} — saldo atual de <strong>{selecionado.pontos.toLocaleString('pt-BR')} pontos</strong>.</div>
                            <div className="grid gap-7 tablet:grid-cols-2">
                                <Secao id="credito" titulo="Creditar pontos" descricao="Adiciona uma quantidade positiva ao saldo existente.">
                                    <form onSubmit={adicionarPontos} className="space-y-4">
                                        <CampoRotulado id="quantidade-credito" titulo="Quantidade de pontos">
                                            <input id="quantidade-credito" type="number" min="1" max={LIMITE_PONTOS} step="1" required className={CAMPO} value={quantidadeCredito} onChange={(e) => setQuantidadeCredito(e.target.value)} disabled={desabilitado} />
                                        </CampoRotulado>
                                        <button type="submit" className={BOTAO} disabled={desabilitado}>Adicionar pontos</button>
                                    </form>
                                </Secao>
                                <Secao id="saldo" titulo="Definir saldo" descricao="Ajuste administrativo absoluto do saldo (não adiciona ao valor anterior).">
                                    <form onSubmit={definirSaldo} className="space-y-4">
                                        <CampoRotulado id="novo-saldo" titulo="Novo saldo em pontos">
                                            <input id="novo-saldo" type="number" min="0" max={LIMITE_PONTOS} step="1" required className={CAMPO} value={novoSaldo} onChange={(e) => setNovoSaldo(e.target.value)} disabled={desabilitado} />
                                        </CampoRotulado>
                                        <button type="submit" className={BOTAO_SECUNDARIO} disabled={desabilitado || novoSaldo === String(selecionado.pontos)}>Salvar saldo</button>
                                    </form>
                                </Secao>
                            </div>
                            <Secao id="resgates" titulo="Resgatar passagem" descricao="O custo será descontado somente se houver pontos suficientes. O histórico é registrado no Oracle na mesma transação.">
                                {!catalogo ? <p className="text-[1.4rem]">Catálogo indisponível.</p> : <form onSubmit={resgatar} className="flex flex-col gap-4 tablet:flex-row tablet:items-end">
                                    <div className="w-full tablet:max-w-[48rem]">
                                        <CampoRotulado id="tipo-passagem" titulo="Modalidade de passagem">
                                            <select id="tipo-passagem" className={CAMPO} value={tipoPassagem} onChange={(e) => setTipoPassagem(e.target.value)} disabled={desabilitado}>
                                                {catalogo.passagens.map((p) => <option value={p.tipo} key={p.tipo}>{p.nome} — {p.custo_pontos} pontos ({p.viagens} viagem(ns))</option>)}
                                            </select>
                                        </CampoRotulado>
                                    </div>
                                    <button type="submit" className={BOTAO} disabled={desabilitado || catalogo.passagens.length === 0}>Resgatar passagem</button>
                                </form>}
                            </Secao>
                            <Secao id="historico" titulo="Histórico de resgates" descricao={`Trocas registradas para ${selecionado.nome}.`}>
                                <HistoricoUsuario historico={selecionado.historico} />
                            </Secao>
                        </>}
                    </div>}

                    {aba === 'relatorios' && <div className="space-y-7">
                        <Secao id="resumo-geral" titulo="Resumo do sistema" descricao="Indicadores calculados no Python com base nos usuários e históricos armazenados no Oracle.">
                            {resumo ? <ResumoIndicadores resumo={resumo} /> : <p className="text-[1.4rem]">Resumo indisponível.</p>}
                        </Secao>
                        <Secao id="exportacao-json" titulo="Exportar consultas em JSON" descricao="Baixa os resultados já consultados na API. Não altera dados nem gera commits no Oracle.">
                            <div className="flex flex-wrap gap-3">
                                <button type="button" className={BOTAO_SECUNDARIO} disabled={desabilitado} onClick={() => exportarJson('zyra-usuarios', { usuarios })}>Exportar usuários</button>
                                <button type="button" className={BOTAO_SECUNDARIO} disabled={desabilitado || !resumo} onClick={() => exportarJson('zyra-resumo', resumo)}>Exportar resumo</button>
                                <button type="button" className={BOTAO_SECUNDARIO} disabled={desabilitado || !selecionado} onClick={() => { if (selecionado) exportarJson(`zyra-usuario-${selecionado.id}`, { usuario: selecionado }); }}>Exportar usuário selecionado</button>
                                <button type="button" className={BOTAO_SECUNDARIO} disabled={desabilitado || !selecionado} onClick={() => { if (selecionado) exportarJson(`zyra-historico-${selecionado.id}`, { usuario_id: selecionado.id, historico: selecionado.historico }); }}>Exportar histórico</button>
                            </div>
                            {!selecionado && <p className="mt-4 text-[1.3rem]">Para exportar um usuário ou histórico, selecione um cadastro na seção Usuários e CRUD.</p>}
                        </Secao>
                    </div>}
                </>}
            </div>
        </EstruturaPainel>
    );
}
