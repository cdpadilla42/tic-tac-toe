// t up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)

// Game flow solid! Next: Adjust for errors. Ask for input once again if space is already taken.

// Gameboard module
const gameBoard = (() => {
  let _board = ["", "", "", "", "", "", "", "", ""];
  let show = () => _board;
  let newMove = (marker, index) => {
    if (_board[index] !== "") {
      console.log("error! Already placed");
    } else {
      _board.splice(index, 1, marker);
    }
  }
  return { newMove, show };
})();



// Players object factory functions
const playerFactory = (name, marker) => {
  let move = (index) => gameBoard.newMove(marker, index);
  
  return { move, name, marker };
}

let playerOne;
let playerTwo = playerFactory("Jenn", "O");

// Game-flow module
const gameFlow = (() => {
  
  let initializePlayerOne = (name, marker) => {
    playerOne = playerFactory(name, marker);
  };

  let currentTurn = playerTwo;

  let round = () => {
    // player one begin
    _turn(currentTurn);
    if(isWon(gameBoard.show(), currentTurn.marker)) {
      console.log("The game is won!");
      return;
    }
    if(_isBoardFull()) {
      console.log("It's a draw!");
      return;
    }
    if (currentTurn === playerOne) {
      currentTurn = playerTwo;
    } else {
      currentTurn = playerOne;
    }
    round();
  };

  let _turn = (player) => {
    let selectionOne = window.prompt("Player, what is your move?", "Index");
    // select index, make move
    player.move(selectionOne);
  }

  let _isBoardFull = () => {
    let board = gameBoard.show();
    for (var i = 0; i < board.length; i++) {
      if (board[i] === "") {
        return false;
      }
    }
    return true;
  }
  
  let _winStates = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
  ];
  
  let tie = () => "Game over! It's a draw!";

  let isWon = (gameArray, marker) => {
    for (var i = 0; i < _winStates.length; i++) {
      let first = _winStates[i][0];
      let second = _winStates[i][1];
      let third = _winStates[i][2];

      if (gameArray[first] === marker && gameArray[second] === marker && gameArray[third] === marker) {
        return true;
      }
    };
    return false;
  }

  return { tie, isWon, initializePlayerOne, round };
})();

//displayController module

// 

/*

Gameflow logic

Player one
Enter name and chose marker...

Optional Player two
Enter name and chose marker...

Round Begin
until game is won or board is filled...

  Player one begin
  Select index
  Process move
  check for win

  Player two begin
  copy above

Game won - return and add score
Board filled - it's a tie!

Play another round?
If yes, Round Begin

*/

