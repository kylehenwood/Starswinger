// game panel setup
var gamePanel = {
  canvas: '',
  context: '',
  posX:0,
  posY:0
}

function setupGameCanvas() {
  gamePanel.canvas = document.createElement('canvas');
  gamePanel.canvas.width = gridSize.cols*gridSize.square;
  gamePanel.canvas.height = canvas.height;
  gamePanel.context = gamePanel.canvas.getContext('2d');
}

// ---------------------------------------------------------------
function gameSetup() {

  // create a grid canvas and push the positions of each square to an array called "elements"
  gridPosition = [];
  createGrid();

  // create a panel which I draw/place stars positions fitting that of the grid element positions.
  starHooks = [];
  createPanel();

  // draw click area hotspots
  drawClicky();
  updateGame();
}

// create a canvas and draw the grid and stars/hooks on it.
// size
function createPanel() {
  var panel = {
      width: (gridSize.cols*gridSize.square)+(canvas.width/2),
      height: gridSize.rows*gridSize.square
  }

  // when a panel is created
  var position = 0;
  var availablePositions = gridSize.rows * gridSize.cols;
  var safe = true;
  var nextSafe = 0;

  while (position < availablePositions) {
    // set safe on stars.
    if (nextSafe <= 0) {
      //safe = true;
      nextSafe = 5;
    } else {
      safe = false;
      nextSafe -= 1;
    }
    // space out the stars by adding a random tile gap untill the tile is exceeded.
    if (position === 0) {
      position = 2;
    } else {
      position += rand(18,28);
    }
    if (position < availablePositions) {
      createHook(position,safe);
    }
  }
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
  var positionX = 0+(canvas.width/2)-32+320;  // starting position of hooks
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
