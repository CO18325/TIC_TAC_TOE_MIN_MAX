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

    // FUNCTION TO MARK THE CLICKED BLOCK
    // WITH THE HUMAN PLAYER CHARACTER IE O
    turn(square.target.id, 'O');
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
    let gameWon = checkWin(origBoard, player)

    // IF THE GAME IS WON BY THIS PLAYER
    if(gameWon)
        gameOver(gameWon)
}

// DETERMINE THE WINNER

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
            gameWon.player = humanPlayer ? "blue" : "red"
    }

    for (var i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false)
    }
}

// BASIC AI

// MINMAX ALGORITHM PLAYER