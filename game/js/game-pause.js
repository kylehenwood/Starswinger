// Paused game state
// can only be triggered while gameState is "playing"
var pauseElems = [];
var pauseCanvas = {
  canvas: null,
  context: null
}

// create the pause overlay
function pauseSetup() {
  pauseCanvas.canvas = document.createElement('canvas');
  pauseCanvas.canvas.width = canvas.width;
  pauseCanvas.canvas.height = canvas.height;
  pauseCanvas.context = pauseCanvas.canvas.getContext('2d');

  createPauseRestartButton();
  pauseElems.push(pauseRestartButton);

  createPauseResumeButton();
  pauseElems.push(pauseResumeButton);

  createPauseMenuButton();
  pauseElems.push(pauseMenuButton);

  // draw default pause state on pause canvas
  drawPauseState();
}

// set gameState === 'gamePaused'
function gamePause() {
  drawPauseState();
  gameState = "gamePaused";
}

// pause state
function drawPauseState() {
  pauseCanvas.context.clearRect(0, 0, canvas.width, canvas.height);

  // game overlay
  pauseCanvas.context.beginPath();
  pauseCanvas.context.rect(0,0,canvas.width,canvas.height)
  pauseCanvas.context.fillStyle = 'rgba(000,000,000,0.6)';
  pauseCanvas.context.fill();

  // sidebar background
  pauseCanvas.context.beginPath();
  pauseCanvas.context.rect(0,0,320,canvas.height)
  pauseCanvas.context.fillStyle = 'black';
  pauseCanvas.context.fill();

  // sidebar current score
  pauseCanvas.context.fillStyle = 'white';
  pauseCanvas.context.font = '24px lato';
  pauseCanvas.context.textBaseline="top";
  pauseCanvas.context.textAlign="left";
  pauseCanvas.context.fillText('SCORE: '+gameUserInterface.score, 24, 24);

  // sidebar buttons
  pauseCanvas.context.drawImage(pauseMenuButton.canvas,pauseMenuButton.posX,pauseMenuButton.posY);
  pauseCanvas.context.drawImage(pauseRestartButton.canvas,pauseRestartButton.posX,pauseRestartButton.posY);
  pauseCanvas.context.drawImage(pauseResumeButton.canvas,pauseResumeButton.posX,pauseResumeButton.posY);

  // paused message
  pauseCanvas.context.fillStyle = 'white';
  pauseCanvas.context.font = '24px lato';
  pauseCanvas.context.textBaseline="middle";
  pauseCanvas.context.textAlign="center";
  pauseCanvas.context.fillText('PAUSED (shortcut P)', canvas.width/2+(320/2), canvas.height/2);
}

// resume game
var resumeCountdown = 3;
function resumeGame() {
  gameState = "gameResume";
  setTimeout(function(){
    // when pause is clicked while game is resuming, cancel timeout
    if (gameState != 'gameResume') {
      clearTimeout();
      return;
    }
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
      resumeCountdown = 3;
      gameState = "playGame";
    }
  },400);
}
