const tabuleiro = document.getElementbyId('tabuleiro');
const placarTop = document.getElementbyId('placar');
const reiniciar = document.getElementbyId('btn-reiniciar');

const items = ['♥︎', '✦', '♪', '✿'];

let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let travar = false;
let tentativas = 0
let paresEncontrados = 0

function iniciarJogo() {

  tabuleiro.innerHTML = '';
  tentativas = 0;
  paresEncontrados = 0;
  primeiraCarta =  null;
  segundaCarta = null;
  travar = false;
  atualizarPlacar ();

  cartas = ['♥︎', '✦', '♪', '✿', '♥︎', '✦', '♪', '✿'].sort(() => Math.random() -0.5);

  cartas.forEach(('♥︎', '✦', '♪', '✿') => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.valor = (''♥︎', '✦', '♪', '✿'');
      //work in progress
  }
}
