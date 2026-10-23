const cells = document.querySelectorAll(".cell");
        const playerText = document.getElementById("player");
        const result = document.getElementById("result");

        let gameOver = false;
        let computerThinking = false;


        // Winning combinations
        const winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6]
        ];


        // ===============================
        // PLAYER X
        // ===============================

        cells.forEach((cell) => {

            cell.addEventListener("click", () => {

        if (gameOver || computerThinking) {
            return;
        }

        if (cell.textContent !== "") {
            return;
        }

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
// MEDIUM SMART COMPUTER
// ===============================

function computerMove() {

    if (gameOver) {
        return;
    }


    const emptyCells = [];

    cells.forEach((cell, index) => {

        if (cell.textContent === "") {

            emptyCells.push(index);

        }

    });


    if (emptyCells.length === 0) {
        return;
    }


    let move = -1;


    // --------------------------------
    // 70% chance to think smartly
    // --------------------------------

    if (Math.random() < 0.70) {


        // 1. Computer can win?
        move = findWinningMove("O");


        // 2. Player ko block karna hai?
        if (move === -1) {

            move = findWinningMove("X");

        }


        // 3. Center
        if (move === -1 && cells[4].textContent === "") {

            move = 4;

        }


        // 4. Corner
        if (move === -1) {

            const corners = [0, 2, 6, 8];

            const availableCorners = corners.filter(index => {

                return cells[index].textContent === "";

            });


            if (availableCorners.length > 0) {

                move =
                    availableCorners[
                        Math.floor(
                            Math.random() *
                            availableCorners.length
                        )
                    ];

            }

        }

    }


    // --------------------------------
    // Agar smart move nahi mila
    // to normal available move
    // --------------------------------

    if (move === -1) {

        move =
            emptyCells[
                Math.floor(
                    Math.random() *
                    emptyCells.length
                )
            ];

    }


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
// FIND WINNING MOVE
// ===============================

function findWinningMove(player) {

    for (let pattern of winningPatterns) {

        const a = cells[pattern[0]].textContent;
        const b = cells[pattern[1]].textContent;
        const c = cells[pattern[2]].textContent;


        if (
            a === player &&
            b === player &&
            c === ""
        ) {

            return pattern[2];

        }


        if (
            a === player &&
            c === player &&
            b === ""
        ) {

            return pattern[1];

        }


        if (
            b === player &&
            c === player &&
            a === ""
        ) {

            return pattern[0];

        }

    }


    return -1;

}


// ===============================
// WINNER CHECK
// ===============================

function checkWinner(player) {

    for (let pattern of winningPatterns) {

        const a = cells[pattern[0]].textContent;
        const b = cells[pattern[1]].textContent;
        const c = cells[pattern[2]].textContent;


        if (
            a === player &&
            b === player &&
            c === player
        ) {

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
