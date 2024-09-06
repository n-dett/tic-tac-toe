// Create the game board
const gameBoard = (function(){
    const gameBoardObj = {
        gameBoardArr: 
            ['', '', '', '', '', '','', '', '']
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
        player2Turn: function() {playerTurn = players.player2}
    }
})();



// // Create gameplay
// (function gameplayFactory(){
//     let playAgain = false;

//     // Outer game loop
//     do{
//         playAgain = false;
//         let gameOver = false;

//         // Clear game board
//         for(i=0; i<gameBoard.gameBoardArr.length; i++){
//             gameBoard.gameBoardArr[i] = "";
//         }



//         do{
//             // Get player's move
//             // let playerMove = parseInt(prompt((`${playerTurn.name}, which square do you want to select? (1-9)`)));
//             gameBoard.gameBoardArr[playerMove-1] = playerTurn.symbol;

//             // Switch players for next turn
//             if(isGameTied() || isGameWon()){
//                 gameOver = true;
//             }else{
//                 if(gameState.whoseTurn() == players.player1){
//                     gameState.playerTurn2Turn();
//                 }else{
//                     gameState.player1Turn();
//                 }
//             }

//         }while(!gameOver);

//         if(isGameTied()){
//             console.log("Tie game!");
//         }else if(isGameWon()){
//             console.log(`${playerTurn.name} wins!`);
//         }

//         // let playAgainChar = prompt("Would you like to play again? (y/n)")
//         if(playAgainChar == "y"){
//             playAgain = true;
//         }else{
//             playAgain = false;
//         }


//     }while (playAgain);




//     // Check for winner
//     function isGameWon(){
//         let gameWon = false;

//         // Check each row of three
//         for(i=0; i<=6; i+=3)
//         {
//             if(gameBoard.gameBoardArr[i] != "" && gameBoard.gameBoardArr[i] == gameBoard.gameBoardArr[i+1] && gameBoard.gameBoardArr[i+1] == gameBoard.gameBoardArr[i+2])
//             {
//                 gameWon = true;
//             }
//         }
    
//         // Check each column of six
//         for(i=0; i<3; i++)
//         {
//             if(gameBoard.gameBoardArr[i] != "" && gameBoard.gameBoardArr[i] == gameBoard.gameBoardArr[i+3] && gameBoard.gameBoardArr[i+3] == gameBoard.gameBoardArr[i+6])
//             {
//                 gameWon = true;
//             }
//         }
        
//         // Check the diagonals
//         if((gameBoard.gameBoardArr[0] != "" && gameBoard.gameBoardArr[0] == gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr[4] == gameBoard.gameBoardArr[8]) || (gameBoard.gameBoardArr[2] != "" && gameBoard.gameBoardArr[2] == gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr[4] == gameBoard.gameBoardArr[6]))
//         {
//             gameWon = true;
//         }
    
//         return gameWon;
//     }

//     // Check for a tie
//     function isGameTied(){
//         let filled = true;
//         for(i=0; i<gameBoard.gameBoardArr.length; i++){
//             if(gameBoard.gameBoardArr[i] == ''){
//                 filled = false;
//             }
//         }

//         if(filled){
//             console.log("It's a tie!");
//             return true;
//         }else{
//             return false;
//         }

//     }

// })();


// Update display
(function displayFactory(){
    // Change color of square on hover
    const boardSquares = document.querySelectorAll('.squares');
    boardSquares.forEach(square => {
        // && if game is started
        square.addEventListener('mouseover', changeColor)
        square.addEventListener('mouseout', resetColor)

    })

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



    // Start the game on button click
    const sidebar = document.querySelector('#sidebar');
    const startBtn = document.querySelector('#start-btn');
    startBtn.addEventListener('click', () => {
        gameState.startGame();
        startBtn.style.display = 'none';

        // Create game text paragraph
        const gameText = document.createElement('p');
        gameText.id = "game-text";
        gameText.textContent = `${gameState.whoseTurn.name}'s turn`;
        sidebar.appendChild(gameText);
    }
    );
    


    // Squares
    // On click
        // If game is started
        // If box is ""
            // If turn = playerOne, then innerText = X, symbol = X
            // Else, innerText = O, symbol = O
        // index = this.value;
        // array[index] = symbol;
        // innerText = "<Player 2>'s turn"

    // Add X or O when empty square is clicked
    boardSquares.forEach(square => {
        // && if game is started
        square.addEventListener('click', displaySymbol)
    })


    function displaySymbol() {
        if(this.innerHTML == "" && gameState.isStarted){
            this.innerHTML = gameState.whoseTurn.symbol;
            if(gameState.whoseTurn == players.player1){
                gameState.player2Turn();
            } else {
                gameState.player1Turn();
            }
        }
    }


    // Display text for game won or tied
})()
