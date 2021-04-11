const startButton = document.getElementById("btnStart");
const acceptButton = document.getElementById("btnAccept");
const tab = document.getElementById("tab");
const endPopUp = document.getElementById("endPopUp");
const changeImgNate = document.getElementById("nate");
const changeImgRosa = document.getElementById("rosa");
const playAudio = document.getElementById("playAudio");
const startAudio = document.getElementById("startAudio");
const stopAudio = document.getElementById("stopAudio");
const numSections = 7;
let player1 = "player_one";
let player2 = "player_two";
let currentPlayer = player1;
let victory = [];
let score = [0, 0];
let array = [[], [], [], [], [], [], []];
let notWin = true;

const resetGame = () => {
  tab.innerHTML = "";
  victory = [];
  array = [[], [], [], [], [], [], []];
  notWin = true;
  changeImgNate.src = `./assets/img/Nate.png`;
  changeImgRosa.src = `./assets/img/Rosa.png`;
};

const createTab = () => {
  tab.classList.remove("hidden");
  for (let i = 0; i < numSections; i++) {
    const newSection = document.createElement("section");
    newSection.id = i;
    newSection.classList.add("col");
    tab.appendChild(newSection);
  }
};

const createPlayers = (current) => {
  const player = document.createElement("img");
  if (current === player1) {
    player.src = `./assets/img/reshiram.png`;
  } else if (current === player2) {
    player.src = `./assets/img/zekrom.png`;
  }
  player.classList.add(`${current}`);
  return player;
};

const verifyLimit = (column) => {
  if (column.childElementCount === 6) {
    return false;
  } else {
    return true;
  }
};

const storingCurrentColor = (currentSection) => {
  let positionCurrentElem = currentSection.childElementCount - 1;
  let idCurrentSection = parseInt(currentSection.id);
  array[idCurrentSection][positionCurrentElem] = currentPlayer;
};

const changeCurrentPlayer = () => {
  if (currentPlayer === player1) {
    setTimeout(function(){ changeImgNate.src = `./assets/img/Nate.png` }, 480);
    changeImgNate.src = `./assets/img/NateChallenge.png`; 
    currentPlayer = player2;
  } else {
    setTimeout(function(){ changeImgRosa.src = `./assets/img/Rosa.png`; }, 480);
    changeImgRosa.src = `./assets/img/RosaChallenge.png`
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
        disco === arr[j + 3][i]
      ) {
        victory.push(disco);
      }
    }
  }
};

const verticalCheck = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let section = arr[i];
    for (let j = 0; j < section.length; j++) {
      let disco = section[j];
      if (
        disco === arr[j][i + 1] &&
        disco === arr[j][i + 2] &&
        disco === arr[j][i + 3]
      ) {
        victory.push(disco);
      }
    }
  }
};

const diagonalCheck = (arr) => {
  for (let i = 0; i < arr.length - 3; i++) {
    let section = arr[i];
    for (let j = 0; j < section.length; j++) {
      let disco = section[j];
      if (
        disco === arr[i + 1][j + 1] &&
        disco === arr[i + 2][j + 2] &&
        disco === arr[i + 3][j + 3]
      ) {
        victory.push(disco);
      }
    } 
  }
  for (let i = 3; i < arr.length; i++) {
    let section = arr[i];
    for (let j = 0; j < section.length; j++) {
      let disco = section[j];
      if (
        disco === arr[i - 1][j + 1] &&
        disco === arr[i - 2][j + 2] &&
        disco === arr[i - 3][j + 3] 
      ) {
        victory.push(disco);
      }
    }
  }
};

const endOfGame = (winner) => {
  const imgWinner = document.getElementById('imgEnd');
  if (winner === false) {
    imgWinner.src = './assets/img/Draw.png';
  } else {
    if (winner === player1) {
      imgWinner.src = './assets/img/player1Win.png'
    } else if (winner === player2){
      imgWinner.src = './assets/img/player2Win.png'
    }
  }
  endPopUp.insertBefore(imgWinner, endPopUp.childNodes[0]);
  endPopUp.classList.remove("hidden");
};

const winCondition = () => {
  if (victory.length > 0) {
    notWin = false;
    setTimeout(function () {
      endOfGame(victory[0]);
    }, 600);
    setTimeout(function () {
      resetGame();
    }, 800);
    setTimeout(function () {
      tab.classList.add("hidden");
    }, 800);
    scoreboard(victory[0]);
  }
};

const scoreboard = (player) => {
  let scorePlayer1 = document.querySelectorAll(".scoreP1");
  let scorePlayer2 = document.querySelectorAll(".scoreP2");
  if (player === player1) {
    score[0]++;
  } else if (player === player2){
    score[1]++;
  }
  scorePlayer1.forEach(elem => {
    elem.innerText = `${score[0]}`;
  })
  scorePlayer2.forEach(elem => {
    elem.innerText = `${score[1]}`;
  })
};
scoreboard();
const gameTied = () => {
  let count = 0;
  for (let i = 0; i < numSections; i++) {
    if (array[i].length === 6) {
      count += 1
    }
  }
  if (count === numSections) {
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