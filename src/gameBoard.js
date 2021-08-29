import { markMissedCordinate } from "./domManager.js";
import { createShip } from "./ship.js";

const ships = [];
const missedShots = [];
const map = [];

export const recieveAttack = function (position) {
  if (map[position].isAttacked == false) {
    if (map[position].parentShipId != null) {
      getShipById(map[position].parentShipId).hit(position);
    } else {
      _missedShot(position);
      markMissedCordinate(position);
    }
  }
};

export const getShips = function () {
  return ships;
};
export const getMap = function () {
  return map;
};

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
  const isHorizontal = Math.floor(Math.random() * 2);

  placeShip(_createHorizontalShip(4), "enemy");
  placeShip(_createHorizontalShip(4), "enemy");
  placeShip(_createHorizontalShip(4), "enemy");
  placeShip(_createHorizontalShip(4), "enemy");
};
const _createHorizontalShip = function (shipLength) {
  let coordinate =
    Math.floor(Math.random() * 17) + Math.floor(Math.random() * 5) * 20;
  let coordinates = [];
  for (let i = 0; i < shipLength; i++) {
    if (map[coordinate + i].parentShipId != null) {
      return _createHorizontalShip(shipLength);
    }
  }
  /*if (
    map[coordinate].parentShipId != null ||
    map[coordinate + 1].parentShipId != null ||
    map[coordinate + 2].parentShipId != null ||
    map[coordinate + 3].parentShipId != null
  ) {
   return  coordinates = _createHorizontalShip();
  }*/
  for (let i = 0; i < shipLength; i++) {
    coordinates.push(map[coordinate + i]);
  }

  /*coordinates = [
    map[coordinate],
    map[coordinate + 1],
    map[coordinate + 2],
    map[coordinate + 3],
  ];*/
  return coordinates;
};
