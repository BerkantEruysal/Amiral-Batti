import {getMap, loadMap, placeEnemyShips} from "./gameBoard.js"
import { loadMapEl } from "./domManager.js"
import { initShips } from "./domManager.js"
import { placeShip } from "./gameBoard.js"
export const startGame = function(){
    console.log("started")
    loadMap()
    loadMapEl()
    placeShip([getMap()[101],getMap()[102],getMap()[103]] , "player")
    placeEnemyShips()
    initShips()
    document.getElementById("welcome-page").classList.add("hidden")
    document.getElementById("game-page").classList.remove("hidden")

}