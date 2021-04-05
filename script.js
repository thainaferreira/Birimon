//CREATING PLAYERS
const createPlayers = (current) => {
  const player = document.createElement("div");
  PLAYER.classList.add(`${current}`);
  return player;
};

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
