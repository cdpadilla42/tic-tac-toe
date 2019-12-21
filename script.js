// Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.
// Should stop game and disallow player input after game is won.

// Game flow solid! Next: Adjust for errors. Ask for input once again if space is already taken.

// Gameboard module
const gameBoard = (() => {
  let _board = ["", "", "", "", "", "", "", "", ""];
  let show = () => _board;
  let render = () => {
    // grabs dom elements
    for (var i = 0; i < _board.length; i++) {
      let current = document.querySelector("td[data-index='" + i + "']");
      current.innerText = _board[i];
    }
  }
  let newMove = (marker, index) => {
    _board.splice(index, 1, marker);
  }
  return { show, render, newMove };
})();



// Players object factory functions
const playerFactory = (name, marker) => {
  let move = (index) => gameBoard.newMove(marker, index);
  
  return { move, name, marker };
}

let playerOne = playerFactory("Chris", "X");
let playerTwo = playerFactory("Jenn", "O");

// Game-flow module
const gameFlow = (() => {
  let currentTurn = playerTwo;

  let initializePlayerOne = (name, marker) => {
    playerOne = playerFactory(name, marker);
  };

  let _playerMove = (index) => {
    currentTurn.move(index);
    gameBoard.render();
    if(isWon(gameBoard.show(), currentTurn.marker)) {
      console.log("The game is won!");
      return;
    }
    if(_isBoardFull()) {
      console.log("It's a draw!");
      return;
    }
    _swapTurn();
  }

  let _swapTurn = () => {
    if (currentTurn === playerOne) {
      currentTurn = playerTwo;
    } else {
      currentTurn = playerOne;
    }
    _renderPlayerTurn();
  }



  let _renderPlayerTurn = () => {
    document.querySelector(".message").innerText = `${currentTurn.name}'s turn!`;
  }

  let round = () => {
    currentTurn = playerTwo;
    _renderPlayerTurn();
    let spaces = document.querySelectorAll("td");
    spaces.forEach((space) => {
      space.addEventListener('click', (e) => {
        let selectedIndex = space.dataset.index;
        console.log("You chose", selectedIndex);
        if (space.innerText !== "") {
          console.log("space already taken");
          return;
        }
        _playerMove(selectedIndex);
      })
    });
  };

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