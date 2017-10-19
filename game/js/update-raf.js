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

  if (gameState === 'loading') {
    updateLoading(gameLoading.context);
    canvas.context.drawImage(gameLoading.canvas,0,0);
    return;
  }

  if (gameState === 'gameIntro') {
    updateIntro();

    updateCharacter();
    drawCharacter(canvas.context)
  }

  if (gameState === 'menuAnimation') {
    animateToMenu();

    updateCharacter();
    drawCharacter(canvas.context)
  }

  // background effects / parralax
  // pass variables of sideways / vertical movement
  //drawBackground();

  // game intro
  if (gameState === 'gameMenu') {
    updateMenu();
    canvas.context.drawImage(gameMenu.canvas,0,0);
    drawCharacter(canvas.context);
  }

  // update game canvas
  if (gameState === 'playGame' || gameState === 'gameRestart') {
    updateGame();
    drawCharacter(gamePanel.context);
  }

  if (gameState === 'gameRestart') {
    restartAnimation();
    //return;
  }

  if (gameState === 'animateGameStart') {
    updateStart();
    drawCharacter(canvas.context)
  }


  if (gameState === 'playGame' || gameState === 'gameOver' || gameState === 'gamePaused' || gameState === 'gameRestart' || gameState === 'gameResume' || gameState === 'animateGameOver') {
    // Draw canvases
    // draw before move update as update game uses those numbers to clear canvas
    canvas.context.drawImage(gamePanel.canvas,moveCanvas.currentPos,cameraY);
    canvas.context.drawImage(clickAreas.canvas,0+moveCanvas.currentPos,cameraY);
  }



  // // Move camera (GAME)
  // if (gameState === 'animateGameStart') {
  //   // Move the camera position to either catch up to the character or selected hook.
  //   moveCanvas.selectedPos = (character.centerX-(canvas.width/2)+(character.size/2))*-1;
  //   moveCanvas.moveSpeed = ((moveCanvas.selectedPos - moveCanvas.currentPos)/moveCanvas.interations);
  //   // update
  //   moveCanvas.currentPos += moveCanvas.moveSpeed;
  // }

  // Move camera (GAME)
  if (gameState === 'playGame' || gameState === 'animateGameOver') {
    // Move the camera position to either catch up to the character or selected hook.
    if (cameraMode === 'hook') {
      moveCanvas.selectedPos = (selectedHook.posX-(canvas.width/2)+(selectedHook.size/2))*-1;
      moveCanvas.moveSpeed = ((moveCanvas.selectedPos - moveCanvas.currentPos)/moveCanvas.interations);
    } else {
      moveCanvas.selectedPos = (character.centerX-(canvas.width/2)+(character.size/2))*-1;
      moveCanvas.moveSpeed = ((moveCanvas.selectedPos - moveCanvas.currentPos)/moveCanvas.interations);
    }

    // update
    moveCanvas.currentPos += moveCanvas.moveSpeed;
    //cameraX = moveCanvas.currentPos;
  }

  if (gameState === 'gamePaused' || gameState === 'gameOver') {
    moveCanvas.moveSpeed = 0;
  }

  if (gameState === 'gamePaused' || gameState === 'gameResume') {
    updateForeground(canvas.context,moveCanvas.moveSpeed,cameraY,false);
  } else {
    updateForeground(canvas.context,moveCanvas.moveSpeed,cameraY,true);
  }





  // paint foreground
  //canvas.context.drawImage(foreground.canvas,0,0);

  // paint UI
  updateInterface();


  if (gameState === 'animateGameOver') {
    detach();
    updateGameOverAnimation();
    updateGame();
    drawCharacter(canvas.context);
    // its not visible because it moves off the canvas...
    //character.centerX = canvas.width/2;
  }

  // Game over check if character is below the screen, or game state is :gameOver"
  if (character.centerY-(character.size/2) > canvas.height && gameState === 'playGame') {
    //gameState = 'gameOver';
    setupGameOverAnimation();
  }

  // the below states overlay the game, thus they are drawn last
  if (gameState === 'gameOver') {
    gameOverUpdate();
    canvas.context.drawImage(gameOver.canvas,0,0);
  }

  if (gameState === 'gamePaused' || gameState === 'gameResume') {
    canvas.context.drawImage(pauseCanvas.canvas,0,0);
  }
  // pause icon
  if (gameState === 'playGame' || gameState === 'gameResume') {
    canvas.context.fillStyle = 'white';
    canvas.context.fillRect(32,canvas.height-56,4,32);
    canvas.context.fillRect(48,canvas.height-56,4,32);
  }

  //console.log(cameraY);
  //console.log(starConnected);
  //console.log(gameState);
  //console.log(starHooks.length);
  //console.log(selectedHook);
  //console.log(Math.round(character.centerX,2)+','+Math.round(character.centerY,2));
}




function testUpdate() {
  switch(gameState) {
    case 'gameIntro':
      //UPDATE
      //DRAW
      break;
  }
}
