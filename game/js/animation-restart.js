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


// gameState === 'restartAnimation'
// once complete it starts a new game.
function restartAnimation() {
  if (cameraY+canvas.height > 0 && restartStage === 1) {
    restartSpeed = ((canvas.height*1.1)-cameraY)/40;
    cameraY -= restartSpeed;
  }
  // little hackery as it takes forever to get exactly 0 through iterations.
  if (cameraY+canvas.height < 0 && restartStage === 1) {
    restartStage = 2;
    cameraY = canvas.height;
    moveCanvas.currentPos = 0;

    // create new game
    clearVariables();
    gameSetup();
  }
  if (cameraY+canvas.height > 0 && restartStage === 2) {
    restartSpeed  = (cameraY)/32;
    cameraY -= restartSpeed ;
  }

  // reset game over
  if (cameraY <= 0.4 && restartStage === 2) {
    restartSpeed = 0;
    restartStage = 0;
    cameraY = 0;

    gravity = 0;
    character.centerY = -character.size;
    character.centerX = canvas.width/2;

    // start game
    startGame();
  }
  //console.log(restartStage);
}
