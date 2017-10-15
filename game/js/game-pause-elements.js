// current game state // score
// - back to menu
// - restart
// - pause

var pauseMenuButton = {
  width: 272,
  height: 64,
  posX: null,
  posY: null,
  action: 'backToMenu',
  canvas: null,
  context: null
}
function createPauseMenuButton(){
  var button = pauseMenuButton;
  button.posX = 24;
  button.posY = (canvas.height)-((button.height+24)*3);

  button.canvas = document.createElement('canvas');
  button.canvas.width = button.width;
  button.canvas.height = button.height;
  button.context = button.canvas.getContext('2d');

  // button background
  button.context.beginPath();
  button.context.fillStyle = 'white';
  button.context.fillRect(0,0,button.width,button.height)
  button.context.closePath();

  // button text
  button.context.fillStyle = 'black';
  button.context.font = 'bold 18px lato';
  button.context.textBaseline="middle";
  button.context.textAlign="center";
  button.context.fillText('Back to Menu', button.width/2, button.height/2);
}

//--
var pauseRestartButton = {
  width: 272,
  height: 64,
  posX: null,
  posY: null,
  action: 'restartGame',
  canvas: null,
  context: null
}
function createPauseRestartButton(){
  var button = pauseRestartButton;

  button.posX = 24;
  button.posY = (canvas.height)-((button.height+24)*2);

  button.canvas = document.createElement('canvas');
  button.canvas.width = button.width;
  button.canvas.height = button.height;
  button.context = button.canvas.getContext('2d');

  // button background
  button.context.beginPath();
  button.context.fillStyle = 'white';
  button.context.fillRect(0,0,button.width,button.height)
  button.context.closePath();

  // button text
  button.context.fillStyle = 'black';
  button.context.font = 'bold 18px lato';
  button.context.textBaseline="middle";
  button.context.textAlign="center";
  button.context.fillText('Restart', button.width/2, button.height/2);
}


//--
var pauseResumeButton = {
  width: 272,
  height: 64,
  posX: null,
  posY: null,
  action: 'resumeGame',
  canvas: null,
  context: null
}
function createPauseResumeButton(){
    var button = pauseResumeButton;

    button.posX = 24;
    button.posY = (canvas.height)-((button.height+24)*1);

    button.canvas = document.createElement('canvas');
    button.canvas.width = button.width;
    button.canvas.height = button.height;
    button.context = button.canvas.getContext('2d');

    // button background
    button.context.beginPath();
    button.context.fillStyle = 'white';
    button.context.fillRect(0,0,button.width,button.height)
    button.context.closePath();

    // button text
    button.context.fillStyle = 'black';
    button.context.font = 'bold 18px lato';
    button.context.textBaseline="middle";
    button.context.textAlign="center";
    button.context.fillText('Resume', button.width/2, button.height/2);
}
