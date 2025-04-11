// create an object called gameboard which has the 2d array and functions to change the state and to output the current state.
// create an object called game that starts with setting all cells of board to # as blank. It also contains the win check

//create 2 player objects who can enter their input and store their names.

const createBoard = function() {
    const gameBoard = ['#','#','#','#','#','#','#','#','#'];
    const insertSymbol = function(symbol, position) {
        if(gameBoard[position-1]=='#'){
            gameBoard[position-1] = symbol;
        }
        else {
            console.log("That cell is already filled. Please choose another cell.");
        }
    }
    const showBoard = function() {
        return gameBoard;
    }
    const checkBoard = function(sign) {
        let result = false;
        if(gameBoard[0]==sign) {
            if((gameBoard[0]==gameBoard[4])&&(gameBoard[0]==gameBoard[8])) {
                result = true;
            }
            else if((gameBoard[0]==gameBoard[1])&&(gameBoard[0]==gameBoard[2])) {
                result = true;
            }
            else if((gameBoard[0]==gameBoard[3])&&(gameBoard[0]==gameBoard[6])) {
                result = true;
            }
        }
        if(gameBoard[4]==sign) {
            if((gameBoard[4]==gameBoard[1])&&(gameBoard[4]==gameBoard[7])) {
                result = true;
            }
            else if((gameBoard[4]==gameBoard[2])&&(gameBoard[4]==gameBoard[6])) {
                result = true;
            }
            else if((gameBoard[4]==gameBoard[3])&&(gameBoard[4]==gameBoard[5])) {
                result = true;
            }
        }
        if(gameBoard[8]==sign) {
            if((gameBoard[8]==gameBoard[5])&&(gameBoard[8]==gameBoard[2])) {
                result = true;
            }
            else if((gameBoard[8]==gameBoard[7])&&(gameBoard[8]==gameBoard[6])) {
                result = true;
            }
        }
        return result;
    }
    return {insertSymbol, showBoard, checkBoard}
}

function createPlayer() {
    let playerName;
    const enterName = function(name) {
        playerName = String(name);
    }
    const displayName = function() {
        return playerName;
    }
    return {enterName, displayName}
}

function startGame() {
    const {insertSymbol, showBoard, checkBoard} = createBoard();
    const player1 = createPlayer();
    const player2 = createPlayer();
    let choice, check = false;
    console.log("Enter the players' names:");
    for(let i=0;i<4;i++) {
        if(i%2==0) {
            choice = prompt('Player 1 enter the position');
            choice = choice * 1;
            insertSymbol('X', choice);
        }
        else {
            choice = prompt('Player 2 enter the position');
            choice = choice * 1;
            insertSymbol('O', choice);
        }
        console.log(showBoard());
    }
    for(let i=0;i<5;i++) {
        if(i%2==0) {
            choice = prompt('Player 1 enter the position');
            choice = choice * 1;
            insertSymbol('X', choice);
            check = checkBoard('X');
            if(check) {
                i=5;
                console.log('Player 1 won the match');
            }
        }
        else {
            choice = prompt('Player 2 enter the position');
            choice = choice * 1;
            insertSymbol('O', choice);
            check = checkBoard('O');
            if(check) {
                i=5;
                console.log('Player 2 won the match');
            }
        }
        
        console.log(showBoard());
    }
    if(!check) {
        console.log('It is a draw');
    }
    //console.log()
}
const game = startGame();
//const player1 = createPlayer();
//const player2 = createPlayer();
//const state = createBoard();
//state.insertSymbol('X', 2);
//state.insertSymbol('O', 3);
//state.insertSymbol('X',2);
//console.log(state.showBoard());