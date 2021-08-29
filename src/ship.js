import { markDamagedEnemyShip, markDamagedFriendlyShip, markSunkEnemyShip, markSunkFriendlyShip } from "./domManager.js"
import { getMap } from "./gameBoard.js"

export const createShip = function(positionList , id , player){
    const shipObj = {
        id : id,
        player : player,
        positions : positionList
    }
    shipObj.hit = function(position){
        getMap()[position].isAttacked = true
        if(isSunk(shipObj)){
            if(player == "enemy"){markSunkEnemyShip(shipObj)}else{markSunkFriendlyShip(shipObj)}
            return
        }
        if(player == "enemy"){markDamagedEnemyShip(position)}else{markDamagedFriendlyShip(position)}

    }

    return shipObj
}

export const isSunk = function(ship){
   return ship.positions.every(position => {
        return position.isAttacked
    })
}

