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

    var anim = {
      from: cameraY,
      to: -canvas.height*1.5,
      duration: 60,
      easing: 'easeInQuad'
    }

    // get new value
    val = animateNum(anim.from,anim.to,anim.duration,anim.easing);

    // updated animated value
    cameraY = val.value;

    // if animation finished
    if (val.complete === true) {

      // start new game
      moveCanvas.currentPos = 0;
      clearVariables();
      gameSetup();
      //--
      restartStage = 2;
    }
  }


  // Stage 2
  // bring the game level up from the bottom of the screen
  if (restartStage === 2) {


    var anim = {
      from: canvas.height*1.5,
      to: 0,
      duration: 90,
      easing: 'easeOutQuad'
    }

    // get new value
    val = animateNum(anim.from,anim.to,anim.duration,anim.easing);

    // updated animated value
    cameraY = val.value;

    // if animation finished
    if (val.complete === true) {

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
