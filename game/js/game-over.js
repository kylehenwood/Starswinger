function gameOverSetup() {
  gameOver.canvas = document.createElement('canvas');
  gameOver.canvas.width = canvas.width;
  gameOver.canvas.height = canvas.height;
  gameOver.context = gameOver.canvas.getContext('2d');

  gameOver.context.beginPath();
  gameOver.context.rect(0,0,canvas.width,canvas.height)
  gameOver.context.fillStyle = 'rgba(000,000,000,0.2)';
  gameOver.context.fill();

  gameOver.context.fillStyle = 'white';
  gameOver.context.font = '24px lato';
  gameOver.context.textAlign="center";
  gameOver.context.fillText('GAME OVER (click or "R" to restart)', canvas.width/2, canvas.height/2);
}


// end game
var gameOverMoveSpeed = 0;
var gameOverCurrent;
var stage = 1;
var once = true;


function gameOver() {
  //console.log('Game Over');
  gameState = "gameOver";

  // detach();
  if (cameraY+canvas.height > 0 && stage === 1) {
    gameOverMoveSpeed = (canvas.height-cameraY)/10;
    cameraY -= gameOverMoveSpeed;
  }
  // little hackery as it takes forever to get exactly 0 through iterations.
  if (cameraY+canvas.height < 0+10 && once === true) {
    stage = 2;
    cameraY = canvas.height;
    once = false;
  }
  if (cameraY > 0 && stage === 2) {
    gameOverMoveSpeed  = (0-cameraY)/24;
    cameraY += gameOverMoveSpeed ;
  }

  // show score
  canvas.ctx.drawImage(gameOver.canvas,0,0);
  gameOver.finalScore = gameUserInterface.score;
}
