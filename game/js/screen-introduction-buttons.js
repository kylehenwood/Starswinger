// buttons on the introduction screen

var playButton = {
  width: 240,
  height: 64,
  posX: null,
  posY: null,
  action: 'startGame',
  canvas: null,
  context: null
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
  playButton.context.font = 'bold 18px lato';
  playButton.context.textBaseline="middle";
  playButton.context.textAlign="center";
  playButton.context.fillText('PRESS START TO PLAY', data.width/2, data.height/2);
}


//--
var themeButton = {
  width: 64,
  height: 64,
  action: 'changeTheme',
  canvas: null,
  context: null
}
function createThemeButton(data){
  themeButton.posX = canvas.width-88,
  themeButton.posY = 24,
  themeButton.canvas = document.createElement('canvas');
  themeButton.canvas.width = data.width;
  themeButton.canvas.height = data.height;
  themeButton.context = themeButton.canvas.getContext('2d');
  drawSquareButton(themeButton.context,data);
}


//--
var soundButton = {
  width: 64,
  height: 64,
  action: 'soundToggle',
  canvas: null,
  context: null
}
function createSoundButton(data){
  soundButton.posX = canvas.width-88,
  soundButton.posY = canvas.height-88,
  soundButton.canvas = document.createElement('canvas');
  soundButton.canvas.width = data.width;
  soundButton.canvas.height = data.height;
  soundButton.context = soundButton.canvas.getContext('2d');
  drawSquareButton(soundButton.context,data);
}


//--
var settingsButton = {
  width: 64,
  height: 64,
  action: 'introSettings',
  canvas: null,
  context: null
}
function createSettingsButton(data){
  settingsButton.posX = 24,
  settingsButton.posY = 24,
  settingsButton.canvas = document.createElement('canvas');
  settingsButton.canvas.width = data.width;
  settingsButton.canvas.height = data.height;
  settingsButton.context = settingsButton.canvas.getContext('2d');
  drawSquareButton(settingsButton.context,data);
}


//-- button background
function drawSquareButton(context,data) {
  context.beginPath();
  context.strokeStyle = 'white';
  context.lineWidth = 2;
  context.rect(0,0,data.width,data.height);
  context.stroke();
  context.closePath();
}


//-- placeholder actions
function introSettings() {
  console.log('introSettings');
}

function soundToggle() {
  console.log('toggleSound');
}

function changeTheme() {
  console.log('changeTheme');
}
