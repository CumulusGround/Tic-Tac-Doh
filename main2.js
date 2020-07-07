// PROBLEM WITH AI
// IF THERE S TWO POSSIBLE SOLUTION TO WIN, AI WILL FREEEZE => WHILE LOOP?

////////////////////////////////////////////////////////
//////////////////// DOM ELEMENTS //////////////////////
////////////////////////////////////////////////////////

//////////////// VISUAL /////////////////////
var overlayStart = document.getElementById("overlay-start")

var pOneResultDisplay = document.querySelector('.player-one-results');
var pTwoResultDisplay = document.querySelector('.player-two-results');
var drawResultDisplay = document.querySelector('.draw-results');
var p2Type = document.querySelector('.p2-type');

var winningOverlay = document.getElementById("winning-overlay")
var winningText = document.querySelector('.winning-text');
var winImage = document.querySelector('.image-win');
var playerTextTurn = document.querySelectorAll('.player-turn-text');
var p1TextTurn = document.querySelector('.p1-text');
var p2TextTurn = document.querySelector('.p2-text');


/////////// FUNCTIONNAL /////////////////////
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


/////////////// BUTTON //////////////////////
var resetBtn = document.querySelector('.reset-btn');
var easyAIBtn = document.querySelector('.easy-AI-btn');
var hardAIBtn = document.querySelector('.hard-AI-btn');
var humanBtn = document.querySelector('.human-btn');
// var charactersBtn = document.querySelector('.characters-btn');


////////////////////////////////////////////////////////
//////////////////////// DATA //////////////////////////
////////////////////////////////////////////////////////
// var audioContext = new AudioContext();

var pOneArray = [];
var pTwoArray = [];
var pOneResult = 0;
var pTwoResult = 0;
var drawResult = 0;
var nGameCounter = 0;

pOneResultDisplay.textContent = pOneResult
pTwoResultDisplay.textContent = pTwoResult
drawResultDisplay.textContent = drawResult

var pOneTimerOn = null;
var pTwoTimerOn = null;

////////////////////////////////////////////////////////
////////////////////// FUNCTIONS ///////////////////////
////////////////////////////////////////////////////////

////////////// VISUALS //////////////////////




var showWinningOverlay = function () {
    winningOverlay.style.display = "block";
}


var winningAnimationOFF = function () {
    winningOverlay.style.display = "none";
    // winImage.style.display = "none"
}


var eyeMovement = function() {

    setTimeout(function(){
        document.querySelectorAll('.pupil').forEach(function(pupil){
            pupil.classList.toggle('stare');
        });
    },7000)
}


/////////////// FUNCTIONNALS ////////////////
//////// Standards //////

var clearBoard = function() {

    boardGameBoxes.forEach(function(box) {
        box.classList.remove('player-one','player-two', 'checked', 'easy-ai', 'hard-ai')
    });

    clearInterval(pOneTimerOn)
    clearInterval(pTwoTimerOn)
    eyeMovement()
}

var clearScore = function() {
    pOneResult = 0
    pTwoResult = 0
    drawResult = 0
    pOneResultDisplay.textContent = pOneResult
    pTwoResultDisplay.textContent = pTwoResult
    drawResultDisplay.textContent = drawResult
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
    if (boardGameBoxes.length === checkedBoxes.length) {
        return true
    } else {
        return false
    }
}

var assignScores = function(player) {
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
    }, 0000)
}

var winningSequence = function(player) {
    // choose the right text
    // choose the right image
    switch (player) {
        case 'Player One':
            winningText.textContent = 'Player One wins this round!'
            winImage.src = "/CSS/images/homer-strangle.png"
            // bartWin.style.display = "block"
            // homerWin.style.display = "none"
            break;
            
        case 'Player Two':
            winningText.textContent = `Player Two wins this round!`;
            winImage.src = "/CSS/images/homer-hulk.png"
        break;
    
        case 'Ralph':
            winningText.textContent = 'Ralph wins this round!'
            winImage.src = "/CSS/images/Ralph.png"
            break;
    
        case 'Mr Burns':
            winningText.textContent = 'Mr Burns wins this round!'
            winImage.src = "/CSS/images/Mr_Burns.png"
            break;
    
        default:
            winningText.textContent = "Doh! It's a draw..."
            winImage.src = "/CSS/images/alien.png"
            break;
    }
    // Show it
    showWinningOverlay()

    // turn it off
    setTimeout(function(){
        winningAnimationOFF()
    }, 2000)
}


var playerTwoTurn = function(player2Kind) {
    console.log("It Cleared Timers");

    clearInterval(pOneTimerOn)
    pOneTimerOn = null;
    pTwoTimerOn = setInterval(function(){console.log('t2ck')}, 1000)
    p2TextTurn.classList.add('hide') 
    p1TextTurn.classList.remove('hide') 

    if(hasPlayerWon('player-two')) {
        assignScores('player-two')
        winningSequence(player2Kind)    

    } else if (isADraw()) {
        assignScores('draw')
        winningSequence('draw')
    } ;
}



