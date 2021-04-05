//CREATING PLAYERS
let player1 = "player_red";
let player2 = "player_black";
let currentPlayer = player1;

const createPlayers = (current) => {
  const player = document.createElement("div");
  player.classList.add(`${current}`);
  return player;
};
//CREATING PLAYERS

//CREATING TABLE
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
//CREATING TABLE

//CREATING FUNCTION EVT PARA SECTION
const sections = document.querySelectorAll(".col");

const sectionEvt = (evt) => {
  let element = createPlayers(currentPlayer);
  let currentCollum = evt.currentTarget;
  currentCollum.appendChild(element);
  //append child no evt.currentTarget
  changeCurrentPlayer(currentPlayer);
  //chamar função changeCurrentPlayer
  storingCurrentColor(currentCollum);
};

sections.forEach((elem) => {
  elem.addEventListener("click", sectionEvt);
});
//CREATING FUNCTION EVT PARA SECTION

//CREATING FUNCTION TO CHANGE CURRENT PLAYER
const changeCurrentPlayer = (currentPlayer) => {
  //mexer na global currentPlayer, player1 e player 2
};
//CREATING FUNCTION TO CHANGE CURRENT PLAYER

//CREATING FUNCTION TO STORE THE COLOR OF A DISK
let array = [[], [], [], [], [], [], []];
const storingCurrentColor = (currentSection) => {
    let positionCurrentElem = currentSection.childElementCount;
    let idCurrentSection = parseInt(currentSection.id);
    //currentPlayer deve ser mudado depois dessa function :
    array[idCurrentSection][positionCurrentElem - 1] = currentPlayer;
}
//CREATING FUNCTION TO STORE THE COLOR OF A DISK

//CREATING FUNCTION TO VALIDATE THE NUMBERS OF CHILD'S IN THE SECTION
const validadeQuantity = () => {
  //usar childElementCount
  //nao pode ser maior que 6
};

//CREATING FUNCTION TO VALIDATE THE NUMBERS OF CHILD'S IN THE SECTION

//CREATING FUNCTION TO VALIDADE WINCONDITION

//CREATING FUNCTION TO VALIDADE WINCONDITION
