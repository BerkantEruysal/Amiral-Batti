let _currentPlayer = "player"
export const getCurrentPlayer = function(){
    return _currentPlayer;
}
export const changeCurrentPlayer = function(player){
    if(_currentPlayer == "player"){ _currentPlayer = "enemy"}else{_currentPlayer = "player"}
}
export const setCurrentPlayer = function(value){
    _currentPlayer = value
}
