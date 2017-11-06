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
    var cameraTarget = -canvas.height*1.2;
    var progress = animateEaseOut(cameraTarget,restartCameraY,60);
    restartCameraY += progress;
    cameraY += progress;

    if (restartCameraY >= cameraTarget-20) {
      // create new game
      moveCanvas.currentPos = 0;
      clearVariables();
      gameSetup();
      //--
      restartStage = 2;
    }
  }


  // Stage 2
  if (cameraY+(canvas.height*2) > 0 && restartStage === 2) {
    restartSpeed = (cameraY)/32;
    cameraY -= restartSpeed;

    if (cameraY+(canvas.height*2) > 20) {
      restartStage = 3;
    }
  }


  // reset game over
  if (restartStage === 3) {
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
