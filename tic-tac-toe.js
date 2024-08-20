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
        let gameOver = false;
        let playerTurn = player1;

        // Get player names
        let player1Name = prompt("Player 1 will use X. Enter the name of Player 1:");
        let player2Name = prompt("Player 2 will use O. Enter the name of Player 2:");

        let player1 = playerFactory(player1Name, 'X');
        let player2 = playerFactory(player2Name, 'O');

        do{
            let playerMove = parseInt(prompt((`${playerTurn.name}, which square do you want to select? (1-9)`)));
            gameBoard.gameBoardArr[playerMove-1] = playerTurn.symbol;

        }while(!gameOver);

    }while (!playAgain);


    function gameOver(){
        
    }

})();