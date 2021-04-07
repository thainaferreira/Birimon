const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
let player1 = "player_red";
let player2 = "player_black";
let currentPlayer = player1;
let victory = [];
const tab = document.getElementById("tab");
let array = [[], [], [], [], [], [], []];

const resetGame = () => {
  tab.innerHTML = "";
  victory = [];
  array = [[], [], [], [], [], [], []];
  currentPlayer = player1;
}

const createPlayers = (current) => {
  const player = document.createElement("div");
  player.classList.add(`${current}`);
  return player;
};

const createTab = () => {
  for (let i = 0; i < 7; i++) {
    let newSection = document.createElement("section");
    newSection.id = i;
    newSection.classList.add("col");
    tab.appendChild(newSection);
  }
};

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
};

const changeCurrentPlayer = () => {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
};

const storingCurrentColor = (currentSection) => {
  let positionCurrentElem = currentSection.childElementCount;
  let idCurrentSection = parseInt(currentSection.id);
  array[idCurrentSection][positionCurrentElem - 1] = currentPlayer;
};

const verifyLimit = (column) => {
  let id = column.id;
  if (array[id].length === 6) {
    return false;
  } else {
    return true;
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
      if (disco !== undefined) {
        if (disco === "player_red") {
          red++;
          black = 0;
        }
        if (disco === "player_black") {
          black++;
          red = 0;
        }
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

      if (disco != undefined) {
        if (disco === arr[i + 1][j + 1]) {
          if (disco === arr[i + 2][j + 2]) {
            if (disco === arr[i + 3][j + 3]) {
              victory.push(disco);
            }
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

      if (disco != undefined) {
        if (disco === arr[i - 1][j + 1]) {
          if (disco === arr[i - 2][j + 2]) {
            if (disco === arr[i - 3][j + 3]) {
              victory.push(disco);
            }
          }
        }
      }
    }
  }
};

const winCondition = () => {
  if (victory[0] === "player_red") {
    setTimeout(function(){ alert(`Red wins`) }, 600);
    setTimeout(function(){ resetGame() }, 800);
    setTimeout(function(){ startButton.classList.remove('hidden') }, 800);
  }
  if (victory[0] === "player_black") {
    setTimeout(function(){ alert(`Black wins`) }, 600);
    setTimeout(function(){ resetGame() }, 800);
    setTimeout(function(){ startButton.classList.remove('hidden') }, 800);
  }
};

const showTable = () => {
  resetGame();
  createTab();
  const sections = document.querySelectorAll(".col");
  sections.forEach((elem) => {
    elem.addEventListener("click", sectionEvt);
  });
  startButton.classList.add('hidden');
};

startButton.addEventListener("click", showTable);
// resetButton.addEventListener("click", resetGame);