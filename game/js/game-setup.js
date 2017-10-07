// Setup
var canvas = {
    id: '',
    ctx: '',
    width: '',
    height: ''
};
// set canvas vars
function setup() {

    // need to recall this on resize
    canvas.id = document.getElementById('js-starswinger');
    canvas.ctx = canvas.id.getContext("2d");

    canvas.width = 1200;
    canvas.height = 640;

    // set canvas width and height.
    canvas.id.setAttribute('width', canvas.width);
    canvas.id.setAttribute('height', canvas.height);
}

// ---------------------------------------------------------------
var gameScore = 0;
var selectedHookTest; // ==
var lastHookTest;
var selectedHook = 0;
var currentHook;
var newHook;
var hookCount;
var lastHook = {
  reset: true,
  val: null // not required once star holds its own values
}

// swapping hooks
function changeHook(input,direction) {
  // input can be string: 'mouse' or 'key'
  // mouse

  if (input === 'mouse') {

    cameraMode = 'hook';

    index = direction;
    lastHook = selectedHook;
    newHook = index;

    lastHook.val = currentHook;
    lastHook.reset = false;
    selectedHook = newHook;

    selectedHookTest = starHooks[newHook];
    setTimeout(function(){
      attach();
      repositionSwing();
    },200);
  }

  // key
  if  (input === 'key') {
    currentHook = selectedHook;
    newHook = selectedHook + direction;

    // save old hook, replace its values in starhooks array.
    // set new hook

    // check if star is alive
    // if alive = false, attempt to jump to the next star (+direction again)

    // reposition / redraw swing trajectory

    if (newHook < starHooks.length && newHook > -1) {

      lastHook.val = currentHook;
      lastHook.reset = false;
      selectedHook = newHook;

      // update last hook in array values
      //starHooks[currentHook] = selectedHookTest;
      // set newHook
      selectedHookTest = starHooks[newHook];
      repositionSwing();
    }
  }
}




// create mini canvas's of hooks
var starHooks = [];
var gridPositions = [];
var gridImage;
var gridSize = {
  rows: 5,
  cols: 250,
  square: 64
}

function createPanel() {
  // create a canvas and draw the grid and stars on it.
  // size
  var panel = {
      width: gridSize.cols*gridSize.square,
      height: gridSize.rows*gridSize.square
  }

  // when a panel is created
  var position = 0;
  var availablePositions = gridSize.rows * gridSize.cols;

  while (position < availablePositions) {
    // space out the stars by adding a random tile gap untill the tile is exceeded.
    position += rand(18,28);
    if (position < availablePositions) {
      createHook(position);
    }
  }
}


// create a hook along with a canvas it is drawn on.
function createHook(position) {
  // create a mini canvas for a hook, and add it to an array of hooks.
  var hookCanvas = document.createElement('canvas');
      hookCanvas.width = 64;
      hookCanvas.height = 64;
  var hookContext = hookCanvas.getContext('2d'); // Pass the context to draw the star

  var star = {
    x: 32,
    y: 32,
    size: 6,
    strokeOffset: 16,
    bounds: 64,
    ring: 2, // ring position / health
    alive: true,
    safe: false //position in array
  }
  // draw the hook
  drawHook(hookContext,star,false);

  // which stars should be safe?
  if (starHooks.length === 0) {
    star.safe = true;
  }

  // each hook lives on a 5x10 - 1-50
  starHooks.push({
      layer:hookCanvas,
      ctx: hookContext,
      star: star,
      size: 64,
      posX: gridPositions[position].positionX,
      posY: gridPositions[position].positionY
  });

  var hookPosition = starHooks.length -1;

  // clickable areas
  var clickyBounds = 64;
  elements.push({
    posX: gridPositions[position].positionX-clickyBounds,
    posY: gridPositions[position].positionY-clickyBounds,
    size: 64+(clickyBounds*2),
    index: hookPosition
  });
}

function gameOverSetup() {
  gameOver.canvas = document.createElement('canvas');
  gameOver.canvas.width = canvas.width;
  gameOver.canvas.height = canvas.height;
  gameOver.context = gameOver.canvas.getContext('2d');

  gameOver.context.rect(0,0,canvas.width,canvas.height)
  gameOver.context.fillStyle = 'rgba(000,000,000,0.6)';
  gameOver.context.fill();

  gameOver.context.fillStyle = 'white';
  gameOver.context.font = '24px lato';
  gameOver.context.textAlign="center";
  gameOver.context.fillText('GAME OVER: '+gameScore, canvas.width/2, canvas.height/2);
}

// create grid and render it as a canvas.
function createGrid() {
  var gridCanvas = document.createElement('canvas');
      gridCanvas.width = gridSize.cols*gridSize.square;
      gridCanvas.height = gridSize.rows*gridSize.square;
  var gridContext = gridCanvas.getContext('2d');

  // pass canvas to external variable so it can be used elsewhere as an image
  gridImage = gridCanvas;

  var horizontal;
  var vertical;
  var positionX = 0;
  var positionY = 0;
  var order;

  for (var i = 0; i < gridSize.cols; i++) {
    if (order === true) {
      order = false;
    } else {
      order = true;
    }
    drawCol(gridContext,positionX,order);
    positionX += 64;
  }
}

function drawCol(gridContext,positionX,order) {
 var positionY = 0;
 var squareColor;
 var order = order;

  // even or odd
  for (var i = 0; i < gridSize.rows; i++) {
    if (order === true) {
      order = false;
      squareColor = 'rgba(0,0,0,0.05)';
    } else {
      order = true;
      squareColor = 'rgba(0,0,0,0.1)';
    }
    drawSquare(gridContext,squareColor,64,positionX,positionY);
    positionY+=64;
  }
}

function drawSquare(gridContext,color,size,positionX,positionY) {
  gridContext.beginPath();
  gridContext.rect(positionX,positionY,size,size)
  gridContext.fillStyle = color;
  gridContext.fill();

  // create an array for grid positions that i'll use to place hooks.
  var position = {
    positionX: positionX,
    positionY: positionY
  }
  gridPositions.push(position);
}


// game panel setup
var gamePanel = {
  canvas: '',
  context: '',
  posX:0,
  posY:0
}

function drawGameSetup() {
  // do not want to create a new canvas every fkin frame
  var gameCanvas = document.createElement('canvas');
      gameCanvas.width = gridSize.cols*gridSize.square;
      gameCanvas.height = canvas.height;
  var gameContext = gameCanvas.getContext('2d');

  gamePanel.canvas = gameCanvas;
  gamePanel.context = gameContext;

  //console.log(gameCanvas.width);

}
