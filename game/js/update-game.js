
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
  //gameContext.drawImage(gridImage,0,0);


  // if character is grappeling a hook
  if (newCharacter.swinging === true) {
    if (testingBool === true) {
      drawTrajectory(gameContext);
    }
    drawRope(gameContext);
  } else {
    characterFalling(gameContext);
  }

  // update character positions
  character.posX = newCharacter.posX-(newCharacter.size/2);
  character.posY = newCharacter.posY-(newCharacter.size/2);
  character.centerX = newCharacter.posX;
  character.centerY = newCharacter.posY;

  // launch grappel from character to hook
  if(hookGrappel.launch === true) {
    grappelLaunch(gamePanel.context);
  }

  drawCharacter(gameContext);


  // this is where I draw hooks to the game canvas.

  // Update selected hook if it exists
  if (selectedHookTest != null) {
    drawHook(selectedHookTest.ctx,selectedHookTest.star,selectedHookTest);
  }

  // draw each hook to this canvas.
  for (var i = 0; i < starHooks.length; i++) {
    var hook = starHooks[i];
    gameContext.drawImage(hook.layer, hook.posX, hook.posY);
  }
}


// when character is not attached, move it based on momentium and gravity
function characterFalling(ctx) {
  gravity += gravityIncrease;
  newCharacter.posY += gravity;
  newCharacter.posX += momentiumIncrease;
}

// Draw rope & calculate swing
function drawRope(context) {

  var hookX = selectedHook.centerX;
  var hookY = selectedHook.centerY;

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
