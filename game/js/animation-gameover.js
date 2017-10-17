function setupGameOverAnimation() {
  gameState = 'animateGameOver';
  animateGameOver = {
    state: 1,
  }
}

var animateGameOver = {
  state: 1,
  camY: 0
}

// amount camera has moved so far
var camMoved = 0;
var camDown = 240;

function updateGameOverAnimation() {
  //console.log('state:'+animateGameOver.state+','+camMoved);
  // state 1
  if (animateGameOver.state === 1) {
      if (camMoved < camDown) {
        var move = animateEaseOut(camDown,camMoved,4);
        camMoved += move;
        cameraY = -camMoved;
        //character.centerY -= move;
        //character.centerX = canvas.width/2;
      }
      if (camMoved >= (camDown-1)) {
        camMoved = camDown;
        animateGameOver.state = 2;
      }
  }
  // state 2
  if (animateGameOver.state === 2) {
    if (camMoved > 0) {
      var move = animateEaseOut(0,camMoved,16);
      camMoved += move;
      cameraY = -camMoved;
      //character.centerY -= move;
      //character.centerX = canvas.width/2;
    }
    if (camMoved <= 1) {
      camMoved = 0;
      animateGameOver.state = 3;
    }
  }
  // state 3
  if (animateGameOver.state === 3) {
    gameState = 'gameOver';
    animateGameOver = {
      count: 0,
      state: 1
    }
    camMoved = 0;
    return;
  }
}


function animateEaseOut(numHave,numWant,iterations) {
  var test = (numHave-numWant)/iterations;
  //console.log(numHave+','+numWant+','+iterations);
  return test;
}

// moveCanvas.selectedPos = (character.centerX-(canvas.width/2)+(character.size/2))*-1;
// moveCanvas.moveSpeed = ((moveCanvas.selectedPos - moveCanvas.currentPos)/moveCanvas.interations);
