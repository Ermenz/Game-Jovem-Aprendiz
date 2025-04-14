// script.js
const personagem = {
    nome: "Lucas",
    responsabilidade: 50,
    pontualidade: 50,
    comunicacao: 50,
    desempenho: 50
  };
  
  const fases = [
    {
      titulo: "Primeiro dia de trabalho!",
      descricao: "Você está animado, mas o ônibus atrasou...",
      escolhas: [
        {
          texto: "Pede desculpas e explica o ocorrido.",
          efeito: { pontualidade: -5, comunicacao: +10 },
          resultado: "O supervisor entendeu e elogiou sua postura."
        },
        {
          texto: "Não fala nada, só senta na sua mesa.",
          efeito: { responsabilidade: -10, comunicacao: -5 },
          resultado: "O supervisor achou sua atitude estranha."
        }
      ]
    },
    {
      titulo: "O Almoço Chegou Tarde",
      descricao: "Você se atrasou para o almoço e o chefe notou.",
      escolhas: [
        {
          texto: "Peço desculpas e me ofereço para compensar o tempo perdido.",
          efeito: { pontualidade: +5, comunicacao: +10 },
          resultado: "O chefe ficou satisfeito com sua atitude e diz que você está se esforçando."
        },
        {
          texto: "Ignoro o atraso e volto ao trabalho, sem falar nada.",
          efeito: { responsabilidade: -10, comunicacao: -5 },
          resultado: "O chefe percebeu que você não se importou com o atraso e ficou desapontado."
        }
      ]
    },
    {
      titulo: "O Primeiro Erro",
      descricao: "Você cometeu um erro em um relatório importante.",
      escolhas: [
        {
          texto: "Assumo o erro e prometo corrigir.",
          efeito: { responsabilidade: +10, desempenho: +5 },
          resultado: "O chefe aprecia sua honestidade e sua vontade de melhorar."
        },
        {
          texto: "Tento esconder o erro e espero que ninguém perceba.",
          efeito: { responsabilidade: -15, desempenho: -10 },
          resultado: "O supervisor ficou desconfiado e a confiança foi abalada."
        }
      ]
    },
    {
      titulo: "O Elogio do Chefe",
      descricao: "Após um mês de trabalho, seu chefe elogia seu desempenho e pede sua opinião sobre um novo projeto.",
      escolhas: [
        {
          texto: "Dou uma sugestão sobre o projeto, explicando meu ponto de vista.",
          efeito: { comunicacao: +10, desempenho: +5 },
          resultado: "O chefe ficou impressionado com sua contribuição e elogiou sua proatividade."
        },
        {
          texto: "Fico quieto, sem dar nenhuma sugestão.",
          efeito: { comunicacao: -5, responsabilidade: -5 },
          resultado: "O chefe percebeu que você não está tão engajado quanto o esperado."
        }
      ]
    },
    {
      titulo: "O Conflito com um Colega",
      descricao: "Durante uma reunião, você e um colega discordam sobre como realizar uma tarefa. A situação ficou tensa, mas você tem a chance de resolver.",
      escolhas: [
        {
          texto: "Procuro uma solução amigável e sugiro que o colega compartilhe sua ideia.",
          efeito: { comunicacao: +10, responsabilidade: +5 },
          resultado: "O colega ficou mais receptivo, e o ambiente ficou mais colaborativo."
        },
        {
          texto: "Ignoro o colega e tento seguir com minha própria ideia.",
          efeito: { comunicacao: -5, desempenho: -10 },
          resultado: "O colega se afastou e a tarefa não foi concluída da melhor forma."
        }
      ]
    },
    {
      titulo: "O Projeto de Equipe",
      descricao: "Você e sua equipe têm uma tarefa grande pela frente, mas há muito estresse e falta de colaboração entre os membros.",
      escolhas: [
        {
          texto: "Tomo a iniciativa e ajudo meus colegas com suas tarefas.",
          efeito: { responsabilidade: +15, comunicacao: +10 },
          resultado: "A equipe conseguiu cumprir a tarefa com sucesso, e você foi elogiado por sua liderança."
        },
        {
          texto: "Fico focado apenas no meu trabalho e não ajudo ninguém.",
          efeito: { responsabilidade: -10, comunicacao: -5 },
          resultado: "O projeto foi atrasado, e a equipe se sentiu desorganizada."
        }
      ]
    },
    {
      titulo: "O Feedback do Chefe",
      descricao: "Após entregar um relatório, o chefe faz uma reunião com você para dar feedback. Ele aponta pontos de melhoria, mas também elogia alguns aspectos.",
      escolhas: [
        {
          texto: "Agradeço pelo feedback e me esforço para melhorar nas áreas apontadas.",
          efeito: { desempenho: +10, responsabilidade: +5 },
          resultado: "O chefe ficou contente com sua atitude e observou progresso nas semanas seguintes."
        },
        {
          texto: "Fico na defensiva e argumentei que não é bem assim.",
          efeito: { comunicação: -5, responsabilidade: -10 },
          resultado: "O chefe achou que você não estava disposto a aprender e ficou preocupado."
        }
      ]
    },
    {
      titulo: "O Fim do Estágio",
      descricao: "Você chegou ao final do estágio. Agora o chefe precisa decidir se vai efetivá-lo ou não.",
      escolhas: [
        {
          texto: "Mostro os resultados das minhas contribuições e tento me destacar como um bom candidato.",
          efeito: { desempenho: +20, responsabilidade: +15 },
          resultado: "Parabéns! Você foi efetivado e agora é parte da equipe!"
        },
        {
          texto: "Fico esperando pela decisão, sem fazer muito para me destacar.",
          efeito: { desempenho: -10, comunicação: -5 },
          resultado: "Infelizmente, o chefe decidiu não te efetivar neste momento."
        }
      ]
    }
  ];
  
  let faseAtual = 0;
  
  function atualizarTela() {
    document.getElementById("nome").textContent = personagem.nome;
    document.getElementById("resp").textContent = personagem.responsabilidade;
    document.getElementById("pont").textContent = personagem.pontualidade;
    document.getElementById("com").textContent = personagem.comunicacao;
    document.getElementById("desem").textContent = personagem.desempenho;
  
    const fase = fases[faseAtual];
    document.getElementById("titulo-fase").textContent = fase.titulo;
    document.getElementById("descricao-fase").textContent = fase.descricao;
    document.getElementById("escolha1").textContent = fase.escolhas[0].texto;
    document.getElementById("escolha2").textContent = fase.escolhas[1].texto;
    document.getElementById("resultado").textContent = "";
  }
  
  function escolher(opcao) {
    const fase = fases[faseAtual];
    const escolha = fase.escolhas[opcao];
  
    // Aplica efeitos
    personagem.pontualidade += escolha.efeito.pontualidade || 0;
    personagem.comunicacao += escolha.efeito.comunicacao || 0;
    personagem.responsabilidade += escolha.efeito.responsabilidade || 0;
    personagem.desempenho += (escolha.efeito.desempenho || 0);
  
    // Exibe resultado
    document.getElementById("resultado").textContent = escolha.resultado;
  
    // Atualiza atributos
    atualizarTela();
  
    // Avançar para a próxima fase
    faseAtual++;
    if (faseAtual >= fases.length) {
      document.getElementById("resultado").textContent = "Você completou o estágio! Parabéns!";
      document.querySelector(".escolhas").style.display = "none"; // Esconde as escolhas
    }
  }
  
  window.onload = atualizarTela;
  