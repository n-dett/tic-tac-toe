// Create the game board
const gameBoard = (function(){
    const gameBoardObj = {
        gameBoardArr: 
            ['', '', '', '', '', '','', '', '']
    }

    return gameBoardObj;
})();




// Create a player
function playerFactory(name, symbol){
    const playerObj = {
        name: name,
        symbol: symbol
    }

    return playerObj;
}




// Create gameplay
(function gameplayFactory(){

    // Get first player
    // Get second player
    // Current player turn
    // Get first player move
    // Check for win
    // Get second player move
    // Check for win

    // If win or all squares filled, then game over

    let playAgain = false;

    // Outer game loop
    do{
        playAgain = false;
        let gameOver = false;

        // Clear game board
        for(i=0; i<gameBoard.gameBoardArr.length; i++){
            gameBoard.gameBoardArr[i] = "";
        }

        // Get player names
        // let player1Name = prompt("Player 1 will use X. Enter the name of Player 1:");
        // let player2Name = prompt("Player 2 will use O. Enter the name of Player 2:");

        let player1 = playerFactory(player1Name, 'X');
        let player2 = playerFactory(player2Name, 'O');

        let playerTurn = player1;

        do{
            // Get player's move
            // let playerMove = parseInt(prompt((`${playerTurn.name}, which square do you want to select? (1-9)`)));
            gameBoard.gameBoardArr[playerMove-1] = playerTurn.symbol;

            // Switch players for next turn
            if(isGameTied() || isGameWon()){
                gameOver = true;
            }else{
                if(playerTurn == player1){
                    playerTurn = player2;
                }else{
                    playerTurn = player1;
                }
            }

        }while(!gameOver);

        if(isGameTied()){
            console.log("Tie game!");
        }else if(isGameWon()){
            console.log(`${playerTurn.name} wins!`);
        }

        // let playAgainChar = prompt("Would you like to play again? (y/n)")
        if(playAgainChar == "y"){
            playAgain = true;
        }else{
            playAgain = false;
        }


    }while (playAgain);




    // Check for winner
    function isGameWon(){
        let gameWon = false;

        // Check each row of three
        for(i=0; i<=6; i+=3)
        {
            if(gameBoard.gameBoardArr[i] != "" && gameBoard.gameBoardArr[i] == gameBoard.gameBoardArr[i+1] && gameBoard.gameBoardArr[i+1] == gameBoard.gameBoardArr[i+2])
            {
                gameWon = true;
            }
        }
    
        // Check each column of six
        for(i=0; i<3; i++)
        {
            if(gameBoard.gameBoardArr[i] != "" && gameBoard.gameBoardArr[i] == gameBoard.gameBoardArr[i+3] && gameBoard.gameBoardArr[i+3] == gameBoard.gameBoardArr[i+6])
            {
                gameWon = true;
            }
        }
        
        // Check the diagonals
        if((gameBoard.gameBoardArr[0] != "" && gameBoard.gameBoardArr[0] == gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr[4] == gameBoard.gameBoardArr[8]) || (gameBoard.gameBoardArr[2] != "" && gameBoard.gameBoardArr[2] == gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr[4] == gameBoard.gameBoardArr[6]))
        {
            gameWon = true;
        }
    
        return gameWon;
    }

    // Check for a tie
    function isGameTied(){
        let filled = true;
        for(i=0; i<gameBoard.gameBoardArr.length; i++){
            if(gameBoard.gameBoardArr[i] == ''){
                filled = false;
            }
        }

        if(filled){
            console.log("It's a tie!");
            return true;
        }else{
            return false;
        }

    }

})();

