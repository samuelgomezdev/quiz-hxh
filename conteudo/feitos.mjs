// Conteúdo autoral da Licença Hunter: os feitos da vida real que a pessoa
// marca como conquistas, as especialidades, as estrelas e as organizações.
//
// Regra das estrelas (Associação Hunter, simplificada):
//   1 estrela  → Hunter licenciado com uma conquista de peso na sua área
//   2 estrelas → 1 estrela + liderou algo + formou alguém que se destacou
//   3 estrelas → 2 estrelas + conquistas em mais de uma área

// Os ids batem com os grupos de etl/hunter.mjs
export const ESPECIALIDADES = [
  { id: "lista-negra", nome: "Hunter da Lista Negra", sigla: "LN", descricao: "Caça criminosos procurados e quem escapou da justiça.", caca: "Encontrar quem fez mal e escapou." },
  { id: "gourmet", nome: "Hunter Gourmet", sigla: "GO", descricao: "Busca ingredientes raros e cria pratos que ninguém provou.", caca: "Um sabor que ninguém provou ainda." },
  { id: "tesouros", nome: "Hunter de Tesouros e Ruínas", sigla: "TR", descricao: "Encontra relíquias, ruínas e tesouros perdidos.", caca: "Uma ruína ou um tesouro perdido." },
  { id: "natureza", nome: "Hunter de Bestas e Mares", sigla: "BM", descricao: "Estuda e protege criaturas, plantas e mares.", caca: "Uma criatura que ninguém catalogou." },
  { id: "saude", nome: "Hunter de Doenças", sigla: "DO", descricao: "Combate doenças, vírus e venenos e salva vidas.", caca: "A cura de uma doença sem tratamento." },
  { id: "informacao", nome: "Hunter de Informação", sigla: "IN", descricao: "Hackers e caçadores do que se perdeu: dados, pessoas, segredos.", caca: "Um segredo escondido em algum sistema." },
  { id: "musica", nome: "Hunter da Música", sigla: "MU", descricao: "Busca músicas, instrumentos e sons raros.", caca: "Uma música perdida há séculos." },
];

// Feitos da vida real. "conquista" conta para a 1ª estrela na especialidade;
// "papel" liga o feito a uma regra de estrela ou da licença.
export const FEITOS = [
  { id: "prova", texto: "Passei numa prova muito difícil: vestibular, concurso ou certificação.", papel: "licenca",
    trofeu: "Exame Hunter", paralelo: { id: "gon-freecss", texto: "Como o Gon, que passou no Exame Hunter aos 12 anos." } },
  { id: "treino", texto: "Treinei todos os dias, por meses, para alcançar um objetivo.",
    trofeu: "200º andar", paralelo: { id: "zushi", texto: "Como o Zushi, treinando na Arena Celestial." } },
  { id: "sobrevivi", texto: "Superei uma situação em que achei que não ia conseguir.",
    trofeu: "Sobrevivente", paralelo: { id: "killua-zoldyck", texto: "Como o Killua, que saiu vivo do Formigueiro." } },
  { id: "premio", texto: "Fui reconhecido ou premiado pelo que faço.", papel: "conquista-geral",
    trofeu: "Reconhecimento", paralelo: { id: "isaac-netero", texto: "Como o Netero, reconhecido como o Nen mais forte do seu tempo." } },
  { id: "mentor", texto: "Ensinei alguém que hoje se destaca no que faz.", papel: "mentor",
    trofeu: "Mestre", paralelo: { id: "biscuit-krueger", texto: "Como a Biscuit, que treinou Gon e Killua." } },
  { id: "lider", texto: "Liderei um grupo, uma equipe ou um projeto.", papel: "cargo",
    trofeu: "Liderança", paralelo: { id: "cheadle-yorkshire", texto: "Como a Cheadle, que assumiu a presidência da Associação." } },
  { id: "areas", texto: "Tenho conquistas em mais de uma área da vida.", papel: "multiplas",
    trofeu: "Várias áreas", paralelo: { id: "cheadle-yorkshire", texto: "Como a Cheadle: médica, advogada e Hunter de três estrelas." } },

  { id: "injustica", texto: "Já defendi alguém ou denunciei uma injustiça.", especialidade: "lista-negra",
    trofeu: "Justiça", paralelo: { id: "kurapika", texto: "Como o Kurapika, Hunter da Lista Negra." } },
  { id: "recuperei", texto: "Ajudei a encontrar alguém ou recuperar algo roubado.", especialidade: "lista-negra", conquista: true,
    trofeu: "Captura", paralelo: { id: "saccho-kobayakawa", texto: "Como o Saccho, Hunter de Problemas com duas estrelas." } },
  { id: "cozinho", texto: "Cozinho pratos que as pessoas pedem de novo.", especialidade: "gourmet",
    trofeu: "Cozinheiro", paralelo: { id: "menchi", texto: "Como a Menchi, examinadora da prova de culinária." } },
  { id: "sabor", texto: "Descobri um lugar ou ingrediente que ninguém do meu círculo conhecia.", especialidade: "gourmet", conquista: true,
    trofeu: "Paladar raro", paralelo: { id: "linne-horsdoeuvre", texto: "Como o Linne, Hunter Gourmet de duas estrelas." } },
  { id: "coleciono", texto: "Coleciono coisas raras ou antigas.", especialidade: "tesouros",
    trofeu: "Colecionador", paralelo: { id: "satotz", texto: "Como o Satotz, Hunter de Ruínas." } },
  { id: "achei", texto: "Achei algo valioso que estava perdido ou esquecido.", especialidade: "tesouros", conquista: true,
    trofeu: "Achado", paralelo: { id: "ging-freecss", texto: "Como o Ging, que restaurou ruínas e ganhou duas estrelas." } },
  { id: "bichos", texto: "Cuido de animais ou de plantas.", especialidade: "natureza",
    trofeu: "Guardião", paralelo: { id: "knuckle-bine", texto: "Como o Knuckle, Hunter de Bestas." } },
  { id: "selvagem", texto: "Fiz uma trilha, um mergulho ou uma viagem a um lugar selvagem.", especialidade: "natureza", conquista: true,
    trofeu: "Expedição", paralelo: { id: "morel-mackernasey", texto: "Como o Morel, Hunter dos Mares de três estrelas." } },
  { id: "cuido", texto: "Sei cuidar de alguém doente ou ferido.", especialidade: "saude",
    trofeu: "Cuidador", paralelo: { id: "leorio-paradinight", texto: "Como o Leorio, que estuda Medicina." } },
  { id: "salvei", texto: "Ajudei a salvar ou curar alguém.", especialidade: "saude", conquista: true,
    trofeu: "Salva-vidas", paralelo: { id: "sanbica-norton", texto: "Como a Sanbica, Hunter de Vírus com uma estrela." } },
  { id: "pesquiso", texto: "Encontro qualquer informação na internet.", especialidade: "informacao",
    trofeu: "Investigador", paralelo: { id: "loupe-highland", texto: "Como o Loupe, Hunter de Perdidos." } },
  { id: "sistema", texto: "Criei um programa, site ou sistema que outras pessoas usam.", especialidade: "informacao", conquista: true,
    trofeu: "Criador", paralelo: { id: "ickshonpe-katocha", texto: "Como o Ickshonpe, Hunter Hacker com uma estrela." } },
  { id: "toco", texto: "Toco, canto ou componho.", especialidade: "musica",
    trofeu: "Músico", paralelo: { id: "melody", texto: "Como a Melody, Hunter da Música." } },
  { id: "palco", texto: "Já me apresentei para um público.", especialidade: "musica", conquista: true,
    trofeu: "Palco", paralelo: { id: "melody", texto: "Como a Melody, que toca para curar e acalmar." } },
];

