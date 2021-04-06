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
  
  if (verifyLimit(currentCollum)){
    currentCollum.appendChild(element);
    storingCurrentColor(currentCollum);
    changeCurrentPlayer(currentPlayer);
  }
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
}

let array = [[], [], [], [], [], [], []];

const storingCurrentColor = (currentSection) => {
  let positionCurrentElem = currentSection.childElementCount;
  let idCurrentSection = parseInt(currentSection.id);
  array[idCurrentSection][positionCurrentElem - 1] = currentPlayer;
}

const verifyLimit = (column) => {
    let id = column.id
    if (array[id].length === 6){
        return false
    }else{
        return true
    }
}

//CREATING FUNCTION HORIZONTAL
//CREATING FUNCTION HORIZONTAL

//CREATING FUNCTIONG VERTICAL
//CREATING FUNCTIONG VERTICAL

//CREATING FUNCTION DIAGONAL(ASCENDENTE E DESCENDENTE)
//CREATING FUNCTION DIAGONAL(ASCENDENTE E DESCENDENTE)