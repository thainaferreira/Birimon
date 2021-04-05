//CREATING PLAYERS
const PLAYER_RED = document.createElement("div");
const PLAYER_BLACK = document.createElement("div");
PLAYER_RED.classList.add("player_red");
PLAYER_BLACK.classList.add("player_black");

//CREATING PLAYERS

//CREATING TABLE
const tab = document.getElementById('tab');
const createTab = () => {
    for (let i=0; i<7; i++) {
        let newSection = document.createElement('section')
        newSection.id = 'section_' + i
        newSection.classList.add('col')
        tab.appendChild(newSection)
    }
}
createTab()
//CREATING TABLE
