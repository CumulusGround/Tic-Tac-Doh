// console.log('Hawdafi');



////////////////////////////////////////////////////////
//////////////////// DOM ELEMENTS //////////////////////
////////////////////////////////////////////////////////


var overlayStart = document.getElementById("overlay-start")

var pOneResultDisplay = document.querySelector('.player-one-results');
var pTwoResultDisplay = document.querySelector('.player-two-results');
var drawResultDisplay = document.querySelector('.draw-results');
var boardGameBoxes = document.querySelectorAll('.box');

var resetBtn = document.querySelector('.reset-btn');
var winningBtn = document.querySelector('.winning-btn');

var winningOverlay = document.getElementById("winning-overlay")
var winningText = document.querySelector('.winning-text');
var homerWin = document.querySelector('.homer-win');
var bartWin = document.querySelector('.bart-win');


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


var clearBoard = function() {

    boardGameBoxes.forEach(function(box) {
        box.classList.remove('player-one','player-two', 'checked')
    });

    clearInterval(pOneTimerOn)
    clearInterval(pTwoTimerOn)
    eyeMovement()
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


var handleTurn = function (e) {

    if (pOneTimerOn) { 
        if (e.target.classList.contains('checked')) { 
            return
        } else {
            e.target.classList.add('player-two', 'checked', 'animated', 'bounceIn');
            
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
        e.target.classList.add('player-one', 'checked', 'animated', 'rotateIn');
        clearInterval(pTwoTimerOn);
        pTwoTimerOn = null;
        pOneTimerOn = setInterval(function(){console.log('t1ck')}, 1000);

        // check for wins
        if(hasPlayerWon('player-one')) {

            winningText.textContent = 'Player One wins this round!'
            bartWin.style.display = "block"
            winningAnimation()
            setTimeout(function(){
                pOneResult += 1
                pOneResultDisplay.textContent = pOneResult
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
        }   
    }
}

////////////////////////////////////////////////////////
/////////////////// EVENT LISTENNER ////////////////////
////////////////////////////////////////////////////////

overlayStart.addEventListener('click', function(){
    overlayStart.classList.add('hinge');    
}, off)


boardGameBoxes.forEach(function(box) {
    box.addEventListener('click', handleTurn);
});


resetBtn.addEventListener('click', clearBoard);

// winningBtn.addEventListener('click', function () {
//     boardGameBoxes[0].classList.add('player-one');
//     boardGameBoxes[1].classList.add('player-one');
//     // boardGameBoxes[2].classList.add('player-one');
// });

