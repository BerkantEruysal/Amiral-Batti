import { markMissedCordinate } from "./domManager.js";
import { createShip } from "./ship.js";
import { changeCurrentPlayer } from "./stateManager.js";

let ships = [];
let missedShots = [];
let map = [];

export const recieveAttack = function (position) {
  if (map[position].isAttacked == false) {
    map[position].isAttacked = true
    if (map[position].parentShipId != null) {
      getShipById(map[position].parentShipId).hit(position);
      return true
    } else {
      _missedShot(position);
      markMissedCordinate(position);
      changeCurrentPlayer()
    }
    
  }else return true
};

export const getShips = function () {
  return ships;
};
export const getMap = function () {
  return map;
};
export const setMissedShots = function(value){
  missedShots = value
}
export const setMap = function(value){
  map = value
}
export const setShips = function(value){
  ships = value
}

const _createGrid = function (position, player) {
  const gridObj = {
    position: position,
    parentShipId: null,
    isAttacked: false,
    zone: player,
  };
  return gridObj;
};

export const loadMap = function () {
  for (let i = 0; i < 100; i++) {
    map.push(_createGrid(i, "enemy"));
  }
  for (let i = 100; i < 200; i++) {
    map.push(_createGrid(i, "player"));
  }
};

const _generateUniqueShipId = function (shipList) {
  let id = 0;
  shipList.map((ship) => {
    shipList.some((ship) => {
      if (ship.id == id) {
        id++;
      }
    });
  });
  return id;
};

const _missedShot = function (position) {
  missedShots.push(position);
};

const getShipById = function (id) {
  let targetShip;
  ships.forEach((ship) => {
    if (ship.id == id) {
      targetShip = ship;
    }
  });
  if (targetShip == null) {
    throw Error("Wrong Ship Id");
  }
  return targetShip;
};

export const placeShip = function (positionList, player) {
  const ship = createShip(positionList, _generateUniqueShipId(ships), player);
  ships.push(ship);
  positionList.forEach((position) => {
    position.parentShipId = ship.id;
  });
};

export const placeEnemyShips = function () {
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(4, "enemy"), "enemy");
  } else {
    placeShip(_createVerticalShip(4, "enemy"), "enemy");
  }
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(3, "enemy"), "enemy");
  } else {
    placeShip(_createVerticalShip(3, "enemy"), "enemy");
  }
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(2, "enemy"), "enemy");
  } else {
    placeShip(_createVerticalShip(2, "enemy"), "enemy");
  }
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(2, "enemy"), "enemy");
  } else {
    placeShip(_createVerticalShip(2, "enemy"), "enemy");
  }
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(2, "enemy"), "enemy");
  } else {
    placeShip(_createVerticalShip(2, "enemy"), "enemy");
  }
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(1, "enemy"), "enemy");
  } else {
    placeShip(_createVerticalShip(1, "enemy"), "enemy");
  }
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(1, "enemy"), "enemy");
  } else {
    placeShip(_createVerticalShip(1, "enemy"), "enemy");
  }
};
export const placeFriendlyShips = function () {
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(4, "player"), "player");
  } else {
    placeShip(_createVerticalShip(4, "player"), "player");
  }
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(3, "player"), "player");
  } else {
    placeShip(_createVerticalShip(3, "player"), "player");
  }
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(2, "player"), "player");
  } else {
    placeShip(_createVerticalShip(2, "player"), "player");
  }
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(2, "player"), "player");
  } else {
    placeShip(_createVerticalShip(2, "player"), "player");
  }
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(2, "player"), "player");
  } else {
    placeShip(_createVerticalShip(2, "player"), "player");
  }
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(1, "player"), "player");
  } else {
    placeShip(_createVerticalShip(1, "player"), "player");
  }
  if (Math.floor(Math.random() * 2)) {
    placeShip(_createHorizontalShip(1, "player"), "player");
  } else {
    placeShip(_createVerticalShip(1, "player"), "player");
  }
};
const _createHorizontalShip = function (shipLength, zone) {
  let coordinate =
    Math.floor(Math.random() * 17) +
    Math.floor(Math.random() * 5) * 20 +
    (zone == "enemy" ? 0 : 100);
  let coordinates = [];
  for (let i = 0; i < shipLength; i++) {
    if (map[coordinate + i].parentShipId != null) {
      return _createHorizontalShip(shipLength, zone);
    }
    for (let a = -1; a < 2; a++) {
      for (let b = -1; b < 2; b++) {
        if (
          map[coordinate + i + b + a * 20] &&
          map[coordinate + i + b + a * 20].parentShipId != null
        ) {
          return _createHorizontalShip(shipLength, zone);
        }
      }
    }
  }
  for (let i = 0; i < shipLength; i++) {
    coordinates.push(map[coordinate + i]);
  }
  return coordinates;
};
const _createVerticalShip = function (shipLength, zone) {
  let coordinate =
    Math.floor(Math.random() * 19) +
    Math.floor(Math.random() * (5 - shipLength)) * 20 +
    (zone == "enemy" ? 0 : 100);
  let coordinates = [];
  for (let i = 0; i < shipLength; i++) {
    if (map[coordinate + i * 20].parentShipId != null) {
      return _createVerticalShip(shipLength, zone);
    }
    for (let a = -1; a < 2; a++) {
      for (let b = -1; b < 2; b++) {
        if (
          map[coordinate + i * 20 + b + a * 20] &&
          map[coordinate + i * 20 + b + a * 20].parentShipId != null
        ) {
          return _createVerticalShip(shipLength, zone);
        }
      }
    }
  }
  for (let i = 0; i < shipLength; i++) {
    coordinates.push(map[coordinate + i * 20]);
  }
  return coordinates;
};
