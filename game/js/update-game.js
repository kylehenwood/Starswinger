
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
  if (character.swinging === true) {
    if (testingBool === true) {
      drawTrajectory(gameContext);
    }
    drawRope(gameContext);
  } else {
    characterFalling(gameContext);
  }

  // launch grappel from character to hook
  if(hookGrappel.launch === true) {
    grappelLaunch(gamePanel.context);
  }

  // this is where I draw hooks to the game canvas.

  // Update selected hook if it exists
  if (selectedHook != null) {
    drawHook(selectedHook);
  }

  // draw each hook to this canvas.
  for (var i = 0; i < starHooks.length; i++) {
    var hook = starHooks[i];
    gameContext.drawImage(hook.layer, hook.posX, hook.posY);
  }
}
