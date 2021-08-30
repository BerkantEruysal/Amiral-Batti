import { getMap, recieveAttack } from "./gameBoard.js";

export default function attack (){
    setTimeout(() => {
        let selectablePositions = getMap().filter(grid => {if(!(grid.isAttacked) && grid.zone == "player"){return true}})
    console.log(selectablePositions.length)
    let attackedPosition = selectablePositions[Math.floor(Math.random() * selectablePositions.length)]
   let isHit =  recieveAttack(attackedPosition.position)

   if(isHit){attack()}
    } , 300)
    
}