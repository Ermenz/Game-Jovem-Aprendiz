// Atributos do jogador
let atributos = {
  responsabilidade: 50,
  pontualidade: 50,
  comunicacao: 50,
  desempenho: 50
};

let jogador = {
  nome: "",
  setor: ""
};

let historia = [
  "Bem-vindo à Jornada do Jovem Profissional!",
  "Você está prestes a começar sua trajetória como Jovem Aprendiz.",
  "Durante essa jornada, suas escolhas afetarão seu desenvolvimento.",
  "Vamos começar!"
];

let indiceHistoria = 0;
let faseAtual = 0;
let perguntas = [];

// Questões comuns
const perguntasComuns = [
  {
    titulo: "Primeiro Dia",
    descricao: "Você chegou ao trabalho e ninguém lhe explicou suas tarefas. O que você faz?",
    opcoes: [
      { texto: "Fica parado esperando ordens.", efeitos: { responsabilidade: -10 } },
      { texto: "Procura alguém para perguntar.", efeitos: { comunicacao: +10 } },
      { texto: "Explora o local e tenta entender sozinho.", efeitos: { desempenho: +10 } },
      { texto: "Volta para casa.", efeitos: { pontualidade: -10 } }
    ]
  }
];

// Perguntas por setor
const perguntasTI = [
  {
    titulo: "Erro no sistema",
    descricao: "Um erro crítico apareceu no site da empresa. O que fazer?",
    opcoes: [
      { texto: "Ignorar, talvez alguém resolva.", efeitos: { responsabilidade: -10 } },
      { texto: "Reportar imediatamente ao responsável.", efeitos: { comunicacao: +10 } },
      { texto: "Tentar resolver sozinho com base no que aprendeu.", efeitos: { desempenho: +10 } },
      { texto: "Reiniciar o servidor sem avisar ninguém.", efeitos: { pontualidade: -5, comunicacao: -5 } }
    ]
  }
];

const perguntasMarketing = [
  {
    titulo: "Campanha atrasada",
    descricao: "Uma campanha publicitária está atrasada. O que você faz?",
    opcoes: [
      { texto: "Finge que não é com você.", efeitos: { responsabilidade: -10 } },
      { texto: "Oferece ajuda para acelerar o processo.", efeitos: { responsabilidade: +10 } },
      { texto: "Sugere ideias novas.", efeitos: { desempenho: +10 } },
      { texto: "Reclama no grupo da equipe.", efeitos: { comunicacao: -10 } }
    ]
  }
];

const perguntasRH = [
  {
    titulo: "Conflito entre colegas",
    descricao: "Dois colegas estão discutindo. Como você age?",
    opcoes: [
      { texto: "Finge que não ouviu.", efeitos: { responsabilidade: -10 } },
      { texto: "Chama um superior.", efeitos: { comunicacao: +10 } },
      { texto: "Conversa com ambos para acalmar.", efeitos: { desempenho: +10 } },
      { texto: "Grava a briga e posta no grupo.", efeitos: { responsabilidade: -20 } }
    ]
  }
];

const perguntasLogistica = [
  {
    titulo: "Entrega urgente",
    descricao: "Um pedido importante precisa sair rápido. O que fazer?",
    opcoes: [
      { texto: "Ignora, não é sua função.", efeitos: { responsabilidade: -10 } },
      { texto: "Ajuda a embalar e agilizar.", efeitos: { desempenho: +10 } },
      { texto: "Comunica o gerente da urgência.", efeitos: { comunicacao: +10 } },
      { texto: "Faz de qualquer jeito só para entregar.", efeitos: { responsabilidade: -5 } }
    ]
  }
];

const perguntasFinanceiro = [
  {
    titulo: "Erro na planilha",
    descricao: "Você identificou um erro na planilha financeira. O que faz?",
    opcoes: [
      { texto: "Deixa como está, ninguém vai notar.", efeitos: { responsabilidade: -10 } },
      { texto: "Avisa seu supervisor imediatamente.", efeitos: { comunicacao: +10 } },
      { texto: "Corrige e documenta o erro.", efeitos: { desempenho: +10 } },
      { texto: "Ignora e sai mais cedo.", efeitos: { pontualidade: -10 } }
    ]
  }
];

// HTML Elements
const popup = document.getElementById("popup");
const storyText = document.getElementById("storyText");
const nextBtn = document.getElementById("nextBtn");
const nomeInput = document.getElementById("nomeJogador");
const setorSelect = document.getElementById("setorSelect");

const jogo = document.getElementById("jogo");
const nomeSpan = document.getElementById("nome");
const setorSpan = document.getElementById("setorEscolhido");
const respSpan = document.getElementById("resp");
const pontSpan = document.getElementById("pont");
const comSpan = document.getElementById("com");
const desemSpan = document.getElementById("desem");

const tituloFase = document.getElementById("titulo-fase");
const descricaoFase = document.getElementById("descricao-fase");
const botoes = [
  document.getElementById("escolha1"),
  document.getElementById("escolha2"),
  document.getElementById("escolha3"),
  document.getElementById("escolha4")
];
const resultado = document.getElementById("resultado");

nextBtn.addEventListener("click", () => {
  if (indiceHistoria < historia.length - 1) {
    storyText.textContent = historia[++indiceHistoria];

    if (indiceHistoria === historia.length - 1) {
      setorSelect.style.display = "block";
    }
  } else {
    const nome = nomeInput.value.trim();
    const setor = setorSelect.value;

    if (!nome) return alert("Digite seu nome!");
    if (!setor) return alert("Selecione um setor!");

    jogador.nome = nome;
    jogador.setor = setor;

    nomeSpan.textContent = nome;
    setorSpan.textContent = setor;

    // Montar perguntas finais
    perguntas = [...perguntasComuns];

    switch (setor) {
      case "TI": perguntas.push(...perguntasTI); break;
      case "Marketing": perguntas.push(...perguntasMarketing); break;
      case "RH": perguntas.push(...perguntasRH); break;
      case "Logística": perguntas.push(...perguntasLogistica); break;
      case "Financeiro": perguntas.push(...perguntasFinanceiro); break;
    }

    popup.style.display = "none";
    jogo.style.display = "block";

    carregarFase();
  }
});

function carregarFase() {
  if (faseAtual >= perguntas.length) {
    tituloFase.textContent = "Fim da Jornada";
    descricaoFase.textContent = "Parabéns! Você concluiu sua jornada.";
    botoes.forEach(btn => btn.style.display = "none");
    resultado.textContent = `Seus atributos finais: Responsabilidade ${atributos.responsabilidade}, Pontualidade ${atributos.pontualidade}, Comunicação ${atributos.comunicacao}, Desempenho ${atributos.desempenho}`;
    return;
  }

  const fase = perguntas[faseAtual];
  tituloFase.textContent = fase.titulo;
  descricaoFase.textContent = fase.descricao;
  resultado.textContent = "";

  fase.opcoes.forEach((op, i) => {
    botoes[i].textContent = op.texto;
    botoes[i].style.display = "inline-block";
  });
}

function escolher(indice) {
  const op = perguntas[faseAtual].opcoes[indice];
  for (let key in op.efeitos) {
    atributos[key] += op.efeitos[key];
  }

  atualizarAtributos();
  resultado.textContent = "Você escolheu: " + op.texto;
  faseAtual++;
  setTimeout(carregarFase, 1000);
}

function atualizarAtributos() {
  respSpan.textContent = atributos.responsabilidade;
  pontSpan.textContent = atributos.pontualidade;
  comSpan.textContent = atributos.comunicacao;
  desemSpan.textContent = atributos.desempenho;
}
