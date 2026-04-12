// gameboard factory function --------------------------------
function createGameBoard() {
    const gameBoard = [
        "","","", // 0, 1, 2
        "","","", // 3, 4, 5
        "","","", // 6, 7, 8
    ]
    function addMove(sign, position) {
        gameBoard[position] = sign
    }
    function display() {
        console.log(gameBoard)
    }
    return {gameBoard, addMove, display}
}
// const board = createGameBoard()

//player factory function
function createPlayer(name, sign) {
    let score = 0;

    const getScore = () => score;
    const giveScore = () => score++;
    return {
        name, 
        sign,
        getScore,
        giveScore,
    }
}

const tim = createPlayer("Tim", "x")
