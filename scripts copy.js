const mainContainer = document.querySelector(".main-container")
mainContainer.addEventListener("click", (e) => {
    target = e.target
    cell = target.dataset.cell

    // early return if grid-container element is not clicked, 
    if (!target.classList.contains("cell")) return;

    // update the dom for selection

})



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
    // round setup -------------------------------------------------
    const playRound = () => {
        const board = (() => {
            const gameBoard = [
                "_","_","_", // 0, 1, 2
                "_","_","_", // 3, 4, 5
                "_","_","_" // 6, 7, 8
            ]

            const addMove = (sign, position) => {
                const decision = isMoveAllowed(position)
                if (decision) {
                    gameBoard[position] = sign
                }
                return decision
            }

            const isMoveAllowed = (position) => {
                return gameBoard[position] == "_" && position >= 0 && position < 9 && position != "";
            }

            const display = () => {
                console.log(gameBoard.slice(0, 3) + "\n" +
                            gameBoard.slice(3, 6) + "\n" +
                            gameBoard.slice(6, 9))
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
        
        let currentPlayer = player1;
        let roundOutcome = "unfinished";

        while (roundOutcome == "unfinished") {
            board.display()
            playTurn(currentPlayer, board)
            roundOutcome = checkRoundOutcome(board.gameBoard)
            currentPlayer = (currentPlayer === player1) ? player2 : player1; 
        }
        board.display()

        return roundOutcome
    }
    
    const playTurn = (player, board) => {
        let addMoveSuccess = false;
        alert(`It is ${player.name}'s turn. \nPlease enter a position (0-9)`)
        
        let position = prompt(`It is ${player.name}'s turn. \nPlease enter a position (0-9)`);
        addMoveSuccess = board.addMove(player.sign, position);

        while (addMoveSuccess == false) {
            position = prompt(`@@@@@ INVALID MOVE! @@@@ \nIt is ${player.name}'s turn. \nPlease enter a position (0-9)`);
            addMoveSuccess = board.addMove(player.sign, position);
        }

    }

    const checkRoundOutcome = (board) => {
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

    const handleScoring = (roundOutcome, player1, player2) => {    
        switch (roundOutcome) {
            case player1.sign:
                console.log(`${player1.name} (${player1.sign})  wins!`)
                player1.giveScore()
                break
            case player2.sign:
                console.log(`${player2.name} (${player2.sign}) wins!`)
                player2.giveScore()
                break
            default:
                break
        }
    }

    const getScores = (player1, player2) => {
        console.log(`${player1.name}: ${player1.getScore()} \n${player2.name}: ${player2.getScore()}`)
    }

    const endGame = (player1, player2) => {
        if (player1.getScore() == 3) {return player1.name}
        else if (player2.getScore() == 3) {return player2.name}
        else {return false}
    }
    

    const player1 = createPlayer("player1", "X");
    const player2 = createPlayer("player2", "O");
    let roundOutcome;
    
    do {
        console.log("New Round!")
        roundOutcome = playRound()
        handleScoring(roundOutcome, player1, player2)
        getScores(player1, player2)
    } while (endGame(player1, player2) == false)
    
    console.log(`${endGame(player1,player2)} wins!`)

}

ticTacToe()



