// start a game
function startGame() {
  clearVariables();
  gameSetup();
  //attach();
  gameState = "playGame";
}



//restart game
function restartGame() {
  //alert('restart');
  clearVariables();
  gameSetup();
  gameState = "playGame";
}


function clearVariables() {
  gridPositions = [];
  elements = [];
  starHooks = [];

  gravity = 0;
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
