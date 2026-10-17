// Conteúdo autoral do quiz: perguntas e opções.
// Cada opção aponta para UM tipo de Nen (chave curta). Os pesos numéricos
// são gerados por scripts/gerar-perguntas.mjs, que também valida o equilíbrio.
//
// Princípio: o membro da Trupe ou do Zodíaco é só o TEMA da pergunta
// (uma cena ou traço dele). As opções descrevem reações ligadas à teoria
// de personalidade do Hisoka, não ao tipo de Nen do membro.
//
// Chaves: int = Intensificação · tra = Transformação · mat = Materialização
//         esp = Especialização · man = Manipulação · emi = Emissão

export const TROUPE = [
  {
    membro: "Chrollo Lucilfer", posicao: "#0",
    texto: "Você comanda um grupo e o plano principal falha no meio do caminho. Qual é a sua reação?",
    opcoes: {
      int: "Sigo em frente e resolvo na raça. Recuar não é opção.",
      tra: "Improviso algo novo na hora. Ninguém espera, nem eu.",
      mat: "Já tinha um plano B pronto. Sempre tenho.",
      man: "Reorganizo as peças: cada um vai para onde rende mais.",
    },
  },
  {
    membro: "Nobunaga Hazama", posicao: "#1",
    texto: "Um companheiro de longa data morre pelas mãos de um inimigo. O que você faz?",
    opcoes: {
      int: "Choro sem vergonha e juro que vou acertar as contas.",
      emi: "Explodo na hora. Quero o culpado agora, não amanhã.",
      esp: "Guardo para mim. Ninguém precisa ver o que sinto.",
      mat: "Fico em silêncio e estudo o inimigo até saber como vencê-lo.",
    },
  },
  {
    membro: "Feitan Portor", posicao: "#2",
    texto: "Numa briga, alguém te acerta em cheio. O que acontece com você?",
    opcoes: {
      tra: "Dou risada, finjo que não doeu e espero ele baixar a guarda.",
      man: "Fico frio e calculo como virar o jogo a meu favor.",
      emi: "A raiva sobe na hora e eu devolvo com o dobro de força.",
      esp: "A dor me deixa mais perigoso, de um jeito que só eu sei usar.",
    },
  },
  {
    membro: "Machi Komacine", posicao: "#3",
    texto: "Você tem um pressentimento forte, mas nenhuma prova. O que faz?",
    opcoes: {
      int: "Confio no instinto e ajo. Ele quase nunca erra.",
      tra: "Comento com os outros só pelo prazer de ver a reação deles.",
      mat: "Procuro provas antes de mexer um dedo.",
      man: "Uso o pressentimento como argumento para guiar a decisão do grupo.",
    },
  },
  {
    membro: "Hisoka Morow", posicao: "#4",
    texto: "Você conhece alguém com um potencial enorme, mas ainda verde. O que faz?",
    opcoes: {
      int: "Treino junto. Gosto de ver gente crescer do meu lado.",
      emi: "Desafio de cara. Quero ver do que essa pessoa é capaz agora.",
      esp: "Observo de longe e espero o dia em que ela estiver pronta.",
      mat: "Anoto tudo o que ela faz. Um dia isso vai ser útil.",
    },
  },
  {
    membro: "Phinks Magcub", posicao: "#5",
    texto: "Quanto mais você se prepara, mais forte fica, mas a preparação é longa e repetitiva. Como encara?",
    opcoes: {
      tra: "Invento um jogo para a repetição ficar divertida.",
      man: "Monto um método para render o máximo com o mínimo de esforço.",
      emi: "Fico impaciente e quero pular logo para a parte boa.",
      esp: "Faço no meu ritmo, de um jeito que ninguém entende.",
    },
  },
  {
    membro: "Shalnark", posicao: "#6",
    texto: "Uma discussão esquenta no grupo e pode virar briga. Qual é o seu papel?",
    opcoes: {
      int: "Falo na cara o que penso, e depois a gente segue.",
      tra: "Solto uma piada para mudar o clima.",
      mat: "Fico de fora, observando quem tem razão.",
      man: "Proponho tirar no cara ou coroa e todo mundo aceita o resultado.",
    },
  },
  {
    membro: "Franklin Bordeau", posicao: "#7",
    texto: "Você e seu grupo estão cercados por muitos inimigos fracos. O que faz?",
    opcoes: {
      int: "Vou para a frente e derrubo um por um.",
      emi: "Ataco em todas as direções. Quantidade se resolve com volume.",
      esp: "Resolvo de um jeito que ninguém do grupo esperaria.",
      mat: "Preparo uma armadilha e deixo eles virem até mim.",
    },
  },
  {
    membro: "Shizuku Murasaki", posicao: "#8",
    texto: "Alguém diz que te conhece, mas você esqueceu completamente o nome dessa pessoa. E agora?",
    opcoes: {
      tra: "Finjo que lembro e vou levando a conversa.",
      man: "Faço perguntas até a pessoa dizer o próprio nome sem perceber.",
      emi: "Admito na hora. Não tenho paciência para teatro.",
      esp: "Nem me preocupo. Se esqueci, não devia ser importante.",
    },
  },
  {
    membro: "Pakunoda", posicao: "#9",
    texto: "Você poderia descobrir os segredos de alguém só tocando nessa pessoa. Usaria?",
    opcoes: {
      int: "Não. Prefiro perguntar e ouvir a resposta.",
      tra: "Usaria, mas só para brincar com o que descobrisse.",
      mat: "Só se tivesse certeza de que é necessário e seguro.",
      man: "Sem dúvida. Informação é a melhor ferramenta que existe.",
    },
  },
  {
    membro: "Bonolenov Ndongo", posicao: "#10",
    texto: "Que lugar suas origens e tradições ocupam na sua vida?",
    opcoes: {
      int: "Carrego com orgulho e não escondo de ninguém.",
      emi: "Vivo o presente. O passado não me prende.",
      esp: "Transformei tudo em algo só meu, que ninguém mais entende.",
      mat: "Guardo e preservo cada detalhe, como um arquivo.",
    },
  },
  {
    membro: "Uvogin", posicao: "#11",
    texto: "Qual é o seu estilo numa luta?",
    opcoes: {
      tra: "Confundir. O adversário nunca sabe o que vem a seguir.",
      man: "Controlar o ritmo e fazer o outro lutar do meu jeito.",
      emi: "Atacar de longe, com tudo, sem esperar.",
      esp: "Um estilo próprio, impossível de copiar.",
    },
  },
  {
    membro: "Kortopi", posicao: "#12",
    desempate: true,
    texto: "No seu grupo, qual papel é naturalmente seu?",
    opcoes: {
      int: "Linha de frente: sou quem segura o tranco.",
      tra: "Curinga: ninguém sabe o que eu vou fazer.",
      mat: "Ferramentas: eu crio o que estiver faltando.",
      esp: "Peça única: faço o que ninguém mais faz.",
      man: "Estratégia: decido quem vai para onde.",
      emi: "Apoio de longe: ataco e dou cobertura.",
    },
  },
];

