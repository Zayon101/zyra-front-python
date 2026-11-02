import type { UsuarioZyra } from '../../types/zyra';
import { BOTAO_SECUNDARIO, CAMPO } from './Componentes';

export default function ListaUsuarios({ usuarios, idSelecionado, filtro, aoFiltrar, aoSelecionar, desabilitado }: {
    usuarios: UsuarioZyra[];
    idSelecionado: number | null;
    filtro: string;
    aoFiltrar: (valor: string) => void;
    aoSelecionar: (id: number) => void;
    desabilitado: boolean;
}) {
    const busca = filtro.trim().toLocaleLowerCase('pt-BR');
    const filtrados = usuarios.filter((usuario) => usuario.nome.toLocaleLowerCase('pt-BR').includes(busca) || String(usuario.id).includes(busca));
    return (
        <div>
            <label className="mb-2 block text-[1.4rem] font-bold text-title" htmlFor="buscar-usuario">Pesquisar por nome ou ID</label>
            <input id="buscar-usuario" className={CAMPO} type="search" value={filtro} onChange={(e) => aoFiltrar(e.target.value)} placeholder="Digite para filtrar os cadastros" />
            <div className="mt-6 overflow-x-auto rounded-xl border border-separator-light">
                <table className="min-w-[52rem] w-full text-left text-[1.4rem]">
                    <thead className="bg-card-light-green text-nav"><tr><th scope="col" className="px-5 py-3">ID</th><th scope="col" className="px-5 py-3">Nome</th><th scope="col" className="px-5 py-3">Saldo</th><th scope="col" className="px-5 py-3">Consulta</th></tr></thead>
                    <tbody>
                        {filtrados.map((usuario) => <tr key={usuario.id} className="border-t border-separator-light/50">
                            <th scope="row" className="px-5 py-3 font-semibold">{usuario.id}</th>
                            <td className="px-5 py-3">{usuario.nome}</td>
                            <td className="px-5 py-3">{usuario.pontos.toLocaleString('pt-BR')} pts</td>
                            <td className="px-5 py-3"><button type="button" className={BOTAO_SECUNDARIO} disabled={desabilitado} aria-pressed={idSelecionado === usuario.id} onClick={() => aoSelecionar(usuario.id)}>{idSelecionado === usuario.id ? 'Selecionado' : 'Consultar'}</button></td>
                        </tr>)}
                    </tbody>
                </table>
                {filtrados.length === 0 && <p className="p-6 text-[1.4rem]">{usuarios.length === 0 ? 'Nenhum usuário cadastrado.' : 'Nenhum usuário corresponde à pesquisa.'}</p>}
            </div>
        </div>
    );
}
