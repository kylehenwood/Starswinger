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

    updateCharacter();
    drawCharacter(canvas.ctx)
  }

  if (gameState === 'menuAnimation') {
    animateToMenu();

    updateCharacter();
    drawCharacter(canvas.ctx)
  }

  // background effects / parralax
  // pass variables of sideways / vertical movement
  //drawBackground();

  // game intro
  if (gameState === 'gameMenu') {
    updateMenu();
    canvas.ctx.drawImage(gameMenu.canvas,0,0);

    updateCharacter();
    drawCharacter(canvas.ctx);
  }

  // update game canvas
  if (gameState === 'playGame' || gameState === 'gameRestart') {
    updateGame();

    updateCharacter();
    drawCharacter(gamePanel.context);
  }

  if (gameState === 'gameRestart') {
    restartAnimation();
    //return;
  }

  if (gameState === 'animateGameStart') {
    updateStart();
    drawCharacter(canvas.ctx)
  }



  if (gameState === 'playGame' || gameState === 'gameOver' || gameState === 'gamePaused' || gameState === 'gameRestart' || gameState === 'gameResume') {
    // Draw canvases
    // draw before move update as update game uses those numbers to clear canvas
    canvas.ctx.drawImage(gamePanel.canvas,moveCanvas.currentPos,cameraY);
    canvas.ctx.drawImage(clickAreas.canvas,0+moveCanvas.currentPos,cameraY);
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
  if (gameState === 'playGame') {
    // Move the camera position to either catch up to the character or selected hook.
    if (cameraMode === 'hook') {
      moveCanvas.selectedPos = (selectedHookTest.posX-(canvas.width/2)+(selectedHookTest.size/2))*-1;
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
    updateForeground(canvas.ctx,moveCanvas.moveSpeed,cameraY,false);
  } else {
    updateForeground(canvas.ctx,moveCanvas.moveSpeed,cameraY,true);
  }





  // paint foreground
  //canvas.ctx.drawImage(foreground.canvas,0,0);

  // paint UI
  updateInterface();


  // Game over check if character is below the screen, or game state is :gameOver"
  if (character.centerY-(character.size/2) > canvas.height && gameState === 'playGame') {
    gameState = 'gameOver';
  }


  // the below states overlay the game, thus they are drawn last
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




function testUpdate() {
  switch(gameState) {
    case 'gameIntro':
      //UPDATE
      //DRAW
      break;
  }
}