/////// AI /////
var EasyAiTurn = function() {
    var allChecked = document.querySelectorAll('.checked');
    var boxPicked = Math.floor(Math.random() * 9);
    while (boardGameBoxes[boxPicked].classList.contains('checked') && allChecked.length < boardGameBoxes.length) {
        boxPicked = Math.floor(Math.random() * 9);
    } 

    setTimeout(function(){
        boardGameBoxes[boxPicked].classList.add('player-two', 'easy-ai', 'checked', 'animated', 'bounceIn');
        playerTwoTurn("Ralph");
    }, 2000)
}


var hardAiTurn = function() {
    var hasPlayed = false;

    var checkToBlockPerLine = function(line) {
        var blockCounter = 0;
        var fullLineCounter = 0;
        
        line.forEach(box => {
            if (box.classList.contains('checked')) {
                fullLineCounter ++
            }    
        })

        if (fullLineCounter === 2) {
            line.forEach(box => {
                if (box.classList.contains('player-one')) {
                    blockCounter ++;
                }    
            }) 
        } else {
            fullLineCounter = 0;
            return       
        }

        if (blockCounter === 2) {
            line.forEach(function(box){
                if (!(box.classList.contains('player-one'))) {

                    setTimeout(function(){
                        box.classList.add('player-two', 'hard-ai', 'checked', 'animated', 'bounceIn');
                        fullLineCounter = 0;
                        blockCounter = 0;
                        playerTwoTurn("Mr Burns")
                    }, 2000)
                    
                    return hasPlayed = true
                }
            })
        } else {
            fullLineCounter = 0;
            blockCounter = 0;
            return
        }
    }   
    ///////////////////////////
    var aiBlock = function(axis) { 
        axis.forEach(col => {
            if (hasPlayed) {
                // guard condition
            } else {
                checkToBlockPerLine(col)  
            }
        })
    }
    aiBlock(allCols)
    aiBlock(allRows)
    aiBlock(allDiagonals)

    // play this if nothing to block
    if (hasPlayed) {
        return
    } else {
        var allChecked = document.querySelectorAll('.checked');
        var boxPicked = Math.floor(Math.random() * 9);

        while (boardGameBoxes[boxPicked].classList.contains('checked') && allChecked.length < boardGameBoxes.length) {
            boxPicked = Math.floor(Math.random() * 9);
        }

        setTimeout(function(){
            boardGameBoxes[boxPicked].classList.add('player-two', 'hard-ai','checked', 'animated', 'bounceIn');
            playerTwoTurn("Mr Burns")
        }, 2000)
    }
}


var handleTurn = function (e) {
    var isOccupied = e.target.classList.contains('checked') ? true : false;
    
    if (pOneTimerOn) {  
        if (isOccupied) { 
            return
        } else {
            e.target.classList.add('player-two', 'checked', 'animated', 'bounceIn');
            playerTwoTurn("Player Two");
            return
        }    
    }

    if (isOccupied) { 
        return
    } else {
        // player turn
        e.target.classList.add('player-one', 'checked', 'animated', 'rotateIn');
        clearInterval(pTwoTimerOn);
        pTwoTimerOn = null;
        pOneTimerOn = setInterval(function(){console.log('t1ck')}, 1000);

        p1TextTurn.classList.add('hide') 
        p2TextTurn.classList.remove('hide') 

        // check for wins
        if(hasPlayerWon('player-one')) {
            assignScores('player-one')
            winningSequence('Player One')

        } else if (isADraw()) {
            assignScores('draw')
            winningSequence('draw')
        }

    }

    // Bots's turns
    if (p2Type.textContent === "Ralph (AI)") {
        document.querySelector('.p2-text').textContent = "It's Ralph's turn";
        EasyAiTurn()
    } else if (p2Type.textContent === "Mr Burns (AI)") {
        document.querySelector('.p2-text').textContent = "It's Mr Burns's turn";
        hardAiTurn()
    }
}


////////////////////////////////////////////////////////
/////////////////// EVENT LISTENNER ////////////////////
////////////////////////////////////////////////////////



humanBtn.addEventListener('click', function (e) {
    p2Type.textContent = "P2"
    document.querySelector('.p2-text').textContent = "It's player two's turn"
    clearBoard()
    clearScore()
    console.log("here");
});

easyAIBtn.addEventListener('click', function (e) {
    p2Type.textContent = "Ralph (AI)"
    clearBoard()
    clearScore()
});

hardAIBtn.addEventListener('click', function (e) {
    p2Type.textContent = "Mr Burns (AI)"
    clearBoard()
    clearScore()
});

boardGameBoxes.forEach(function(box) {
    box.addEventListener('click', handleTurn);
});

resetBtn.addEventListener('click', () => {
    clearBoard()
    clearScore()   
    console.log("here");
});

function on() {
    overlayStart.style.display = "block";
}


overlayStart.addEventListener('click', function(){
    overlayStart.classList.add('hinge');
    setTimeout(()=> {
        overlayStart.style.display = "none";
    }, 1000)
    eyeMovement()  
})


window.onload = function() {
    console.log("loaded");
    if (sessionStorage.length > 1) {
        console.log("there's already something in here");
    } else {
        console.log("Nothing yet, storage empty");

    }
}

// ticTacScores = {
//     p1: 0,
//     p2: 0,
//     draw: 0,
// }