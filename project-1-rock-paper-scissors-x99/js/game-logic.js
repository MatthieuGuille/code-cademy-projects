// All code should be written in this file.

let playerOneMoveOneType = undefined;
let playerOneMoveTwoType = undefined;
let playerOneMoveThreeType = undefined;
let playerTwoMoveOneType = undefined;
let playerTwoMoveTwoType = undefined;
let playerTwoMoveThreeType = undefined;
let playerOneMoveOneValue = undefined;
let playerOneMoveTwoValue = undefined;
let playerOneMoveThreeValue = undefined;
let playerTwoMoveOneValue = undefined;
let playerTwoMoveTwoValue = undefined;
let playerTwoMoveThreeValue = undefined;

function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) {
  const acceptableValues = ['rock','paper','scissors'];
  if (moveOneValue > 0 && moveTwoValue > 0 && moveThreeValue > 0
    && moveOneValue < 99 && moveTwoValue < 99 && moveThreeValue < 99
    && moveOneValue+moveTwoValue+moveThreeValue <= 99
    && acceptableValues.indexOf(moveOneType)>=0
    && acceptableValues.indexOf(moveTwoType)>=0
    && acceptableValues.indexOf(moveThreeType)>=0) {
    if (player === 'Player One') {
      playerOneMoveOneType = moveOneType;
      playerOneMoveTwoType = moveTwoType;
      playerOneMoveThreeType = moveThreeType;
      playerOneMoveOneValue = moveOneValue;
      playerOneMoveTwoValue = moveTwoValue;
      playerOneMoveThreeValue = moveThreeValue;
    } else if (player === 'Player Two') {
      playerTwoMoveOneType = moveOneType;
      playerTwoMoveTwoType = moveTwoType;
      playerTwoMoveThreeType = moveThreeType;
      playerTwoMoveOneValue = moveOneValue;
      playerTwoMoveTwoValue = moveTwoValue;
      playerTwoMoveThreeValue = moveThreeValue;
    }
  }
}

function getRoundWinner(roundNumber) {
  let winner = null;
  if (roundNumber === 1) {
    if (playerOneMoveOneType === playerTwoMoveOneType) {
      if (playerOneMoveOneValue > playerTwoMoveOneValue) {
        winner = 'Player One';
      } else if (playerOneMoveOneValue < playerTwoMoveOneValue) {
        winner = 'Player Two';
      } else if (playerOneMoveOneValue === playerTwoMoveOneValue) {
        winner = 'Tie';
      }
    } else if (playerOneMoveOneType === 'rock' && playerTwoMoveOneType === 'scissors') {
      winner = 'Player One';
    } else if (playerOneMoveOneType === 'rock' && playerTwoMoveOneType === 'paper') {
      winner = 'Player Two';
    } else if (playerOneMoveOneType === 'paper' && playerTwoMoveOneType === 'rock') {
      winner = 'Player One';
    } else if (playerOneMoveOneType === 'paper' && playerTwoMoveOneType === 'scissors') {
      winner = 'Player Two';
    } else if (playerOneMoveOneType === 'scissors' && playerTwoMoveOneType === 'paper') {
      winner = 'Player One';
    } else if (playerOneMoveOneType === 'scissors' && playerTwoMoveOneType === 'rock') {
        winner = 'Player Two';
    }
  } else if (roundNumber === 2) {
    if (playerOneMoveTwoType === playerTwoMoveTwoType) {
      if (playerOneMoveTwoValue > playerTwoMoveTwoValue) {
        winner = 'Player One';
      } else if (playerOneMoveTwoValue < playerTwoMoveTwoValue) {
        winner = 'Player Two';
      } else if (playerOneMoveTwoValue === playerTwoMoveTwoValue) {
        winner = 'Tie';
      }
    } else if (playerOneMoveTwoType === 'rock' && playerTwoMoveTwoType === 'scissors') {
      winner = 'Player One';
    } else if (playerOneMoveTwoType === 'rock' && playerTwoMoveTwoType === 'paper') {
      winner = 'Player Two';
    } else if (playerOneMoveTwoType === 'paper' && playerTwoMoveTwoType === 'rock') {
      winner = 'Player One';
    } else if (playerOneMoveTwoType === 'paper' && playerTwoMoveTwoType === 'scissors') {
      winner = 'Player Two';
  } else if (playerOneMoveTwoType === 'scissors' && playerTwoMoveTwoType === 'paper') {
      winner = 'Player One';
    } else if (playerOneMoveTwoType === 'scissors' && playerTwoMoveTwoType === 'rock') {
      winner = 'Player Two';
    }
  } else if (roundNumber === 3) {
    if (playerOneMoveThreeType === playerTwoMoveThreeType) {
      if (playerOneMoveThreeValue > playerTwoMoveThreeValue) {
        winner = 'Player One';
      } else if (playerOneMoveThreeValue < playerTwoMoveThreeValue) {
        winner = 'Player Two';
      } else if (playerOneMoveThreeValue === playerTwoMoveThreeValue) {
        winner = 'Tie';
      }
    } else if (playerOneMoveThreeType === 'rock' && playerTwoMoveThreeType === 'scissors') {
      winner = 'Player One';
    } else if (playerOneMoveThreeType === 'rock' && playerTwoMoveThreeType === 'paper') {
      winner = 'Player Two';
    } else if (playerOneMoveThreeType === 'paper' && playerTwoMoveThreeType === 'rock') {
      winner = 'Player One';
    } else if (playerOneMoveThreeType === 'paper' && playerTwoMoveThreeType === 'scissors') {
      winner = 'Player Two';
    } else if (playerOneMoveThreeType === 'scissors' && playerTwoMoveThreeType === 'paper') {
      winner = 'Player One';
    } else if (playerOneMoveThreeType === 'scissors' && playerTwoMoveThreeType === 'rock') {
        winner = 'Player Two';
    }
  }

  return winner
}


