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

  // tada
  momentium = 0;
  momentiumIncrease = 0;
  maxAngleIncrement = 0;

  momentiumAngle = null;
  swingDirection = null;
  swingSpeed = 0.1;
  maxSpeed = 2;
  starImmunity.power = 0;

  gameUserInterface.score = 0;
}
