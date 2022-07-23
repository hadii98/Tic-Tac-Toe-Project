/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require("prompt-sync")({ sigint: true });
const assert = require("assert");

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
  board[position] = mark;
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
  let line = "";

  for (let j = 1; j < Object.keys(board).length + 1; j++) {
    if (board[Object.keys(board)[j - 1]] == " ") {
      line += Object.keys(board)[j - 1] + " | ";
    } else {
      line += board[Object.keys(board)[j - 1]] + " | ";
    }

    if (j % 3 === 0) {
      console.log(line);
      console.log("____________\n");
      line = "";
    }
  }
}

// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
  let currentStatus;

  if (position < 1 || position > 9) {
    console.log(
      "Out of bound position (smaller than 1, or larger than 9). Please enter again!\n"
    );
    currentStatus = false;
  } else if (isNaN(position)) {
    console.log(
      "Wrong Input (invalid position, not entering a position). Please enter again!\n"
    );
    currentStatus = false;
  } else if (board[Object.keys(board)[position - 1]] !== " ") {
    console.log("The position is already occupied. Please enter again!\n");
    currentStatus = false;
  } else {
    currentStatus = true;
  }
  return currentStatus;
}

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
  let justMark = Object.fromEntries(
    Object.entries(board).filter(([key, value]) => value === player)
  );

  for (let i = 0; i < winCombinations.length; i++) {
    let inc = 0;
    for (let j = 0; j < winCombinations[i].length; j++) {
      var trial = Object.keys(justMark).some((x) => x == winCombinations[i][j]);
      if (trial == true) {
        inc++;
      }
    }

    if (inc == 3) {
      numberOfWins[player]++;
      winCombinations.splice(i, 1);
    }
  }

  if (player == "X") {
    return numberOfWins.X > numberOfWins.O ? true : false;
  } else if (player == "O") {
    return numberOfWins.O > numberOfWins.X ? true : false;
  }
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
  return Object.values(board).every((x) => x !== " ");
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************

// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
  let gameStatus = false;
  let position = 0;
  do {
    printBoard();
    position = prompt(player + "'s turn, input: ");
    gameStatus = validateMove(position);
  } while (gameStatus == false);
  markBoard(position, player);
  console.log("\n");
}

let winnerIdentified = false;

do {
  let currentTurnPlayer = "X";
  // To store the current win for each player.
  var numberOfWins = {
    X: 0,
    O: 0,
  };
  // The board object used to save the current status of a gameplay
  var board = {
    1: " ",
    2: " ",
    3: " ",
    4: " ",
    5: " ",
    6: " ",
    7: " ",
    8: " ",
    9: " ",
  };

  // TODO: list out all the combinations of winning, you will neeed this
  // one of the winning combinations is already done for you
  var winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  console.log("\nGame started:\n");
  while (!winnerIdentified) {
    playTurn(currentTurnPlayer);
    // feel free to add logic here if needed, e.g. announcing winner or tie
    let gameWin = checkWin(currentTurnPlayer);

    if (gameWin == true) {
      printBoard();
      console.log("The Winner for this game is Player " + currentTurnPlayer);
      winnerIdentified = true;
    } else {
      let gameFull = checkFull();
      if (gameFull == false) {
        if (currentTurnPlayer == "X") {
          currentTurnPlayer = "O";
        } else {
          currentTurnPlayer = "X";
        }
      } else {
        printBoard();
        console.log("The game is currently on tie! ");
        winnerIdentified = true;
      }
    }
  }

  console.log("Enter 'Y' to start a new game or 'N' to end the game.");
  answer = prompt("Your Answer: ");
  while (answer != "Y" && answer != "y" && answer != "N" && answer != "n") {
    console.log("Incorrect Answer. Please enter again!");
    console.log("Enter 'Y' to start a new game or 'N' to end the game.");
    answer = prompt("Your Answer: ");
  }
  if (answer == "Y" || answer == "y") {
    winnerIdentified = false;
  }
  // Bonus Point: Implement the feature for the user to restart the game after a tie or game over
} while (winnerIdentified == false && answer != "N" && answer != "n");