function getGameWinner() {
  let gameWinner = null
  let playerOneScore = 0;
  let playerTwoScore = 0;
  for (let i = 1; i<=3; i++) {
    let roundWinner = getRoundWinner(i);
    if (roundWinner === 'Player One') {
      playerOneScore = playerOneScore+1;
    } else if (roundWinner === 'Player Two') {
      playerTwoScore = playerTwoScore+1;
    } else if (roundWinner === 'Tie') {
      playerOneScore = playerOneScore+1;
      playerTwoScore = playerTwoScore+1;
    } else if (roundWinner === null) {
      return null;
    }
  }

  if (playerOneScore > playerTwoScore) {
    gameWinner = 'Player One';
  } else if (playerOneScore < playerTwoScore) {
    gameWinner = 'Player Two';
  } else if (playerOneScore === playerTwoScore) {
    gameWinner = 'Tie';
  }

    return gameWinner;
}

function setComputerMoves() {

  let randomTypeOne = getRandomInt(1, 3);
  let randomTypeTwo = getRandomInt(1, 3);
  let randomTypeThree = getRandomInt(1, 3);

  if (randomTypeOne === 1) {
    playerTwoMoveOneType = 'rock';
  } else if (randomTypeOne === 2) {
    playerTwoMoveOneType = 'paper';
  } else {
    playerTwoMoveOneType = 'scissors';
  }

  if (randomTypeTwo === 1) {
    playerTwoMoveTwoType = 'rock';
  } else if (randomTypeTwo === 2) {
    playerTwoMoveTwoType = 'paper';
  } else {
    playerTwoMoveTwoType = 'scissors';
  }

  if (randomTypeThree === 1) {
    playerTwoMoveThreeType = 'rock';
  } else if (randomTypeThree === 2) {
    playerTwoMoveThreeType = 'paper';
  } else {
    playerTwoMoveThreeType = 'scissors';
  }

  playerTwoMoveOneValue = Math.floor(Math.random() * (97 - 1 + 1)) + 1;
  let upperBound = 98 - playerTwoMoveOneValue;
  playerTwoMoveTwoValue = Math.floor(Math.random() * (upperBound - 1 + 1)) + 1;
  playerTwoMoveThreeValue = 99 - playerTwoMoveOneValue - playerTwoMoveTwoValue;

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
