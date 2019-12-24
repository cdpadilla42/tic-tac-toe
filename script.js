// Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

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
  let refreshBoard = () => {
    _board = ["", "", "", "", "", "", "", "", ""];
  }
  return { show, render, newMove, refreshBoard };
})();



// Players object factory functions
const playerFactory = (name, marker) => {
  let move = (index) => gameBoard.newMove(marker, index);
  let _wins = 0;
  return { move, name, marker };
}

let playerOne;
let playerTwo = playerFactory("Jenn", "O");

// Game-flow module
const gameFlow = (() => {
  let currentTurn = playerTwo;

  let initializePlayerOne = () => {
    let input = document.querySelector("#player-name-field").value;
    document.querySelector("#player-name-field").value = "";
    playerOne = playerFactory(input, "X");
    // reassignes event listener on button to initializeplayerTwo
  };

  // Next; InitializePlayerTwo function. 

  let _playerMove = (index) => {
    currentTurn.move(index);
    gameBoard.render();
    if(isWon(gameBoard.show(), currentTurn.marker)) {
      _win(currentTurn);
      return;
    }
    if(_isBoardFull()) {
      _renderTie();
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

  let _win = (player) => {
    document.querySelector(".message").innerText = `${player.name} wins!!`;
  }

  let _renderTie = () => {
    document.querySelector(".message").innerText = `It's a draw!`
  }

  let _renderPlayerTurn = () => {
    document.querySelector(".message").innerText = `${currentTurn.name}'s turn!`;
  }

  let _isGameOver = true;

  let round = () => {
    _isGameOver = false;
    currentTurn = playerTwo;
    gameBoard.refreshBoard();
    gameBoard.render();
    _renderPlayerTurn();
    let spaces = document.querySelectorAll("td");
    spaces.forEach((space) => {
      space.addEventListener('click', (e) => {
        if(_isGameOver) {
          return;
        }
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
    _isGameOver = true;
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
  
  let tie = () => {
    _isGameOver = true;
    return "Game over! It's a draw!";
  }

  let isWon = (gameArray, marker) => {
    for (var i = 0; i < _winStates.length; i++) {
      let first = _winStates[i][0];
      let second = _winStates[i][1];
      let third = _winStates[i][2];

      if (gameArray[first] === marker && gameArray[second] === marker && gameArray[third] === marker) {
        _isGameOver = true;
        return true;
      }
    };
    return false;
  }

  return { tie, isWon, initializePlayerOne, round };
})();

let roundStartBttn = document.querySelector("#round-start");
roundStartBttn.addEventListener("click", gameFlow.round);

let nameSubmitBttn = document.querySelector("#name-submit");
nameSubmitBttn.addEventListener("click", gameFlow.initializePlayerOne);