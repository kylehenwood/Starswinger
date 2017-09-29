// Starwizard star test

$(document).ready(function(){
    setup();
    controls();

    createGrid();
    createPanel();

    // create game layer
    drawGameSetup();
    // RAF
    testing();
});


// position output
// beam end position

var canvas = {
    id: '',
    ctx: '',
    width: '',
    height: ''
};

// set canvas vars
function setup() {
    // need to recall this on resize

    canvas.id = $('.js-starswinger');
    canvas.ctx = canvas.id[0].getContext("2d");

    canvas.width = 960;
    canvas.height = 640;
    canvas.id.attr({
        'width': canvas.width,
        'height': canvas.height
    });
}

// controls
var mouseState = null;
var selectedHook = 0;
var lastHook = {
  reset: true,
  val: null // not required once star holds its own values
}

function controls() {

  $(document).keydown(function(e) {
      switch(e.which) {
          case 37: // left
          changeHook(-1);
          break;

          case 38: // up
          break;

          case 39: // right
          changeHook(1);
          break;

          case 40: // down
          break;

          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });
  // mouse
  // $(document).on('mousedown', function(e) {
  //   mouseState = 'down';
  // });
  // $(document).on('mouseup',function(e) {
  //   mouseState = 'up';
  // });
}





// swapping hooks
function changeHook(direction) {
  var currentHook = selectedHook;
  var newHook = selectedHook + direction;
  var hookCount = starHooks.length;


  // check if star is alive
  // if alive = false, attempt to jump to the next star (+direction again)


  if (newHook < starHooks.length && newHook > -1) {

    lastHook.val = currentHook;
    lastHook.reset = false;
    selectedHook = newHook;

  } else {
    // no hook exists - return nothing
    return;
  }
}




// create mini canvas's of hooks
var starHooks = [];
var gridPositions = [];
var gridImage;
var gridSize = {
  rows: 4,
  cols: 200,
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
    position += rand(8,16);
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
    alive: true
  }
  // draw the hook
  drawHook(hookContext,star,false);

  // each hook lives on a 5x10 - 1-50
  var positionX = gridPositions[position].positionX;
  var positionY = gridPositions[position].positionY;

  starHooks.push({
      layer:hookCanvas,
      ctx: hookContext,
      star: star,
      x: positionX,
      y: positionY,
  });
}

function drawHook(layer,star,grappeled) {

  if (star.alive === false) {
    // this star is dead, return false;
    // return false;
  }

  // clear this canvas
  layer.clearRect(0, 0, 64, 64);

  // circle
  layer.beginPath();
  layer.arc(star.x, star.y, star.size, 0, Math.PI*2, true);
  layer.closePath();
  layer.fillStyle = 'white';
  layer.fill();
  layer.closePath();

  // star stroke/progress
  layer.beginPath();
  layer.lineWidth = 1;
  layer.strokeStyle = 'white';
  layer.arc(star.x, star.y, star.size+star.strokeOffset, 0, Math.PI*2, true);
  layer.closePath();
  layer.stroke();

  var radius = 23;
  var startAngle = 2 * Math.PI;
  var endAngle;
  //var endAngle = ring * Math.PI
  var counterClockwise = true;
  if (grappeled == true) {
    // do things
    star.ring -= 0.01;
    if (star.ring <= 0 && star.alive === true) {
      star.alive = false;
      star.ring = 2;
    }
  }
  // gets updated by if hook grappeled = true
  endAngle = star.ring * Math.PI;

  layer.beginPath();
  layer.lineWidth = 3;
  layer.strokeStyle = 'red';
  layer.arc(star.x, star.y, radius, startAngle, endAngle, counterClockwise);
  layer.stroke();


  // visual bounds
  layer.beginPath();
  if (grappeled == true) {
    layer.strokeStyle = 'lime';
    layer.lineWidth = 2;
  } else {
    layer.strokeStyle = 'red';
    layer.lineWidth = 1;
  }
  layer.rect(star.x-(star.bounds/2),star.y-(star.bounds/2),star.bounds,star.bounds);

  if (star.alive === false) {
    layer.fillStyle = 'red';
    layer.fill();
  }
  layer.stroke();
}


