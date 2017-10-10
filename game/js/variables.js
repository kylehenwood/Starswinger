var gameOver = {
  canvas: null,
  context: null,
  gameEnded: null,
  finalScore: null
}

// which state is the game currently in.
var gameState = 'playGame';

var gameUserInterface = {
  score: null
}

var testingBool = false;

// Storing the selected hook
var selectedHookTest;
var selectedHook = {
  hook: null,
  posX: null,
  posY: null,
  centerX: null,
  centerY: null
}
var hookGrappel = {
  launch: false,
  time: null,
  interations: null,
  currentIteration: null
}

// Setup variables
var starHooks = [];
var gridPositions = [];
var gridImage;
var gridSize = {
  rows: 5,
  cols: 250,
  square: 64
}

// character
var gravity = 0;
var gravityIncrease = 0.3;
var momentiumY;
var momentiumX;
var friction;

var character = {
  grappelDelay:280, // ms (this should change based on the distance the character is from the hook)
  centerX: null,
  centerY: null,
}

var newCharacter = {
  size: 64,
  currentPosX: null,
  currentPosY: null,
  gravity: 2, // force pulling character down
  ropeLength: 320,
  interations: 16, // times it takes for the character to catch the hook
  swinging: true
}



// Rope & angle
var maxAngle; // greatest angle of swing
var maxAngleIncrement; // if swing angle isn't 90 deg, increase swing speed on down untill it is.
var currentAngle; //angle in degrees - also the starting position when you connect to a new star
var momentiumIncrease = 0;
var momentiumAngle;
var swingDirection;
var swingSpeed = 0.1;
var maxSpeed = 2;
// !IDEA give momentium boost when character connects to a new hook.
// draw the rope that connects character to hook

// When a hook is clicked, recaluculate the swing based on the selected hook and the character
// position.
var trajectory = {
  characterPosX: null,
  characterPosY: null,
  starPosX: null,
  starPosY: null,
  angle: null,
  hypotenuse: null,
  radius: null,
}
