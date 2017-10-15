// buttons on the introduction screen

var playButton = {
  width: 240,
  height: 64,
  posX: null,
  posY: null,
  action: 'animateStart',
  canvas: null,
  context: null
}
function createPlayButton(data){
  playButton.posX = (canvas.width/2)-(240/2),
  playButton.posY = (canvas.height/2)+200,

  playButton.canvas = document.createElement('canvas');
  playButton.canvas.width = data.width;
  playButton.canvas.height = data.height;
  playButton.context = playButton.canvas.getContext('2d');

  // button background
  playButton.context.beginPath();
  playButton.context.fillStyle = 'white';
  playButton.context.fillRect(0,0,data.width,2)
  playButton.context.closePath();

  // button text
  playButton.context.fillStyle = 'white';
  playButton.context.font = 'bold 18px lato';
  playButton.context.textBaseline="middle";
  playButton.context.textAlign="center";
  playButton.context.fillText('TAP TO START', data.width/2, data.height/2);
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
  action: 'introAnimation', //menuSettings
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
  context.lineWidth = 4;
  context.rect(0,0,data.width,data.height);
  context.stroke();
  context.closePath();
}

//-- logo
var logo = {
  canvas: null,
  ctx: null,
  alpha: 0
}
function createLogo() {

  var width = 560;
  var height = 160;


  logo.canvas = document.createElement('canvas');
  logo.canvas.width = width;
  logo.canvas.height = height;
  logo.context = logo.canvas.getContext('2d');
  logo.width = width;
  logo.height = height;
  logo.posX = (canvas.width/2)-(logo.width/2);
  logo.posY = (canvas.height/2)-(logo.height/2)-160;

  var context = logo.context;
  //var canvas = logo.canvas; // breaks asking for canvas.width for posX/posY

  // context.beginPath();
  // context.fillStyle = 'rgba(255,255,255,0.1)';
  // context.fillRect(0,0,width,height)
  // context.closePath();
  //
  // context.beginPath();
  // context.fillStyle = 'rgba(255,255,255,0.5)';
  // context.fillRect(0,0,width,2)
  // context.fillRect(0,height,width,-2)
  // context.closePath();


  // title
  context.fillStyle = 'white';
  context.font = 'bold 72px lato';
  context.textBaseline="middle";
  context.textAlign="center";
  context.fillText('STARSWINGER', logo.canvas.width/2, logo.canvas.height/2);
}

//-- platform
var platform = {
  canvas: null,
  ctx: null,
  posX: null,
  posY: null,
  hover: 0,
  hoverDirection: 'up'
}
function createPlatform() {

  var width = 160;
  var height = 80;

  platform.canvas = document.createElement('canvas');
  platform.canvas.width = width;
  platform.canvas.height = height;
  platform.context = platform.canvas.getContext('2d');
  platform.width = width;
  platform.height = height;
  platform.posX = (canvas.width/2)-(platform.width/2);
  platform.posY = (canvas.height/2)-(platform.height/2)+128;

  var context = platform.context;

  context.beginPath();
  context.rect(0,0,width,height)
  context.fillStyle = 'white';
  context.fill();
  context.closePath();
}


//-- placeholder actions
function menuSettings() {
  console.log('Menu-Settings');
}

function soundToggle() {
  console.log('toggleSound');
}

function changeTheme() {
  console.log('changeTheme');
}
