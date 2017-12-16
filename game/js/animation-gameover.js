function setupGameOverAnimation() {
  gameState = 'animateGameOver';
  cameraMode = 'stop';
  animateGameOver = {
    state: 1,
  }
  soundFalling();
  updateGameOver();
}

var animateGameOver = {
  state: 1,
  camY: 0,
  overlayAlpha: 0
}

// amount camera has moved so far
var camMoved = 0;
var camDown = 240;

function updateGameOverAnimation() {


  // state 1
  // Camera Move down
  if (animateGameOver.state === 1) {
      if (camMoved < camDown) {
        var move = animateEaseOut(camDown,camMoved,4);
        camMoved += move;
        cameraY -= move;
        //cameraY += animateEaseOut(camDown,0,4)
        starCameraY += animateEaseOut(-50,starCameraY,4);
      }
      if (camMoved >= (camDown-1)) {
        camMoved = camDown;
        animateGameOver.state = 2;
      }
  }

  // state 2
  // Camera Move up + slow;
  if (animateGameOver.state === 2) {

    // slow camera pan to 0;

    if (camMoved > 0) {
      var move = animateEaseOut(0,camMoved,16);
      camMoved += move;
      cameraY -= move;
      starCameraY += animateEaseOut(0,starCameraY,16);
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
