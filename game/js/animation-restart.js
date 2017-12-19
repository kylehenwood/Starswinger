var restartStage = 1;
var once = true;

//restart game
function restartGame() {
  gameState = "gameRestart";
  restartStage = 1;
  detach();
  //characterReset();
}

// gameState === 'restartAnimation'
// once complete it starts a new game.
function restartAnimation() {

  // Stage 1
  if (restartStage === 1) {
    var cameraTargetY = -canvas.height*1.5;


    // actually move the camera
    cameraY += animateEaseOut(cameraTargetY,cameraY,20);
    //starCameraMoveY += animateEaseOut(-100,starCameraMoveY,20);


    // when everything has mooved offscreen do below:
    if (cameraY <= cameraTargetY+10) {
      // create new game
      moveCanvas.currentPos = 0;
      clearVariables();
      gameSetup();

      //--
      // move camera down, and set the stage below the canvas
      cameraY = canvas.height*1.2;
      starCameraMove = 0;
      restartStage = 2;
      //console.log('stage 2');
    }
  }


  // Stage 2
  // bring the game level up from the bottom of the screen
  if (restartStage === 2) {

    // move the camera
    cameraY += animateEaseOut(0,cameraY,20);
    //starCameraMoveY += animateEaseOut(0,starCameraMoveY,20);

    if (cameraY <= 1.2) {
      cameraY = 0;
      restartStage = 3;
    }
  }


  // reset game over
  if (restartStage === 3) {
    //console.log('stage 3');
    restartStage = 0;
    //cameraY = 0;

    // position character and set gravity
    gravity = 0;
    character.centerY = -character.size;
    character.centerX = canvas.width/2;

    // start game
    startGame();
  }
}
