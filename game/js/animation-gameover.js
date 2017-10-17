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

function updateGameOverAnimation() {
  console.log('state:'+animateGameOver.state+','+camMoved);
  // state 1
  if (animateGameOver.state === 1) {
      if (camMoved < 100) {
        var move = animateEaseOut(100,camMoved,4);
        camMoved += move;
        cameraY = -camMoved;
      }
      if (camMoved >= (100-1)) {
        camMoved = 100;
        animateGameOver.state = 2;
      }
  }
  // state 2
  if (animateGameOver.state === 2) {
    if (camMoved > 0) {
      var move = animateEaseOut(0,camMoved,24);
      camMoved += move;
      cameraY = -camMoved;
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
