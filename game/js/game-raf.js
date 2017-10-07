//
// RAF ----------------------------------------------------------------------------
//

var moveCanvas = {
  currentPos: 0,
  selectedPos: 0,
  characterPos: 0,
  moveSpeed: 0,
  interations: 16
}

var cameraMode = 'hook'; // "character" or "hook"

// requestAnimationFrame function
function runGame() {
  requestAnimationFrame(runGame);

  // Clear Canvas
  clear(canvas);

  // update
  updateGame();

  //DRAW ----------------------

  // draw Game
  // 0,0 to be changed based on selected hook or character
  canvas.ctx.drawImage(gamePanel.canvas,moveCanvas.currentPos,0);

  // move canvas is the position
  moveCanvas.selectedPos = (selectedHookTest.posX-(canvas.width/2)+32)*-1;
  //moveCanvas.selectedPos = (selectedHookTest.posX-(canvas.width*2))*-1;

  // get distance
  // get time I want this to take
  if (cameraMode === 'hook') {
    moveCanvas.selectedPos = (selectedHookTest.posX-(canvas.width/2)+(selectedHookTest.size/2))*-1;
    moveCanvas.moveSpeed = ((moveCanvas.selectedPos - moveCanvas.currentPos)/moveCanvas.interations);
  } else {
    moveCanvas.selectedPos = (newCharacter.posX-(canvas.width/2)+(newCharacter.size/2))*-1;
    moveCanvas.moveSpeed = ((moveCanvas.selectedPos - moveCanvas.currentPos)/moveCanvas.interations);
  }
  moveCanvas.currentPos += moveCanvas.moveSpeed;
  // click event test.
  // Render elements.
  drawClicky();

  // paint UI
  updateInterface();
  gameOver();
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


  // if character is grappeling a hook
  if (newCharacter.swinging === true) {
    drawTrajectory(gameContext);
    drawRope(gameContext);
  } else {
    characterFalling(gameContext);
  }

  drawCharacter(gameContext);


  // Draw hooks
  // find and animate selected hook
  drawHook(starHooks[selectedHook].ctx,starHooks[selectedHook].star,true);
  // reset last hook. (once)
  if (lastHook.reset === false) {
    drawHook(starHooks[lastHook.val].ctx,starHooks[lastHook.val].star,false);
    //starHooks[lastHook.val].star.ring = 2; // reset the charge of a star
    lastHook.reset = true;
  }
  // draw each hook to this canvas.
  for (var i = 0; i < starHooks.length; i++) {
    var hook = starHooks[i];
    gameContext.drawImage(hook.layer, hook.posX, hook.posY);
  }
}

// end game
function gameOver() {
  if (newCharacter.posY > canvas.height+newCharacter.size || gameOver.gameEnded === true) {
    console.log('Game Over');
    // show score
    canvas.ctx.drawImage(gameOver.canvas,0,0);
    gameOver.gameEnded = true;
  }
}

var gravity = 0;
var momentiumY;
var momentiumX;

function characterFalling(ctx) {
  gravity += 0.4;
  newCharacter.posY += gravity;
  newCharacter.posX += (momentiumIncrease);
}






var maxAngle; // greatest angle of swing
var maxAngleIncrement; // if swing angle isn't 90 deg, increase swing speed on down untill it is.
var currentAngle; //angle in degrees - also the starting position when you connect to a new star
var momentiumIncrease = 0;
var momentiumAngle;
var swingDirection;
var swingSpeed = 0.1;
var maxSpeed = 2;
// draw the rope that connects character to hook

