let player1 = "player_red";
let player2 = "player_black";
let currentPlayer = player1;

const createPlayers = (current) => {
  const player = document.createElement("div");
  player.classList.add(`${current}`);
  return player;
};

const tab = document.getElementById("tab");

const createTab = () => {
  for (let i = 0; i < 7; i++) {
    let newSection = document.createElement("section");
    newSection.id = i;
    newSection.classList.add("col");
    tab.appendChild(newSection);
  }
};
createTab();

const sections = document.querySelectorAll(".col");

const sectionEvt = (evt) => {
  let element = createPlayers(currentPlayer);
  let currentCollum = evt.currentTarget;
  let actualPosition;

  if (verifyLimit(currentCollum)){
    currentCollum.appendChild(element);
    actualPosition = storingCurrentColor(currentCollum);
    changeCurrentPlayer(currentPlayer);
  }
  verticalCheck(array);
  diagonalCheck(array);
};

sections.forEach((elem) => {
  elem.addEventListener("click", sectionEvt);
});

const changeCurrentPlayer = () => {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
};

let array = [[], [], [], [], [], [], []];

const storingCurrentColor = (currentSection) => {
  let positionCurrentElem = currentSection.childElementCount;
  let idCurrentSection = parseInt(currentSection.id);
  let actualPosition = `${idCurrentSection} ${positionCurrentElem - 1}`;
  array[idCurrentSection][positionCurrentElem - 1] = currentPlayer;
  
  return actualPosition;
}

const verifyLimit = (column) => {
  let id = column.id;
  if (array[id].length === 6) {
    return false;
  } else {
    return true;
  }
};

//CREATING FUNCTION HORIZONTAL
//CREATING FUNCTION HORIZONTAL

//CREATING FUNCTIONG VERTICAL
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
      }
      if (disco === "player_black") {
        black++;
        red = 0;
      }
    }
    if (black === 4) {
      alert("Black wins");
    }
    if (red === 4) {
      alert("Red wins");
    }
  }
};
//CREATING FUNCTIONG VERTICAL

//CREATING FUNCTION DIAGONAL(ASCENDENTE E DESCENDENTE)
const diagonalCheck = (arr) => {
  
  for (let i = 0; i < arr.length; i++) {
    let section = arr[i]
    for (let j = 0; j < section.length; j++) {
      let disco = section[j];

      if (disco != undefined) {
        if (disco === arr[i + 1][j + 1]) {
          if (disco === arr[i + 2][j + 2]){
            console.log('BIRI BIRI')
          }
        }
      }
    }
  }
}
//CREATING FUNCTION DIAGONAL(ASCENDENTE E DESCENDENTE)
