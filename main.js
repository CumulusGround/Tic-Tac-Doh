console.log('Hi');
////////////////////////////////////////////////////////
//////////////////// DOM ELEMENTS //////////////////////
////////////////////////////////////////////////////////

var pOneResultDisplay = document.querySelector('.player-one-results');
var pTwoResultDisplay = document.querySelector('.player-two-results');
var drawResultDisplay = document.querySelector('.draw-results');
var boardGameBoxes = document.querySelectorAll('.box');

// var box1 = document.querySelector('.box-1');
// var box2 = document.querySelector('.box-2');
// var box3 = document.querySelector('.box-3');
// var box4 = document.querySelector('.box-4');
// var box5 = document.querySelector('.box-5');
// var box6 = document.querySelector('.box-6');
// var box7 = document.querySelector('.box-7');
// var box8 = document.querySelector('.box-8');
// var box9 = document.querySelector('.box-9');

////////////////////////////////////////////////////////
//////////////////////// DATA //////////////////////////
////////////////////////////////////////////////////////

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
var clearBoard = function() {

    boardGameBoxes.forEach(function(box) {
        box.classList.remove('player-one','player-two', 'checked')
    });
    clearInterval(pOneTimerOn)
    clearInterval(pTwoTimerOn)
}



var handleWin = function() {

    var allChecked = document.querySelectorAll('.checked');
    console.log(allChecked); 

    if (boardGameBoxes.length === allChecked.length) {
        console.log("This migh be a draw");
        drawResult += 1
        drawResultDisplay.textContent = drawResult
        clearBoard()
    }
}



var pOneTimerOn = null;
var pTwoTimerOn = null;

var handleTurn = function (e) {
    // console.log(e);
    // var allChecked = []
    //

    if (pOneTimerOn) { 
        if (e.target.classList.contains('checked')) { 
            return
        } else {
            e.target.classList.add('player-two', 'checked');
            pTwoTimerOn = setInterval(function(){console.log('t2ck')}, 1000)
            clearInterval(pOneTimerOn)
            pOneTimerOn = null;

            handleWin();
            return
        }    
    }

    
    if (e.target.classList.contains('checked')) { 
        // console.log('cooked it mate');
        return
    } else {
        e.target.classList.add('player-one', 'checked');
        clearInterval(pTwoTimerOn);
        pTwoTimerOn = null;
        pOneTimerOn = setInterval(function(){console.log('t1ck')}, 1000);

        handleWin();
    }
}



////////////////////////////////////////////////////////
/////////////////// EVENT LISTENNER ////////////////////
////////////////////////////////////////////////////////

boardGameBoxes.forEach(function(box) {
    box.addEventListener('click', handleTurn);
});


////////////////////////////////////////////////////////
///////////////////// WINNING LOGIC ////////////////////
////////////////////////////////////////////////////////

// the draw
/// for each boxe
        //does it contains a class
                //