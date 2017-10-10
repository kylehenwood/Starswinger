// Paused game state
// can only be triggered while gameState is "playing"

var isPaused = false;
var isResumed = true;
var pauseCanvas = {
  canvas: null,
  context: null
}

// toggle isPaused.
function gamePause() {
  isPaused = !isPaused
  if (isPaused) {
    gameState = "gamePaused";
    //isPaused = true;
  } else {
    if (isResumed === true) {
      resumeGame();
      isResumed = false;
    }
  }
}

// resume game countdown
var resumeCountdown = 3;

function resumeGame() {
 setTimeout(function(){
   if (resumeCountdown > 0) {
     // update pause canvas
     var overlay = 0.2*resumeCountdown;

     pauseCanvas.context.clearRect(0, 0, canvas.width, canvas.height);

     pauseCanvas.context.beginPath();
     pauseCanvas.context.rect(0,0,canvas.width,canvas.height)
     pauseCanvas.context.fillStyle = 'rgba(000,000,000,'+overlay+')';
     pauseCanvas.context.fill();

     // coundown text
     pauseCanvas.context.fillStyle = 'white';
     pauseCanvas.context.font = '48px lato';
     pauseCanvas.context.textAlign="center";
     pauseCanvas.context.fillText(resumeCountdown, canvas.width/2, canvas.height/2);
     resumeCountdown -= 1;
     resumeGame();
   } else {
     gameState = "playGame";

     // Resume game & reset pause screen
     isResumed = true;
     resumeCountdown = 3;
     drawPauseState();
   }
 },400);
}



// create the pause overlay
function createPauseCanvas() {
  pauseCanvas.canvas = document.createElement('canvas');
  pauseCanvas.canvas.width = canvas.width;
  pauseCanvas.canvas.height = canvas.height;
  pauseCanvas.context = pauseCanvas.canvas.getContext('2d');

  // draw default pause state on pause canvas
  drawPauseState();
}

// pause state
function drawPauseState() {
  pauseCanvas.context.clearRect(0, 0, canvas.width, canvas.height);

  pauseCanvas.context.beginPath();
  pauseCanvas.context.rect(0,0,canvas.width,canvas.height)
  pauseCanvas.context.fillStyle = 'rgba(000,000,000,0.6)';
  pauseCanvas.context.fill();

  pauseCanvas.context.fillStyle = 'white';
  pauseCanvas.context.font = '24px lato';
  pauseCanvas.context.textBaseline="middle";
  pauseCanvas.context.textAlign="center";
  pauseCanvas.context.fillText('PAUSED (shortcut P)', canvas.width/2, canvas.height/2);
}
