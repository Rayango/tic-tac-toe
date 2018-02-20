const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let gameState = true;
let currentTurn = Math.floor(Math.random() * 2);
let pieces = {
  0: 'o',
  1: 'x'
};
let board = [
  [false, false, false], 
  [false, false, false], 
  [false, false, false]
];

const makeMove = (position) => {
  switch(position) {
    case '1':
      board[0, 0] = pieces[currentTurn];
      break;
  }
  currentTurn = !currentTurn
  return board;
};

const getMove = () => {
  rl.question(`
    Welcome to tic tac toe!  To make your move, please enter the number at which you want to make your move.
    Player ${currentTurn === 0 ? 1 : 2} goes first!

    [${board[0][0] ? (board[0][0] === 1 ? o : x) : '1'}, 2, 3]
    [4, 5, 6]
    [7, 8, 9]\n\n`, (answer) => {
    makeMove(answer);
    if (gameState) {
      getMove();
    } 
    rl.close();
  }); 
};

// while (gameState) {
//   rl.question(`
//     Player ${currentTurn === 0 ? 1 : 2}'s turn!

//     [${board[0][0] ? board[0][0] : '1'}, 2, 3]
//     [4, 5, 6]
//     [7, 8, 9]\n\n`, (answer) => {
//     makeMove(answer);
//   });
// };