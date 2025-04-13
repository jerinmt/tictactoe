const gameBoard = {
    board : ['#','#','#','#','#','#','#','#','#'],
    turn : 1,
    setBoard : function() {
        for(let i=0;i<9;i++) {
            board[i] = '#';
        }
    },
};

const players = function() {
    const players = ['',''];
    const enterNames = function(name1, name2) {
        players[0] = String(name1);
        players[1] = String(name2);
    }
    const showName = function(choice) {
        if(choice==1) {
            return players[0];    
        }    
        else {
            return players[1];
        }
    }
    const switchNames = function() {
        let temp = players[1];
        players[1] = players[0];
        players[0] = temp;
    }
    return {enterNames, showName, switchNames}
}

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
        if(gameBoard.board[0]==sign) {
            if((gameBoard.board[0]==gameBoard.board[4])&&(gameBoard.board[0]==gameBoard.board[8])) {
                result = true;
            }
            else if((gameBoard.board[0]==gameBoard.board[1])&&(gameBoard.board[0]==gameBoard.board[2])) {
                result = true;
            }
            else if((gameBoard.board[0]==gameBoard.board[3])&&(gameBoard.board[0]==gameBoard.board[6])) {
                result = true;
            }
        }
        else if(gameBoard.board[4]==sign) {
            if((gameBoard.board[4]==gameBoard.board[1])&&(gameBoard.board[4]==gameBoard.board[7])) {
                result = true;
            }
            else if((gameBoard.board[4]==gameBoard.board[2])&&(gameBoard.board[4]==gameBoard.board[6])) {
                result = true;
            }
            else if((gameBoard.board[4]==gameBoard.board[3])&&(gameBoard.board[4]==gameBoard.board[5])) {
                result = true;
            }
        }
        else if(gameBoard.board[8]==sign) {
            if((gameBoard.board[8]==gameBoard.board[5])&&(gameBoard.board[8]==gameBoard.board[2])) {
                result = true;
            }
            else if((gameBoard.board[8]==gameBoard.board[7])&&(gameBoard.board[8]==gameBoard.board[6])) {
                result = true;
            }
        }
        if(result) {
            gameEnd(sign);
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

const getNames = (function() {
    let name1, name2;
    const {enterNames} = players();
    name1 = prompt("Enter first player's name:");
    name2 = prompt("Enter second player's name:");
    enterNames(name1, name2);
    //add event listener for play again button
    //document.querySelector('#replay').addEventListener('click', gameRestart);
})();

const options = {
    once: true,
    useCapture: false,
};

const gameStart = function() {
    const {showName} = players();
    let player = showName(1);
    document.querySelector('.board').addEventListener('click', gameTurnX, options);
    document.querySelector('.container h1').textContent = `${player}'s turn.`;    
}

const gameTurnX = function(Event) {
    //get the cell number
    let cell = Event.target;
    let cellNumber = cell.dataset.cellnumber;
    const {showName} = players();
    let player = showName(2);
    const {enterSymbol} = gameLogic();
    cellNumber -= 1;
    console.log(cellNumber);
    if((cell.textContent!='X')&&(cell.textContent!='O')) {
        //change the cell in grid to X
        cell.textContent = 'X';
        //add gameturnO listener
        document.querySelector('.board').addEventListener('click', gameTurnO, options);
        //call insertsymbol(cell number)
        enterSymbol(cellNumber);
        document.querySelector('.container h1').textContent = `${player}'s turn.`;
    }
}

const gameTurnO = function(clicked) {
    //get the cell number
    let cell = clicked.target;
    let cellNumber = cell.dataset.cellnumber;
    const {showName} = players();
    let player = showName(1);
    const {enterSymbol} = gameLogic();
    cellNumber -=1;
    console.log(cellNumber);
    if((cell.textContent!='X')&&(cell.textContent!='O')) {
        //change the cell in grid to O
        cell.textContent = 'O';
        //add gameturnX listener
        document.querySelector('.board').addEventListener('click', gameTurnX, options);
        //call insetsymbol(cell number)
        enterSymbol(cellNumber);
        document.querySelector('.container h1').textContent = `${player}'s turn.`;
    }
}
gameStart();

const gameEnd = function(sign) {
    //remove the listener  
    //const {showName} = players();
    switch(sign) {
        case 'X': alert("player 1 wins");
        break;
        case 'O': alert("player 2 wins");
        break;
        case 'X': alert("Draw");
        break;
    }
    
    //display the result

    //show the line

}
/*
const gameRestart = function() {
//call switchname
//call restart
//call gamestart
}
*/