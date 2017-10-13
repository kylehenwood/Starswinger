//
// RAF ----------------------------------------------------------------------------
//

var moveCanvas = {
  currentPos: 0,
  selectedPos: 0,
  moveSpeed: 0,
  interations: 16 // how many frames till camera catches target
}

var cameraMode = 'hook'; // "character" or "hook"
var cameraY = 0;
var cameraX = 0;

// requestAnimationFrame function
function runGame() {
  requestAnimationFrame(runGame);
  clear(canvas);

  //console.log(gameState);

  if (gameState === 'loading') {
    updateLoading(gameLoading.context);
    canvas.ctx.drawImage(gameLoading.canvas,0,0);
    return;
  }

  // background effects / parralax
  // pass variables of sideways / vertical movement
  //drawBackground();

  // game intro
  if (gameState === 'gameIntro') {
    updateIntro();
    canvas.ctx.drawImage(gameIntro.canvas,0,0);
    return;
  }

  // update game canvas
  if (gameState === 'playGame' || gameState === 'gameRestart') {
    updateGame();
  }

  if (gameState === 'playGame' || gameState === 'gameOver' || gameState === 'gamePaused' || gameState === 'gameRestart' || gameState === 'gameResume') {
    // Draw canvases
    // draw before move update as update game uses those numbers to clear canvas
    canvas.ctx.drawImage(gamePanel.canvas,moveCanvas.currentPos,cameraY);
    canvas.ctx.drawImage(clickAreas.canvas,0+moveCanvas.currentPos,cameraY);
  }

  // Move camera
  if (gameState === 'playGame') {
    // Move the camera position to either catch up to the character or selected hook.
    if (cameraMode === 'hook') {
      moveCanvas.selectedPos = (selectedHookTest.posX-(canvas.width/2)+(selectedHookTest.size/2))*-1;
      moveCanvas.moveSpeed = ((moveCanvas.selectedPos - moveCanvas.currentPos)/moveCanvas.interations);
    } else {
      moveCanvas.selectedPos = (newCharacter.posX-(canvas.width/2)+(newCharacter.size/2))*-1;
      moveCanvas.moveSpeed = ((moveCanvas.selectedPos - moveCanvas.currentPos)/moveCanvas.interations);
    }
    // update
    moveCanvas.currentPos += moveCanvas.moveSpeed;

    // hack for now
  } else {
    moveCanvas.moveSpeed = 0;
  }

  cameraX = moveCanvas.moveSpeed;
  updateForeground(canvas.ctx,cameraX,cameraY);

  // paint foreground
  //canvas.ctx.drawImage(foreground.canvas,0,0);

  // paint UI
  updateInterface();

  if (gameState === "gameRestart") {
    restartAnimation();
    return;
  }

  // Game over check if character is below the screen, or game state is :gameOver"
  if (newCharacter.posY > canvas.height+(newCharacter.size/2) || gameState === 'gameOver') {
    gameOverUpdate();
    canvas.ctx.drawImage(gameOver.canvas,0,0);
  }



  if (gameState === 'gamePaused' || gameState === 'gameResume') {
    canvas.ctx.drawImage(pauseCanvas.canvas,0,0);
  }
  // pause icon
  if (gameState === 'playGame' || gameState === 'gameResume') {
    canvas.ctx.fillStyle = 'white';
    canvas.ctx.fillRect(32,canvas.height-56,4,32);
    canvas.ctx.fillRect(48,canvas.height-56,4,32);
  }

  //console.log(cameraY);
  //console.log(starConnected);
  //console.log(gameState);
  //console.log(starHooks.length);
  //console.log(selectedHookTest);
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
