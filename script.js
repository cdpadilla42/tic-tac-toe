// Test gameWOn logic. All written, need testing.

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

  return { move };
}

let playerOne = playerFactory("Chris", "X");
let playerTwo = playerFactory("Jenn", "O");

// Game-flow module
const gameFlow = (() => {
  let _winStates = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
  ]
  
  let tie = () => "Game over! It's a draw!";
  let isWon = (gameArray, marker) => {
    for (var i = 0; i < _winStates.length; i++) {
      let first = _winStates[i][0];
      let second = _winStates[i][1];
      let third = _winStates[i][2];

      if (gameArray[first] === marker & gameArray[second] === marker & gameArray[third] === marker) {
        return "The game is won!!"
      }
    }
    return;
  }
  return { tie, isWon };
})();

//displayController module

// win function

// iterate over winstates
  // let first = array[o]
  // second, third...
  // if all three equal current player marker
  // player won!

// else return


// WIN STATES

/*
board
0, 1, 2
3, 4, 5
6, 7, 8

wins



*/

