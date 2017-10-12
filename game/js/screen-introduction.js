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
}



// pause state
function updateIntro() {
  gameIntro.context.clearRect(0, 0, canvas.width, canvas.height);

  // overlay
  gameIntro.context.beginPath();
  gameIntro.context.rect(0,0,canvas.width,canvas.height)
  gameIntro.context.fillStyle = 'rgba(255,000,000,0.2)';
  gameIntro.context.fill();
  gameIntro.context.closePath();

  // theme button
  gameIntro.context.drawImage(themeButton.canvas,themeButton.posX,themeButton.posY);

  // sound button
  gameIntro.context.drawImage(soundButton.canvas,soundButton.posX,soundButton.posY);

  // settings button
  gameIntro.context.drawImage(settingsButton.canvas,settingsButton.posX,settingsButton.posY);

  // title
  gameIntro.context.fillStyle = 'white';
  gameIntro.context.font = '48px lato';
  gameIntro.context.textBaseline="middle";
  gameIntro.context.textAlign="center";
  gameIntro.context.fillText('STARSWINGER', canvas.width/2, canvas.height/2-80);


  // play button
  gameIntro.context.drawImage(playButton.canvas,playButton.posX,playButton.posY);
}
