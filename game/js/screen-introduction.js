// Game introduction animation
// moves background and foreground...

var gameIntro = {
  canvas: null,
  context: null
}

var introElems = [];

function setupIntro() {
  gameState = 'gameIntro';
}

// create the pause overlay
function createIntroCanvas() {
  gameIntro.canvas = document.createElement('canvas');
  gameIntro.canvas.width = canvas.width;
  gameIntro.canvas.height = canvas.height;
  gameIntro.context = gameIntro.canvas.getContext('2d');

  // intro elements
  // - theme button
  // - settings button
  // - sound button
  // - play button
  // width, height, posX, posY, action, style
  createPlayButton(playButton);
  introElems.push(playButton);

  createSettingsButton(settingsButton);
  introElems.push(settingsButton);

  createSoundButton(soundButton);
  introElems.push(soundButton);

  createThemeButton(themeButton);
  introElems.push(themeButton);

  createLogo();
}

// pause state
function updateIntro() {
  gameIntro.context.clearRect(0, 0, canvas.width, canvas.height);

  // overlay
  gameIntro.context.beginPath();
  gameIntro.context.rect(0,0,canvas.width,canvas.height)
  gameIntro.context.fillStyle = 'rgba(255,000,000,0.1)';
  gameIntro.context.fill();
  gameIntro.context.closePath();

  // floating platform
  gameIntro.context.beginPath();
  gameIntro.context.rect((canvas.width/2-80),(canvas.height/2)+80,160,80)
  gameIntro.context.fillStyle = 'white';
  gameIntro.context.fill();
  gameIntro.context.closePath();

  // title
  gameIntro.context.drawImage(logo.canvas, logo.posX, logo.posY);

  // theme button
  gameIntro.context.drawImage(themeButton.canvas,themeButton.posX,themeButton.posY);

  // sound button
  gameIntro.context.drawImage(soundButton.canvas,soundButton.posX,soundButton.posY);

  // settings button
  gameIntro.context.drawImage(settingsButton.canvas,settingsButton.posX,settingsButton.posY);


  // play button
  gameIntro.context.drawImage(playButton.canvas,playButton.posX,playButton.posY);
}


function introAnimation(){

}

function gameStartAnimation() {

}

function backToMenu() {
  gameState = 'menuAnimation';
  menuStage = 1;

  logo.alpha = 0;
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

    canvas.ctx.save();
    canvas.ctx.globalAlpha = logo.alpha;
    canvas.ctx.drawImage(logo.canvas, logo.posX, logo.posY+cameraY*0.4);

    // theme button
    canvas.ctx.drawImage(themeButton.canvas,themeButton.posX,themeButton.posY);
    canvas.ctx.drawImage(soundButton.canvas,soundButton.posX,soundButton.posY);
    canvas.ctx.drawImage(settingsButton.canvas,settingsButton.posX,settingsButton.posY);
    canvas.ctx.drawImage(playButton.canvas,playButton.posX,playButton.posY);

    canvas.ctx.restore();
  }


  // ::Stage 3
  // include title sequence and raise character platform
  if (cameraY <= 0.4 && menuStage === 2) {
    menuSpeed = 0;
    menuStage = 0;
    cameraY = 0;
    logo.alpha = 0;
    // set state to intro
    gameState = "gameIntro";
  }

  //ctx.globalAlpha = 0.5

  // ::Stage 4 - character falling

}
