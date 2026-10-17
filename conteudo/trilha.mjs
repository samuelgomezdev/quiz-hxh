// Trilha sonora: que faixa toca em cada situação do site.
// Faixas da trilha oficial do anime de 2011 (Yoshihisa Hirano, VAP), tocadas pelo Spotify.
// A escolha segue o título da faixa, nunca o acaso, em três níveis (regras em motor/trilha.mjs):
//   1. personagem → a faixa que leva o nome ou a marca dele (Killua, Kurapika, Chrollo...)
//   2. grupo      → a faixa do grupo dele (Trupe, Zoldyck, Zodíaco, Formigas Quimera...)
//   3. tela       → a faixa do momento (montar o poder, escolher a caçada...)
// "traducao" segue a tradução da Hunterpedia; "album" é o volume da trilha (1, 2 ou 3).

export const FAIXAS = {
  // Personagens
  killua: { spotify: "5F0QoU4XCrdNlDdru6Gf6m", nome: "Ginpatsu no Shōnen", album: 1, traducao: "“O garoto de cabelo prateado”" },
  kurapika: { spotify: "4k8qWLE0P9L9y6ZTDeQk0k", nome: "Hiiro no Hitomi no Aika", album: 1, traducao: "“O lamento dos olhos escarlates”" },
  leorio: { spotify: "2fP6LEkHgDGsZ20048ng3u", nome: "All I Need Is MONEY!", album: 1, traducao: "“Só preciso de dinheiro!”, o motivo que o Leorio dá no Exame" },
  gon: { spotify: "1UqbxT0ISEtaNtUSPLXEnN", nome: "Go on, Gon!", album: 2, traducao: "“Vai em frente, Gon!”" },
  hisoka: { spotify: "7w4vDANlj1P5aitwEKYBWg", nome: "Kijutsushi no Baire", album: 1, traducao: "“A dança do mágico”" },
  chrollo: { spotify: "6Lk1baF61VDMRDC2kFVntM", nome: "Gyakujūji no Otoko", album: 2, traducao: "“O homem da cruz invertida”, a do casaco do Chrollo" },
  nobunaga: { spotify: "2xXrW0TQTVgSiuovqnOS9l", nome: "Iai no Kyōjin", album: 2, traducao: "“O louco do iaidō”, a arte de sacar a espada" },
  uvogin: { spotify: "6OitnxM46DvAF1byaKhpv1", nome: "Sono Kyōkan, Ryoryoku Zetsurin", album: 2, traducao: "“Esse bandido, de força sem igual”" },
  ging: { spotify: "1my84BIIIjJH7hEHFKvid8", nome: "Chichi no Senaka", album: 1, traducao: "“As costas do meu pai”" },
  netero: { spotify: "6nBCSvioSDFhZ1RaH6nlA5", nome: "Legend of the Martial Artist", album: 3, traducao: "“A lenda do artista marcial”" },
  meruem: { spotify: "0uCgEJ9Md7vyyZuRRMqxbI", nome: "Elegy of the Dynast", album: 3, traducao: "“Elegia do soberano”" },
  genthru: { spotify: "1vbQjOn9IIulFenUPTcQh8", nome: "Who’s the Bomber?", album: 3, traducao: "“Quem é o Bomber?”, o apelido do Genthru em Greed Island" },

  // Grupos
  aranhas: { spotify: "6OvcGasJ5KrLtgmoCaYf7R", nome: "Kumo no Canzone", album: 2, traducao: "“A canção das aranhas”" },
  requiem: { spotify: "137dELjDbuUUbd7L1009Dv", nome: "Requiem Aranea", album: 2, traducao: "“Réquiem da aranha”, em latim" },
  fantasma: { spotify: "7uhZ0Irxe4uUk3R2MweOip", nome: "Genei no Banka", album: 1, traducao: "“A elegia do fantasma”, com o mesmo 幻影, genei, do nome japonês da Trupe, Genei Ryodan" },
  zoldyck: { spotify: "7aD3DVd804OPk5JhnO0042", nome: "Ansatsu Ikka no Yakata", album: 2, traducao: "“A mansão da família de assassinos”" },
  eternos: { spotify: "5ICyB3Khaha87FG9w6rMZx", nome: "Hunter yo Eien Nare!", album: 1, traducao: "“Que você seja Hunter para sempre!”" },
  marcha: { spotify: "5CwpBSpgpHoRwu8AXNpJQu", nome: "Hunter ☆ March", album: 1, traducao: "“Marcha dos Hunters”" },
  mares: { spotify: "53l5ZSocXsBoycSEQtK0os", nome: "Beyond the Seas", album: 1, traducao: "“Além dos mares”" },
  viagem: { spotify: "2eJHnOWh1ZdRlYp9sswQsm", nome: "Kōkai", album: 1, traducao: "“Viagem por mar”, como a do navio de Kakin" },
  palacio: { spotify: "6jc699F2pFPUH4qLgB42t5", nome: "In the Palace - Agitato", album: 3, traducao: "“No palácio”, onde a Guarda Real protege o Rei" },
  soldados: { spotify: "0ms9Y9tBJXUF0raFE8l9qK", nome: "Soldier Ants", album: 3, traducao: "“Formigas soldado”" },
  greedIsland: { spotify: "0iuhw4Ok6TJWi5bP52Kyat", nome: "G・I Theme", album: 3, traducao: "o tema de Greed Island" },

  // Telas e momentos
  mundo: { spotify: "6uTTT5YZLkrI8atUK97s52", nome: "The World of Adventurers", album: 1, traducao: "“O mundo dos aventureiros”" },
  baleia: { spotify: "3snNowHzH6pSjIR6YDZC7I", nome: "Kujira-tō Yori", album: 1, traducao: "“Da Ilha Baleia”, onde o Gon cresceu" },
  sonho: { spotify: "7fP6ovFqDOrvrFsjQTrRwN", nome: "Yume wo Oikakete", album: 1, traducao: "“Correndo atrás de um sonho”" },
  presa: { spotify: "6uLi0hkw3CZdWxlZiDQJjK", nome: "Koshitantan...", album: 1, traducao: "“Espreitando a presa...”" },
  companheiros: { spotify: "5JSCkc5mK36fox8BFveqs2", nome: "Nakama to Iu Koto.", album: 1, traducao: "“Isso que chamam de companheiros.”" },
  parada: { spotify: "234le5zcrnvEO9tO5E3r5J", nome: "Hunter ☆ Parade", album: 1, traducao: "“Desfile dos Hunters”" },
  latente: { spotify: "1TaOHBZnRoxHFtiMuz5Ik2", nome: "Latent Power", album: 2, traducao: "“Poder latente”" },
  realizado: { spotify: "3mWKmmiMvPc6wFJVCLACAO", nome: "Realized Capacity", album: 2, traducao: "“Capacidade realizada”" },
};