export const ZODIACO = [
  {
    membro: "Kurapika", posicao: "Rato",
    texto: "Você pode ter um poder enorme, mas cada uso encurta sua vida. Aceitaria?",
    opcoes: {
      int: "Aceito, se for para proteger quem eu amo. Simples assim.",
      tra: "Aceito, e decido na hora quando vale a pena usar.",
      mat: "Só com regras rígidas que eu mesmo definiria antes.",
      man: "Aceito e planejo cada uso para tirar o máximo de cada segundo.",
    },
  },
  {
    membro: "Mizaistom Nana", posicao: "Boi",
    texto: "Você presencia uma injustiça clara. Como reage?",
    opcoes: {
      int: "Intervenho na hora, sem pensar duas vezes.",
      emi: "Perco a paciência e falo alto na frente de todo mundo.",
      esp: "Resolvo do meu jeito, longe dos olhos dos outros.",
      mat: "Reúno provas antes. Justiça sem prova não se sustenta.",
    },
  },
  {
    membro: "Kanzai", posicao: "Tigre",
    texto: "Riem de você por não saber algo que \"todo mundo sabe\". O que faz?",
    opcoes: {
      tra: "Rio junto e invento uma resposta absurda de propósito.",
      man: "Mudo de assunto para algo em que eu sou bom.",
      emi: "Me irrito e mando todo mundo calar a boca.",
      esp: "Não ligo. Eu sei o que importa para mim.",
    },
  },
  {
    membro: "Pyon", posicao: "Coelho",
    texto: "Você está numa reunião longa e chata. O que está fazendo?",
    opcoes: {
      int: "Prestando atenção, mesmo entediado. Prometi estar ali.",
      tra: "Fazendo comentários que só alguns entendem.",
      mat: "Anotando tudo. Um detalhe pode ser importante depois.",
      man: "Mexendo no celular, mas já combinando votos por mensagem.",
    },
  },
  {
    membro: "Botobai Gigante", posicao: "Dragão",
    texto: "Seu mentor deixa um último pedido antes de partir. O que você faz?",
    opcoes: {
      int: "Cumpro à risca, custe o que custar.",
      emi: "Começo agora. Não dá para esperar.",
      esp: "Cumpro do meu jeito, mesmo que ninguém entenda.",
      mat: "Estudo o pedido até ter certeza do que ele quis dizer.",
    },
  },
  {
    membro: "Gel", posicao: "Serpente",
    texto: "Surge a chance de explorar um lugar desconhecido e muito perigoso. Você vai?",
    opcoes: {
      tra: "Vou. O imprevisível é a melhor parte.",
      man: "Vou, se eu puder montar a equipe e o plano.",
      emi: "Vou na hora, antes que mudem de ideia.",
      esp: "Só vou se alguém que eu admiro for também.",
    },
  },
  {
    membro: "Saccho Kobayakawa", posicao: "Cavalo",
    texto: "Uma regra parece injusta, mas é a regra. O que você faz?",
    opcoes: {
      int: "Sigo a regra. Palavra dada é palavra cumprida.",
      tra: "Acho uma brecha e me divirto com ela.",
      mat: "Leio a regra inteira de novo. Quase sempre há um detalhe que muda tudo.",
      man: "Uso a própria regra para chegar onde eu quero.",
    },
  },
  {
    membro: "Ginta", posicao: "Carneiro",
    texto: "Você vê alguém maltratando um animal. Qual é sua reação?",
    opcoes: {
      int: "Paro aquilo na hora, com as próprias mãos se precisar.",
      emi: "Fico furioso e grito antes de pensar.",
      esp: "Tomo uma atitude que essa pessoa nunca vai esquecer.",
      mat: "Registro tudo e denuncio a quem pode punir de verdade.",
    },
  },
  {
    membro: "Saiyu", posicao: "Macaco",
    texto: "Você discorda de alguém poderoso numa reunião. O que faz?",
    opcoes: {
      tra: "Provoco com ironia. Quero ver a reação.",
      man: "Fico quieto agora e articulo apoio para derrubar a ideia depois.",
      emi: "Falo na lata, na frente de todos.",
      esp: "Nem discuto. Faço o que acho certo e pronto.",
    },
  },
  {
    membro: "Cluck", posicao: "Galo",
    texto: "Como você mais gosta de se expressar?",
    opcoes: {
      int: "Pelo esporte e pelo esforço físico.",
      tra: "Pela dança ou pela atuação: cada dia um personagem.",
      mat: "Por algo que eu construo com as mãos.",
      man: "Pela conversa. Convencer é uma arte.",
    },
  },
  {
    membro: "Cheadle Yorkshire", posicao: "Cão",
    texto: "Numa crise, ninguém assume o comando. O que você faz?",
    opcoes: {
      int: "Assumo e vou na frente.",
      emi: "Dou ordens rápidas. Depois a gente acerta os detalhes.",
      esp: "Espero. Se for para eu liderar, o grupo vai perceber.",
      mat: "Assumo, mas só depois de entender bem o problema.",
    },
  },
  {
    membro: "Leorio Paradinight", posicao: "Javali",
    desempate: true,
    texto: "Por que você quer ser Hunter?",
    opcoes: {
      tra: "Pela aventura e pelas surpresas do caminho.",
      man: "Pelo dinheiro e pelas portas que a licença abre.",
      emi: "Porque não aguento ficar parado vendo o mundo passar.",
      esp: "Por um motivo que só eu entendo.",
    },
  },
];
