const startButton = document.getElementById("btnStart");
const acceptButton = document.getElementById("btnAccept");
const tab = document.getElementById("tab");
const endPopUp = document.getElementById("endPopUp");
const playAudio = document.getElementById("playAudio");
const startAudio = document.getElementById("startAudio");
const stopAudio = document.getElementById("stopAudio");
let player1 = "player_red";
let player2 = "player_black";
let currentPlayer = player1;
let victory = [];
let score = [0, 0];
let array = [[], [], [], [], [], [], []];
let notWin = true;

const resetGame = () => {
  tab.innerHTML = "";
  victory = [];
  array = [[], [], [], [], [], [], []];
  currentPlayer = player1;
  notWin = true;
};

const createTab = () => {
  tab.classList.remove("hidden");
  for (let i = 0; i < 7; i++) {
    let newSection = document.createElement("section");
    newSection.id = i;
    newSection.classList.add("col");
    tab.appendChild(newSection);
  }
};

const createPlayers = (current) => {
  const player = document.createElement("img");
  if (current === "player_red") {
    player.src = `./assets/img/reshiram.png`;
  } else if (current === "player_black") {
    player.src = `./assets/img/zekrom.png`;
  }
  player.classList.add(`${current}`);
  return player;
  //MELHORAR ANIMAÇÃO DE CAIDA
  //MELHORAR ANIMAÇÃO DE CAIDA
};

const verifyLimit = (column) => {
  let id = column.id;
  if (array[id].length === 6) {
    return false;
  } else {
    return true;
  }
};

const storingCurrentColor = (currentSection) => {
  let positionCurrentElem = currentSection.childElementCount;
  let idCurrentSection = parseInt(currentSection.id);
  array[idCurrentSection][positionCurrentElem - 1] = currentPlayer;
};

const changeCurrentPlayer = () => {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
};

const horizontalCheck = (arr) => {
  for (let j = 0; j < arr.length - 3; j++) {
    let section = arr[j];
    for (let i = 0; i < section.length; i++) {
      let disco = section[i];
      if (
        disco === arr[j + 1][i] &&
        disco === arr[j + 2][i] &&
        disco === arr[j + 3][i] &&
        disco === "player_red"
      ) {
        victory.push(disco);
      }
      if (
        disco === arr[j + 1][i] &&
        disco === arr[j + 2][i] &&
        disco === arr[j + 3][i] &&
        disco === "player_black"
      ) {
        victory.push(disco);
      }
    }
  }
};

const verticalCheck = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let section = arr[i];
    let black = 0;
    let red = 0;
    for (let j = 0; j < section.length; j++) {
      let disco = section[j];

      if (disco === "player_red") {
        red++;
        black = 0;
      } else if (disco === "player_black") {
        black++;
        red = 0;
      }
      if (black === 4 || red === 4) {
        victory.push(disco);
      }
    }
  }
};

const diagonalCheck = (arr) => {
  //VALIDAÇÃO DIREITA ABAIXO
  for (let i = 0; i < arr.length - 3; i++) {
    let section = arr[i];
    for (let j = 0; j < section.length; j++) {
      let disco = section[j];

      if (disco === arr[i + 1][j + 1]) {
        if (disco === arr[i + 2][j + 2]) {
          if (disco === arr[i + 3][j + 3]) {
            victory.push(disco);
          }
        }
      }
    }
  }
  //VALIDAÇÃO ESQUERDA ABAIXO
  for (let i = 3; i < arr.length; i++) {
    let section = arr[i];
    for (let j = 0; j < section.length; j++) {
      let disco = section[j];

      if (disco === arr[i - 1][j + 1]) {
        if (disco === arr[i - 2][j + 2]) {
          if (disco === arr[i - 3][j + 3]) {
            victory.push(disco);
          }
        }
      }
    }
  }
};

const endOfGame = (winner) => {
  const imgWinner = document.getElementById('imgEnd');
  if (winner === false) {
    imgWinner.src = './assets/img/Draw.png';
  } else {
    if (winner === 'Player 1') {
      imgWinner.src = './assets/img/player1Win.png'
    } else if (winner === 'Player 2'){
      imgWinner.src = './assets/img/player2Win.png'
    }
  }
  endPopUp.insertBefore(imgWinner, endPopUp.childNodes[0]);
  endPopUp.classList.remove("hidden");
};

const winCondition = () => {
  if (victory[0] === "player_red") {
    notWin = false;
    setTimeout(function () {
      endOfGame("Player 1");
    }, 600);
    setTimeout(function () {
      resetGame();
    }, 800);
    setTimeout(function () {
      tab.classList.add("hidden");
    }, 800);
    scoreboard("player1");
  }
  if (victory[0] === "player_black") {
    notWin = false;
    setTimeout(function () {
      endOfGame("Player 2");
    }, 600);
    setTimeout(function () {
      resetGame();
    }, 800);
    setTimeout(function () {
      tab.classList.add("hidden");
    }, 800);
    scoreboard("player2");
  }
};

const scoreboard = (player) => {
  let scorePlayer1 = document.querySelector(".scoreP1");
  let scorePlayer2 = document.querySelector(".scoreP2");
  let scorePlayerDesktop1 = document.querySelector(".scorePlay1");
  let scorePlayerDesktop2 = document.querySelector(".scorePlay2");
  if (player === "player1") {
    score[0]++;
  }
  if (player === "player2") {
    score[1]++;
  }
  scorePlayer1.innerText = `${score[0]}`;
  scorePlayer2.innerText = `${score[1]}`;
  scorePlayerDesktop1.innerText = `${score[0]}`;
  scorePlayerDesktop2.innerText = `${score[1]}`;
};
scoreboard();
const gameTied = () => {
  let count = 0;
  for (let i = 0; i < 7; i++) {
    if (array[i].length === 6) {
      count += 1
    }
  }
  if (count === 7) {
    setTimeout(function () {
      endOfGame(false);
     }, 600);
    setTimeout(function () {
      resetGame();
    }, 800);
    setTimeout(function () {
      tab.classList.add("hidden");
    }, 800);
  }
}

const sectionEvt = (evt) => {
  let element = createPlayers(currentPlayer);
  let currentCollum = evt.currentTarget;

  if (verifyLimit(currentCollum)) {
    currentCollum.appendChild(element);
    storingCurrentColor(currentCollum);
    changeCurrentPlayer(currentPlayer);
  }
  horizontalCheck(array);
  verticalCheck(array);
  diagonalCheck(array);
  winCondition();
  if (notWin) {
    gameTied();
  }
};

const init = () => {
  resetGame();
  createTab();
  const sections = document.querySelectorAll(".col");
  sections.forEach((elem) => {
    elem.addEventListener("click", sectionEvt);
  });
  startButton.classList.add("hidden");
};

// CHANGE SRC OF IMAGE (MOSTRAR QUAL PLAYER ESTA JOGANDO ATUALMENTE)
// CHANGE SRC OF IMAGE (MOSTRAR QUAL PLAYER ESTA JOGANDO ATUALMENTE)

startButton.addEventListener("click", init);
acceptButton.addEventListener("click", function () {
  endPopUp.classList.add("hidden");
  startButton.classList.remove("hidden");
});


stopAudio.style.display = "none"
let audioPlaying = false
playAudio.addEventListener('click', function(){
  const audio = document.querySelector('audio')
  if (!audioPlaying){
    audio.play()
    audioPlaying = !audioPlaying
    startAudio.style.display = "none"
    stopAudio.style.display = "block"
  }else{
    audio.pause()
    audioPlaying = !audioPlaying
    startAudio.style.display = "block"
    stopAudio.style.display = "none"
  }
})