Game object - Factory Function
- startGame Fn
    - Initialises 1 gameboard 
    - Intialises 2 players; assigns them as "x" or "o"

- endGame
    - declare winner, clear variables,provide option to restart

- matchWin
    - check match win -> player gets three "o"/"x"s in a row
        - if match win, increment player score by 1
    
- gameWin
    - check if game win -> player score > 3
    - endGame()

- checkWin
    - check if there are three spots in a row that are identical

        - if so, award win to corresponding player 
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
