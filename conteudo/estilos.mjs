// Hatsus da obra descritos com as mesmas peças do "Crie o seu poder",
// para mostrar quem tem um estilo parecido com o poder criado.
//   tipo      → tipo de Nen do personagem na base (data/personagens.json)
//   categoria → categoria do Hatsu, que pode diferir do tipo (Kastro, Emperor Time)
//   forma     → FORMAS de conteudo/poder.mjs
//   gatilho   → GATILHOS de conteudo/poder.mjs; null = usa à vontade
//   votos     → VOTOS de conteudo/hatsu.mjs que o Hatsu realmente tem
// Um personagem pode aparecer mais de uma vez, uma por Hatsu.

export const ESTILOS = [
  // Intensificação
  { id: "gon-freecss", tipo: "intensificacao", habilidade: "Jajanken", categoria: "intensificacao", forma: "corpo", gatilho: "ritual", votos: [],
    resumo: "Entoa o “pedra, papel, tesoura” enquanto concentra a aura e escolhe na hora entre soco, disparo ou lâmina." },
  { id: "uvogin", tipo: "intensificacao", habilidade: "Big Bang Impact", categoria: "intensificacao", forma: "corpo", gatilho: null, votos: [],
    resumo: "Concentra toda a aura num soco capaz de abrir crateras." },
  { id: "phinks-magcub", tipo: "intensificacao", habilidade: "Ripper Cyclotron", categoria: "intensificacao", forma: "corpo", gatilho: "ritual", votos: [],
    resumo: "Gira o braço antes do golpe: quanto mais voltas, mais forte o soco." },
  { id: "isaac-netero", tipo: "intensificacao", habilidade: "Hundred-Type Guanyin Bodhisattva", categoria: "intensificacao", forma: "criatura", gatilho: "ritual", votos: [],
    resumo: "Junta as mãos em prece, e uma Kannon gigante de aura golpeia mais rápido do que se vê." },
  { id: "palm-siberia", tipo: "intensificacao", habilidade: "Black Widow", categoria: "intensificacao", forma: "corpo", gatilho: null, votos: [],
    resumo: "Cobre o corpo com o cabelo endurecido pela aura, que vira armadura e arma." },
  { id: "kastro", tipo: "intensificacao", habilidade: "Double", categoria: "materializacao", forma: "criatura", gatilho: null, votos: [],
    resumo: "Materializa um clone de si mesmo. Longe do tipo dele, o poder ocupou tanto espaço que enfraqueceu o resto, como explicou o Hisoka." },

  // Transformação
  { id: "killua-zoldyck", tipo: "transformacao", habilidade: "Godspeed", categoria: "transformacao", forma: "corpo", gatilho: null, votos: [],
    resumo: "Transforma a aura em eletricidade e move o próprio corpo como um raio; a carga acaba e precisa ser reposta com choques." },
  { id: "hisoka-morow", tipo: "transformacao", habilidade: "Bungee Gum", categoria: "transformacao", forma: "corpo", gatilho: "toque", votos: [],
    resumo: "Dá à aura as propriedades da borracha e do chiclete: gruda no alvo e estica ou puxa de volta." },
  { id: "feitan-portor", tipo: "transformacao", habilidade: "Pain Packer: Rising Sun", categoria: "transformacao", forma: "campo", gatilho: "ferido", votos: [],
    resumo: "Transforma a dor que sofreu em calor e solta um pequeno sol que queima tudo ao redor." },
  { id: "biscuit-krueger", tipo: "transformacao", habilidade: "Magical Esthe", categoria: "transformacao", forma: "criatura", gatilho: "toque", votos: [],
    resumo: "A Cookie-chan, uma criatura de aura, massageia e recupera o corpo de quem treina." },
  { id: "menthuthuyoupi", tipo: "transformacao", habilidade: "Metamorphosis", categoria: "transformacao", forma: "corpo", gatilho: null, votos: [],
    resumo: "Muda o próprio corpo à vontade: braços que viram lâminas, asas e bocas a mais." },

  // Emissão
  { id: "leorio-paradinight", tipo: "emissao", habilidade: "Soco de portal", categoria: "emissao", forma: "disparo", gatilho: null, votos: [],
    resumo: "Soca o chão, e o punho sai por um portal de aura ao lado de quem ele quer acertar." },
  { id: "franklin-bordeau", tipo: "emissao", habilidade: "Double Machine Gun", categoria: "emissao", forma: "disparo", gatilho: null, votos: [],
    resumo: "Dispara balas de aura pelas pontas dos dedos, que ele cortou para deixar o golpe mais forte." },
  { id: "knov", tipo: "emissao", habilidade: "Hide and Seek", categoria: "emissao", forma: "campo", gatilho: null, votos: [],
    resumo: "Abre portais para um espaço só dele, onde esconde aliados e de onde sai em qualquer ponto marcado." },
  { id: "razor", tipo: "emissao", habilidade: "14 Devils", categoria: "emissao", forma: "criatura", gatilho: null, votos: [],
    resumo: "Solta criaturas de aura que jogam ao lado dele, como na queimada de Greed Island." },
  { id: "zeno-zoldyck", tipo: "emissao", habilidade: "Dragon Head", categoria: "emissao", forma: "criatura", gatilho: null, votos: [],
    resumo: "Solta um dragão de aura que avança sobre o alvo e pode se desfazer numa chuva de golpes." },
  { id: "silva-zoldyck", tipo: "emissao", habilidade: "Esferas de aura", categoria: "emissao", forma: "disparo", gatilho: null, votos: [],
    resumo: "Atira esferas de aura que explodem ao contato." },
  { id: "melody", tipo: "emissao", habilidade: "Flauta", categoria: "emissao", forma: "campo", gatilho: null, votos: [],
    resumo: "Toca na flauta melodias que curam e acalmam quem ouve." },

  // Materialização
  { id: "kurapika", tipo: "materializacao", habilidade: "Chain Jail", categoria: "materializacao", forma: "objeto", gatilho: null, votos: ["alvo", "vida"],
    resumo: "Uma corrente que prende e anula o Nen do capturado; só vale contra a Trupe Fantasma, e usá-la em outro custaria a vida dele." },
  { id: "kurapika", tipo: "materializacao", habilidade: "Judgment Chain", categoria: "materializacao", forma: "regra", gatilho: null, votos: ["alvo", "vida"],
    resumo: "Crava uma corrente no coração do alvo e impõe uma regra; quebrá-la mata. Nasceu do mesmo voto de vingança." },
  { id: "kurapika", tipo: "materializacao", habilidade: "Emperor Time", categoria: "especializacao", forma: "corpo", gatilho: null, votos: ["custo"],
    resumo: "Com os olhos escarlates, usa todos os tipos de Nen a 100%; cada segundo ativo custa uma hora de vida." },
  { id: "shizuku-murasaki", tipo: "materializacao", habilidade: "Blinky", categoria: "materializacao", forma: "objeto", gatilho: "nome", votos: [],
    resumo: "Materializa um aspirador de pó que suga qualquer coisa, menos seres vivos." },
  { id: "kortopi", tipo: "materializacao", habilidade: "Gallery Fake", categoria: "materializacao", forma: "objeto", gatilho: "toque", votos: ["tempo"],
    resumo: "Toca um objeto e cria cópias perfeitas, que somem depois de 24 horas." },
  { id: "knuckle-bine", tipo: "materializacao", habilidade: "Hakoware", categoria: "materializacao", forma: "regra", gatilho: "toque", votos: [],
    resumo: "Empresta aura a cada golpe; quando os juros passam da aura do alvo, ele fica sem Nen por 30 dias." },
  { id: "kite", tipo: "materializacao", habilidade: "Crazy Slots", categoria: "materializacao", forma: "objeto", gatilho: null, votos: [],
    resumo: "Uma roleta com um palhaço sorteia a arma da vez, que só some depois de usada." },
  { id: "genthru", tipo: "materializacao", habilidade: "Little Flower", categoria: "materializacao", forma: "corpo", gatilho: "toque", votos: [],
    resumo: "Agarra com a mão e explode o que estiver nela." },
  { id: "genthru", tipo: "materializacao", habilidade: "Countdown", categoria: "materializacao", forma: "regra", gatilho: "toque", votos: ["toque"],
    resumo: "Toca o alvo e explica a regra: uma bomba conta até zero e só se desarma se o alvo tocar nele de novo." },
  { id: "welfin", tipo: "materializacao", habilidade: "Missile Man", categoria: "materializacao", forma: "disparo", gatilho: null, votos: [],
    resumo: "Faz uma pergunta; se a resposta não for sincera, um míssil de aura se aloja no alvo." },

  // Manipulação
  { id: "shalnark", tipo: "manipulacao", habilidade: "Black Voice", categoria: "manipulacao", forma: "objeto", gatilho: "toque", votos: [],
    resumo: "Crava uma antena no alvo e o controla pelo celular." },
  { id: "illumi-zoldyck", tipo: "manipulacao", habilidade: "Agulhas", categoria: "manipulacao", forma: "objeto", gatilho: "toque", votos: [],
    resumo: "Crava agulhas carregadas de aura e controla a mente ou o corpo de quem as recebe." },
  { id: "shoot-mcmahon", tipo: "manipulacao", habilidade: "Hotel Rafflesia", categoria: "manipulacao", forma: "objeto", gatilho: "toque", votos: [],
    resumo: "Mãos de aura arrancam partes do alvo ao acertá-lo, e uma gaiola as prende." },
  { id: "morel-mackernasey", tipo: "manipulacao", habilidade: "Deep Purple", categoria: "manipulacao", forma: "criatura", gatilho: null, votos: [],
    resumo: "Controla a fumaça do cachimbo e cria soldados de fumaça." },
  { id: "shaiapouf", tipo: "manipulacao", habilidade: "Spiritual Message", categoria: "manipulacao", forma: "campo", gatilho: null, votos: [],
    resumo: "Espalha o pó das asas e lê, pela aura, as emoções de quem está por perto." },
  { id: "kalluto-zoldyck", tipo: "manipulacao", habilidade: "Papéis", categoria: "manipulacao", forma: "objeto", gatilho: null, votos: [],
    resumo: "Controla papéis cortantes como confete, que atacam e espionam." },
  { id: "ponzu", tipo: "manipulacao", habilidade: "Abelhas", categoria: "manipulacao", forma: "criatura", gatilho: null, votos: [],
    resumo: "Controla as abelhas que vivem no seu chapéu e as usa como arma e como olhos." },

  // Especialização
  { id: "chrollo-lucilfer", tipo: "especializacao", habilidade: "Skill Hunter", categoria: "especializacao", forma: "objeto", gatilho: "ritual", votos: ["toque"],
    resumo: "Rouba habilidades e as guarda num livro; antes, cumpre condições, entre elas pôr a mão do dono sobre o livro." },
  { id: "pakunoda", tipo: "especializacao", habilidade: "Memory Bomb", categoria: "especializacao", forma: "disparo", gatilho: "toque", votos: [],
    resumo: "Lê memórias tocando as pessoas e as dispara com um revólver de aura na cabeça de alguém." },
  { id: "neferpitou", tipo: "especializacao", habilidade: "Doctor Blythe", categoria: "especializacao", forma: "criatura", gatilho: null, votos: [],
    resumo: "Um boneco de aura opera e reconstrói corpos, mesmo os de feridos graves." },
  { id: "alluka-zoldyck", tipo: "especializacao", habilidade: "Nanika", categoria: "especializacao", forma: "regra", gatilho: "ritual", votos: [],
    resumo: "Realiza qualquer desejo, mas quem fala com ela depois precisa cumprir os pedidos dela; quem recusa morre." },
];
