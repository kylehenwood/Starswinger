//restart game
function restartGame() {
  gameState = "gameRestart";
  restartStage = 1;
  detach();
  //characterReset();
}

// end game
var restartSpeed = 0;
var restartStage = 1;
var restartCameraY = 0;

// gameState === 'restartAnimation'
// once complete it starts a new game.
function restartAnimation() {

  // Stage 1
  if (restartStage === 1) {
    var cameraTargetY = -canvas.height*1.2;
    var progress = animateEaseOut(cameraTargetY,restartCameraY,20);
    restartCameraY += progress;

    // actually move the camera
    cameraY += progress;

    // when everything has mooved offscreen do below:
    if (restartCameraY <= cameraTargetY+10) {
      // create new game
      moveCanvas.currentPos = 0;
      clearVariables();
      gameSetup();
      //--
      // move camera down, and set the stage below the canvas
      cameraY = canvas.height*1.2;
      restartCameraY = canvas.height*1.2;
      restartStage = 2;
      console.log('stage 2');
    }
  }


  // Stage 2
  // bring the game level up from the bottom of the screen
  if (restartStage === 2) {
    cameraTargetY = 1;
    progress = animateEaseOut(cameraTargetY,restartCameraY,20);

    restartCameraY += progress;

    // move the camera
    cameraY += progress;
    cameraY = round2(cameraY);

    console.log(cameraY);

    if (cameraY <= 1.2) {
      cameraY = 0;
      restartStage = 3;
    }
  }


  // reset game over
  if (restartStage === 3) {
    console.log('stage 3');
    restartSpeed = 0;
    restartStage = 0;
    //cameraY = 0;

    gravity = 0;
    character.centerY = -character.size;
    character.centerX = canvas.width/2;

    // start game
    startGame();
  }
}
