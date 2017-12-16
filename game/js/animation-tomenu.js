
function backToMenu() {
  gameState = 'menuAnimation';
  menuStage = 1;
  menuAlpha = 0;

  logo.alpha = 0;
  logo.posX = (canvas.width/2)-(logo.width/2);

  playButton.alpha = 0;

  platform.posX = (canvas.width/2)-(platform.width/2);

  // set character position
  character.centerY = -100;
  character.centerX = canvas.width/2;
}

// end game
var menuSpeed = 0;
var menuStage = 1;
var menuAlpha = 0;
var menuCameraY = 0;


// gameState === 'restartAnimation'
// once complete it starts a new game.
function animateToMenu() {

  // set character to center of the screen;
  character.centerX = canvas.width/2;

  // ::Stage 1
  // push out current game state.
  if (menuStage === 1) {
    var cameraTargetY = -canvas.height*1.5;

    // actually move the camera
    cameraY += animateEaseOut(cameraTargetY,cameraY,20);
    starCameraY += animateEaseOut(-100,starCameraY,20);

    if (cameraY <= cameraTargetY+10) {
      // create new game
      moveCanvas.currentPos = 0;
      clearVariables();
      gameSetup();
      //--
      cameraY = canvas.height*1.2;
      menuStage = 2;
    }
  }


  // ::Stage 2
  // fade in title
  if (menuStage >= 2) {

    // slow camera to stop over 32 frames
    cameraY -= cameraY/32;

    if (logo.alpha < 1) {
      logo.alpha += 0.01;
    }
    if (menuAlpha < 1) {
      menuAlpha += 0.01;
    }
  }


  if (menuStage === 2) {
    // move the camera
    cameraY += animateEaseOut(0,cameraY,20);
    starCameraY += animateEaseOut(0,starCameraY,20);


    if (cameraY <= 1.2) {
      cameraY = 0;
      starCameraY = 0;
      menuStage = 3;
    }
  }




  if (menuStage >= 2) {
    var context = canvas.context;

    // floating platform
    context.drawImage(platform.canvas,platform.posX,platform.posY+cameraY*0.6)

    context.save();
    context.globalAlpha = logo.alpha;

    // game logo
    context.drawImage(logo.canvas, logo.posX, logo.posY+cameraY*0.2);
    // intro buttons
    context.drawImage(themeButton.canvas,themeButton.posX,themeButton.posY);
    context.drawImage(soundButton.canvas,soundButton.posX,soundButton.posY);
    context.drawImage(settingsButton.canvas,settingsButton.posX,settingsButton.posY);

    canvas.context.restore();
  }


  // ::Stage 3
  // include title sequence and raise character platform
  if (cameraY <= 0.4 && menuStage === 3) {
    menuStage = 3;
    cameraY = 0;
    soundFalling();
  }

  // character fall => play button visualised.
  if (menuStage === 3 && playButton.alpha < 1) {
    playButton.alpha += 0.1;
  }


  if (menuStage >= 3) {
    var context = canvas.context;
    if (playButton.progress < 100) {
      updatePlayButton();
    }
    context.drawImage(playButton.canvas,playButton.posX,playButton.posY);

    if (character.centerY < 368) {
      if (gravity < terminalVelocity) {
        gravity += gravityIncrease;
      } else {
        gravity = terminalVelocity;
      }
      character.centerY += gravity;

      if (character.centerY > 368) {
        character.centerY = 368;
      }
    }
  }

  if (menuStage === 3 && playButton.alpha >= 1 && playButton.progress >= 100 && character.centerY >= 368) {
    menuStage = 4;
    setPlayButton()
  }


  // ::Stage 4
  if (menuStage === 4) {
    menuStage = 0;
    logo.alpha = 0;

    // set state to intro
    gameState = "gameMenu";
  }
}
