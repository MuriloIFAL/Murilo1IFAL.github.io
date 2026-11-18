const tabuleiro = document.getElementById('tabuleiro');
const placarTop = document.getElementById('placar');
const reiniciar = document.getElementById('btn-reiniciar');

const itens = ['♥︎', '✦', '♪', '✿', '♛', '☻', '❆', '☎'];

let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let travar = false;
let tentativas = 0;
let paresEncontrados = 0;

function iniciarJogo() {
  tabuleiro.innerHTML = '';
  tentativas = 0;
  paresEncontrados = 0;
  primeiraCarta = null;
  segundaCarta = null;
  travar = false;
  atualizarPlacar();

  cartas = ['♥︎', '✦', '♪', '✿', '♛', '☻', '❆', '☎', '♥︎', '✦', '♪', '✿', '♛', '☻', '❆', '☎'].sort(() => Math.random() - 0.5);

  cartas.forEach((item) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.valor = item;

    carta.innerHTML = `
      <div class="carta-inner">
        <div class="verso">?</div>
        <div class="frente">${item}</div>
      </div>
    `;

    carta.addEventListener('click', () => clicarCarta(carta));
    tabuleiro.appendChild(carta);
  });
}

function clicarCarta(carta) {
  if (travar || carta.classList.contains('virada') || carta.classList.contains('correta')) {
    return;
  }

  carta.classList.add('virada');

  if (!primeiraCarta) {
    primeiraCarta = carta;
    return;
  }

  segundaCarta = carta;
  tentativas++;
  atualizarPlacar();

  verificarPar();
}

function verificarPar() {
  const match = primeiraCarta.dataset.valor === segundaCarta.dataset.valor;

  if (match) {
    primeiraCarta.classList.add('correta');
    segundaCarta.classList.add('correta');
    paresEncontrados++;
    limparTurno();

    if (paresEncontrados === itens.length) {
      travar = true;

      setTimeout(() => {
        alert(`Você venceu o jogo em ${tentativas} tentativas!!!!!!!!!!!!`);

        document.querySelectorAll('.carta').forEach((carta) => {
          carta.classList.remove('virada', 'correta');
        });

        setTimeout(() => {
          iniciarJogo();
        }, 600);
      }, 300);
    }
  } else {
    travar = true;
    setTimeout(() => {
      primeiraCarta.classList.remove('virada');
      segundaCarta.classList.remove('virada');
      limparTurno();
    }, 900);
  }
}

function limparTurno() {
  primeiraCarta = null;
  segundaCarta = null;
  travar = false;
}

function atualizarPlacar() {
  placarTop.textContent = `Tentativas: ${tentativas}`;
}

reiniciar.addEventListener('click', iniciarJogo);

iniciarJogo();

