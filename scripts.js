//modal hide 

const startGameModal = document.querySelector(".start-game-modal")
const roundEndModal = document.querySelector(".round-end-modal")
const gameEndModal = document.querySelector(".game-end-modal")
const settingsModal = document.querySelector(".settings-modal")

roundEndModal.classList.toggle("hidden")
gameEndModal.classList.toggle("hidden")
settingsModal.classList.toggle("hidden")


const toggleModal = () => {
    const modalContainer = document.querySelector(".modal")
    modalContainer.classList.toggle("hidden");
    
}

const createPlayer = (name, sign) => {
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


// tic tac toe factory function
function ticTacToe(player1, player2) {
    const board = (() => {
        const gameBoard = [
            "_","_","_", // 0, 1, 2
            "_","_","_", // 3, 4, 5
            "_","_","_" // 6, 7, 8
        ]

        const addMove = (sign, position) => {            
            gameBoard[position] = sign
        }

        const isMoveAllowed = (position) => {
            return gameBoard[position] == "_" && position >= 0 && position < 9 && position != "";
        }

        const consoleDisplay = () => {
            console.log(gameBoard.slice(0, 3) + "\n" +
                        gameBoard.slice(3, 6) + "\n" +
                        gameBoard.slice(6, 9))
        }

        const reset = () => {
            gameBoard.splice(0, 9,
                "_","_","_", // 0, 1, 2
                "_","_","_", // 3, 4, 5
                "_","_","_", // 6, 7, 8
            )
        }

        return {
            gameBoard,
            isMoveAllowed, 
            addMove, 
            consoleDisplay,
            reset
        }
    })();

    const switchPlayer = (currentPlayer) => {
        if (currentPlayer == player1) {
            return player2;
        } else {
            return player1;
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

    let currentPlayer = player1;
    let roundOutcome = "unfinished";

    return {
        board,
        currentPlayer,
        roundOutcome,
        switchPlayer,
        checkRoundOutcome,
        handleScoring,
        getScores,
        endGame
    }
}
let player1;
let player2;
let newGame;

//render array into DOM
const cells = document.querySelectorAll(".cell")
const renderBoard = (cells, gameboard) => {
    gameboard.forEach((element, index) => {
        //get data cell that matches element index
        let cell = cells[index]
        if (element == "_") {
            cell.textContent = "";
        } else {cell.textContent = element}
    })
}

//click events
const mainContainer = document.querySelector(".main-container")

mainContainer.addEventListener("click", (e) => {
    let target = e.target
    let cell = target.dataset.cell

    // early return if grid-container element is not clicked, 
    // if (!target.classList.contains("cell")) return;

    if (target.classList.contains("start-game")) {
        e.preventDefault();
        handleStartGame()
    }

    if (target.classList.contains("continue")) {
        e.preventDefault();
        handleContinue();
    }

    if (target.classList.contains("back-to-menu")) {
        e.preventDefault();
        handleBackToMenu();
    }

    // on click, handleMove(position)
    if (target.classList.contains("cell")) { 
        handleMove(cell) 
    }

    if (target.classList.contains("play-again")) {
        e.preventDefault();
        handlePlayAgain()
    }
    
    if (target.classList.contains("settings-button")) {
        e.preventDefault();
        handleSettings()
    }

    if (target.classList.contains("close")) {
        e.preventDefault();
        console.log('close-button pressed')
        settingsModal.classList.toggle("hidden")
        toggleModal()
    }




    
})


// handleStartGame
const player1Input = document.querySelector("#player1-name-input")
const player2Input = document.querySelector("#player2-name-input")
const player1NameDisplay = document.querySelector("#player1-name")
const player2NameDisplay = document.querySelector("#player2-name")
const nameWarning = document.querySelector(".name-warning")


const handleStartGame = () => {
    //read in text values for player1 name and player 2 name
    let player1Name = player1Input.value
    let player2Name = player2Input.value

    //reset input values
    player1Input.value = ""
    player2Input.value = ""

    // check that names arent empty; if they are, show error and return
    if (player1Name == "" || player2Name == "") {
        nameWarning.classList.add("show")
        return
    }

    //assign players

    player1 = createPlayer(player1Name, "X");
    player2 = createPlayer(player2Name, "O");

    //display name in DOM

    player1NameDisplay.textContent = player1Name
    player2NameDisplay.textContent = player2Name

    // assign new game tictactoe function with player1 and player2 names as parameters
    newGame = ticTacToe(player1, player2)

    //hide start-game modal and modal overlay
    startGameModal.classList.toggle("hidden")
    toggleModal()

}

// handleMove -------------------------------------------------------------------------------------------
const handleMove = (position) => {
    let currentSign = newGame.currentPlayer.sign
    let outcome;
    // check move and add if it is valid
    if (newGame.board.isMoveAllowed(position)) {
        newGame.board.addMove(currentSign, position)
    } else { return console.log("Invalid Move")}
    
    // render the board
    renderBoard(cells, newGame.board.gameBoard)

    // check win
    if (newGame.checkRoundOutcome(newGame.board.gameBoard) != "unfinished") {
        outcome = newGame.checkRoundOutcome(newGame.board.gameBoard)
        handleRound(outcome)
    }
    //switch player
    newGame.currentPlayer = newGame.switchPlayer(newGame.currentPlayer)
}

// handleRound ------------------------------------------------------------------------------- 
const handleRound = (outcome) => {
    let roundText
    let roundTitle
    if (outcome == player1.sign) {
        //give score
        player1.giveScore()
        document.querySelector("#player1-score").textContent = player1.getScore()
        roundTitle = `${player1.name} Wins!`
        roundText = `${player1.name} has won this round! The score is ${player1.getScore()} - ${player2.getScore()}`
    } else if (outcome == player2.sign) {
        //give score
        player2.giveScore()
        document.querySelector("#player2-score").textContent = player2.getScore() 
        roundTitle = `${player2.name} Wins!`
        roundText = `${player2.name} has won this round! The score is ${player1.getScore()} - ${player2.getScore()}`

    } else if (outcome == "tie") {
        roundTitle = `It's a Tie!`
        roundText = `There are no winners this round. The score is ${player1.getScore()} - ${player2.getScore()}`
    }
    //CHANGE TO 5
    if (player1.getScore() == 1 || player2.getScore() == 1) {
        handleEndGame(outcome)
        return
    }

    toggleModal()
    roundEndModal.classList.toggle("hidden")
    const roundEndH3 = roundEndModal.querySelector("h3")
    roundEndH3.textContent = roundTitle
    const roundEndDiv = roundEndModal.querySelector("div")
    roundEndDiv.textContent = roundText
}
// handleContinue
const handleContinue = () => {
    //clear the board
    newGame.board.reset()
    renderBoard(cells, newGame.board.gameBoard)

    //close the modal
    toggleModal()
    roundEndModal.classList.toggle("hidden")
}

//const handleEndGame
const handleEndGame = (outcome) => {
    let gameText
    let gameTitle
    if (outcome == player1.sign) {
        gameTitle = `${player1.name} has won the game!`
        gameText = `Congratulations ${player1.name}! The score is ${player1.getScore()} - ${player2.getScore()}`
    } else if (outcome == player2.sign) {
        gameTitle= `${player2.name} has won the game!`
        gameText = `Congratulations ${player2.name}! The score is ${player1.getScore()} - ${player2.getScore()}`
    }

    //
    toggleModal()
    gameEndModal.classList.toggle("hidden")
    const gameEndH3 = gameEndModal.querySelector("h3")
    gameEndH3.textContent = gameTitle
    const gameEndDiv = gameEndModal.querySelector("div")
    gameEndDiv.textContent = gameText
}

// handlePlayAgain
const handlePlayAgain = () => {
    //reset player scores
    player1.resetScore()
    player2.resetScore()
    document.querySelector("#player1-score").textContent = player1.getScore()
    document.querySelector("#player2-score").textContent = player2.getScore()

    //clear the board
    newGame.board.reset()
    renderBoard(cells, newGame.board.gameBoard)

    // close modals
    toggleModal()
    gameEndModal.classList.toggle("hidden")
}

// handlebackToMenu
const handleBackToMenu = () => {
    //reset players score
    player1.resetScore()
    player2.resetScore()
    document.querySelector("#player1-score").textContent = "0"
    document.querySelector("#player2-score").textContent = "0"

    document.querySelector("#player1-name").textContent = "Player1"
    document.querySelector("#player2-name").textContent = "Player2"

    //reset board
    newGame.board.reset()
    renderBoard(cells, newGame.board.gameBoard)

    // check if game end modal or settings modal is open
    if (!gameEndModal.classList.contains("hidden")) {
        gameEndModal.classList.toggle("hidden")
    } else if (!settingsModal.classList.contains("hidden")) {
        settingsModal.classList.toggle("hidden")
    }

    //close game end modal if such

    //open start game modal
    startGameModal.classList.toggle("hidden")
}

const handleSettings = () => {
    toggleModal()
    settingsModal.classList.toggle('hidden')
}




