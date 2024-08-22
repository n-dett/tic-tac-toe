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


    // Outer game loop
    do{
        let playerTurn = player1;

        // Get player names
        let player1Name = prompt("Player 1 will use X. Enter the name of Player 1:");
        let player2Name = prompt("Player 2 will use O. Enter the name of Player 2:");

        let player1 = playerFactory(player1Name, 'X');
        let player2 = playerFactory(player2Name, 'O');

        do{
            // Get player's move
            let playerMove = parseInt(prompt((`${playerTurn.name}, which square do you want to select? (1-9)`)));
            gameBoard.gameBoardArr[playerMove-1] = playerTurn.symbol;

            // Switch players for next turn
            if(!isGameTied() && !isGameWon){
                if(playerTurn == player1){
                    playerTurn = player2;
                }else{
                    playerTurn = player1;
                }
            }

        }while(!isGameTied() && !isGameWon());

        if(isGameTied()){
            console.log("Tie game!");
        }else if(isGameWon()){
            console.log(`${playerTurn} wins!`);
        }

    }while (!playAgain);


    // Check for winner
    function isGameWon(){
        let gameWon = false;

        // Check each row of three
        for(i=0; i<=6; i+=3)
        {
            if(gameBoard.gameBoardArr[i] != "" && gameBoard.gameBoardArr[i] == theArray[i+1] && theArray[i+1] == theArray[i+2])
            {
                gameWon = true;
            }
        }
    
        // Check each column of six
        for(i=0; i<3; i++)
        {
            if(gameBoard.gameBoardArr[i] != "" && gameBoard.gameBoardArr[i] == theArray[i+3] && theArray[i+3] == theArray[i+6])
            {
                gameWon = true;
            }
        }
        
        // Check the diagonals
        if((theArray[0] != "" && theArray[0] == theArray[4] && theArray[4] == theArray[8]) || (theArray[2] != "" && theArray[2] == theArray[4] && theArray[4] == theArray[6]))
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

// [][][]
// [][][]
// [][][]
// 123
// 456
// 789
// 159
// 357
// 147
// 258
// 369