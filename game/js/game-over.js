var gameOverElems = [];

function gameOverSetup() {
  gameOver.canvas = document.createElement('canvas');
  gameOver.canvas.width = canvas.width;
  gameOver.canvas.height = canvas.height;
  gameOver.context = gameOver.canvas.getContext('2d');

  // back to menu button
  createIntroButton();
  gameOverElems.push(introButton);

  // restart button
  createRestartButton();
  gameOverElems.push(restartButton);
}


// end game
var gameOverMoveSpeed = 0;
var stage = 1;
var once = true;
var restartAnimate = false;


function restartAnimation() {
  if (cameraY+canvas.height > 0 && stage === 1) {
    gameOverMoveSpeed = (canvas.height-cameraY)/10;
    cameraY -= gameOverMoveSpeed;
  }
  // little hackery as it takes forever to get exactly 0 through iterations.
  if (cameraY+canvas.height < 0+10 && once === true) {
    stage = 2;
    cameraY = canvas.height;
    once = false;
    moveCanvas.currentPos = 0;
  }
  if (cameraY+canvas.height > 0 && stage === 2) {
    gameOverMoveSpeed  = (cameraY)/24;
    cameraY -= gameOverMoveSpeed ;
  }

  // reset game over
  if (cameraY <= 0.5 && stage === 2) {
    restartAnimate = false;
    gameOverMoveSpeed = 0;
    stage = 1;
    once = true;
  }
}


function gameOverUpdate() {
  gameState = "gameOver";
  //restartAnimate = true;

  gameOver.context.clearRect(0, 0, gameOver.canvas.width, gameOver.canvas.height);

  gameOver.context.beginPath();
  gameOver.context.rect(0,0,canvas.width,canvas.height)
  gameOver.context.fillStyle = 'rgba(000,000,000,0.2)';
  gameOver.context.fill();

  gameOver.context.fillStyle = 'white';
  gameOver.context.font = '24px lato';
  gameOver.context.textAlign = "center";
  gameOver.context.fillText('GAME OVER (Press "R" to restart)', canvas.width/2, canvas.height/2-80);

  // intro button
  gameOver.context.drawImage(introButton.canvas,introButton.posX,introButton.posY);

  // restart button
  gameOver.context.drawImage(restartButton.canvas,restartButton.posX,restartButton.posY);
}
