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
            let gameWon = false;

            // Check each row of three
            for(i=0; i<=6; i+=3){
                if(gameBoard.gameBoardArr[i] != "" && gameBoard.gameBoardArr[i] == gameBoard.gameBoardArr[i+1] && gameBoard.gameBoardArr[i+1] == gameBoard.gameBoardArr[i+2]){
                    gameWon = true;
                }
            }
        
            // Check each column of six
            for(i=0; i<3; i++){
                if(gameBoard.gameBoardArr[i] != "" && gameBoard.gameBoardArr[i] == gameBoard.gameBoardArr[i+3] && gameBoard.gameBoardArr[i+3] == gameBoard.gameBoardArr[i+6]){
                    gameWon = true;
                }
            }
            
            // Check the diagonals
            if((gameBoard.gameBoardArr[0] != "" && gameBoard.gameBoardArr[0] == gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr[4] == gameBoard.gameBoardArr[8]) || (gameBoard.gameBoardArr[2] != "" && gameBoard.gameBoardArr[2] == gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr[4] == gameBoard.gameBoardArr[6])){
                gameWon = true;
            }

            return gameWon;
            }

    }
})();



// Update display
const updateUI = (function(){
    const boardSquares = document.querySelectorAll('.squares');

    function changeColor(){
        console.log("hovered");
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
                // && if game is started
                square.addEventListener('mouseover', changeColor)
                square.addEventListener('mouseout', resetColor)
            })
        },

        // Start the game on button click
        clickStart: function(){            
            const gameText = document.querySelector('#game-text');
            const startBtn = document.querySelector('#start-btn');
            startBtn.addEventListener('click', () => {
                gameState.startGame();
                startBtn.style.display = 'none';

                // Create game text paragraph
                const playerTurnText = document.createElement('p');
                playerTurnText.id = "turn-text";
                playerTurnText.textContent = `${gameState.whoseTurn.name}'s turn`;
                gameText.appendChild(playerTurnText);
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
            // playerTurnText.textContent = `${gameState.whoseTurn.name}'s turn`;
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
                let squareIndex = square.dataset.square;

                // Update the array on click
                let i = square.dataset.square;
                gameBoard.updateArr(squareIndex, gameState.whoseTurn.symbol);

                // Display symbol on click
                updateUI.displaySymbol(square, gameState.whoseTurn.symbol);


                // Check for winner or tie (update text)
                // Switch turns (update text)
                // Repeat

            }
        })
    })


})();
