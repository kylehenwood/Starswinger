// Starwizard star test

$(document).ready(function(){
    setup();
    controls();

    // setup
    createGrid();
    createPanel();
    drawGameSetup();
    //characterSetup();

    // !todo remove this primitive method of setting start position.
    // set starting hook
    selectedHookTest = starHooks[0];

    // need to redo this
    changeHook();
    repositionSwing();

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
// holds the value of currently selected hook, on hook change
// this value should be placed back into starhooks array.
// while the new selected hook should be found here.
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
function changeHook(direction) {
  currentHook = selectedHook;
  newHook = selectedHook + direction;
  hookCount = starHooks.length;

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
  } else {
    // no hook exists - return nothing
    //selectedHookTest = starHooks[newHook];
    return;
  }
}




// create mini canvas's of hooks
var starHooks = [];
var gridPositions = [];
var gridImage;
var gridSize = {
  rows: 3,
  cols: 150,
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

  if (starHooks.length === 20) {
    star.safe = true;
  }

  // each hook lives on a 5x10 - 1-50
  starHooks.push({
      layer:hookCanvas,
      ctx: hookContext,
      star: star,
      posX: gridPositions[position].positionX,
      posY: gridPositions[position].positionY,
  });
}


function drawHook(layer,star,grappeled) {

  var saftey = false;

  if (star.alive === false) {
    // this star is dead, return false;
    // return false;
  }

  if(star.safe === true) {
    saftey = true;
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
  var endAngle; //var endAngle = ring * Math.PI
  var counterClockwise = true;

  if (grappeled === true && saftey === false && star.alive === true) {
    // do things
    gameScore += 1;
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
  // gonna need a switch statement
  if (grappeled === true) {
    layer.strokeStyle = 'lime';
    layer.lineWidth = 2;
  } else {
    layer.strokeStyle = 'red';
    layer.lineWidth = 1;
  }

  if (saftey === true) {
    layer.lineWidth = 3;
    layer.strokeStyle = 'cyan';
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


// character setup
var characterTest = {
    canvas: null,
    context: null,
    positionY: null,
    positionX: null
}
function characterSetup() {
  characterTest.canvas = document.createElement('canvas');
  characterTest.canvas.width = 400;
  characterTest.canvas.height = 300;
  characterTest.context = characterTest.canvas.getContext('2d');
  characterTest.positionX = (canvas.width/2)-(characterTest.canvas.width/2);
  characterTest.positionY = (gridSize.square*gridSize.rows);
}



//
// RAF ----------------------------------------------------------------------------
//

var moveCanvas = {
  currentPos: 0,
  selectedPos: 0,
  moveSpeed: 0,
  interations: 8
}

var character;

function testing() {
  requestAnimationFrame(testing);

  // Clear Canvas
  clear(canvas);

  // update
  updateGame();
  //updateCharacter();

  //DRAW ----------------------

  // draw Game
  canvas.ctx.drawImage(gamePanel.canvas,moveCanvas.currentPos,0);   // 0,0 to be changed based on selected hook

  // drawCharacter
  //canvas.ctx.drawImage(characterTest.canvas,characterTest.positionX,characterTest.positionY);

  // move canvas is the position
  // going i0nto an array every frame is bad
  moveCanvas.selectedPos = (selectedHookTest.posX-(canvas.width/2)+32)*-1;

  // get distance
  // get time I want this to take
  moveCanvas.moveSpeed = ((moveCanvas.selectedPos - moveCanvas.currentPos)/moveCanvas.interations);
  moveCanvas.currentPos += moveCanvas.moveSpeed;

  // paint UI
  updateInterface();
}


// paint game canvas & hooks + clear visible area(not entire gameCanvas)
// updates the game canvas layer
// controls when there needs to be more panels created.
// animates the currently selected star

function updateGame() {
  var gameCanvas = gamePanel.canvas;
  var gameContext = gamePanel.context;

  // clear
  var cameraPosition = canvas.width-moveCanvas.currentPos;

  gameContext.clearRect(0, 0, cameraPosition, canvas.height);

  // Draw grid
  gameContext.drawImage(gridImage,0,0);

  // Draw square and arc based on character position?
  drawTrajectory(gameContext);
  swingCharacter(gameContext);
  drawRope(gameContext);
  // Draw hooks
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
    var hook = starHooks[i];
    gameContext.drawImage(hook.layer, hook.posX, hook.posY);
  }
}


var swingDirection = 'right';
var momentium = 0;
var momentiumIncrease = 0.1;

// draw the rope that connects character to hook
function drawRope(context) {
  var hookX = selectedHookTest.posX+32;
  var hookY = selectedHookTest.posY+32;

  var charX = newCharacter.currentPosX+(newCharacter.size/2);
  var charY = newCharacter.currentPosY+(newCharacter.size/2);

  // draw line
  context.beginPath();
  context.lineWidth = 2;
  context.moveTo(charX,charY);

  context.lineTo(hookX,hookY);
  context.strokeStyle = 'cyan';
  context.stroke();
  context.closePath();





  // new rope
  // I want to change the length of starY

  var hypo = trajectory.hypotenuse; // length of the rope
  //var height = (charY-hookY); // length of the triangle side
  //var length = Math.sqrt(Math.pow(-hypo,2)-Math.pow(height,2));
  var width = (charX-hookX) + momentium;
  var widthProper = (charX-hookX);
  var height = Math.sqrt(Math.pow(-hypo,2)-Math.pow(width,2));

  //alertVal = width;

  if (swingDirection === 'right') {
    momentium = momentiumIncrease;
    momentiumIncrease = momentiumIncrease+0.2;
  } else {
    //console.log('subtract');
    momentium = momentiumIncrease;
    momentiumIncrease = momentiumIncrease-0.2;
  }


  console.log(momentiumIncrease);
  momentium += momentiumIncrease;

  charX = alertVal;

  //console.log(charY+','+hookY);
  //console.log('HYPO:'+hypo+',Y:'+height+',X:'+xpos)

  context.beginPath();
  context.lineWidth = 2;
  context.moveTo(hookX+width,height+hookY);

  //-------------------------
  context.lineTo(hookX,hookY);
  context.strokeStyle = 'red';
  context.stroke();
  context.closePath();


  // context.strokeStyle = 'magenta';
  // context.lineWidth = 1;
  // context.beginPath();
  // context.moveTo(charX,charY+50);  // startPointX, startPointY
  // context.lineTo(hookX,charY+50); // startPointY, HookX
  // context.lineTo(hookX,hookY); // HookX,HookY
  // context.closePath();    // hypotinuse
  // context.stroke();

}


// generate swing trajectory based on hook selection (fires on hook change)
function repositionSwing() {

  /*
    Calculate distance between current character position and new hook,
    draw triangle,
    calculate hypotinuse of triangle, that will be the radius of arc
    draw arc.
  */
  //alert(characterTest.positionX+','+characterTest.positionY);

  // UPDATE SWING trajectory HERE
  trajectory.characterPosX = newCharacter.currentPosX+(newCharacter.size/2);
  trajectory.characterPosY = newCharacter.currentPosY+(newCharacter.size/2);
  trajectory.starPosX = selectedHookTest.posX+32;
  trajectory.starPosY = selectedHookTest.posY+32;

  // make the negative values positive
  var triWidth = /*Math.abs*/(trajectory.starPosX-trajectory.characterPosX);
  var triHeight = (trajectory.starPosY-trajectory.characterPosY);

  trajectory.hypotenuse = Math.hypot(triWidth,triHeight);

  // needed when swinging exists
  //newCharacter.ropeLength = trajectory.hypotenuse;

  // update character positions on hook change
  newCharacter.posX = selectedHookTest.posX+(newCharacter.size/2);
  newCharacter.posY = selectedHookTest.posY + newCharacter.ropeLength;
  //newCharacter.posY = newCharacter.ropeLength;
}
var trajectory = {
  characterPosX: null,
  characterPosY: null,
  starPosX: null,
  starPosY: null,
  angle: null,
  hypotenuse: null,
  radius: null,
};


function drawTrajectory(ctx){

  // triangle of calculations
  ctx.strokeStyle = 'magenta';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(trajectory.characterPosX,trajectory.characterPosY);  // startPointX, startPointY
  ctx.lineTo(trajectory.starPosX,trajectory.characterPosY); // startPointY, HookX
  ctx.lineTo(trajectory.starPosX,trajectory.starPosY); // HookX,HookY
  ctx.closePath();    // hypotinuse
  ctx.stroke();

  // calculate hypotenuse === radius, draw circle on currentHook center
  ctx.beginPath();
  ctx.arc(trajectory.starPosX, trajectory.starPosY, trajectory.hypotenuse, 0, 2 * Math.PI, false);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'yellow';
  ctx.stroke();

}

var newCharacter = {
  posY: null,
  posX: null,
  size: 24,
  currentPosX: 0,
  currentPosY: 240,
  gravity: 2, // force pulling character down
  ropeLength: 320,
  interations: 16 // times it takes for the character to catch the hook
}


function swingCharacter(ctx) {

  // smooth animate to current position
  //newCharacter.currentPosX += ((newCharacter.posX - newCharacter.currentPosX)/newCharacter.interations);
  //newCharacter.currentPosY += ((newCharacter.posY - newCharacter.currentPosY)/newCharacter.interations);
  //swing.momentium += 5;

  var charX = newCharacter.currentPosX;
  var charY = newCharacter.currentPosY;// += newCharacter.gravity;

  // swing!

  // draw character
  ctx.beginPath();
  ctx.rect(charX,charY,newCharacter.size,newCharacter.size);
  ctx.fillStyle = 'white';
  ctx.fill();

  // if character moved down(Y) 20px, what would be its new X?
  ctx.beginPath();
  ctx.rect(charX,charY+50,newCharacter.size,newCharacter.size);
  ctx.fillStyle = 'orange';
  ctx.fill();
}






// Interface --------------------
var alertVal = null;

function updateInterface() {
  canvas.ctx.textBaseline="middle";
  fpsCounter(canvas.ctx);
  scoreCounter(canvas.ctx);
  valueIndicator(canvas.ctx);
}

function valueIndicator(ctx) {
  ctx.fillStyle = 'white';
  ctx.font = '24px lato';
  ctx.fillText('Val: '+alertVal, 16, canvas.height-24);
}

// fps display
var lastCalledTime;
var fps;
function fpsCounter(ctx) {
  if(!lastCalledTime) {
     lastCalledTime = performance.now();
     fps = 0;
     return;
  }
  delta = (performance.now() - lastCalledTime)/1000;
  lastCalledTime = performance.now();
  fps = Math.round(1/delta);

  ctx.fillStyle = 'white';
  ctx.font = '24px lato';
  ctx.fillText('FPS: '+fps, 16, 24);
}

function scoreCounter(ctx) {
  ctx.fillStyle = 'white';
  ctx.font = '24px lato';
  ctx.fillText('SCORE: '+gameScore, canvas.width-200, 24);
}
