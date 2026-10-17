// Motor da Licença Hunter: transforma os feitos marcados e as respostas em
// especialidade, estrelas e organização.
//   especialidade → soma dos feitos da área (conquista vale 2) + 2 para a caçada escolhida
//   estrelas      → regra da Associação (ver conteudo/feitos.mjs)
//   organização   → a mais escolhida nas três perguntas

import { ESPECIALIDADES, FEITOS, ORGANIZACOES, PERGUNTAS_ORGANIZACAO } from "../conteudo/feitos.mjs";

const LETRAS = "abcdefghijklmnopqrstuvwxyz";
const porId = (lista) => Object.fromEntries(lista.map((x) => [x.id, x]));
const FEITO = porId(FEITOS);

// Mais votado; empate fica com o que vem primeiro em "ordem"
function maisVotado(contagem, ordem) {
  return ordem.reduce((melhor, id) => ((contagem[id] ?? 0) > (contagem[melhor] ?? 0) ? id : melhor), ordem[0]);
}

export function calcularEspecialidade(feitos, caca) {
  const pontos = { [caca]: 2 };
  for (const id of feitos) {
    const f = FEITO[id];
    if (f?.especialidade) pontos[f.especialidade] = (pontos[f.especialidade] ?? 0) + (f.conquista ? 2 : 1);
  }
  // A caçada escolhida desempata: vem primeiro na ordem
  return maisVotado(pontos, [caca, ...ESPECIALIDADES.map((e) => e.id).filter((id) => id !== caca)]);
}

// Devolve as estrelas e o que falta para a próxima
export function calcularEstrelas(feitos, especialidade) {
  const tem = (papel) => feitos.some((id) => FEITO[id]?.papel === papel);
  const licenciado = tem("licenca");
  const conquistaNaArea = tem("conquista-geral") ||
    feitos.some((id) => FEITO[id]?.conquista && FEITO[id].especialidade === especialidade);
  const areas = new Set(feitos.filter((id) => FEITO[id]?.conquista).map((id) => FEITO[id].especialidade));
  const multiplas = tem("multiplas") || areas.size >= 2;

  // "estrela" = a partir de qual nível o requisito vale; cada nível exige os anteriores
  const requisitos = [
    { estrela: 1, ok: licenciado, falta: "passar numa prova difícil, o seu Exame Hunter" },
    { estrela: 1, ok: conquistaNaArea, falta: "uma conquista de peso na sua especialidade" },
    { estrela: 2, ok: tem("cargo"), falta: "liderar um grupo, uma equipe ou um projeto" },
    { estrela: 2, ok: tem("mentor"), falta: "ensinar alguém que passe a se destacar" },
    { estrela: 3, ok: multiplas, falta: "conquistas em mais de uma área" },
  ];
  const cumpre = (nivel) => requisitos.filter((r) => r.estrela <= nivel).every((r) => r.ok);

  let estrelas = 0;
  while (estrelas < 3 && cumpre(estrelas + 1)) estrelas++;
  const faltam = requisitos.filter((r) => r.estrela <= estrelas + 1 && !r.ok).map((r) => r.falta);
  return { licenciado, estrelas, faltam };
}

export function calcularOrganizacao(respostasOrg) {
  const contagem = {};
  for (const org of Object.values(respostasOrg)) contagem[org] = (contagem[org] ?? 0) + 1;
  return maisVotado(contagem, ORGANIZACOES.map((o) => o.id));
}

// respostas: { feitos: [ids], caca: especialidadeId, org: { grupo, ordens, missao } }
export function calcularLicenca(respostas) {
  const feitos = respostas.feitos.filter((id) => FEITO[id]);
  const especialidade = calcularEspecialidade(feitos, respostas.caca);
  const estrelas = calcularEstrelas(feitos, especialidade);
  return {
    especialidade: ESPECIALIDADES.find((e) => e.id === especialidade),
    ...estrelas,
    organizacao: ORGANIZACOES.find((o) => o.id === calcularOrganizacao(respostas.org)),
    trofeus: FEITOS.filter((f) => feitos.includes(f.id)),
  };
}

// Código do link: feitos como bits em base 36, depois uma letra para a
// caçada e uma para cada pergunta de organização. Ex.: "1k9-bfac"
export function codificarLicenca({ feitos, caca, org }) {
  const bits = FEITOS.reduce((soma, f, i) => (feitos.includes(f.id) ? soma + 2 ** i : soma), 0);
  const letra = (lista, id) => LETRAS[lista.findIndex((x) => x === id)];
  const orgs = ORGANIZACOES.map((o) => o.id);
  return `${bits.toString(36)}-${letra(ESPECIALIDADES.map((e) => e.id), caca)}${PERGUNTAS_ORGANIZACAO.map((p) => letra(orgs, org[p.id])).join("")}`;
}

export function decodificarLicenca(codigo = "") {
  const m = codigo.match(/^([0-9a-z]+)-([a-z])([a-z]+)$/);
  if (!m || m[3].length !== PERGUNTAS_ORGANIZACAO.length) return null;
  const bits = parseInt(m[1], 36);
  if (!Number.isSafeInteger(bits) || bits >= 2 ** FEITOS.length) return null;
  const caca = ESPECIALIDADES[LETRAS.indexOf(m[2])]?.id;
  const org = {};
  for (const [i, p] of PERGUNTAS_ORGANIZACAO.entries()) {
    org[p.id] = ORGANIZACOES[LETRAS.indexOf(m[3][i])]?.id;
    if (!org[p.id]) return null;
  }
  if (!caca) return null;
  return { feitos: FEITOS.filter((_, i) => Math.floor(bits / 2 ** i) % 2 === 1).map((f) => f.id), caca, org };
}

// Número da licença, sempre o mesmo para o mesmo código
export function numeroDaLicenca(codigo) {
  let h = 7;
  for (const c of codigo) h = (h * 31 + c.charCodeAt(0)) % 99991;
  return String(h).padStart(5, "0");
}
