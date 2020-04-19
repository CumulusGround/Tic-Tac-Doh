// console.log('Hawdafi');



////////////////////////////////////////////////////////
//////////////////// DOM ELEMENTS //////////////////////
////////////////////////////////////////////////////////


var overlayStart = document.getElementById("overlay-start")

var pOneResultDisplay = document.querySelector('.player-one-results');
var pTwoResultDisplay = document.querySelector('.player-two-results');
var drawResultDisplay = document.querySelector('.draw-results');
var p2Type = document.querySelector('.p2-type');

var boardGameBoxes = document.querySelectorAll('.box');
var col1 = document.querySelectorAll('.col1');
var col2 = document.querySelectorAll('.col2');
var col3 = document.querySelectorAll('.col3');
var row1 = document.querySelectorAll('.row1');
var row2 = document.querySelectorAll('.row2');
var row3 = document.querySelectorAll('.row3');
var x1 = document.querySelectorAll('.x1');
var y1 = document.querySelectorAll('.y1');
var allRows = [row1,row2,row3];
var allCols = [col1,col2,col3];
var allDiagonals = [x1,y1];




var resetBtn = document.querySelector('.reset-btn');
var easyAIBtn = document.querySelector('.easy-AI-btn');
var hardAIBtn = document.querySelector('.hard-AI-btn');
var charactersBtn = document.querySelector('.characters-btn');
// var winningBtn = document.querySelector('.winning-btn');

var winningOverlay = document.getElementById("winning-overlay")
var winningText = document.querySelector('.winning-text');
var homerWin = document.querySelector('.homer-win');
var bartWin = document.querySelector('.bart-win');

// TO DO!!!!
var playerTextTurn = document.querySelectorAll('.player-turn-text');


////////////////////////////////////////////////////////
//////////////////////// DATA //////////////////////////
////////////////////////////////////////////////////////
var audioContext = new AudioContext();

var pOneArray = [];
var pTwoArray = [];
var pOneResult = 0;
var pTwoResult = 0;
var drawResult = 0;
var nGameCounter = 0;
// round timer

pOneResultDisplay.textContent = pOneResult
pTwoResultDisplay.textContent = pTwoResult
drawResultDisplay.textContent = drawResult

var pOneTimerOn = null;
var pTwoTimerOn = null;

////////////////////////////////////////////////////////
////////////////////// FUNCTIONS ///////////////////////
////////////////////////////////////////////////////////

////////////// VISUALS //////////////////////

function on() {
    overlayStart.style.display = "block";
}


function off() {
    overlayStart.style.display = "none";
    eyeMovement()
}


var winningAnimation = function () {
    winningOverlay.style.display = "block";
}


var winningAnimationOFF = function () {
    winningOverlay.style.display = "none";
    winningText.textContent = "Doh! It's a draw."
    homerWin.style.display = "none"
    bartWin.style.display = "none"
}


var eyeMovement = function() {

    setTimeout(function(){
        document.querySelectorAll('.pupil').forEach(function(pupil){
            pupil.classList.toggle('stare');
        });
    },7000)
}

/////////////// FUNCTIONNALS ////////////////

/////// AI /////
var EasyAiTurn = function() {
    var boxPicked = Math.floor(Math.random() * 9);

    while (boardGameBoxes[boxPicked].classList.contains('checked')) {
        boxPicked = Math.floor(Math.random() * 9);
    } 

    setTimeout(function(){

        boardGameBoxes[boxPicked].classList.add('player-two', 'checked', 'animated', 'bounceIn');
        clearInterval(pOneTimerOn)
        pOneTimerOn = null;
        pTwoTimerOn = setInterval(function(){console.log('t2ck')}, 1000)

        if(hasPlayerWon('player-two')) {
            winningText.textContent = 'Ralph wins this round!';
            homerWin.style.display = "block"
            WinningSequence('player-two')    

        } else if (isADraw()) {
            WinningSequence('draw')
        } ;

        playerTextTurn.forEach(function(div){
            div.classList.toggle('hide')
        })
    }, 2000)

            
    
}


