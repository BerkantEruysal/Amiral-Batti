import {
  markDamagedEnemyShip,
  markDamagedFriendlyShip,
  markSunkEnemyShip,
  markSunkFriendlyShip,
} from "./domManager.js";
import { getMap, getShips } from "./gameBoard.js";
import { gameEnd } from "./gameLoop.js";

export const createShip = function (positionList, id, player) {
  const shipObj = {
    id: id,
    player: player,
    positions: positionList,
  };
  shipObj.hit = function (position) {
    if (isSunk(shipObj)) {
      if (player == "enemy") {
        markSunkEnemyShip(shipObj);
      } else {
        markSunkFriendlyShip(shipObj);
      }
      if(getShips().filter(ship => {return ship.player == shipObj.player}).every(ship => {return isSunk(ship)})){
          gameEnd(shipObj.player)
      }
      return;
    }
    if (player == "enemy") {
      markDamagedEnemyShip(position);
    } else {
      markDamagedFriendlyShip(position);
    }
  };

  return shipObj;
};

export const isSunk = function (ship) {
  return ship.positions.every((position) => {
    return position.isAttacked;
  });
};
