// Starwizard star test

$(document).ready(function(){
    setup();
    //controls();

    createHook();
    createHook();
    createHook();

    // RAF
    drawGrid();
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
function controls() {
  // mouse
  $(document).on('mousedown', function(e) {
    mouseState = 'down';
  });
  $(document).on('mouseup',function(e) {
    mouseState = 'up';
  });
}



// create mini canvas's of hooks
var starHooks = [];

function createHook() {
  var hookCanvas = document.createElement('canvas');
      hookCanvas.width = 64;
      hookCanvas.height = 64;
  var hookContext = hookCanvas.getContext('2d'); // Pass the context to draw the star

  // draw the hook
  drawHook(hookContext);

  starHooks.push({
      layer:hookCanvas,
      ctx: hookContext,
      x: (rand(0,12)*64)-64, // put these on a 64px grid
      y: (rand(0,4)*64)-64, // put these on a 64px grid + mark a square as filled
      power: 2000
  });
}

function drawHook(layer) {
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

  // visual bounds
  layer.beginPath();
  layer.lineWidth = 1;
  layer.strokeStyle = 'red';
  layer.rect(star.x-(star.bounds/2),star.y-(star.bounds/2),star.bounds,star.bounds);
  layer.stroke();
}

//
//
// RAF ----------------------------------------------------------------------------
//
//

function testing() {
  requestAnimationFrame(testing);

  // Clear Canvas
  clear(canvas);

  canvas.ctx.drawImage(gridImage,0,0);

  // draw layers
  for (var i = 0; i < starHooks.length; i++) {
    if ([i] != 0) {
      var layer = starHooks[i];
      canvas.ctx.drawImage(layer.layer, layer.x, layer.y);
    }
  }


  // Currently hooked onto layer 1
  // figure out how to update a layer you've hooked onto...

  var grappled = starHooks[0];

  starGrappel(grappled); // updates layer X
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

  for (var i = 0; i < 12; i++) {
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