// Organizações; "afiliacoes" liga ao campo afiliacao da base da Hunterpedia
export const ORGANIZACOES = [
  { id: "associacao", nome: "Associação Hunter", descricao: "A instituição que aplica o Exame e cuida dos Hunters. Regras claras, missões para o bem comum.", afiliacoes: ["Hunter Association"] },
  { id: "zodiaco", nome: "Zodíaco", descricao: "Os doze conselheiros da Associação. Decidem os rumos de todos, cada um com sua especialidade.", afiliacoes: ["Zodiacs"] },
  { id: "beyond", nome: "Expedição de Beyond Netero", descricao: "Rumo ao Continente Negro, onde ninguém volta igual. Aventura acima de qualquer regra.", afiliacoes: ["Beyond Netero"] },
  { id: "kakin", nome: "Guarda Real de Kakin", descricao: "Hunters contratados para proteger os príncipes no navio para o Continente Negro.", afiliacoes: ["Kakin Royal Army", "Kakin Empire"] },
  { id: "zoldyck", nome: "Família Zoldyck", descricao: "A família de assassinos mais famosa do mundo. Tradição, disciplina e laços de sangue.", afiliacoes: ["Zoldyck Family"] },
  { id: "trupe", nome: "Trupe Fantasma", descricao: "A Aranha. Fora da lei, mas leal até o fim aos seus companheiros.", afiliacoes: ["Phantom Troupe"] },
];

export const PERGUNTAS_ORGANIZACAO = [
  {
    id: "grupo",
    texto: "O que mais importa num grupo?",
    opcoes: {
      associacao: "Regras justas que valem para todo mundo.",
      zodiaco: "Gente competente decidindo junto.",
      beyond: "Um objetivo grande o bastante para arriscar tudo.",
      kakin: "Saber exatamente quem eu protejo.",
      zoldyck: "Tradição e laços que não se quebram.",
      trupe: "Lealdade aos companheiros, não às regras.",
    },
  },
  {
    id: "ordens",
    texto: "Como você lida com ordens?",
    opcoes: {
      associacao: "Sigo, se forem justas, e questiono se não forem.",
      zodiaco: "Prefiro estar entre quem dá as ordens.",
      beyond: "Ordens servem até a aventura começar.",
      kakin: "Cumpro à risca; é o meu trabalho.",
      zoldyck: "Cresci obedecendo; obedeço e entrego.",
      trupe: "Só sigo o líder que eu mesmo escolhi.",
    },
  },
  {
    id: "missao",
    texto: "Aparece um trabalho perigoso e muito bem pago. Você...",
    opcoes: {
      associacao: "Aceita se for para o bem de alguém.",
      zodiaco: "Monta a equipe certa e coordena de cima.",
      beyond: "Aceita pelo desconhecido, não pelo dinheiro.",
      kakin: "Aceita e protege o cliente com a vida.",
      zoldyck: "Aceita, cobra caro e não deixa rastro.",
      trupe: "Prefere pegar o que quer, sem pedir.",
    },
  },
];
