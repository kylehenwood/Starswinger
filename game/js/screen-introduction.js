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

var playButton = {
  width: 240,
  height: 64,
  posX: null,
  posY: null,
  action: 'startGame',
  canvas: null,
  context: null
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
}

function createPlayButton(data){

  playButton.posX = (canvas.width/2)-(240/2),
  playButton.posY = (canvas.height/2)+40,

  playButton.canvas = document.createElement('canvas');
  playButton.canvas.width = data.width;
  playButton.canvas.height = data.height;
  playButton.context = playButton.canvas.getContext('2d');

  // button background
  playButton.context.beginPath();
  playButton.context.fillStyle = 'white';
  playButton.context.fillRect(0,0,data.width,data.height)
  playButton.context.closePath();

  // button text
  playButton.context.fillStyle = 'black';
  playButton.context.font = '18px lato';
  playButton.context.textBaseline="middle";
  playButton.context.textAlign="center";
  playButton.context.fillText('PRESS START TO PLAY', data.width, data.height);
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
  gameIntro.context.beginPath();
  gameIntro.context.rect(canvas.width-88,24,64,64)
  gameIntro.context.fillStyle = 'rgba(255,255,255,1)';
  gameIntro.context.fill();
  gameIntro.context.closePath();

  // sound button
  gameIntro.context.beginPath();
  gameIntro.context.rect(canvas.width-88,canvas.height-88,64,64)
  gameIntro.context.fillStyle = 'rgba(255,255,255,1)';
  gameIntro.context.fill();
  gameIntro.context.closePath();

  // settings button
  gameIntro.context.beginPath();
  gameIntro.context.rect(24,24,64,64)
  gameIntro.context.fillStyle = 'rgba(255,255,255,1)';
  gameIntro.context.fill();
  gameIntro.context.closePath();

  // title
  gameIntro.context.fillStyle = 'white';
  gameIntro.context.font = '48px lato';
  gameIntro.context.textBaseline="middle";
  gameIntro.context.textAlign="center";
  gameIntro.context.fillText('STARSWINGER', canvas.width/2, canvas.height/2-80);


  // play button
  gameIntro.context.drawImage(playButton.canvas,playButton.posX,playButton.posY);
}
