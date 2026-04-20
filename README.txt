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
    - Add heading-container -> gganbu's TicTacToe d
        - centre-align

    - Add scoreboard-container (grid) d
        - player1-score-container
            - player1-name
            - player1-score

        - hyphen-container d

        - player2-score-container d
            - player1-name
            - player1-score

    - Build the gameboard: Write a function that will render the contents of the gameboard array to the webpage
        - grid container (3x3) d
        - squares d

    - settingsbutton
        - change scores

2. build gameboard
    - allow user to add symbols to the grid
      - select container -> use event delegation
      - event listener if user selects the grid

      - when user touches gameboard-container's cell, 
      - update the dom with player1 symbol
      - 

      - change turn to player 2
      - repeat player 1's actions for player 2 


    - use styling to whose turn by bolding the scores + name 
    - determine if user wins
    - update scores
    - determine winner when player score > 
    
    - make user add their name in modal 
    

handleOutcome
- check outcome
    - if x or o, show player1 wins!,  increment winner by 1
    - if tie, do nothing
- reset the board
- check if any score > 3 
    - if so handlewin

handleWin
- show modalannounce winner and show scores,
- option to play again
- option to exit 

create player modal
- initial screen that allows players(s) to type name names.

settings button