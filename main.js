// console.log('Hawdafi');
////////////////////////////////////////////////////////
//////////////////// DOM ELEMENTS //////////////////////
////////////////////////////////////////////////////////


var overlayStart = document.getElementById("overlay-start")

var resetBtn = document.querySelector('.reset-btn');
var winningBtn = document.querySelector('.winning-btn');
var winningText = document.querySelector('.winning-text');
var winningOverlay = document.getElementById("winning-overlay")
var homerWin = document.querySelector('.homer-win');
var bartWin = document.querySelector('.bart-win');

var pOneResultDisplay = document.querySelector('.player-one-results');
var pTwoResultDisplay = document.querySelector('.player-two-results');
var drawResultDisplay = document.querySelector('.draw-results');
var boardGameBoxes = document.querySelectorAll('.box');

// var col1 = [boardGameBoxes[0], boardGameBoxes[3], boardGameBoxes[6]]
// var col2 = [boardGameBoxes[1], boardGameBoxes[4], boardGameBoxes[7]]
// var col3 = [boardGameBoxes[2], boardGameBoxes[5], boardGameBoxes[8]]

////////////////////////////////////////////////////////
//////////////////////// DATA //////////////////////////
////////////////////////////////////////////////////////
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

// var P1Emblem
// var P2Emblem

////////////////////////////////////////////////////////
////////////////////// FUNCTIONS ///////////////////////
////////////////////////////////////////////////////////
var winningAnimation = function () {
    winningOverlay.style.display = "block";
}

var winningAnimationOFF = function () {
    winningOverlay.style.display = "none";
    winningText.textContent = "Doh! It's a draw."
    homerWin.style.display = "none"
    bartWin.style.display = "none"
}


var clearBoard = function() {

    boardGameBoxes.forEach(function(box) {
        box.classList.remove('player-one','player-two', 'checked')
    });
    clearInterval(pOneTimerOn)
    clearInterval(pTwoTimerOn)
}



var hasPlayerWon = function(player) {
    var winning = false;

    // check for rows
    if (boardGameBoxes[0].classList.contains(player) && boardGameBoxes[1].classList.contains(player) && boardGameBoxes[2].classList.contains(player)) {
        winning = true;

    } else if (boardGameBoxes[3].classList.contains(player) && boardGameBoxes[4].classList.contains(player) && boardGameBoxes[5].classList.contains(player)) {
        winning = true;

    } else if (boardGameBoxes[6].classList.contains(player) && boardGameBoxes[7].classList.contains(player) && boardGameBoxes[8].classList.contains(player)) {
        winning = true;
    }

    // checks for columns
    if (boardGameBoxes[0].classList.contains(player) && boardGameBoxes[3].classList.contains(player) && boardGameBoxes[6].classList.contains(player)) {
        winning = true;

    } else if (boardGameBoxes[1].classList.contains(player) && boardGameBoxes[4].classList.contains(player) && boardGameBoxes[7].classList.contains(player)) {
        winning = true;

    } else if (boardGameBoxes[2].classList.contains(player) && boardGameBoxes[5].classList.contains(player) && boardGameBoxes[8].classList.contains(player)) {
        winning = true;
    }

    // checks for diagonals
    if (boardGameBoxes[0].classList.contains(player) && boardGameBoxes[4].classList.contains(player) && boardGameBoxes[8].classList.contains(player)) {
        winning = true;

    } else if (boardGameBoxes[2].classList.contains(player) && boardGameBoxes[4].classList.contains(player) && boardGameBoxes[6].classList.contains(player)) {
        winning = true;
    }
    return winning
}



var isADraw = function() {

    var allChecked = document.querySelectorAll('.checked');

    if (boardGameBoxes.length === allChecked.length) {
        return true
    } else {
        return false
    }
}



var pOneTimerOn = null;
var pTwoTimerOn = null;

var handleTurn = function (e) {

    if (pOneTimerOn) { 
        if (e.target.classList.contains('checked')) { 
            return
        } else {
            e.target.classList.add('player-two', 'checked');
            pTwoTimerOn = setInterval(function(){console.log('t2ck')}, 1000)
            clearInterval(pOneTimerOn)
            pOneTimerOn = null;


            // check for wins
            if(hasPlayerWon('player-two')) {
                
                winningText.textContent = 'Player Two wins this round!';
                homerWin.style.display = "block"
                winningAnimation()


                setTimeout(function(){
                    pTwoResult += 1
                    pTwoResultDisplay.textContent = pTwoResult
                    clearBoard()
                    winningAnimationOFF()
                }, 2000)
                
            } else if (isADraw()) {
                winningAnimation()

                setTimeout(function(){
                    drawResult += 1
                    drawResultDisplay.textContent = drawResult
                    clearBoard()
                    winningAnimationOFF()
                }, 2000)
            } ;
            return
        }    
    }

    
    if (e.target.classList.contains('checked')) { 
        return
    } else {
        // player turn
        e.target.classList.add('player-one', 'checked');
        clearInterval(pTwoTimerOn);
        pTwoTimerOn = null;
        pOneTimerOn = setInterval(function(){console.log('t1ck')}, 1000);

        // check for wins
        if(hasPlayerWon('player-one')) {
            winningText.textContent = 'Player One wins this round!'
            bartWin.style.display = "block"
            winningAnimation()
            // console.log('Player One wins this round!');

            setTimeout(function(){
                pOneResult += 1
                pOneResultDisplay.textContent = pOneResult
                clearBoard()
                winningAnimationOFF()
            }, 2000)

        } else if (isADraw()) {
            console.log("This migh be a draw");
            winningAnimation()

            setTimeout(function(){
                drawResult += 1
                drawResultDisplay.textContent = drawResult
                clearBoard()
                winningAnimationOFF()
            }, 2000)
        }   
    }
}

////////////////////////////////////////////////////////
///////////////// THE STYLE FUNCTIONS //////////////////
////////////////////////////////////////////////////////
function on() {
    overlayStart.style.display = "block";
  }
  
function off() {
    overlayStart.style.display = "none";
}

////////////////////////////////////////////////////////
/////////////////// EVENT LISTENNER ////////////////////
////////////////////////////////////////////////////////

boardGameBoxes.forEach(function(box) {
    box.addEventListener('click', handleTurn);
});

resetBtn.addEventListener('click', clearBoard);

winningBtn.addEventListener('click', function () {
    boardGameBoxes[0].classList.add('player-one');
    boardGameBoxes[1].classList.add('player-one');
    // boardGameBoxes[2].classList.add('player-one');
});

overlayStart.addEventListener('click', function(){
    overlayStart.classList.add('hinge');    
}, off)
