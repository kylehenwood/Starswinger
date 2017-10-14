//restart game
function restartGame() {
  gameState = "gameRestart";
  restartStage = 1;
}


function clearVariables() {
  gridPositions = [];
  elements = [];
  starHooks = [];

  gravity = 0;

  // camera
  moveCanvas = {
    currentPos: 0,
    selectedPos: 0,
    moveSpeed: 0,
    interations: 16 // how many frames till camera catches target
  }
  cameraX = 0;

  // tada
  momentium = 0;
  momentiumIncrease = 0;
  maxAngleIncrement = 0;

  momentiumAngle = null;
  swingDirection = null;
  swingSpeed = 0.1;
  maxSpeed = 2;

  gameUserInterface.score = 0;
}


// end game
var restartSpeed = 0;
var restartStage = 1;


// gameState === 'restartAnimation'
// once complete it starts a new game.
function restartAnimation() {
  if (cameraY+(canvas.height*1.5) > 0 && restartStage === 1) {
    restartSpeed = (canvas.height-cameraY)/32;
    cameraY -= restartSpeed;
  }
  // little hackery as it takes forever to get exactly 0 through iterations.
  if (cameraY+canvas.height < 0.4 && restartStage === 1) {
    restartStage = 2;
    cameraY = canvas.height;
    moveCanvas.currentPos = 0;

    // create new game
    clearVariables();
    gameSetup();
  }
  if (cameraY+canvas.height > 0 && restartStage === 2) {
    restartSpeed  = (cameraY)/32;
    cameraY -= restartSpeed ;
  }

  // reset game over
  if (cameraY <= 0.4 && restartStage === 2) {
    restartSpeed = 0;
    restartStage = 0;
    cameraY = 0;

    // start game
    gameState = "playGame";
  }
  //console.log(restartStage);
}