//////// Standards //////

var clearBoard = function() {

    boardGameBoxes.forEach(function(box) {
        box.classList.remove('player-one','player-two', 'checked')
    });

    clearInterval(pOneTimerOn)
    clearInterval(pTwoTimerOn)
    eyeMovement()
}

var hasPlayerWon = function(player) {

    var hasWon = false;
    var winCounter = 0;

    var checkStreak = function(axis) {
        axis.forEach(line => {
        
            line.forEach(box => { 
                if (box.classList.contains(player)) {
                    winCounter += 1
                } })
            
            if (winCounter === 3) {
                hasWon = true
            } else {
                winCounter = 0
            }
        });    
    }
    checkStreak(allRows)
    checkStreak(allCols)
    checkStreak(allDiagonals)

    return hasWon
}

var isADraw = function() {

    var checkedBoxes = document.querySelectorAll('.checked');
    // console.log(checkedBoxes);

    if (boardGameBoxes.length === checkedBoxes.length) {
        return true
    } else {
        return false
    }
}

var WinningSequence = function(player) {
    setTimeout(function(){
        winningAnimation()
    }, 1000)

    setTimeout(function(){
        if (player === 'player-one') {
            pOneResult += 1
            pOneResultDisplay.textContent = pOneResult
        } else if (player == 'player-two' ) {
            pTwoResult += 1
            pTwoResultDisplay.textContent = pTwoResult
        } else if (player = 'draw') {
            drawResult += 1
            drawResultDisplay.textContent = drawResult
        }

        clearBoard()
        winningAnimationOFF()
    }, 2000)
}

var handleTurn = function (e) {
    
    if (pOneTimerOn) { 
        
        if (e.target.classList.contains('checked')) { 
            return
        } else {
            e.target.classList.add('player-two', 'checked', 'animated', 'bounceIn');
            clearInterval(pOneTimerOn)
            pOneTimerOn = null;
            pTwoTimerOn = setInterval(function(){console.log('t2ck')}, 1000)

            if(hasPlayerWon('player-two')) {
                winningText.textContent = 'Player Two wins this round!';
                homerWin.style.display = "block"
                WinningSequence('player-two')    

            } else if (isADraw()) {
                WinningSequence('draw')
            } ;

            playerTextTurn.forEach(function(div){
                div.classList.toggle('hide')
            })
            return
        }    
    }

    
    if (e.target.classList.contains('checked')) { 
        return
    } else {
        // player turn
        e.target.classList.add('player-one', 'checked', 'animated', 'rotateIn');
        clearInterval(pTwoTimerOn);
        pTwoTimerOn = null;
        pOneTimerOn = setInterval(function(){console.log('t1ck')}, 1000);

        // check for wins
        if(hasPlayerWon('player-one')) {
            winningText.textContent = 'Player One wins this round!'
            bartWin.style.display = "block"
            WinningSequence('player-one')

        } else if (isADraw()) {
            WinningSequence('draw')
        }

        playerTextTurn.forEach(function(div){
            div.classList.toggle('hide')
        })   
    }

    if (p2Type.textContent === "Ralph (AI)") {
        document.querySelector('.p2-text').textContent = "It's Ralph's turn";
        EasyAiTurn()
    }
}



////////////////////////////////////////////////////////
/////////////////// EVENT LISTENNER ////////////////////
////////////////////////////////////////////////////////

// overlayStart.addEventListener('click', function(){
//     overlayStart.classList.add('hinge');    
// }, off)

easyAIBtn.addEventListener('click', function (e) {
    p2Type.textContent = "Ralph (AI)"
});

boardGameBoxes.forEach(function(box) {
    box.addEventListener('click', handleTurn);
});


resetBtn.addEventListener('click', clearBoard);

// winningBtn.addEventListener('click', function () {
//     boardGameBoxes[0].classList.add('player-one');
//     boardGameBoxes[1].classList.add('player-one');
//     // boardGameBoxes[2].classList.add('player-one');
// });

