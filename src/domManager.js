import { startGame } from "./gameLoop.js";
import { getMap } from "./gameBoard.js";
import { getShips, recieveAttack } from "./gameBoard.js";
document.getElementById("start-game-btn").addEventListener("click", () => {
  startGame();
});

let gridElList = [];
export const getGridElList = function () {
  return gridElList;
};
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
      recieveAttack(grid.position);
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
}
export const markDamagedFriendlyShip = function(position){
  document.getElementById(position).classList.add("damaged-friendly-ship")
}
export const markSunkEnemyShip = function(ship){
  ship.positions.forEach(grid => {
    document.getElementById(grid.position).className = ""
    document.getElementById(grid.position).classList.add("grid");
    document.getElementById(grid.position).classList.add("enemy-grid")
    document.getElementById(grid.position).classList.add("sunk-enemy-ship")
  })

}
export const markSunkFriendlyShip = function(ship){
  document.getElementById(position).classList.add("sunk-friendly-ship")

}

const initGameView = function () {};
const initMainMenuView = function () {};
