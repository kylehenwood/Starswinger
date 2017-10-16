// Setup
function setupCanvas() {
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
function gameSetup() {

  // create a grid canvas and push the positions of each square to an array called "elements"
  createGrid();

  // create a panel which I draw/place stars positions fitting that of the grid element positions.
  createPanel();

  // draw click area hotspots
  drawClicky();

  // set character position
  character.centerX = 240;
  character.centerY = 40;

  // set starting hook
  changeHook(0);
}




// create a canvas and draw the grid and stars/hooks on it.
// size
function createPanel() {
  var panel = {
      width: gridSize.cols*gridSize.square,
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
      safe = true;
      nextSafe = 5;
    } else {
      safe = false;
      nextSafe -= 1;
    }
    // space out the stars by adding a random tile gap untill the tile is exceeded.
    if (position === 0) {
      position = 46;
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
}
