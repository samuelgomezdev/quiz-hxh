// Conteúdo autoral do Hatsu: a habilidade pessoal nasce do encontro entre
// o tipo de Nen (aptidão) e aquilo que a pessoa viveu (matéria-prima).
// Ex.: Killua é de Transformação e cresceu levando choques → aura elétrica.
//
// Cada vivência tem um Hatsu para cada tipo, seguindo o que o tipo faz com a aura:
//   Intensificação → reforça o corpo ou um objeto
//   Transformação  → dá à aura as propriedades de outra coisa
//   Emissão        → separa a aura do corpo e a envia longe
//   Materialização → cria um objeto de aura
//   Manipulação    → controla seres ou objetos
//   Especialização → algo que só aquela pessoa consegue

export const VIVENCIAS = [
  {
    id: "eletricidade",
    nome: "Eletricidade",
    texto: "Levei choques, mexo com fios ou cresci perto de máquinas e tomadas.",
    hatsu: {
      intensificacao: ["Punho Sobrecarga", "Seu corpo aprende com cada choque: nervos e músculos aguentam descargas, e seus socos travam o adversário como um curto-circuito."],
      transformacao: ["Corrente Viva", "Sua aura ganha as propriedades da eletricidade. Um toque paralisa, e a corrente nos seus próprios nervos acelera os reflexos além do humano."],
      emissao: ["Raio Desgarrado", "Você solta esferas de aura carregada que viajam sozinhas até o alvo e descarregam ao contato."],
      materializacao: ["Cabo Terra", "Você materializa um cabo de aço com um plugue em cada ponta: ligado a dois pontos, ele sobrecarrega tudo o que estiver no meio."],
      manipulacao: ["Fio Condutor", "Ao fincar um pino de aura num aparelho ou numa pessoa, você comanda os movimentos dela como quem opera uma máquina pelo painel."],
      especializacao: ["Apagão", "Quando você toca um quadro de energia, todo Nen num raio de vinte metros se desliga por alguns segundos, menos o seu."],
    },
  },
  {
    id: "corpo",
    nome: "Corpo e treino",
    texto: "Treinei pesado: esporte, luta ou trabalho braçal. Meu corpo é a minha ferramenta.",
    hatsu: {
      intensificacao: ["Corpo Inquebrável", "Toda a aura vai para o corpo: ossos e músculos ficam mais duros que aço, e um golpe concentrado no punho derruba paredes."],
      transformacao: ["Ferro Fundido", "Sua aura imita o metal quente: você endurece ou amolece partes do corpo para absorver golpes e devolver o impacto."],
      emissao: ["Golpe Fantasma", "Seu soco continua viajando depois que o braço para: a aura sai em forma de punho e acerta alvos a dezenas de metros."],
      materializacao: ["Equipamento de Treino", "Você materializa pesos, luvas e faixas de aura; quem estiver preso a eles fica lento e pesado, menos você."],
      manipulacao: ["Treinador", "Com um tapa no ombro de alguém, você controla o ritmo do corpo dele: pode fazê-lo correr além do limite ou cansar na hora."],
      especializacao: ["Recorde Pessoal", "Toda vez que você supera um limite físico em combate, a aura grava a marca, e ela vira o seu novo ponto de partida."],
    },
  },
  {
    id: "jogos",
    nome: "Jogos",
    texto: "Passei horas jogando: cartas, tabuleiro, videogame ou apostas.",
    hatsu: {
      intensificacao: ["Peça Pesada", "Você reforça qualquer carta, dado ou peça até virar arma: uma carta corta como lâmina e um dado pesa como uma pedra."],
      transformacao: ["Regra da Casa", "Sua aura imita as propriedades de uma peça de jogo: gruda como fita, escorrega como sabão ou quica como bola, conforme a jogada."],
      emissao: ["Partida Online", "Você lança avatares de aura que lutam a distância seguindo os seus comandos, como personagens de um jogo."],
      materializacao: ["Roleta do Destino", "Você materializa uma roleta: cada número sorteia uma arma diferente, que só some depois de usada."],
      manipulacao: ["Tabuleiro", "Quem pisar no quadrado que você desenhou no chão vira uma peça e só pode se mover do jeito que aquela peça se move."],
      especializacao: ["Aposta", "Você propõe uma aposta e, se o adversário aceitar, quem perder entrega o que foi apostado, nem que seja o próprio Nen."],
    },
  },
  {
    id: "tecnologia",
    nome: "Tecnologia",
    texto: "Vivo conectado: celular, computador, programação.",
    hatsu: {
      intensificacao: ["Bateria Cheia", "Você reforça qualquer aparelho com aura: o celular vira escudo, o notebook vira aríete, e nada descarrega no meio da luta."],
      transformacao: ["Sinal de Rede", "Sua aura imita um sinal sem fio: se espalha pelo ambiente e avisa de qualquer coisa que se mova dentro do alcance."],
      emissao: ["Drone de Aura", "Você solta pequenos drones de aura que voam sozinhos, filmam o que veem e transmitem para a sua mente."],
      materializacao: ["Aplicativo", "Você materializa um celular de aura com aplicativos que funcionam de verdade: rastrear, gravar uma técnica, trancar uma porta."],
      manipulacao: ["Controle Remoto", "Você crava uma antena de aura no alvo e o controla pelo celular, comando por comando."],
      especializacao: ["Backup", "Antes de lutar, você salva o seu estado; uma vez por dia, pode restaurar o corpo como estava no último backup."],
    },
  },
  {
    id: "livros",
    nome: "Livros e estudo",
    texto: "Cresci entre livros, aulas e perguntas. Quero entender tudo.",
    hatsu: {
      intensificacao: ["Enciclopédia", "Quanto mais você sabe do adversário, mais forte fica: cada fraqueza estudada vira reforço no golpe certo."],
      transformacao: ["Tinta Viva", "Sua aura imita tinta: escreve no ar e mancha o adversário, e o que você escrever nele vira uma marca que não sai."],
      emissao: ["Biblioteca Voadora", "Livros de aura saem voando e se abrem sobre o alvo; cada página que encosta pesa mais do que a anterior."],
      materializacao: ["Caderno de Respostas", "Você materializa um caderno que responde a uma pergunta por dia, desde que ela seja escrita à mão e com sinceridade."],
      manipulacao: ["Sala de Aula", "Quem ouvir a sua explicação até o fim fica obrigado a seguir a regra que você ensinou durante um minuto."],
      especializacao: ["Ladrão de Páginas", "Ao ler uma técnica com atenção total, você a copia para um livro de aura e pode usá-la enquanto ele estiver aberto."],
    },
  },
  {
    id: "musica",
    nome: "Música",
    texto: "A música me salvou: canto, toco ou vivo de fone de ouvido.",
    hatsu: {
      intensificacao: ["Batida", "Sua aura pulsa no ritmo da música na sua cabeça: cada golpe dado no tempo certo bate com o dobro de força."],
      transformacao: ["Frequência", "Sua aura vibra como som: atravessa paredes, estoura vidros e tira o equilíbrio de quem ouve."],
      emissao: ["Melodia Distante", "As notas que você toca viajam como aura até quem precisa ouvir: acalmam aliados e desorientam inimigos a distância."],
      materializacao: ["Instrumento Fantasma", "Você materializa um instrumento: cada música tocada nele tem um efeito, e você só conhece os efeitos das que compôs."],
      manipulacao: ["Maestro", "Quem escutar o seu assobio passa a se mover no compasso que você escolher."],
      especializacao: ["Trilha Sonora", "Você ouve a música do coração de quem está perto e sabe se a pessoa mente, tem medo ou vai atacar."],
    },
  },
  {
    id: "cuidado",
    nome: "Cuidado e saúde",
    texto: "Cuidei de alguém doente ou trabalho com saúde e cuidado.",
    hatsu: {
      intensificacao: ["Mãos que Curam", "Você reforça a cura natural do corpo: seu toque acelera a recuperação de ferimentos, seus e dos outros."],
      transformacao: ["Óleo Morno", "Sua aura imita um óleo de massagem que regenera: tira o cansaço de aliados e devolve a energia como uma noite de sono."],
      emissao: ["Atendimento a Distância", "Você abre um pequeno portal de aura, e a sua mão ou o seu soco sai do outro lado, onde estiver o paciente ou o inimigo."],
      materializacao: ["Kit de Socorro", "Você materializa curativos, talas e linha de sutura de aura que fecham feridas enquanto existirem."],
      manipulacao: ["Pulso", "Ao tocar alguém, você controla o coração e a respiração dele: acalma um ferido ou derruba um inimigo."],
      especializacao: ["Cirurgião de Aura", "Uma figura de aura surge às suas costas e reconstrói qualquer corpo que você tocar, enquanto você não se afastar."],
    },
  },
  {
    id: "artesanato",
    nome: "Trabalho manual",
    texto: "Faço coisas com as mãos: costura, desenho, artesanato ou consertos.",
    hatsu: {
      intensificacao: ["Ferramenta Perfeita", "Qualquer ferramenta na sua mão vira extensão do corpo: uma agulha fura aço e um martelo racha pedra."],
      transformacao: ["Linha de Aura", "Sua aura vira fios finos e resistentes: costura feridas, prende inimigos e puxa objetos de longe."],
      emissao: ["Rascunho Vivo", "O que você desenha ganha vida longe de você e cumpre uma única tarefa antes de sumir."],
      materializacao: ["Cópia Fiel", "Você materializa cópias perfeitas de qualquer objeto que tocar; elas somem depois de um dia."],
      manipulacao: ["Marionete", "Com fios de aura presos às juntas, você move bonecos, objetos e até pessoas como marionetes."],
      especializacao: ["Restauração", "Você conserta qualquer coisa quebrada que juntar com as mãos, inclusive uma técnica de Nen danificada."],
    },
  },
  {
    id: "perda",
    nome: "Perda e injustiça",
    texto: "Perdi alguém ou algo importante por uma injustiça, e não esqueço.",
    hatsu: {
      intensificacao: ["Promessa no Punho", "A lembrança do que você perdeu vira força pura: seus golpes ficam muito mais fortes contra quem fere inocentes."],
      transformacao: ["Luto Gelado", "Sua aura imita o frio do luto: congela o que toca e deixa o adversário lento, como quem perdeu a vontade."],
      emissao: ["Grito", "Você solta toda a dor de uma vez num disparo de aura que explode no alvo e deixa você exausto."],
      materializacao: ["Correntes do Juízo", "Você materializa correntes de aura, cada uma com uma regra: prender, curar, julgar ou arrancar a verdade."],
      manipulacao: ["Juramento", "Você crava uma lâmina de aura no coração do alvo junto com uma regra; se ele quebrar a regra, a lâmina age."],
      especializacao: ["Herança", "Por um tempo, você usa a técnica de alguém que perdeu como se fosse sua."],
    },
  },
  {
    id: "dinheiro",
    nome: "Trabalho e contas",
    texto: "Trabalho desde cedo e lido com contas, dívidas ou negócios.",
    hatsu: {
      intensificacao: ["Hora Extra", "Quanto mais a luta dura, mais forte você fica: a aura se acumula como hora extra."],
      transformacao: ["Moeda Dura", "Sua aura imita o metal das moedas: endurece o corpo e ricocheteia em ângulos que só você calcula."],
      emissao: ["Entrega Expressa", "Você envia pacotes de aura que viajam até o alvo e só se abrem na hora combinada."],
      materializacao: ["Juros Compostos", "Cada golpe seu empresta aura ao adversário, e um cobrador de aura o segue cobrando juros até ele pagar ou falir."],
      manipulacao: ["Contrato", "Quem assinar um contrato com você fica preso às cláusulas: se descumprir, você controla o corpo dele por um minuto."],
      especializacao: ["Parcelamento", "Você adia o dano que recebe e paga em parcelas depois, desde que nunca atrase uma."],
    },
  },
  {
    id: "natureza",
    nome: "Natureza e bichos",
    texto: "Cresci no mato, perto do mar ou cercado de bichos.",
    hatsu: {
      intensificacao: ["Instinto Selvagem", "Seus sentidos e seu corpo ficam como os de um animal: você fareja, ouve e salta muito além do normal."],
      transformacao: ["Pólen", "Sua aura imita pólen: se espalha no ar e deixa quem respira sonolento e confuso."],
      emissao: ["Bando", "Você solta animais de aura que caçam sozinhos e voltam com o que encontraram."],
      materializacao: ["Isca", "Você materializa uma vara de pescar: o anzol fisga o Nen do adversário, e você puxa."],
      manipulacao: ["Colmeia", "Insetos e animais de verdade obedecem aos seus pedidos e servem de olhos para você."],
      especializacao: ["Estação", "Seu Nen muda com o clima: no sol você ataca, na chuva se cura, no frio some da vista."],
    },
  },
  {
    id: "fogo",
    nome: "Fogo e cozinha",
    texto: "Cozinho, adoro um churrasco ou cresci perto de fogo e fumaça.",
    hatsu: {
      intensificacao: ["Brasa", "Seu corpo esquenta com a aura: os golpes queimam, e você aguenta um calor que derreteria qualquer um."],
      transformacao: ["Chama", "Sua aura vira calor puro; quanto mais dor você recebe, mais quente fica o contra-ataque."],
      emissao: ["Fagulha", "Você atira fagulhas de aura que explodem como pequenas bombas ao tocar o alvo."],
      materializacao: ["Panela de Pressão", "Você materializa uma panela de aura: o que entra nela sai mais fraco ou mais forte, você decide."],
      manipulacao: ["Fumaça", "Você controla a fumaça: cria soldados, muros e prisões que obedecem às suas ordens."],
      especializacao: ["Receita", "Quem comer o que você cozinhou recebe por uma hora o efeito que você escreveu na receita."],
    },
  },
];

