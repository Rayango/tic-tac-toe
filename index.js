const readlineSync = require('readline-sync');

let board = Array(9).fill(false, 0);
let gameState = {
  winnerFound: false,
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
  if (checkHorziontal(mostRecentMove, piece) || checkVertical(mostRecentMove, piece) || 
      checkDiagonalLtB(mostRecentMove,piece) || checkDiagonalRtB(mostRecentMove, piece)) {
    return true;
  }
  return false;
};

const checkHorziontal = (position, piece) => {
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
  while (position > 2) {
    columnTop -= 3;
  }
  if (position === 0 && board[0] === piece && board[3] === piece && board[6] === piece) {
    return true;
  } else if (position === 1 && board[1] === piece && board[4] === piece && board[7] === piece) {
    return true;
  } else if (position === 2 && board[2] === piece && board[5] === piece && board[8] === piece) {
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


while (!gameState.winnerFound) {
  let position = promptForMove(gameState.turnNumber);
  while (board[position]) {
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

 



// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// let gameState = true;
// let currentTurn = Math.floor(Math.random() * 2);
// let pieces = {
//   0: 'o',
//   1: 'x'
// };
// let board = [
//   [false, false, false], 
//   [false, false, false], 
//   [false, false, false]
// ];

// const makeMove = (position) => {
//   switch(position) {
//     case '1':
//       board[0, 0] = pieces[currentTurn];
//       break;
//   }
//   currentTurn = !currentTurn
//   return board;
// };

// const getMove = () => {
//   rl.question(`
//     Welcome to tic tac toe!  To make your move, please enter the number at which you want to make your move.
//     Player ${currentTurn === 0 ? 1 : 2} goes first!

//     [${board[0][0] ? (board[0][0] === 1 ? o : x) : '1'}, 2, 3]
//     [4, 5, 6]
//     [7, 8, 9]\n\n`, (answer) => {
//     makeMove(answer);
//     if (gameState) {
//       getMove();
//     } 
//     rl.close();
//   }); 
// };

// while (gameState) {
//   rl.question(`
//     Player ${currentTurn === 0 ? 1 : 2}'s turn!

//     [${board[0][0] ? board[0][0] : '1'}, 2, 3]
//     [4, 5, 6]
//     [7, 8, 9]\n\n`, (answer) => {
//     makeMove(answer);
//   });
// };