// Paused game state
// can only be triggered while gameState is "playing"

var isPaused = false;
var pauseCanvas = {
  canvas: null,
  context: null
}

// toggle isPaused.
function gamePause() {
  console.log('pause attempt');
  isPaused = !isPaused
  if (isPaused) {
    gameState = "gamePaused";
  } else {
    gameState = "playGame";
  }
  console.log(gameState);
}

function createPauseCanvas() {
  pauseCanvas.canvas = document.createElement('canvas');
  pauseCanvas.canvas.width = canvas.width;
  pauseCanvas.canvas.height = canvas.height;
  pauseCanvas.context = pauseCanvas.canvas.getContext('2d');

  pauseCanvas.context.rect(0,0,canvas.width,canvas.height)
  pauseCanvas.context.fillStyle = 'rgba(000,000,000,0.6)';
  pauseCanvas.context.fill();

  pauseCanvas.context.fillStyle = 'white';
  pauseCanvas.context.font = '24px lato';
  pauseCanvas.context.textAlign="center";
  pauseCanvas.context.fillText('PAUSED', canvas.width/2, canvas.height/2);
}