export const MOTIVACOES = [
  { id: "proteger", texto: "Proteger quem eu amo.", efeito: "Fica mais forte quando há alguém para proteger por perto.", alvo: "quem ameaça alguém que você protege" },
  { id: "vinganca", texto: "Acertar as contas com alguém.", efeito: "Ganha força diante de quem feriu você ou os seus.", alvo: "quem feriu você ou os seus" },
  { id: "vencer", texto: "Ser o melhor e vencer qualquer desafio.", efeito: "Rende mais em duelos justos, um contra um.", alvo: "adversários que aceitaram um duelo" },
  { id: "explorar", texto: "Conhecer o mundo, até o Continente Negro.", efeito: "Funciona melhor em lugares desconhecidos e longe de casa.", alvo: "criaturas e perigos do desconhecido" },
  { id: "liberdade", texto: "Nunca mais depender de ninguém.", efeito: "Rompe controles e amarras que tentam impor a você.", alvo: "quem tenta controlar você" },
  { id: "diversao", texto: "Porque lutar é divertido.", efeito: "Fica imprevisível quando você está se divertindo.", alvo: "adversários que valem a diversão" },
];

export const ALCANCES = [
  { id: "perto", texto: "Cara a cara, sentindo o golpe.", efeito: "Age pelo toque ou a poucos passos." },
  { id: "longe", texto: "Longe, sem ser visto.", efeito: "Alcança o alvo a distância, sem expor você." },
  { id: "armadilha", texto: "Preparando o terreno antes.", efeito: "Fica mais forte quando a condição é preparada antes da luta." },
  { id: "apoio", texto: "Atrás, ajudando o meu time.", efeito: "Também pode ser usado em aliados." },
];