function drawRope(context) {

  var hookX = selectedHookTest.posX+(selectedHookTest.size/2);
  var hookY = selectedHookTest.posY+(selectedHookTest.size/2);

  if(swingDirection === 'right' && momentiumAngle < 0 || swingDirection === 'left' && momentiumAngle > 0) {
  //   //increase speed on downswing
  //   // !todo - think of a way to make this work untill max angle == 90
  //   //swingSpeed += 0.0001;
  //   // somehow increase max angle to 90;
  } else {
    //swingSpeed = 0.02;
  }

  // update swing direction
  if (momentiumIncrease > 0) {
    swingDirection = 'right';
  } else {
    swingDirection = 'left';
  }

  // different swing methods
  additiveSwing();

  // Rope length and positions
  var ropeLength = trajectory.hypotenuse;
  var sideY = Math.cos(momentiumAngle)*ropeLength;
  var sideX = Math.sin(momentiumAngle)*ropeLength;

  // calculate rope XY now I know the positions
  var ropeY = hookY + sideY;
  var ropeX = hookX + sideX;

  // update character position to where the rope ends
  newCharacter.posX = ropeX;
  newCharacter.posY = ropeY;

  context.beginPath();
  context.lineWidth = 2;
  context.moveTo(newCharacter.posX,newCharacter.posY);

  //-------------------------
  context.lineTo(hookX,hookY);
  context.strokeStyle = 'red';
  context.stroke();
  context.closePath();
}

function additiveSwing() {
  if (momentiumAngle <= 0) {
    // set speed maximum
    if (momentiumIncrease < 4) {
        momentiumIncrease+=swingSpeed;
    }
  } else {
    // set speed maximum
    if (momentiumIncrease > -4) {
      momentiumIncrease-=swingSpeed;
    }
  }
  currentAngle += momentiumIncrease;
  momentiumAngle = toRad(currentAngle);
}



// generate swing trajectory based on hook selection (fires on hook change)
function repositionSwing() {

  var hookX = selectedHookTest.posX+(selectedHookTest.size/2);
  var hookY = selectedHookTest.posY+(selectedHookTest.size/2);


  // UPDATE SWING trajectory HERE
  trajectory.characterPosX = newCharacter.posX;
  trajectory.characterPosY = newCharacter.posY;
  trajectory.starPosX = selectedHookTest.posX+(selectedHookTest.size/2);
  trajectory.starPosY = selectedHookTest.posY+(selectedHookTest.size/2);

  // make the negative values positive
  var triWidth = trajectory.starPosX-trajectory.characterPosX;
  var triHeight = trajectory.starPosY-trajectory.characterPosY;

  trajectory.hypotenuse = Math.hypot(triWidth,triHeight);

  // update character positions on hook change

  // calculate new angle based on triangle
  var adjacent = Math.abs(triHeight);
  var angle = Math.acos(adjacent/trajectory.hypotenuse);
  var direction;

  //
  if (trajectory.characterPosX < trajectory.starPosX) {
      //console.log('swingLeft');
      direction = 'left';
      currentAngle = toDeg(angle)*-1;
  } else {
      currentAngle = toDeg(angle);
      direction = 'right';
      //console.log('swingRight');
  }

  // I have a problem getting the correct ANGLE when the position of the swing is ABOVE the star...
  // fix? increase or subtract an extra 90deg when character position falls into these regions.
  if (trajectory.characterPosY < trajectory.starPosY) {
    if (trajectory.characterPosX < trajectory.starPosX) {
      // above left
      currentAngle = -90-(90+currentAngle);
    }
    if (trajectory.characterPosX > trajectory.starPosX) {
       // above right
       currentAngle = 90+(90-currentAngle);
    }
  }

  maxAngle = currentAngle;

  // maintain momentium when switching between hooks when the swing direction is the same.
  if (direction ==='left' && swingDirection === 'left' || direction ==='right' && swingDirection === 'right') {
    // remove momentem if hook is oppisite to direction swining
    momentiumIncrease = momentiumIncrease*0.5;
  } else {
    // keep momentem if swinging in same direction
    momentiumIncrease = momentiumIncrease*1.2;
  }
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
  ctx.lineTo(trajectory.starPosX,trajectory.starPosY); // HookX,HookY
  ctx.lineTo(trajectory.starPosX,trajectory.characterPosY); // startPointY, HookX
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
  size: 64,
  currentPosX: null,
  currentPosY: null,
  gravity: 2, // force pulling character down
  ropeLength: 320,
  interations: 16, // times it takes for the character to catch the hook
  swinging: true
}


// draw character
function drawCharacter(ctx) {

  var charX = newCharacter.posX-(newCharacter.size/2);
  var charY = newCharacter.posY-(newCharacter.size/2);

  // draw character
  ctx.beginPath();
  ctx.rect(charX,charY,newCharacter.size,newCharacter.size);
  ctx.fillStyle = 'white';
  ctx.fill();
}
