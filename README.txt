Game object - Factory Function
- startGame Fn
    - Initialises 1 gameboard 
    - Intialises 2 players; assigns them as "x" or "o"

- endGame
    - declare winner, clear variables, provide option to restart

    
- matchWin
    - check if game win -> player score > 3
    - endGame()

- checkOutcome
    - check if there are three spots in a row that are identical
        - if so, award return winning symbol
    - check if there all spots are filled
        -   if so, declare tie, start new game (?) 

Gameboard object - Factory Function
- stores an empty array of length 9 with each element representing a square on the gameboard:

- addMove(x/o, position)
    - adds move to position if isMoveAllowed() = true


- isMoveAllowed()
    - check if position/key has a value.
        - if so, false
        = if not, true

- reset()
    - reset the gameboard

- playturn(player1, board) 
    - check if th

Player object - Factory Function
    - Score
    - Name
    - sign


Things to Do
1. Object to handle display and DOM logic
    - Add heading-container -> gganbu's TicTacToe
        - centre-align

    - Add scoreboard-container (grid)
        - player1-score-container
            - player1-name
            - player1-score

        - hyphen

        - player2-score-container
            - player1-name
            - player1-score

    - Build the gameboard: Write a function that will render the contents of the gameboard array to the webpage
        - grid container (3x3)
        - squares

    - settingsbutton
        - change scores
    