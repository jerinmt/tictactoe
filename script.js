// create an object called gameboard which has the 2d array and functions to change the state and to output the current state.
// create an object called game that starts with setting all cells of board to # as blank. It also contains the win check

//create 2 player objects who can enter their input and store their names.

const createBoard = function() {
    const gameBoard = ['#','#','#','#','#','#','#','#','#'];
    const insertSymbol = function(symbol, position) {
        if(gameBoard[position-1]=='#'){
            gameBoard[position-1] = symbol;
        }
    }
    const boardReset = function() {
        for(let i=0;i<9;i++) {
            gameBoard[i] = '#';
        }
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
    return {insertSymbol, checkBoard, boardReset}
}

function createPlayer() {
    const playerName='';
    let isTurn = false;
    return {playerName, isTurn}
}
//dom function to get names 
function getNames(player) {
    let name;
    if(player==1) {
        name = prompt("Enter first player's name:");
    }
    else {
        name = prompt("Enter second player's name:");    
    }
    return name;
}
//dom function to change the display
function displayPhase(player, state) {
    if(state==0) {
        document.querySelector(".container h1").textContent = `${player}'s turn`;
    }
    else if(state==1){
        document.querySelector(".container h1").textContent = `${player} won the match!!`;
    }
    else {
        document.querySelector(".container h1").textContent = `It is a draw`;
    }
}
//dom function to set-up the grid each turn to get player's choice
function getChoice(playerInTurn, turn) {
    let grid = document.querySelector(".board");
    grid.addEventListener('click', function input(Event) {
        let cell = Event.target;
        if(cell.dataset.turnnumber=='0') {
            if(playerInTurn==1) {
                Event.target.textContent = 'X';
                cell.dataset.turnnumber = turn;
            }
            else {
                Event.target.textContent = 'O';
                cell.dataset.turnnumber = turn;
            }
            grid.removeEventListener('click', input());
        }
    });
}
//dom function to get the choice selected by the player
function scanGrid() {
    let result;
    let cells = document.querySelectorAll('.cells');
    for(let i=0;i<9;i++) {
        if(cells[i].dataset.turnnumber==(i+1)) {
            result = cells[i].dataset.cellnumber * 1;
        }
    }
    return result;
}


function startGame() {
    const {insertSymbol, checkBoard} = createBoard();
    const player1 = createPlayer();
    const player2 = createPlayer();
    let choice, check = false;
    player1.playerName = getNames(1);
    player2.playerName = getNames(2);
    
    for(let i=0;i<4;i++) {
        if(i%2==0) {
            displayPhase(player1.playerName, 0);
            getChoice(1, i+1);
            //wait
            choice = scanGrid(i+1);
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
}
const game = startGame();


//const player1 = createPlayer();
//const player2 = createPlayer();
//const state = createBoard();
//state.insertSymbol('X', 2);
//state.insertSymbol('O', 3);
//state.insertSymbol('X',2);
//console.log(state.showBoard());