// Votos e Limitações: quanto mais pesada a regra, mais forte o Hatsu.
// "{alvo}" é trocado pelo alvo da motivação.
export const VOTOS = [
  { id: "nome", texto: "Dizer o nome do golpe em voz alta.", regra: "Só funciona se você disser o nome do golpe em voz alta.", peso: 1 },
  { id: "toque", texto: "Tocar o alvo antes de usar.", regra: "Antes de usar, você precisa tocar o alvo com a mão nua.", peso: 1 },
  { id: "alvo", texto: "Usar só contra um tipo de inimigo.", regra: "Só funciona contra {alvo}.", peso: 2 },
  { id: "tempo", texto: "Usar só por pouco tempo.", regra: "Dura no máximo um minuto, e só uma vez por dia.", peso: 2 },
  { id: "custo", texto: "Perder algo a cada uso.", regra: "Cada segundo de uso custa uma hora da sua vida.", peso: 3 },
  { id: "vida", texto: "Arriscar a vida se quebrar a regra.", regra: "Só funciona contra {alvo}; se você usar contra qualquer outro, você morre.", peso: 3 },
];

export const GANHO_DO_VOTO = {
  1: "Regra simples e fácil de cumprir: o Hatsu fica um pouco mais forte.",
  2: "A regra limita bastante quando e onde usar, e em troca o poder dobra.",
  3: "Um preço alto, como o das correntes do Kurapika: o poder vai muito além do normal.",
};

