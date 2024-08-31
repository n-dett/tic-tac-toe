// Create the game board
const gameBoard = (function(){
    const gameBoardObj = {
        gameBoardArr: 
            ['', '', '', '', '', '','', '', '']
    }

    return gameBoardObj;
})();


// Track game state
const gameState = (function() {
    let started = false;
    return {
        get isStarted() {return started},
        startGame: function() {started = true},
        endGame: function() {started = false}
    }
})();


///////// Change to access player1 and player2
// Create a player
function playerFactory(name, symbol){
    const playerObj = {
        name: name,
        symbol: symbol
    }

    return playerObj;
}



// // // Create gameplay
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

//         // Get player names
//         // let player1Name = prompt("Player 1 will use X. Enter the name of Player 1:");
//         // let player2Name = prompt("Player 2 will use O. Enter the name of Player 2:");
//         let player1Name = "temp";
//         let player2Name = "temp2";

//         let player1 = playerFactory(player1Name, 'X');
//         let player2 = playerFactory(player2Name, 'O');

//         let playerTurn = player1;

//         do{
//             // Get player's move
//             // let playerMove = parseInt(prompt((`${playerTurn.name}, which square do you want to select? (1-9)`)));
//             gameBoard.gameBoardArr[playerMove-1] = playerTurn.symbol;

//             // Switch players for next turn
//             if(isGameTied() || isGameWon()){
//                 gameOver = true;
//             }else{
//                 if(playerTurn == player1){
//                     playerTurn = player2;
//                 }else{
//                     playerTurn = player1;
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
        //if(empty)
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

    // Button
    // On click
        // gameStarted = true;
        // innerText = "<Player 1>'s turn"

    const sidebar = document.querySelector('#sidebar');

    // Start the game on button click
    const startBtn = document.querySelector('#start-btn');
    startBtn.addEventListener('click', () => {
        gameState.startGame();
        startBtn.style.display = 'none';

        // Create game text paragraph
        const gameText = document.createElement('p');
        gameText.id = "game-text";
        gameText.textContent = "Player 1's turn";
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


    // Display text for game won or tied
})()
