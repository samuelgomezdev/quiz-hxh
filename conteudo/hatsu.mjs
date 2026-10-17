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
//
// Formato: tipo: [nome, efeito, origem do nome]. Os nomes seguem o estilo da obra
// (Bungee Gum, Deep Purple, Chain Jail, Hakoware): várias línguas e referências
// culturais em vez de uma tradução literal. A origem aparece na carta.

export const VIVENCIAS = [
  {
    id: "eletricidade",
    nome: "Eletricidade",
    texto: "Levei choques, mexo com fios ou cresci perto de máquinas e tomadas.",
    hatsu: {
      intensificacao: ["Raiken", "Seu corpo aprende com cada choque: nervos e músculos aguentam descargas, e seus socos travam o adversário como um curto-circuito.", "雷拳, “punho do trovão” em japonês"],
      transformacao: ["Raijin", "Sua aura ganha as propriedades da eletricidade e salta de alvo em alvo: o golpe acerta o primeiro inimigo e o raio pula para o mais próximo, mais fraco a cada salto.", "o deus do trovão do xintoísmo, que toca tambores entre as nuvens"],
      emissao: ["Kugelblitz", "Você solta esferas de aura carregada que viajam sozinhas até o alvo e descarregam ao contato.", "“raio em bola” em alemão: o raio globular, que flutua antes de explodir"],
      materializacao: ["Live Wire", "Você materializa um cabo de aço com um plugue em cada ponta: ligado a dois pontos, ele sobrecarrega tudo o que estiver no meio.", "“fio desencapado” em inglês, e também quem não para quieto"],
      manipulacao: ["Galvani", "Ao fincar um pino de aura num aparelho ou numa pessoa, você comanda os movimentos dela como quem opera uma máquina pelo painel.", "Luigi Galvani, que em 1780 fez pernas de rã se moverem com eletricidade"],
      especializacao: ["Kill Switch", "Quando você toca um quadro de energia, todo Nen num raio de vinte metros se desliga por alguns segundos, menos o seu.", "o botão de desligamento de emergência das máquinas"],
    },
  },
  {
    id: "corpo",
    nome: "Corpo e treino",
    texto: "Treinei pesado: esporte, luta ou trabalho braçal. Meu corpo é a minha ferramenta.",
    hatsu: {
      intensificacao: ["Kongōshin", "Toda a aura vai para o corpo: ossos e músculos ficam mais duros que aço, e um golpe concentrado no punho derruba paredes.", "金剛身, o “corpo de diamante” do budismo, que nada consegue quebrar"],
      transformacao: ["Damascus", "Sua aura imita o metal quente: você endurece ou amolece partes do corpo para absorver golpes e devolver o impacto.", "o aço de Damasco, forjado em camadas e famoso por não quebrar"],
      emissao: ["Tōate", "Seu soco continua viajando depois que o braço para: a aura sai em forma de punho e acerta alvos a dezenas de metros.", "遠当て, o golpe à distância das lendas das artes marciais japonesas"],
      materializacao: ["Sisyphus", "Você materializa pesos, luvas e faixas de aura; quem estiver preso a eles fica lento e pesado, menos você.", "Sísifo, condenado a empurrar uma pedra morro acima para sempre"],
      manipulacao: ["Eye of the Tiger", "Com um tapa no ombro de alguém, você controla o ritmo do corpo dele: pode fazê-lo correr além do limite ou cansar na hora.", "a música do treino de Rocky Balboa"],
      especializacao: ["Plus Ultra", "Toda vez que você supera um limite físico em combate, a aura grava a marca, e ela vira o seu novo ponto de partida.", "“mais além” em latim, o lema de quem passou do limite do mundo conhecido"],
    },
  },
  {
    id: "jogos",
    nome: "Jogos",
    texto: "Passei horas jogando: cartas, tabuleiro, videogame ou apostas.",
    hatsu: {
      intensificacao: ["Ace of Spades", "Você reforça qualquer carta, dado ou peça até virar arma: uma carta corta como lâmina e um dado pesa como uma pedra.", "o ás de espadas, a carta mais forte do baralho, e a música do Motörhead"],
      transformacao: ["Wild Card", "Sua aura copia por alguns segundos a propriedade da última coisa que você tocou: dura como pedra, fluida como água ou quente como brasa, conforme a jogada pedir.", "o curinga, que vale o que o jogador quiser"],
      emissao: ["Player 2", "Você lança avatares de aura que lutam a distância seguindo os seus comandos, como personagens de um jogo.", "o segundo controle, que entra no jogo para ajudar"],
      materializacao: ["Royal Flush", "Você materializa cinco cartas de aura por luta. Sozinhas, cada uma dá um golpe fraco; quando formam uma mão de pôquer, a força cresce com a mão, do par ao royal flush.", "a sequência do 10 ao ás do mesmo naipe, a mão mais alta do pôquer"],
      manipulacao: ["Zugzwang", "Quem pisar no quadrado que você desenhou no chão vira uma peça e só pode se mover do jeito que aquela peça se move.", "termo alemão do xadrez: ser obrigado a mover mesmo que todo lance piore a posição"],
      especializacao: ["Alea Iacta Est", "Você propõe uma aposta e, se o adversário aceitar, quem perder entrega o que foi apostado, nem que seja o próprio Nen.", "“a sorte está lançada”, o que Júlio César disse ao cruzar o Rubicão"],
    },
  },
  {
    id: "tecnologia",
    nome: "Tecnologia",
    texto: "Vivo conectado: celular, computador, programação.",
    hatsu: {
      intensificacao: ["Overclock", "Você reforça qualquer aparelho com aura: o celular vira escudo, o notebook vira aríete, e nada descarrega no meio da luta.", "forçar um processador além da velocidade de fábrica"],
      transformacao: ["Ping", "Sua aura imita um sinal sem fio: se espalha pelo ambiente e avisa de qualquer coisa que se mova dentro do alcance.", "o sinal que a rede manda para saber quem está do outro lado"],
      emissao: ["Argus", "Você solta pequenos drones de aura que voam sozinhos, filmam o que veem e transmitem para a sua mente.", "Argos Panoptes, o gigante grego de cem olhos que nunca dormia"],
      materializacao: ["Deus ex Machina", "Você materializa um celular de aura com aplicativos que funcionam de verdade: rastrear, gravar uma técnica, trancar uma porta.", "“o deus que sai da máquina” em latim, a solução que aparece do nada"],
      manipulacao: ["sudo", "Ao tocar um aparelho, você passa a comandar qualquer máquina ligada à mesma rede: portas, luzes, câmeras, carros. Pessoas, não.", "o comando que dá poder de superusuário num computador"],
      especializacao: ["Ctrl+Z", "Antes de lutar, você salva o seu estado; uma vez por dia, pode restaurar o corpo como estava no último backup.", "o atalho de desfazer"],
    },
  },
  {
    id: "livros",
    nome: "Livros e estudo",
    texto: "Cresci entre livros, aulas e perguntas. Quero entender tudo.",
    hatsu: {
      intensificacao: ["Scientia Potentia Est", "Quanto mais você sabe do adversário, mais forte fica: cada fraqueza estudada vira reforço no golpe certo.", "“conhecimento é poder” em latim, atribuído a Francis Bacon"],
      transformacao: ["Sumi-e", "Sua aura imita tinta: escreve no ar e mancha o adversário, e o que você escrever nele vira uma marca que não sai.", "墨絵, a pintura japonesa com tinta preta e pincel"],
      emissao: ["Alexandria", "Livros de aura saem voando e se abrem sobre o alvo; cada página que encosta pesa mais do que a anterior.", "a grande biblioteca da Antiguidade, no Egito"],
      materializacao: ["Atlas", "Você materializa um caderno: o que você escreve nele sobre um lugar onde já esteve vira um mapa fiel, com quem está lá neste momento.", "o titã grego que segura o céu, que deu nome aos livros de mapas"],
      manipulacao: ["Ex Cathedra", "Quem ouvir a sua explicação até o fim fica obrigado a seguir a regra que você ensinou durante um minuto.", "“da cátedra” em latim: falar com uma autoridade que não se discute"],
      especializacao: ["Mise en Scène", "Você lê em voz alta um trecho de livro e, por um minuto, a cena descrita acontece de verdade ao seu redor: chuva, uma ponte, um muro.", "“pôr em cena” em francês, termo do teatro e do cinema"],
    },
  },
  {
    id: "musica",
    nome: "Música",
    texto: "A música me salvou: canto, toco ou vivo de fone de ouvido.",
    hatsu: {
      intensificacao: ["Taiko", "Sua aura pulsa no ritmo da música na sua cabeça: cada golpe dado no tempo certo bate com o dobro de força.", "太鼓, os grandes tambores japoneses"],
      transformacao: ["Banshee", "Sua aura vibra como som: atravessa paredes, estoura vidros e tira o equilíbrio de quem ouve.", "o espírito da lenda irlandesa cujo grito anuncia desgraça"],
      emissao: ["Fortissimo", "As notas que você toca saem como ondas de aura que empurram quem estiver no caminho; quanto mais grave a nota, mais forte o empurrão.", "“muito forte” em italiano, a indicação de tocar no volume máximo"],
      materializacao: ["Stradivarius", "Você materializa um violino de aura. Quem ouve você tocar sente a emoção da música: uma melodia triste tira do inimigo a vontade de lutar, uma marcha dá coragem aos aliados.", "os violinos de Antonio Stradivari, os mais valiosos do mundo"],
      manipulacao: ["Hamelin", "Quem escutar o seu assobio passa a se mover no compasso que você escolher.", "o flautista de Hamelin, que levou a cidade inteira atrás da sua música"],
      especializacao: ["Leitmotiv", "Cada pessoa que você conhece ganha um tema musical na sua cabeça; quando o tema dela toca, você sabe onde ela está, a qualquer distância.", "termo alemão: o tema musical que anuncia cada personagem numa ópera"],
    },
  },
  {
    id: "cuidado",
    nome: "Cuidado e saúde",
    texto: "Cuidei de alguém doente ou trabalho com saúde e cuidado.",
    hatsu: {
      intensificacao: ["Reiki", "Você reforça a cura natural do corpo: seu toque acelera a recuperação de ferimentos, seus e dos outros.", "霊気, a prática japonesa de cuidar pela imposição das mãos"],
      transformacao: ["Plaster of Paris", "Sua aura imita gesso: em volta de um ferimento, endurece e segura o osso no lugar; num inimigo, trava a articulação que tocar.", "o gesso de Paris, usado há séculos para imobilizar fraturas"],
      emissao: ["Triage", "Você solta pequenas esferas de aura que procuram ferimentos a dezenas de metros, grudam neles e estancam o sangramento.", "a triagem do pronto-socorro, que decide quem é atendido primeiro (do francês trier, separar)"],
      materializacao: ["Asclepius", "Você materializa curativos, talas e linha de sutura de aura que fecham feridas enquanto existirem.", "Asclépio, o deus grego da medicina, e o bastão com a serpente"],
      manipulacao: ["Pranayama", "Ao tocar alguém, você controla o coração e a respiração dele: acalma um ferido ou derruba um inimigo.", "o controle da respiração no yoga, do sânscrito prana (fôlego vital)"],
      especializacao: ["Compassio", "Você sente no próprio corpo a dor de quem está perto: sabe onde e quão grave é cada ferimento e pode tomar para si metade da dor de alguém.", "“sofrer junto” em latim, a origem da palavra compaixão"],
    },
  },
  {
    id: "artesanato",
    nome: "Trabalho manual",
    texto: "Faço coisas com as mãos: costura, desenho, artesanato ou consertos.",
    hatsu: {
      intensificacao: ["Hephaestus", "Qualquer ferramenta na sua mão vira extensão do corpo: uma agulha fura aço e um martelo racha pedra.", "Hefesto, o ferreiro dos deuses gregos"],
      transformacao: ["Raku", "Sua aura imita argila molhada: o que você toca fica moldável por alguns segundos, e você amassa uma arma, uma parede ou a lâmina do adversário.", "楽焼, a cerâmica japonesa feita à mão e queimada em fogo rápido"],
      emissao: ["Purple Crayon", "O que você desenha ganha vida longe de você e cumpre uma única tarefa antes de sumir.", "o giz de cera roxo de Harold, cujo desenho virava realidade"],
      materializacao: ["Dōgu", "Você materializa a ferramenta certa para o problema da vez, uma de cada vez, e ela só existe enquanto você a segura com as duas mãos.", "道具, “ferramenta” em japonês"],
      manipulacao: ["Bunraku", "Com fios de aura presos às juntas, você move bonecos, objetos e até pessoas como marionetes.", "文楽, o teatro japonês de bonecos manipulados à vista do público"],
      especializacao: ["Kintsugi", "Você conserta qualquer coisa quebrada que juntar com as mãos, inclusive uma técnica de Nen danificada.", "金継ぎ, a arte japonesa de consertar cerâmica quebrada com ouro"],
    },
  },
  {
    id: "perda",
    nome: "Perda e injustiça",
    texto: "Perdi alguém ou algo importante por uma injustiça, e não esqueço.",
    hatsu: {
      intensificacao: ["Requiem", "A lembrança do que você perdeu vira força pura: seus golpes ficam muito mais fortes contra quem fere inocentes.", "a missa pelos mortos"],
      transformacao: ["Cocytus", "Sua aura imita o frio do luto: congela o que toca e deixa o adversário lento, como quem perdeu a vontade.", "o lago congelado no fundo do Inferno de Dante"],
      emissao: ["Skrik", "Você solta toda a dor de uma vez num disparo de aura que explode no alvo e deixa você exausto.", "o título original, em norueguês, de “O Grito”, de Edvard Munch"],
      materializacao: ["Butsudan", "Você materializa um pequeno altar e guarda nele um objeto de quem perdeu; enquanto o altar estiver fechado, nenhum ataque atinge a pessoa que você protege.", "仏壇, o altar budista que as famílias japonesas mantêm em casa para lembrar quem partiu"],
      manipulacao: ["Déjà Vu", "Ao olhar o alvo nos olhos, você o prende numa lembrança dele mesmo: por alguns segundos ele repete o último movimento que fez, e você sabe exatamente qual será.", "“já visto” em francês, a sensação de estar revivendo algo"],
      especializacao: ["Ofrenda", "Por um tempo, você usa a técnica de alguém que perdeu como se fosse sua.", "“oferenda” em espanhol: o altar do Dia de Muertos, no México, que chama de volta quem partiu"],
    },
  },
  {
    id: "dinheiro",
    nome: "Trabalho e contas",
    texto: "Trabalho desde cedo e lido com contas, dívidas ou negócios.",
    hatsu: {
      intensificacao: ["Zangyō", "Quanto mais a luta dura, mais forte você fica: a aura se acumula como hora extra.", "残業, “hora extra” em japonês"],
      transformacao: ["Midas Touch", "Sua aura imita o metal das moedas: endurece o corpo e ricocheteia em ângulos que só você calcula.", "o toque do rei Midas, que transformava tudo em ouro"],
      emissao: ["Pony Express", "Você envia pacotes de aura que viajam até o alvo e só se abrem na hora combinada.", "o correio a cavalo que cruzava o Velho Oeste americano"],
      materializacao: ["Chokin", "Você materializa um cofrinho: cada golpe que recebe sem revidar vira uma moeda guardada, e ao quebrar o cofrinho você solta de uma vez toda a força acumulada.", "貯金, “poupança” em japonês"],
      manipulacao: ["Mephisto", "Quem assinar um contrato com você fica preso às cláusulas: se descumprir, você controla o corpo dele por um minuto.", "Mefistófeles, o demônio do pacto com Fausto"],
      especializacao: ["Buy Now, Pay Later", "Você adia o dano que recebe e paga em parcelas depois, desde que nunca atrase uma.", "“compre agora, pague depois”, o lema do crediário"],
    },
  },
  {
    id: "natureza",
    nome: "Natureza e bichos",
    texto: "Cresci no mato, perto do mar ou cercado de bichos.",
    hatsu: {
      intensificacao: ["Call of the Wild", "Seus sentidos e seu corpo ficam como os de um animal: você fareja, ouve e salta muito além do normal.", "“O Chamado Selvagem”, de Jack London"],
      transformacao: ["Poppy Field", "Sua aura imita pólen: se espalha no ar e deixa quem respira sonolento e confuso.", "o campo de papoulas de “O Mágico de Oz”, que fazia todos dormirem"],
      emissao: ["Wild Hunt", "Você solta animais de aura que caçam sozinhos e voltam com o que encontraram.", "a Caçada Selvagem das lendas europeias, uma matilha fantasma no céu"],
      materializacao: ["Taikōbō", "Você materializa uma vara de pescar: o anzol fisga o Nen do adversário, e você puxa.", "太公望, o sábio chinês que pescava com anzol reto e mesmo assim fisgou um reino"],
      manipulacao: ["Takagari", "Você controla um animal de verdade por vez e compartilha os sentidos dele: vê, ouve e fareja como ele, a qualquer distância.", "鷹狩り, a falcoaria japonesa: caçar com falcões treinados"],
      especializacao: ["Quattro Stagioni", "Seu Nen muda com a estação: na primavera você se cura, no verão ataca mais forte, no outono fica mais rápido e no inverno some da vista.", "“As Quatro Estações”, de Vivaldi"],
    },
  },
  {
    id: "fogo",
    nome: "Fogo e cozinha",
    texto: "Cozinho, adoro um churrasco ou cresci perto de fogo e fumaça.",
    hatsu: {
      intensificacao: ["Agni", "Seu corpo esquenta com a aura: os golpes queimam, e você aguenta um calor que derreteria qualquer um.", "o deus do fogo dos Vedas, na Índia"],
      transformacao: ["Salamander", "Sua aura imita brasa: queima devagar o que toca e, quanto mais tempo dura o contato, mais fundo vai o calor.", "a salamandra, o espírito do fogo na alquimia"],
      emissao: ["Hanabi", "Você atira fagulhas de aura que explodem como pequenas bombas ao tocar o alvo.", "花火, “flor de fogo”: os fogos de artifício japoneses"],
      materializacao: ["Kamado", "Você materializa uma panela de aura: o que entra nela sai mais fraco ou mais forte, você decide.", "かまど, o fogão de barro tradicional japonês"],
      manipulacao: ["Tatara", "Você controla a temperatura de tudo o que está queimando ou cozinhando por perto: apaga um incêndio, ferve uma poça ou deixa uma lâmina em brasa.", "たたら, o forno tradicional japonês de fundir ferro para fazer espadas"],
      especializacao: ["Babette's Feast", "Quem comer o que você cozinhou recebe por uma hora o efeito que você escreveu na receita.", "“A Festa de Babette”, em que um jantar muda quem o come"],
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