// create grid and render it as a canvas.
function createGrid() {
  var gridCanvas = document.createElement('canvas');
      gridCanvas.width = gridSize.cols*gridSize.square;
      gridCanvas.height = gridSize.rows*gridSize.square;
  var gridContext = gridCanvas.getContext('2d');
  var ctx = gridContext;

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
    drawCol(ctx,positionX,order);
    positionX += 64;
  }
}

function drawCol(ctx,positionX,order) {
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
    drawSquare(ctx,squareColor,64,positionX,positionY);
    positionY+=64;
  }
}

function drawSquare(ctx,color,size,positionX,positionY) {
  ctx.beginPath();
  ctx.rect(positionX,positionY,size,size)
  ctx.fillStyle = color;
  ctx.fill();

  // create an array for grid positions that i'll use to place hooks.
  var position = {
    positionX: positionX,
    positionY: positionY
  }
  gridPositions.push(position);
}




//
// RAF ----------------------------------------------------------------------------
//

var moveCanvas = {
  currentPos: 0,
  selectedPos: 0,
  moveSpeed: 0,
  interations: 20
}

function testing() {
  requestAnimationFrame(testing);

  // Clear Canvas
  clear(canvas);


  // create camera
  // camera is a canvas.
  //
  // camera paints "GAME", offset by currently selected hook

  updateGame();
  canvas.ctx.drawImage(gamePanel.canvas,moveCanvas.currentPos,0);   // 0,0 to be changed based on selected hook

  // make canvas move based on selected star
  //moveCanvas -= 1;
  //alert(starHooks[selectedHook].y);

  // center point of canvas = 480

  // move canvas is the position
  moveCanvas.selectedPos = (starHooks[selectedHook].x-(canvas.width/2))*-1;




  // get distance
  // get time I want this to take

  moveCanvas.moveSpeed = ((moveCanvas.selectedPos - moveCanvas.currentPos)/moveCanvas.interations);
  moveCanvas.currentPos += moveCanvas.moveSpeed;





}


function updateGame() {
  // updates the game canvas layer
  // controls when there needs to be more panels created.
  // animates the currently selected star
  var gameCanvas = gamePanel.canvas;
  var gameContext = gamePanel.context;

  // clear
  gameContext.clearRect(0, 0, gamePanel.canvas.width, gamePanel.canvas.height);


  // draw grid
  gameContext.drawImage(gridImage,0,0);

  // find and animate selected hook
  drawHook(starHooks[selectedHook].ctx,starHooks[selectedHook].star,true);

  // reset last hook. (once)
  if (lastHook.reset === false) {
    drawHook(starHooks[lastHook.val].ctx,starHooks[lastHook.val].star,false);
    //starHooks[lastHook.val].star.ring = 2;
    lastHook.reset = true;
  }

  // draw each hook to this canvas.
  for (var i = 0; i < starHooks.length; i++) {
    var layer = starHooks[i];
    gameContext.drawImage(layer.layer, layer.x, layer.y);
  }
}


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
      gameCanvas.height = gridSize.rows*gridSize.square;
  var gameContext = gameCanvas.getContext('2d');

  gamePanel.canvas = gameCanvas;
  gamePanel.context = gameContext;
}














//------------------------------------------------------------------















// convert degrees into radians
function toRad(deg) {
    return deg * Math.PI/180;
}

// clear canvas function
function clear(canvas) {
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// random function - no really
function rand(min,max) {
    var num = Math.random() * (max - min) + min;
    return Math.ceil(num);
}

// Request Animation Frame Function
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// Resize Delay Function
var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();
