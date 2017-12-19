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

  switch(gameState) {
    case 'loading':
    //Update
    updateLoading(gameLoading.context);
    // Draw
    canvas.context.drawImage(gameLoading.canvas,0,0);
    break;


    case 'gameIntro':
    updateIntro();
    break;


    case 'menuAnimation':
    // Update
    animateToMenu();
    drawForeground(canvas.context,moveCanvas.moveSpeed,cameraY,true);
    // Draw
    drawBackground();
    canvas.context.drawImage(gamePanel.canvas,moveCanvas.currentPos,cameraY);
    //canvas.context.drawImage(clickAreas.canvas,moveCanvas.currentPos,cameraY); // doesn't exist untill game starts
    drawCharacter(canvas.context);
    drawGameOverlay(canvas.context,'fade-out');
    break;


    case 'gameMenu':
    //Update
    updateMenu();
    //Draw
    drawBackground();
    canvas.context.drawImage(gamePanel.canvas,moveCanvas.currentPos,cameraY);
    canvas.context.drawImage(clickAreas.canvas,moveCanvas.currentPos,cameraY);
    drawCharacter(canvas.context);
    drawForeground(canvas.context,moveCanvas.moveSpeed,cameraY,true);
    canvas.context.drawImage(gameMenu.canvas,0,0);
    break;


    case 'playGame':
    updateGame();
    updateCamera();
    // update
    drawBackground();
    drawCharacter(gamePanel.context);
    canvas.context.drawImage(gamePanel.canvas,moveCanvas.currentPos,cameraY);
    canvas.context.drawImage(clickAreas.canvas,moveCanvas.currentPos,cameraY);
    drawForeground(canvas.context,moveCanvas.moveSpeed,cameraY,true);
    updateMoonPowerBar();
    moveCanvas.currentPos += moveCanvas.moveSpeed;
    // pause icon
    drawPauseIcon();

    // game over condition
    if (character.centerY-(character.size/2) > canvas.height) {
      setupGameOverAnimation();
    }
    break;


    case 'gameRestart':
    //Update
    updateGame();
    restartAnimation();
    //draw
    drawBackground();
    canvas.context.drawImage(gamePanel.canvas,moveCanvas.currentPos,cameraY);
    canvas.context.drawImage(clickAreas.canvas,moveCanvas.currentPos,cameraY);
    drawCharacter(gamePanel.context);
    drawForeground(canvas.context,moveCanvas.moveSpeed,cameraY,true);
    drawGameOverlay(canvas.context,'fade-out');
    break;


    case 'animateGameStart':
    updateGame();
    updateStart();
    //draw
    drawBackground();
    drawCharacter(gamePanel.context);
    canvas.context.drawImage(gamePanel.canvas,moveCanvas.currentPos,cameraY);
    canvas.context.drawImage(clickAreas.canvas,moveCanvas.currentPos,cameraY);
    drawForeground(canvas.context,moveCanvas.moveSpeed,cameraY,true);
    break;


    case 'gameOver':
    moveCanvas.moveSpeed = 0;
    //draw
    drawBackground();
    canvas.context.drawImage(gamePanel.canvas,moveCanvas.currentPos,cameraY);
    canvas.context.drawImage(clickAreas.canvas,moveCanvas.currentPos,cameraY);
    drawForeground(canvas.context,moveCanvas.moveSpeed,cameraY,true);
    drawGameOverlay(canvas.context,'fade-in');
    canvas.context.drawImage(gameOver.canvas,0,0);
    break;


    case 'animateGameOver':
    //update
    detach();
    updateGameOverAnimation();
    updateGame();
    updateCamera();
    //draw
    drawBackground();
    moveCanvas.currentPos += moveCanvas.moveSpeed;
    canvas.context.drawImage(gamePanel.canvas,moveCanvas.currentPos,cameraY);
    canvas.context.drawImage(clickAreas.canvas,moveCanvas.currentPos,cameraY);
    drawForeground(canvas.context,moveCanvas.moveSpeed,cameraY,true);
    drawGameOverlay(canvas.context,'fade-in');
    drawCharacter(canvas.context);
    break;


    case 'gamePaused':
    moveCanvas.moveSpeed = 0;
    //draw
    drawBackground();
    canvas.context.drawImage(gamePanel.canvas,moveCanvas.currentPos,cameraY);
    canvas.context.drawImage(clickAreas.canvas,moveCanvas.currentPos,cameraY);
    drawForeground(canvas.context,moveCanvas.moveSpeed,cameraY,false);
    canvas.context.drawImage(pauseCanvas.canvas,0,0);
    break;


    case 'gameResume':
    //draw
    drawBackground();
    canvas.context.drawImage(gamePanel.canvas,moveCanvas.currentPos,cameraY);
    canvas.context.drawImage(clickAreas.canvas,moveCanvas.currentPos,cameraY);
    drawForeground(canvas.context,moveCanvas.moveSpeed,cameraY,false);
    canvas.context.drawImage(pauseCanvas.canvas,0,0);
    // pause icon
    drawPauseIcon();
    break;

  }

  //console.log(starCameraY);
  //console.log(cameraY);
  //console.log('-----');
  // paint UI
  updateInterface();
}


// Set wether the camera follows character or snaps to a hookr
function updateCamera() {
  if (cameraMode === 'hook') {
    moveCanvas.selectedPos = (selectedHook.posX-(canvas.width/2)+(selectedHook.size/2))*-1;
    moveCanvas.moveSpeed = ((moveCanvas.selectedPos - moveCanvas.currentPos)/moveCanvas.interations);
  } else {
    moveCanvas.selectedPos = (character.centerX-(canvas.width/2)+(character.size/2))*-1;
    moveCanvas.moveSpeed = ((moveCanvas.selectedPos - moveCanvas.currentPos)/moveCanvas.interations);
  }
}
