const tabuleiro = document.getElementById('tabuleiro');
const placarTop = document.getElementById('placar');
const reiniciar = document.getElementById('btn-reiniciar');
const botoesModo = document.querySelectorAll('.btn-modo');

const ITENS = [
  '♥︎', '✦', '♪', '✿', '♛', '☻', '❆', '☎',
  '❖', '☀', '☾', '⚑', 'ϟ', '☘', '⚔', '♫'
];

const MODOS = {
  facil: {
    colunas: 5,
    pares: 5,
    bgGradient: 'linear-gradient(to right, #4ADE80, #86EFAC, #BBF7D0)',
    versoBg: '#14532d',
    frenteBorder: '#166534'
  },
  normal: {
    colunas: 4,
    pares: 8,
    bgGradient: 'linear-gradient(to right, #6996FF, #99DAFF, #9CFFDF)',
    versoBg: '#1e3a8a',
    frenteBorder: '#1e40af'
  },
  dificil: {
    colunas: 5,
    pares: 13,
    bgGradient: 'linear-gradient(to right, #F87171, #FCA5A5, #FECACA)',
    versoBg: '#7f1d1d',
    frenteBorder: '#991b1b'
  }
};

const MODO_PADRAO = 'normal';

let modoAtual = MODO_PADRAO;
let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let travar = false;
let tentativas = 0;
let paresEncontrados = 0;

function aplicarTemaModo(modoKey) {
  const config = MODOS[modoKey] || MODOS[MODO_PADRAO];
  const rootStyle = document.documentElement.style;

  rootStyle.setProperty('--bg-gradient', config.bgGradient);
  rootStyle.setProperty('--verso-bg', config.versoBg);
  rootStyle.setProperty('--frente-border', config.frenteBorder);
  rootStyle.setProperty('--colunas', config.colunas);

  botoesModo.forEach((btn) => {
    btn.classList.toggle('ativo', btn.dataset.modo === modoKey);
  });
}

function iniciarJogo(novoModo = modoAtual) {
  modoAtual = MODOS[novoModo] ? novoModo : MODO_PADRAO;
  const config = MODOS[modoAtual];

  aplicarTemaModo(modoAtual);

  tabuleiro.innerHTML = '';
  tentativas = 0;
  paresEncontrados = 0;
  primeiraCarta = null;
  segundaCarta = null;
  travar = false;
  atualizarPlacar();

  const selecionados = ITENS.slice(0, config.pares);
  cartas = [...selecionados, ...selecionados].sort(() => Math.random() - 0.5);

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

    if (paresEncontrados === MODOS[modoAtual].pares) {
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

botoesModo.forEach((btn) => {
  btn.addEventListener('click', () => iniciarJogo(btn.dataset.modo));
});

reiniciar.addEventListener('click', () => iniciarJogo());

iniciarJogo(MODO_PADRAO);
