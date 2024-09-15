// Create the game board array
const gameBoard = (function(){
    const boardSquares = document.querySelectorAll('.squares');
    const gameBoardObj = {
        gameBoardArr: 
            ['', '', '', '', '', '','', '', ''],
        updateArr: function(index, symbol) {
            this.gameBoardArr[index] = symbol;
        }
    }
    return gameBoardObj;
})();



// Create a player factory
function playerFactory(playerNum, symbol){
    const nameInput = document.querySelector(`#player-${playerNum}-name`);
    const playerObj = {
        get name() {
            if(nameInput.value == ""){
                return `Player ${playerNum}`
            }
            return nameInput.value;
        },
        symbol: symbol
    }

    return playerObj;
}



// Create players
const players = {
    player1: playerFactory(1, 'X'),
    player2: playerFactory(2, 'O')
}



// Track game state
const gameState = (function() {
    let started = false;
    let playerTurn = players.player1;
    return {
        get isStarted() {return started},
        startGame: function() {started = true},
        endGame: function() {started = false},
        get whoseTurn() {return playerTurn},
        player1Turn: function() {playerTurn = players.player1},
        player2Turn: function() {playerTurn = players.player2},
        gameWon: function() {
            let gameWon = false;

            // Check each row of three
            for(i=0; i<=6; i+=3)
            {
                if(gameBoard.gameBoardArr[i] != "" && gameBoard.gameBoardArr[i] == gameBoard.gameBoardArr[i+1] && gameBoard.gameBoardArr[i+1] == gameBoard.gameBoardArr[i+2]){
                    gameWon = true;
                }
            }
        
            // Check each column of six
            for(i=0; i<3; i++)
            {
                if(gameBoard.gameBoardArr[i] != "" && gameBoard.gameBoardArr[i] == gameBoard.gameBoardArr[i+3] && gameBoard.gameBoardArr[i+3] == gameBoard.gameBoardArr[i+6]){
                    gameWon = true;
                }
            }
            
            // Check the diagonals
            if((gameBoard.gameBoardArr[0] != "" && gameBoard.gameBoardArr[0] == gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr[4] == gameBoard.gameBoardArr[8]) || (gameBoard.gameBoardArr[2] != "" && gameBoard.gameBoardArr[2] == gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr[4] == gameBoard.gameBoardArr[6])){
                gameWon = true;
            }
        
            return gameWon;
        },

        gameTied: function() {
            let gameTied = false;
            let emptySquare = false;

            // Check if every square is filled
            for(i=0; i<=9; i++){
                if(gameBoard.gameBoardArr[i] == ""){
                    emptySquare = true;
                }
            }

            // If board is filled and game is not won
            if(!emptySquare && !this.gameWon()) {
                gameTied = true;
            }

            return gameTied;
        },
        resetGame: function() {
            // Reset array
            gameBoard.gameBoardArr = ['', '', '', '', '', '','', '', ''];

            // Set turn to player 1
            this.player1Turn();
            
        }

    }
})();



// Update display
const updateUI = (function(){
    const boardSquares = document.querySelectorAll('.squares');

    function changeColor(){
        if(this.innerHTML == "" && gameState.isStarted) {
            this.style.backgroundColor = '#ffffff'
        }
    }

    function resetColor(){
        if(this.innerHTML == "" && gameState.isStarted) {
            this.style.backgroundColor = '#0f0f0f';
        }
    }

    return {
        // Change color of square on hover
        hoverColor: function(){
            boardSquares.forEach(square => {
                square.addEventListener('mouseover', changeColor)
                square.addEventListener('mouseout', resetColor)
            })
        },

        // Start the game on button click
        clickStart: function(){            
            const gameText = document.querySelector('#game-text');
            const startBtn = document.querySelector('#start-btn');
            startBtn.addEventListener('click', () => {
                // Reset the game
                updateUI.resetUI();
                gameState.resetGame();

                // Hide the button
                gameState.startGame();
                startBtn.style.display = 'none';

                // Create game text paragraph
                const playerTurnText = document.createElement('p');
                playerTurnText.id = "turn-text";
                playerTurnText.textContent = `${gameState.whoseTurn.name}'s turn`;
                gameText.insertBefore(playerTurnText, gameText.firstChild);
            })
        },

        // Add X or O when empty square is clicked
        displaySymbol: function(square, symbol){
            square.innerText = symbol;
            square.style.backgroundColor = '#000000'
        },


        displayText: function(text){
            const playerTurnText = document.querySelector('#turn-text')
            playerTurnText.textContent = text;
        },

        resetUI: function(){
            // Remove text
            const playerTurnText = document.querySelector('#turn-text')
            if(playerTurnText) {
                playerTurnText.remove();
            }

            // Clear board
            boardSquares.forEach(square => {
                square.textContent = "";
            })
        },

        newGameButton: function(){
            // Show button
            const startBtn = document.querySelector('#start-btn');
            startBtn.style.display = 'block';
            startBtn.textContent = "NEW GAME";
        }
    }
})();




// Create game flow
(function(){
    const boardSquares = document.querySelectorAll('.squares');

    // Start the game on button click
    updateUI.clickStart();

    // Change color on hover
    updateUI.hoverColor();


    // Game flow
    boardSquares.forEach(square => {
        square.addEventListener('click', () => {
            if(square.innerHTML == "" && gameState.isStarted){
                // Update the array on click
                let squareIndex = square.dataset.square;
                gameBoard.updateArr(squareIndex, gameState.whoseTurn.symbol);

                // Display symbol on click
                updateUI.displaySymbol(square, gameState.whoseTurn.symbol);

                // Check for winner or tie and update text
                if(gameState.gameWon()) {
                    updateUI.displayText(`${gameState.whoseTurn.name} won!`)
                    gameState.endGame();
                    updateUI.newGameButton();

                } else if (gameState.gameTied()) {
                    updateUI.displayText("Tie game!")
                    gameState.endGame();
                    updateUI.newGameButton();

                } else {
                    // Switch turns
                    if(gameState.whoseTurn == players.player1) {
                        gameState.player2Turn();
                    } else {
                        gameState.player1Turn();
                    }

                    updateUI.displayText(`${gameState.whoseTurn.name}'s turn`)
                }

            }
        })
    })


})();
