const storyParts = [
  "Era uma vez um jovem chamado {{nome}}...",
  "Que buscava sua primeira oportunidade como Jovem Aprendiz.",
  "Um dia, após muitos processos e entrevistas ele consegue o tão sonhado emprego!",
  "Mas mal sabia que sua jornada tinha acabado de começar",
  ""
];

let currentPart = 0;
let nomeJogador = "";
let setorEscolhido = "";

const nomeInput = document.getElementById("nomeJogador");
const storyText = document.getElementById("storyText");
const nextBtn = document.getElementById("nextBtn");
const popup = document.getElementById("popup");
const jogo = document.getElementById("jogo");
const nomeSpan = document.getElementById("nome");
const setorSpan = document.getElementById("setorEscolhido");
const setorSelect = document.getElementById("setorSelect");

nextBtn.addEventListener("click", () => {
  if (!nomeJogador) {
    nomeJogador = nomeInput.value.trim();
    if (nomeJogador === "") {
      alert("Digite seu nome!");
      return;
    }
    nomeSpan.textContent = nomeJogador;
    storyText.textContent = storyParts[currentPart].replace("{{nome}}", nomeJogador);
    currentPart++;
    nomeInput.style.display = "none";
  } else if (currentPart < storyParts.length) {
    storyText.textContent = storyParts[currentPart];
    currentPart++;

    if (currentPart === storyParts.length) {
      nextBtn.textContent = "Começar Jornada";
      setorSelect.style.display = "block";
    }
  } else if (setorSelect.style.display === "block") {
    setorEscolhido = setorSelect.value;
    if (setorEscolhido === "") {
      alert("Escolha um setor para começar a jornada!");
      return;
    }
    setorSpan.textContent = setorEscolhido;
    popup.style.display = "none";
    jogo.style.display = "block";
    atualizarTela();
  }
});

function atualizarTela() {
  const tituloFase = document.getElementById("titulo-fase");
  const descricaoFase = document.getElementById("descricao-fase");
  const escolha1 = document.getElementById("escolha1");
  const escolha2 = document.getElementById("escolha2");
  const escolha3 = document.getElementById("escolha3");
  const escolha4 = document.getElementById("escolha4");

  tituloFase.textContent = `Primeiro Desafio no setor de ${setorEscolhido}`;
  descricaoFase.textContent = "Você encontra o gerente logo na entrada. Ele te pede uma tarefa que você não sabe fazer. O que você faz?";

  escolha1.textContent = "Perguntar ao gerente como fazer";
  escolha2.textContent = "Tentar resolver sozinho";
  escolha3.textContent = "Perguntar ao meu colega de setor como faz";
  escolha4.textContent = "Não faço";

  escolha1.onclick = () => tomarDecisao(0);
  escolha2.onclick = () => tomarDecisao(1);
  escolha3.onclick = () => tomarDecisao(2);
  escolha4.onclick = () => tomarDecisao(3);
}

function tomarDecisao(escolha) {
  const resultado = document.getElementById("resultado");
  const resp = parseInt(document.getElementById("resp").textContent);

  if (escolha === 0) {
    resultado.textContent = "Seu gerente te instruiu passo a passo em como realizar a demanda. +10 responsabilidade!";
    document.getElementById("resp").textContent = resp + 10;
  } else if (escolha === 1) {
    resultado.textContent = "Você errou tentando sozinho. -5 responsabilidade.";
    document.getElementById("resp").textContent = resp - 5;
  } else if (escolha === 2) {
    resultado.textContent = "O seu colega de setor te ajuda na sua demanda. +5 responsabilidade!";
    document.getElementById("resp").textContent = resp + 5;
  } else if (escolha === 3) {
    resultado.textContent = "Essa ação terá consequências...";
    document.getElementById("resp").textContent = resp - 5;
  }
}