// Personagens da obra cujo Hatsu nasceu de uma vivência parecida.
// O tipo segue a base gerada pelo ETL (data/personagens.json).
export const REFERENCIAS = [
  { id: "killua-zoldyck", vivencia: "eletricidade", tipo: "transformacao", habilidade: "Godspeed", historia: "Cresceu levando choques como treino na família Zoldyck e transformou essa resistência em aura elétrica." },
  { id: "uvogin", vivencia: "corpo", tipo: "intensificacao", habilidade: "Big Bang Impact", historia: "Confiava só na força bruta e concentrou toda a aura num soco capaz de abrir crateras." },
  { id: "gon-freecss", vivencia: "natureza", tipo: "intensificacao", habilidade: "Jajanken", historia: "Cresceu no mato da Ilha Baleia, pescando e correndo atrás de bichos, e luta guiado pelo instinto." },
  { id: "hisoka-morow", vivencia: "jogos", tipo: "transformacao", habilidade: "Bungee Gum", historia: "Mágico e jogador de cartas, deu à aura as propriedades do chiclete e da borracha." },
  { id: "kite", vivencia: "jogos", tipo: "materializacao", habilidade: "Crazy Slots", historia: "Materializa uma roleta que sorteia a arma da vez, e ela só some depois de usada." },
  { id: "razor", vivencia: "jogos", tipo: "emissao", habilidade: "Queimada de Greed Island", historia: "Mestre de jogos em Greed Island, solta seres de aura e arremessa bolas de aura." },
  { id: "shalnark", vivencia: "tecnologia", tipo: "manipulacao", habilidade: "Black Voice", historia: "Controla pessoas com antenas cravadas no corpo e comanda tudo pelo celular." },
  { id: "chrollo-lucilfer", vivencia: "livros", tipo: "especializacao", habilidade: "Skill Hunter", historia: "Rouba habilidades e as guarda num livro de aura, usando-as enquanto ele estiver aberto." },
  { id: "melody", vivencia: "musica", tipo: "emissao", habilidade: "Flauta", historia: "Ouve o coração das pessoas e toca na flauta melodias que curam e acalmam." },
  { id: "biscuit-krueger", vivencia: "cuidado", tipo: "transformacao", habilidade: "Magical Esthe", historia: "Usa a aura como óleo de massagem para recuperar o corpo de quem treina." },
  { id: "leorio-paradinight", vivencia: "cuidado", tipo: "emissao", habilidade: "Soco de portal", historia: "Estudante de medicina, abre um portal de aura para o soco sair em outro lugar." },
  { id: "neferpitou", vivencia: "cuidado", tipo: "especializacao", habilidade: "Doctor Blythe", historia: "Um boneco de aura opera e reconstrói corpos, mesmo os de feridos graves." },
  { id: "machi-komacine", vivencia: "artesanato", tipo: "transformacao", habilidade: "Fios de Nen", historia: "Transforma a aura em fios para costurar feridas e prender inimigos." },
  { id: "kortopi", vivencia: "artesanato", tipo: "materializacao", habilidade: "Gallery Fake", historia: "Faz cópias perfeitas de qualquer objeto que toca, e elas somem depois de um dia." },
  { id: "kurapika", vivencia: "perda", tipo: "materializacao", habilidade: "Correntes", historia: "Perdeu o clã para a Trupe Fantasma e materializou correntes com regras feitas para a vingança." },
  { id: "knuckle-bine", vivencia: "dinheiro", tipo: "materializacao", habilidade: "Hakoware", historia: "Empresta aura a cada golpe e manda um cobrador de aura atrás dos juros." },
  { id: "ponzu", vivencia: "natureza", tipo: "manipulacao", habilidade: "Abelhas", historia: "Controla as abelhas que vivem no seu chapéu e as usa como arma e como olhos." },
  { id: "feitan-portor", vivencia: "fogo", tipo: "transformacao", habilidade: "Rising Sun", historia: "Transforma a dor que sofre em calor e devolve tudo numa explosão de fogo." },
  { id: "morel-mackernasey", vivencia: "fogo", tipo: "manipulacao", habilidade: "Deep Purple", historia: "Controla a fumaça do cachimbo e cria soldados de fumaça." },
  { id: "genthru", vivencia: "fogo", tipo: "materializacao", habilidade: "Little Flower", historia: "Faz explodir tudo o que agarra com as mãos." },
];
