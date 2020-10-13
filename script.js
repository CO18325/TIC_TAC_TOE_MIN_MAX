// BASIC SETUP

// IT IS AN ARRAY THAT KEEPS TRACK
// OF THE ELEMENTS IN THE BLOCKS
var origBoard;

// SETTING HUMAN PLAYER TO USE THE O CHARACTER
const humanPlayer = 'O';
// SETTING AI PLAYER TO HAVE THE X CHARACTER
const aiPlayer = '1';

// THIS WILL CONSIST OF AN ARRAY
// OF ALL THE WINNING COMBINATIONS OF THE GAME
const winCombinations = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

// IT WILL SELECT ALL THE CELLS OF THE GAME
// WE HAVE GIVEN ALL OF THEM THE CLASS cell
const cells = document.querySelectorAll('.cell');

// NOW WE CALL THE FUNCTION TO START THE GAME
startGame();

function startGame(){

    document.querySelector(".endgame").style.display = "none"; 
    
    // A WAY TO FORM A ARRAY FROM 0-8
    origBoard = Array.from(Array(9).keys());

    // WHEN WE RESTART THE GAME
    // WE NEED TO REMOVE ALL THE X AND O ELEMENTS
    for(var i =0; i<cells.length; i++){
        
        // REMOVING FROM EACH CELL
        // AND SETTING ITS TEXT AS NOTHING
        cells[i].innertText = "";
        
        // THE WINNING COMBINATION WILL HAVE HIGHLIGHTED BACKGROUND
        // THUS WE NEED TO SET THE BACKGROUND COLOR ALSO TO NONE
        cells[i].style.removeProperty('background-color');

        // WE WILL NOW ADD AN EVENT LISTENER TO OUR CELLS
        // THUS EVERYTIME A CELL IS CLICKED, turnClick FUNCTION IS EVOKED
        cells[i].addEventListener('click', turnClick, false);

    }
}

// A FUNCTION WHICH WILL BE EVOKED
// WHEN A CELL OF THE GAME IS CLICKED
function turnClick(square) {

    // IN THE BOARD WHENEVER A MOVE IS MADE
    // THE NUMBER IS REPLACED BY THE CHARACTER OF THE PLAYER
    // SO IF THE BOARD HAS THE CELL VALUE STILL AS NUMBER
    // THAT MEANS IT IS NEITHER USED BY AI OR THE HUMAN PLAYER
    // SO IT CAN BE STILL FILLED
    if (typeof origBoard[square.target.id] == 'number'){
    
        // FUNCTION TO MARK THE CLICKED BLOCK
        // WITH THE HUMAN PLAYER CHARACTER IE O
        turn(square.target.id, 'O');

        // TO CHECK FOR A TIE
        if(!checkTie()){ 
            // NO TIE
            // SO NOW THE AI PLAYER TAKES HIS TURN
            // USING THE SIMPLE METHOD
            turn(bestSpot(), aiPlayer);
        }
    }
}

// FUNCTION TO MARK THE CLICKED SQUARE
function turn(squareId, player){
    console.log(squareId);
    // SET THE BOARD ARRAY TO STORE
    // THAT THE SPECIFIC SQUARE NO/ ID
    //  IS NOW CLICKED BY THIS PLAYER
    origBoard[squareId] = player;

    // UPDATE THE CLICKED SQUARE 
    // WITH THE CHARACTER OF THE CORRESSPONDING PLAYER 
    document.getElementById(squareId).innerText = player;

    // AFTER EVERY CLICK OR THE MOVE 
    // WE NEE TO CHECK IF THE PLAYER HAS WON
    let gameWon = checkWin(origBoard, player);

    // IF THE GAME IS WON BY THIS PLAYER
    if(gameWon){
        gameOver(gameWon);
    }    
}

//################### DETERMINE THE RESULT ###################//

function checkWin(board, player) {
    let plays = board.reduce((a,e,i) =>
        (e === player) ? a.concat(i) : a, []);

    let gameWon = null;

    for (let [index, win] of winCombinations.entries()){
        if (win.every(elem => plays.indexOf(elem) > -1)){
            gameWon = {index : index, player : player};
            break;
        };
    }
    return gameWon; 
}   


function gameOver(gameWon){
    for (let index of winCombinations[gameWon.index]){
        document.getElementById(index).style.backgroundColor = 
            gameWon.player == humanPlayer ? "blue" : "red";
    }

    for (var i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);
    }

    declareWinner(gameWon.player == humanPlayer ? "YOU WON🤑🤑" : "YOU LOSE😥😥");
}

// FUNCTION TO DECLARE THE WINNER
function declareWinner(who){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}


// FUNCTION TO CHECK FOR TIE
function checkTie(){
    // IF EACH CELL IS FILLED 
    // AND NO WINNER IS YET FOUND
    // THUS THE GAME IS TIES
    if(emptySquares().length == 0){

        // REMOVE THE EVENT LISTENER OF CLICK FROM EACH CELL
        // CHANGE THE BACKGROUND COLOR OF ALL THE CELLS TO GREEN
        // TO DEPICT THAT THE GAME IS TIED
        for(var i = 0; i<cells.length; i++){

            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }

        // DECLARE THE RESULT
        declareWinner("GAME TIE😅😅");
    }
}
//##################### AI PLAYER MOVE #########################//

// FUCNTION TO RETURN THE CELL CHOOSEN BY AI PLAYER
function bestSpot(){ 

    // FOR THE MIN MAX ALGORITHM
    return minimax(origBoard, aiPlayer).index;
    
    // FOR THE SIMPLE ALGORITHM
    // return emptySquares()[0];
}


//################### SIMPLE METHOD SOLUTION ###################//

// THIS METHOD INPUTS THE COMPUTER CHARACTER 
// INTO THE FIRST FREE CELL

// FUNCTION TO RETURN THE EMPTY CELL LIST
function emptySquares(){
    return origBoard.filter(s => typeof s == 'number');
}


//################### MINMAX ALGORITHM PLAYER ###################//

function minimax(newBoard, player){
    
    // GET ALL THE EMPTY CELLS
    var availSpots = emptySquares(newBoard);

    // CHECK FOR THE WIN STATES
    if (checkWin(newBoard, player)){
     
        // IF 0 WINS RETURN -10
        // IF  X WINS RETURN +20
        if(checkWin(newBoard, humanPlayer)){
            return {score : -10};
        }else if(checkWin(newBoard, aiPlayer)){
            return {score : 20};
        }else if(availSpots.length == 0){
            return {score : 0};
        }

        var moves = [];

        for(var i =0; i < availSpots.length; i++){
            var move = {};
            move.index = newBoard[availSpots[i]];
            
        }

    }

}

