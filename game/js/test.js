// Starwizard star test

$(document).ready(function(){
    setup();
    controls();

    drawGrid();
    createPanel();

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

    canvas.width = canvas.id.outerWidth();
    canvas.height = canvas.id.outerHeight();
    canvas.id.attr({
        'width': canvas.width,
        'height': canvas.height
    });
}

// controls
var mouseState = null;
var selectedHook = 0;
function controls() {

  $(document).keydown(function(e) {
      switch(e.which) {
          case 37: // left
          selectedHook -= 1;
          if (selectedHook <= 0) {selectedHook = 0;}
          break;

          case 38: // up
          break;

          case 39: // right
          selectedHook += 1;
          if (selectedHook >= starHooks.length-1) {selectedHook = starHooks.length-1}
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



// create mini canvas's of hooks
var starHooks = [];

function createPanel() {
  // when a panel is created
  var position = 0;

  while (position < 50) {
    // space out the stars by adding a random tile gap untill the tile is exceeded.
    position += rand(8,16);
    if (position <= 49) {
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

  // draw the hook
  drawHook(hookContext,grappeled);

  // each hook lives on a 5x10 - 1-50
  var positionX = gridPositions[position].positionX;
  var positionY = gridPositions[position].positionY;
  // var positionX = 0;
  // var positionY = 0;

  console.log(positionX,positionY);

  starHooks.push({
      layer:hookCanvas,
      ctx: hookContext,
      x: positionX,
      y: positionY,
  });
}

function drawHook(layer,grappeled) {
  var star = {
    x: 32,
    y: 32,
    size: 6,
    strokeOffset: 16,
    bounds: 64
  }

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

  if (grappeled == true) {
    // do things
  }

  // visual bounds
  layer.beginPath();
  layer.lineWidth = 1;
  layer.strokeStyle = 'red';
  layer.rect(star.x-(star.bounds/2),star.y-(star.bounds/2),star.bounds,star.bounds);
  layer.stroke();
}


//
// RAF ----------------------------------------------------------------------------
//

function testing() {
  requestAnimationFrame(testing);

  // Clear Canvas
  clear(canvas);

  // draw grid
  canvas.ctx.drawImage(gridImage,0,0);


  // find selected hook
  var currentHook = selectedHook;

  // draw layers
  for (var i = 0; i < starHooks.length; i++) {
    if ([i] != currentHook) { // otherwise it draws the ring twice
      var layer = starHooks[i];
      canvas.ctx.drawImage(layer.layer, layer.x, layer.y);
    }
  }

  // Currently hooked onto layer 1
  // figure out how to update a layer you've hooked onto...
  var grappled = starHooks[currentHook];

  //starGrappel(grappled); // updates layer X
  canvas.ctx.drawImage(grappled.layer, grappled.x, grappled.y);
}


var ring = 2;

function starGrappel(grappled) {

  //clear(grappled.layer)
  // the idea is to animate the grappeled layer
  var layer = grappled.ctx;
  layer.clearRect(0, 0, 64, 64);

  var star = {
    x: 32,
    y: 32,
    size: 6,
    strokeOffset: 16,
    bounds: 64
  }

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
  //var endAngle = ring * Math.PI
  var counterClockwise = true;

  ring += 0.02;
  if (ring <= 0) {
    ring = 2;
  }
  endAngle = ring * Math.PI

  layer.beginPath();
  layer.lineWidth = 3;
  layer.strokeStyle = 'red';
  layer.arc(star.x, star.y, radius, startAngle, endAngle, counterClockwise);
  layer.stroke();

  // visual bounds
  layer.beginPath();
  layer.lineWidth = 1;
  layer.strokeStyle = 'lime';
  layer.rect(star.x-(star.bounds/2),star.y-(star.bounds/2),star.bounds,star.bounds);
  layer.stroke();
}






// create grid and render it as a canvas.
var gridImage;
var gridPositions = [];

function drawGrid() {
  var gridCanvas = document.createElement('canvas');
      gridCanvas.width = canvas.width;
      gridCanvas.height = canvas.height;
  var gridContext = gridCanvas.getContext('2d');
  var ctx = gridContext;

  gridImage = gridCanvas;

  // figure out how to draw a 5 column grid (vert) and repeat horizontally.
  var grid = {
    size: 64
  }

  var horizontal;
  var vertical;
  var positionX = 0;
  var positionY = 0;
  var order;

  for (var i = 0; i < 10; i++) {
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
  for (var i = 0; i < 5; i++) {
    if (order === true) {
      order = false;
      squareColor = 'rgba(0,0,0,0.05)';
    } else {
      order = true;
      squareColor = 'rgba(0,0,0,0.15)';
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
