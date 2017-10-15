// Game Menu
// moves background and foreground...

var gameMenu = {
  canvas: null,
  context: null,
}

var menuElems = [];

function setupMenu() {
  gameState = 'gameMenu';
}

// create the pause overlay
function createMenu() {
  gameMenu.canvas = document.createElement('canvas');
  gameMenu.canvas.width = canvas.width;
  gameMenu.canvas.height = canvas.height;
  gameMenu.context = gameMenu.canvas.getContext('2d');

  // intro elements
  // - theme button
  // - settings button
  // - sound button
  // - play button
  // width, height, posX, posY, action, style
  createPlayButton(playButton);
  menuElems.push(playButton);

  createSettingsButton(settingsButton);
  menuElems.push(settingsButton);

  createSoundButton(soundButton);
  menuElems.push(soundButton);

  createThemeButton(themeButton);
  menuElems.push(themeButton);

  createLogo();
  createPlatform();
}

// pause state
function updateMenu() {

  //context = canvas.context;
  var context = gameMenu.context;

  context.clearRect(0, 0, canvas.width, canvas.height);

  // overlay
  context.beginPath();
  context.rect(0,0,canvas.width,canvas.height)
  context.fillStyle = 'rgba(255,000,000,0.1)';
  context.fill();
  context.closePath();

  //var context = gameMenu.context;

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
