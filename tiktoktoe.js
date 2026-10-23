const cells = document.querySelectorAll(".cell"); 
const playerText = document.getElementById("player"); 
const result = document.getElementById("result"); 
let gameOver = false; 
let computerThinking = false; 

// Winning combinations 
const winningPatterns = [, [3, 4, 5], [6, 7, 8], , [1, 4, 7], [2, 5, 8], , [2, 4, 6] 
]; 

// =============================== 
// PLAYER X 
// =============================== 
cells.forEach((cell) => { 
  cell.addEventListener("click", () => { 
    if (gameOver || computerThinking) { return; } 
    if (cell.textContent !== "") { return; } 

    // Player move 
    cell.textContent = "X"; 

    // Check player win 
    if (checkWinner("X")) { 
      result.textContent = "🎉 You Win!"; 
      gameOver = true; 
      return; 
    } 

    // Check draw 
    if (checkDraw()) { 
      result.textContent = "🤝 Game Draw!"; 
      gameOver = true; 
      return; 
    } 

    // Computer turn 
    computerThinking = true; 
    playerText.textContent = "O"; 
    setTimeout(computerMove, 500); 
  }); 
}); 

// =============================== 
// UNBEATABLE SMART COMPUTER (Minimax)
// =============================== 
function computerMove() { 
  if (gameOver) { return; } 

  // Minimax algorithm se sabse best move nikalna
  let bestScore = -Infinity;
  let move = -1;

  cells.forEach((cell, index) => {
    if (cell.textContent === "") {
      cell.textContent = "O"; // Try move
      let score = minimax(false); // Check score
      cell.textContent = ""; // Undo move
      if (score > bestScore) {
        bestScore = score;
        move = index;
      }
    }
  });

  if (move === -1) { return; } 

  // Computer O 
  cells[move].textContent = "O"; 

  // Computer wins? 
  if (checkWinner("O")) { 
    result.textContent = "🤖 Computer Wins!"; 
    gameOver = true; 
    computerThinking = false; 
    return; 
  } 

  // Draw? 
  if (checkDraw()) { 
    result.textContent = "🤝 Game Draw!"; 
    gameOver = true; 
    computerThinking = false; 
    return; 
  } 

  // Player turn 
  playerText.textContent = "X"; 
  computerThinking = false; 
} 

// =============================== 
// MINIMAX ALGORITHM
// =============================== 
function minimax(isMaximizing) {
  // Base cases: check for terminal states
  if (checkWinner("O")) return 10;
  if (checkWinner("X")) return -10;
  if (checkDraw()) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    cells.forEach((cell) => {
      if (cell.textContent === "") {
        cell.textContent = "O";
        let score = minimax(false);
        cell.textContent = "";
        bestScore = Math.max(score, bestScore);
      }
    });
    return bestScore;
  } else {
    let bestScore = Infinity;
    cells.forEach((cell) => {
      if (cell.textContent === "") {
        cell.textContent = "X";
        let score = minimax(true);
        cell.textContent = "";
        bestScore = Math.min(score, bestScore);
      }
    });
    return bestScore;
  }
}

// =============================== 
// WINNER CHECK 
// =============================== 
function checkWinner(player) { 
  for (let pattern of winningPatterns) { 
    const a = cells[pattern[0]].textContent; 
    const b = cells[pattern[1]].textContent; 
    const c = cells[pattern[2]].textContent; 
    if ( a === player && b === player && c === player ) { 
      return true; 
    } 
  } 
  return false; 
} 

// =============================== 
// DRAW CHECK 
// =============================== 
function checkDraw() { 
  for (let cell of cells) { 
    if (cell.textContent === "") { 
      return false; 
    } 
  } 
  return true; 
} 

// =============================== 
// NEW GAME 
// =============================== 
function restartGame() { 
  cells.forEach(cell => { 
    cell.textContent = ""; 
  }); 
  gameOver = false; 
  computerThinking = false; 
  playerText.textContent = "X"; 
  result.textContent = ""; 
}
