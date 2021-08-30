import { startGame } from "./gameLoop.js";
import { getMap } from "./gameBoard.js";
import { getShips, recieveAttack } from "./gameBoard.js";
import { getCurrentPlayer } from "./stateManager.js";
import aiAttack from "./ai.js"
document.getElementById("start-game-btn").addEventListener("click", () => {
  startGame();
});
document.getElementById("play-again-btn").addEventListener("click", () => {
  startGame();
});

let gridElList = [];
export const getGridElList = function () {
  return gridElList;
};
export const setGridElList = function (value){
  gridElList = value
}
export const loadMapEl = function () {
  for (let i = 0; i < 100; i++) {
    const gridEl = createGridEl(getMap()[i]);
    document.getElementById("enemy-grids").appendChild(gridEl);
    gridElList.push(gridEl);
  }
  for (let i = 100; i < 200; i++) {
    const gridEl = createGridEl(getMap()[i]);
    document.getElementById("player-grids").appendChild(gridEl);
    gridElList.push(gridEl);
  }
 
};
const createGridEl = function (grid) {
  const gridEl = document.createElement("div");
  gridEl.id = grid.position;
  gridEl.classList.add("grid");
  if (grid.zone == "enemy") {
    gridEl.addEventListener("click", () => {
      if(getCurrentPlayer() == "player"){
       const isHit = recieveAttack(grid.position);
       if(isHit != true){aiAttack()}
      }
      
    });
    gridEl.classList.add("enemy-grid")
  }
  return gridEl;
};
export const initShips = function(){
  getShips().forEach(ship => {
      ship.positions.forEach(position => {
        document.getElementById(position.position).classList.add(`${(position.zone == "player") ? "friendly" : "enemy"}-ship`)
      })
    
  })
}


export const markMissedCordinate = function(position){
  document.getElementById(position).classList.add("missed");
  document.getElementById(position).innerHTML = "x"
}
export const markDamagedEnemyShip = function(position){
  document.getElementById(position).classList.add("damaged-enemy-ship")
  document.getElementById(position).innerHTML = "x"
}
export const markDamagedFriendlyShip = function(position){
  document.getElementById(position).classList.add("damaged-friendly-ship")
  document.getElementById(position).innerHTML = "x"
}
export const markSunkEnemyShip = function(ship){
  ship.positions.forEach(grid => {
    document.getElementById(grid.position).className = ""
    document.getElementById(grid.position).classList.add("grid");
    document.getElementById(grid.position).classList.add("enemy-grid")
    document.getElementById(grid.position).classList.add("sunk-enemy-ship")
    document.getElementById(grid.position).innerHTML = "x"
  })

}
export const markSunkFriendlyShip = function(ship){
  ship.positions.forEach(grid => {
    document.getElementById(grid.position).className = ""
    document.getElementById(grid.position).classList.add("grid");
    document.getElementById(grid.position).classList.add("sunk-friendly-ship")
    document.getElementById(grid.position).innerHTML = "x"
  })

}

export const initGameView = function () {
  document.body.style.backgroundColor = "white"
  initShips()
  document.getElementById("welcome-page").classList.add("hidden")
  document.getElementById("game-end-page").classList.add("hidden")
  document.getElementById("game-page").classList.remove("hidden")
};
export const initMainMenuView = function () {
document.getElementById("enemy-grids").innerHTML = ""
document.getElementById("player-grids").innerHTML = ""
document.getElementById("welcome-page").classList.remove("hidden")
document.getElementById("game-page").classList.add("hidden")
document.getElementById("game-end-page").classList.add("hidden")
}
export const initEndGameView = function(losedPlayer){
  document.getElementById("enemy-grids").innerHTML = ""
document.getElementById("player-grids").innerHTML = ""
document.getElementById("welcome-page").classList.add("hidden")
document.getElementById("game-page").classList.add("hidden")
document.getElementById("game-end-page").classList.remove("hidden")

if(losedPlayer == "player"){
  document.getElementById("game-end-header").innerHTML = "Game Over. You Lost ;("
  document.body.style.backgroundColor = "red"
}else { 
  document.getElementById("game-end-header").innerHTML = "Game Over. You Win ! :)"
  document.body.style.backgroundColor = "green"
}
}
