import {getMap, loadMap, placeEnemyShips, placeFriendlyShips, setMap, setMissedShots, setShips} from "./gameBoard.js"
import { initEndGameView, initGameView, loadMapEl, setGridElList } from "./domManager.js"
import { initShips } from "./domManager.js"
import { placeShip } from "./gameBoard.js"
import { setCurrentPlayer } from "./stateManager.js"
export const startGame = function(){
    console.log("started")
    loadMap()
    loadMapEl()
    placeShip([getMap()[101],getMap()[102],getMap()[103]] , "player")
    placeEnemyShips()
    placeFriendlyShips()
    initGameView()

}
export const gameEnd = function(losedPlayer){
    resetGame()
    initEndGameView(losedPlayer)
}
const resetGame = function(){
    setGridElList([])
    setShips([])
    setMap([])
    setMissedShots([])
    setCurrentPlayer("player")


    
    
}