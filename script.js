const players = ['',''];

const gameBoard = (function() {
    const board = ['#','#','#','#','#','#','#','#','#'];
    let turn = 1;
    const setBoard = function() {
        for(let i=0;i<9;i++) {
            board[i] = '#';
        }
        console.log(board);
    }
    return {turn, board, setBoard}
})();

const gameLogic = function() {
    const enterSymbol = function(cell) {
        if(gameBoard.board[cell]=='#') {
            if(gameBoard.turn%2==1) {
                gameBoard.board[cell] = 'X';
                checkBoard('X');
                gameBoard.turn++;
            }
            else {
                gameBoard.board[cell] = 'O';
                checkBoard('O');
                gameBoard.turn++;
            }
        }
        console.log(gameBoard.board);
    }
    const checkBoard = function(sign) {
        let result = false;
        let line = 0;
        if(gameBoard.board[0]==sign) {
            if((gameBoard.board[0]==gameBoard.board[4])&&(gameBoard.board[0]==gameBoard.board[8])) {
                result = true;
                line = 7;
            }
            else if((gameBoard.board[0]==gameBoard.board[1])&&(gameBoard.board[0]==gameBoard.board[2])) {
                result = true;
                line = 4;
            }
            else if((gameBoard.board[0]==gameBoard.board[3])&&(gameBoard.board[0]==gameBoard.board[6])) {
                result = true;
                line = 1;
            }
        }
        else if(gameBoard.board[4]==sign) {
            if((gameBoard.board[4]==gameBoard.board[1])&&(gameBoard.board[4]==gameBoard.board[7])) {
                result = true;
                line = 2;
            }
            else if((gameBoard.board[4]==gameBoard.board[2])&&(gameBoard.board[4]==gameBoard.board[6])) {
                result = true;
                line = 8;
            }
            else if((gameBoard.board[4]==gameBoard.board[3])&&(gameBoard.board[4]==gameBoard.board[5])) {
                result = true;
                line = 5;
            }
        }
        else if(gameBoard.board[8]==sign) {
            if((gameBoard.board[8]==gameBoard.board[5])&&(gameBoard.board[8]==gameBoard.board[2])) {
                result = true;
                line = 3;
            }
            else if((gameBoard.board[8]==gameBoard.board[7])&&(gameBoard.board[8]==gameBoard.board[6])) {
                result = true;
                line = 6;
            }
        }
        if(result) {
            gameEnd(sign, line);
        }
        else if(gameBoard.turn==9) {
            gameEnd('D');
        }
    }
    const restartGame = function() {
        gameBoard.setBoard();
        gameBoard.turn = 1;
    }
    return {enterSymbol, restartGame}
}

const gameRestart = function() {
    //switchname
    const {restartGame} = gameLogic();
    let temp = players[1];
    players[1] = players[0];
    players[0] = temp;
    //clear grid
    let cells = document.querySelectorAll('.cells');
    for(let i=0;i<9;i++) {
        cells[i].textContent = '';
        if(i) {
            document.querySelector(`#line${i}`).style.visibility = 'hidden';    
        }
    }
    //call restart
    restartGame();
    //call gamestart
    gameStart();
}

const getNames = (function() {
    players[0] = prompt("Enter first player's name:");
    players[1] = prompt("Enter second player's name:");
    //add event listener for play again button
    document.querySelector('#replay').addEventListener('click', gameRestart, false);
})();

const gameStart = function() {
    document.querySelector('.board').addEventListener('click', gameTurnX, false);
    document.querySelector('.container h1').textContent = `${players[0]}'s turn.`;    
}

const gameTurnX = function(Event) {
    //get the cell number
    let cell = Event.target;
    let cellNumber = cell.dataset.cellnumber;
    const {enterSymbol} = gameLogic();
    cellNumber -= 1;
    if((cell.textContent!='X')&&(cell.textContent!='O')) {
        document.querySelector('.board').removeEventListener('click', gameTurnX);
        //change the cell in grid to X
        cell.textContent = 'X';
        //add gameturnO listener
        document.querySelector('.board').addEventListener('click', gameTurnO, false);
        //call insertsymbol(cell number)
        document.querySelector('.container h1').textContent = `${players[1]}'s turn.`;
        enterSymbol(cellNumber);
    }
}

const gameTurnO = function(clicked) {
    //get the cell number
    let cell = clicked.target;
    let cellNumber = cell.dataset.cellnumber;
    const {enterSymbol} = gameLogic();
    cellNumber -=1;
    if((cell.textContent!='X')&&(cell.textContent!='O')) {
        document.querySelector('.board').removeEventListener('click', gameTurnO);
        //change the cell in grid to O
        cell.textContent = 'O';
        //add gameturnX listener
        document.querySelector('.board').addEventListener('click', gameTurnX, false);
        //call insetsymbol(cell number)
        document.querySelector('.container h1').textContent = `${players[0]}'s turn.`;
        enterSymbol(cellNumber);
    }
}
gameStart();

const gameEnd = function(sign, line) {
    //remove the listener  
    document.querySelector('.board').removeEventListener('click', gameTurnX);
    document.querySelector('.board').removeEventListener('click', gameTurnO);
    //display the result
    switch(sign) {
        case 'X':
            document.querySelector('.container h1').textContent = `${players[0]} won!!!.`;
            document.querySelector(`#line${line}`).style.visibility = 'visible';
            break;
        case 'O': 
            document.querySelector('.container h1').textContent = `${players[1]} won!!!.`;
            document.querySelector(`#line${line}`).style.visibility = 'visible';
            break;
        case 'D': 
            document.querySelector('.container h1').textContent = `It's a draw!`;
            break;
    }
}