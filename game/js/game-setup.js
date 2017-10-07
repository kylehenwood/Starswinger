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
    canvas.id.setAttribute('width', canvas.height);
    canvas.id.setAttribute('height', canvas.height);
}


var elements = [];
var elem = null;

// mouseTestSetup;
function mouseTestSetup() {
  elem = canvas.id;
  elem.left = elem.offsetLeft;
  elem.top = elem.offsetTop;


  elem.addEventListener('click', function(event) {
    var x = event.pageX - elem.left;
    var y = event.pageY - elem.top;
    elements.forEach(function(element) {
      //console.log(element);
      if (y > element.posY && y < element.posY + element.size
          && x > element.posX && x < element.posX + element.size) {
          //alert('clicked on hook '+element.index);
          changeHook('mouse',element.index);
      }
    });
  });

  // non jquery...
  //elem.left = elem.offsetLeft;
  //elem.top = elem.offsetTop;
  // Add event listener for `click` events.
  //elem.addEventListener('click', function(event) {
  //}, false);

  // Add element.
  // elements.push({
  //     colour: '#05EFFF',
  //     width: 150,
  //     height: 100,
  //     top: 20,
  //     left: 15
  // });
}

function drawClicky() {
  //console.log(elements.length);
  elements.forEach(function(element) {
    canvas.ctx.fillStyle = 'rgba(0,255,0,0.1)';
    canvas.ctx.fillRect(element.posX+=moveCanvas.moveSpeed, element.posY, element.size, element.size);
  });
}


// controls
// holds the value of currently selected hook, on hook change
// this value should be placed back into starhooks array.
// while the new selected hook should be found here.
function controls() {
  document.addEventListener('keydown', function(event) {
  //$(document).keydown(function(e) {
      switch(event.which) {
          case 37: // left
          changeHook('key',-1);
          break;

          case 38: // up
          break;

          case 39: // right
          changeHook('key',1);
          break;

          case 40: // down
          break;

          default: return; // exit this handler for other keys
      }
      event.preventDefault(); // prevent the default action (scroll / move caret)
  }, false);
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
    index = direction;
    lastHook = selectedHook;
    newHook = index;

    lastHook.val = currentHook;
    lastHook.reset = false;
    selectedHook = newHook;

    selectedHookTest = starHooks[newHook];
    repositionSwing();
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
    position += rand(12,20);
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
      posX: gridPositions[position].positionX,
      posY: gridPositions[position].positionY
  });

  var hookPosition = starHooks.length -1;

  elements.push({
    posX: gridPositions[position].positionX,
    posY: gridPositions[position].positionY,
    size: 64,
    index: hookPosition
  });
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
      //gameCanvas.height = gridSize.rows*gridSize.square;
      gameCanvas.height = canvas.height;
  var gameContext = gameCanvas.getContext('2d');

  gamePanel.canvas = gameCanvas;
  gamePanel.context = gameContext;
}
