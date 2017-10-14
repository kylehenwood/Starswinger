
function backToMenu() {
  gameState = 'menuAnimation';
  menuStage = 1;

  logo.alpha = 0;
  playButton.alpha = 0;
  menuAlpha = 0;
}

var menuCharacter = {
  posX: null,
  posY: null
}

// end game
var menuSpeed = 0;
var menuStage = 1;
var menuAlpha = 0;
var introCharY = -100;

// gameState === 'restartAnimation'
// once complete it starts a new game.
function animateToMenu() {
  // ::Stage 1
  // push out current game state.
  if (cameraY+canvas.height > 0 && menuStage === 1) {
    restartSpeed = (canvas.height-cameraY)/40;
    cameraY -= restartSpeed;
  }

  // ::Stage 2
  // re-introduce clouds
  if (cameraY+canvas.height < 0.4 && menuStage === 1) {
    menuStage = 2;
    cameraY = canvas.height;
    moveCanvas.currentPos = 0;
    // create new game
    clearVariables();
    gameSetup();
  }

  if (cameraY+canvas.height > 0.4 && menuStage === 2) {
    menuSpeed  = cameraY/24;
    cameraY -= menuSpeed ;

    if (logo.alpha < 1) {
      logo.alpha += 0.025;
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
    context.drawImage(logo.canvas, logo.posX, logo.posY+cameraY*0.4);

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
  if (menuStage === 3 && introCharY < 304) {
    introCharY += 10;
  }

  if (menuStage >= 3) {
    var context = canvas.ctx;
    context.save();
    context.globalAlpha = playButton.alpha;
    context.drawImage(playButton.canvas,playButton.posX,playButton.posY);
    canvas.ctx.restore();
  }

  if (menuStage === 3 && playButton.alpha >= 1 && introCharY >= 304) {
    menuStage = 4;
  }


  // ::Stage 4
  if (menuStage === 4) {
    menuStage = 0;
    introCharY = -100;
    logo.alpha = 0;

    // set state to intro
    gameState = "gameIntro";
  }
}
