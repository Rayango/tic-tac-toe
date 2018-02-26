const readlineSync = require('readline-sync');

let board = Array(9).fill(false, 0);
let gameState = {
  turnNumber: 0,
  player: Math.floor(Math.random() * 2)
};

const promptForMove = (turnNumber) => {
  if (turnNumber === 0) {
    return readlineSync.question(`
      Welcome to tic tac toe!  To make your move, please enter the number at which you want to make your move.
      Player ${gameState.player? '1 (o)' : '2 (x)'} goes first!

      ${board[0] ? board[0] : 0}  ${board[1] ? board[1] : 1}  ${board[2] ? board[2] : 2}
      ${board[3] ? board[3] : 3}  ${board[4] ? board[4] : 4}  ${board[5] ? board[5] : 5}
      ${board[6] ? board[6] : 6}  ${board[7] ? board[7] : 7}  ${board[8] ? board[8] : 8}
    `);
  } else {
    return readlineSync.question(`
      Player ${gameState.player? '1 (o)' : '2 (x)'}'s turn!

      ${board[0] ? board[0] : 0}  ${board[1] ? board[1] : 1}  ${board[2] ? board[2] : 2}
      ${board[3] ? board[3] : 3}  ${board[4] ? board[4] : 4}  ${board[5] ? board[5] : 5}
      ${board[6] ? board[6] : 6}  ${board[7] ? board[7] : 7}  ${board[8] ? board[8] : 8}
    `);
  }  
};

const executeMove = (position, player) => {
  let piece = player ? 'o' : 'x';
  board[position] = piece;
  return;
};

const checkForWinner = (mostRecentMove, player) => {
  let piece = player ? 'o' : 'x';
  if (checkHorizontal(mostRecentMove, piece) || checkVertical(mostRecentMove, piece) || 
      checkDiagonalLtB(mostRecentMove,piece) || checkDiagonalRtB(mostRecentMove, piece)) {
    return true;
  }
  return false;
};

const checkHorizontal = (position, piece) => {
  if (position <= 2 && board[0] === piece && board[1] === piece && board[2] === piece) {
    return true;
  } else if (position <= 5 && board[3] === piece && board[4] === piece && board[5] === piece) {
    return true;
  } else if (position <= 8 && board[6] === piece && board[7] === piece && board[8] === piece) {
    return true;
  }
  return false;
};

const checkVertical = (position, piece) => {
  let columnTop = position;
  while (columnTop > 2) {
    columnTop -= 3;
  }
  if (columnTop === 0 && board[0] === piece && board[3] === piece && board[6] === piece) {
    return true;
  } else if (columnTop === 1 && board[1] === piece && board[4] === piece && board[7] === piece) {
    return true;
  } else if (columnTop === 2 && board[2] === piece && board[5] === piece && board[8] === piece) {
    return true;
  }
  return false;
};

const checkDiagonalLtB = (position, piece) => {
  return board[0] === piece && board[4] === piece && board[8] === piece;
};

const checkDiagonalRtB = (position, piece) => {
  return board[2] === piece && board[4] === piece && board[6] === piece;
};

while (true) {
  if (gameState.turnNumber === 9) {
    console.log(`
      Cat's Game!

      ${board[0] ? board[0] : 0}  ${board[1] ? board[1] : 1}  ${board[2] ? board[2] : 2}
      ${board[3] ? board[3] : 3}  ${board[4] ? board[4] : 4}  ${board[5] ? board[5] : 5}
      ${board[6] ? board[6] : 6}  ${board[7] ? board[7] : 7}  ${board[8] ? board[8] : 8}
    `);
    break;
  }

  let position = promptForMove(gameState.turnNumber);
  while (board[position]) {
    console.log('Invalid move!  Try again.');
    position = promptForMove(gameState.turnNumber);
  }
  executeMove(position, gameState.player);
  if (checkForWinner(position, gameState.player)) {
    console.log('Player ' + (gameState.player? '1' : '2') + ' wins!');
    console.log(`
      ${board[0] ? board[0] : 0}  ${board[1] ? board[1] : 1}  ${board[2] ? board[2] : 2}
      ${board[3] ? board[3] : 3}  ${board[4] ? board[4] : 4}  ${board[5] ? board[5] : 5}
      ${board[6] ? board[6] : 6}  ${board[7] ? board[7] : 7}  ${board[8] ? board[8] : 8}
    `);
    return;
  }
  gameState.player = !gameState.player;
  gameState.turnNumber++;
}  