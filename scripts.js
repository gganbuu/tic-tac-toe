// tic tac toe factory function
function ticTacToe() {
    //player factory function -----------------------------------------------
    function createPlayer(name, sign) {
        let score = 0;

        const getScore = () => score;
        const giveScore = () => score++;
        const resetScore = () => score = 0;

        return {
            name, 
            sign,
            getScore,
            giveScore,
            resetScore
        }
    }
    // initial game setup -------------------------------------------------
    const playGame = () => {
        const board = (() => {
            const gameBoard = [
                "_","_","_", // 0, 1, 2
                "_","_","_", // 3, 4, 5
                "_","_","_", // 6, 7, 8
            ]

            const addMove = (sign, position) => {
                const decision = isMoveAllowed(position)
                if (decision) {
                    gameBoard[position] = sign
                }
                return decision
            }

            const isMoveAllowed = (position) => {
                return gameBoard[position] ==  "_";
            }

            const display = () => {
                console.log(gameBoard.slice(0, 3) + "\n" +
                            gameBoard.slice(3, 6) + "\n" +
                            gameBoard.slice(6, 9) + "\n" )
            }

            const reset = () => {
                const gameBoard = [
                    "_","_","_", // 0, 1, 2
                    "_","_","_", // 3, 4, 5
                    "_","_","_", // 6, 7, 8
                ]
            }

            return {
                gameBoard, 
                addMove, 
                display,
                reset
            }
        })();
        const player1 = createPlayer("player1", "X")
        const player2 = createPlayer("player2", "O")
        let outcome = "unfinished";

        while (outcome == "unfinished") {
            board.display()
            playTurn(player1, board)
    
            outcome = checkOutcome(board.gameBoard)

            board.display()
            playTurn(player2, board)

            outcome = checkOutcome(board.gameBoard)
        }

        // board.display()
        // playTurn(player1, board)
        // console.log(checkOutcome(board.gameBoard))
        // board.display()
        //board.display()
        
    }
    
    const playTurn = (player, board) => {
        const position = prompt(`It is ${player.name}'s turn. \nPlease enter a position (0-9)`)
        if (board.addMove(player.sign, position)) {
            return "Success"
        } else {return "Fail"}
    }


    const checkOutcome = (board) => {
        let signs = ["X", "O"];
        for (let sign of signs) {
            for (let i = 0; i < 9; i+=3) {
                // check horizontals
                if (`${board[i]}${board[i+1]}${board[i+2]}` === sign+sign+sign) {
                    return sign
                }
            }

            for(let i=0; i<3; i++) {
                // check verticals
                if (`${board[i]}${board[i+3]}${board[i+6]}` === sign+sign+sign) {
                    return sign
                }
            }

            if (`${board[0]}${board[4]}${board[8]}` == sign+sign+sign) {
                //check top-left to bottom-right diagonal
                return sign
            }

            if (`${board[2]}${board[4]}${board[6]}` == sign+sign+sign) {
                //check top-right to bottom-left diagonal
                return sign
            }
        }

        if (board.some(element => element == "_")) {
            return "unfinished"
        }

        return "tie"
    }


    const matchWin = () => {}

    const gameWin = () => {}

    const endGame = () => {}
    

    playGame()
    
}

ticTacToe()



// gameboard factory function --------------------------------
// - created but removed to make an IIFE

// function createGameBoard() {
//     const gameBoard = [
//         "_","_","_", // 0, 1, 2
//         "_","_","_", // 3, 4, 5
//         "_","_","_", // 6, 7, 8
//     ]

//     const addMove = (sign, position) => {
//         gameBoard[position] = sign
//     }
//     const display = () => {
//         console.log(gameBoard.slice(0, 3) + "\n" +
//                     gameBoard.slice(3, 6) + "\n" +
//                     gameBoard.slice(6, 9) + "\n" )
//     }

//     const reset = () => {
//         const gameBoard = [
//             "_","_","_", // 0, 1, 2
//             "_","_","_", // 3, 4, 5
//             "_","_","_", // 6, 7, 8
//         ]
//     }

//     return {
//         gameBoard, 
//         addMove, 
//         display,
//         reset
//     }
// }


// "_","_","_", // 0, 1, 2
// "_","_","_", // 3, 4, 5
// "_","_","_", // 6, 7, 8