// 1. Personagem com faixa própria (pelo título)
export const FAIXA_DO_PERSONAGEM = {
  "killua-zoldyck": "killua",
  kurapika: "kurapika",
  "leorio-paradinight": "leorio",
  "gon-freecss": "gon",
  "hisoka-morow": "hisoka",
  "chrollo-lucilfer": "chrollo",
  "nobunaga-hazama": "nobunaga",
  uvogin: "uvogin",
  "ging-freecss": "ging",
  "isaac-netero": "netero",
  meruem: "meruem",
  genthru: "genthru",
};

// 2. Grupo de cada personagem citado no site (quiz, Hatsu, estilo parecido, feitos)
export const GRUPO_DO_PERSONAGEM = {
  trupe: ["chrollo-lucilfer", "nobunaga-hazama", "feitan-portor", "machi-komacine", "hisoka-morow", "phinks-magcub", "shalnark",
    "franklin-bordeau", "shizuku-murasaki", "pakunoda", "bonolenov-ndongo", "uvogin", "kortopi"],
  zoldyck: ["killua-zoldyck", "illumi-zoldyck", "silva-zoldyck", "zeno-zoldyck", "kalluto-zoldyck", "alluka-zoldyck"],
  zodiaco: ["kurapika", "leorio-paradinight", "ging-freecss", "mizaistom-nana", "kanzai", "pyon", "botobai-gigante", "gel",
    "saccho-kobayakawa", "ginta", "saiyu", "cluck", "cheadle-yorkshire"],
  guardaReal: ["neferpitou", "shaiapouf", "menthuthuyoupi"],
  formigas: ["meruem", "welfin", "ikalgo", "cheetu", "leol", "colt"],
  greedIsland: ["genthru", "razor", "biscuit-krueger"],
  // Hunters com licença citados no site, sem grupo mais próprio
  associacao: ["knuckle-bine", "shoot-mcmahon", "morel-mackernasey", "knov", "palm-siberia", "melody", "menchi", "satotz",
    "linne-horsdoeuvre", "sanbica-norton", "loupe-highland", "ickshonpe-katocha"],
};

// Faixa de cada grupo. A Trupe e o Zodíaco têm uma para as perguntas e outra para o resultado;
// "membro" é a faixa de um membro sem faixa própria.
export const FAIXA_DO_GRUPO = {
  trupe: { nome: "Trupe Fantasma", pergunta: "aranhas", resultado: "requiem", membro: "fantasma" },
  zodiaco: { nome: "Zodíaco", pergunta: "eternos", resultado: "eternos", membro: "eternos" },
  zoldyck: { nome: "Família Zoldyck", pergunta: "zoldyck", resultado: "zoldyck", membro: "zoldyck" },
  associacao: { nome: "Associação Hunter", pergunta: "marcha", resultado: "marcha", membro: "marcha" },
  beyond: { nome: "Expedição de Beyond Netero", pergunta: "mares", resultado: "mares", membro: "mares" },
  kakin: { nome: "Guarda Real de Kakin", pergunta: "viagem", resultado: "viagem", membro: "viagem" },
  guardaReal: { nome: "Guarda Real das Formigas Quimera", pergunta: "palacio", resultado: "palacio", membro: "palacio" },
  formigas: { nome: "Formigas Quimera", pergunta: "soldados", resultado: "soldados", membro: "soldados" },
  greedIsland: { nome: "Greed Island", pergunta: "greedIsland", resultado: "greedIsland", membro: "greedIsland" },
};

// 3. Telas e momentos sem personagem nem grupo
export const FAIXA_DO_MOMENTO = {
  inicio: "mundo",
  creditos: "baleia",
  "feitos/trajetoria": "sonho",
  "feitos/caca": "presa",
  "feitos/organizacao": "companheiros", // a mesma em todas as opções, para não denunciar a organização
  "feitos/nome": "parada",
  "poder/montar": "latente",
  "poder/carta": "realizado",
};
