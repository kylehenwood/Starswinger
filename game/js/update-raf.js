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

  if (gameState === 'gameIntro') {
    updateIntro();
  }

  if (gameState === 'menuAnimation') {
    animateToMenu();
  }

  // background effects / parralax
  // pass variables of sideways / vertical movement
  //drawBackground();

  // game intro
  if (gameState === 'gameMenu') {
    updateMenu();
    menuCharacter(canvas.ctx,304);
    canvas.ctx.drawImage(gameMenu.canvas,0,0);
  }
  // update game canvas
  if (gameState === 'playGame' || gameState === 'gameRestart') {
    updateGame();
  }

  if (gameState === 'playGame' || gameState === 'gameRestart') {
    drawCharacter(gamePanel.context);
  }

  if (gameState === 'menuAnimation') {
    menuCharacter(canvas.ctx,introCharY);
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

  if (gameState === 'gamePaused' || gameState === 'gameResume') {
    updateForeground(canvas.ctx,moveCanvas.moveSpeed,cameraY,false);
  } else {
    updateForeground(canvas.ctx,moveCanvas.moveSpeed,cameraY,true);
  }

  // paint foreground
  //canvas.ctx.drawImage(foreground.canvas,0,0);

  // paint UI
  updateInterface();

  if (gameState === "gameRestart") {
    restartAnimation();
    return;
  }

  if (gameState === "animateGameStart") {
    updateStart();
  }

  // Game over check if character is below the screen, or game state is :gameOver"
  if (newCharacter.posY > canvas.height+(newCharacter.size/2) && gameState === 'playGame') {
    gameState = 'gameOver';
  }

  if (gameState === 'gameOver') {
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