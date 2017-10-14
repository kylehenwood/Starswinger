// Game introduction animation
// moves background and foreground...

var gameIntro = {
  canvas: null,
  context: null,
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
  createPlatform();
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

  var context = gameIntro.context;

  // hover animation
  // if (platform.hoverDirection === 'up' && platform.hover <= 0) {
  //   platform.hoverDirection = 'down';
  // }
  // if (platform.hoverDirection === 'down' && platform.hover >= 5) {
  //   platform.hoverDirection = 'up';
  // }
  // if (platform.hoverDirection === 'up') {
  //   platform.hover -= 0.024;
  // } else {
  //   platform.hover += 0.024;
  // }

  // floating platform
  context.drawImage(platform.canvas,platform.posX,platform.posY)

  // title
  context.drawImage(logo.canvas,logo.posX,logo.posY);

  // intro buttons
  context.drawImage(themeButton.canvas,themeButton.posX,themeButton.posY);
  context.drawImage(soundButton.canvas,soundButton.posX,soundButton.posY);
  context.drawImage(settingsButton.canvas,settingsButton.posX,settingsButton.posY);

  // play button
  context.drawImage(playButton.canvas,playButton.posX,playButton.posY);
}
