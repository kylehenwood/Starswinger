
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

// gameState === 'restartAnimation'
// once complete it starts a new game.
function animateToMenu() {

  character.centerX = canvas.width/2;

  // ::Stage 1
  // push out current game state.
  if (cameraY+canvas.height > 0 && menuStage === 1) {
    restartSpeed = ((canvas.height*1.2)-cameraY)/40;
    cameraY -= restartSpeed;
  }

  // ::Stage 2
  // re-introduce clouds
  if (cameraY+canvas.height < 0 && menuStage === 1) {
    menuStage = 2;
    cameraY = canvas.height;
    moveCanvas.currentPos = 0;

    // create new game
    clearVariables();
  }

  if (cameraY+canvas.height > 0 && menuStage === 2) {
    menuSpeed  = cameraY/32;
    cameraY -= menuSpeed ;

    if (logo.alpha < 1) {
      logo.alpha += 0.015;
    }
    if (menuAlpha < 1) {
      menuAlpha += 0.01;
    }
  }

  if (menuStage >= 2) {
    var context = canvas.ctx;

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

    canvas.ctx.restore();
  }


  // ::Stage 3
  // include title sequence and raise character platform
  if (cameraY <= 0.4 && menuStage === 2) {
    menuStage = 3;
    cameraY = 0;
  }

  // character fall => play button visualised.
  if (menuStage === 3 && playButton.alpha < 1) {
    playButton.alpha += 0.1;
  }


  if (menuStage >= 3) {
    var context = canvas.ctx;
    if (playButton.progress < 100) {
      updatePlayButton();
    }
    context.drawImage(playButton.canvas,playButton.posX,playButton.posY);

    if (character.centerY < 368) {
      gravity += 1;
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
