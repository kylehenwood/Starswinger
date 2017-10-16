// swapping hooks
var allowClick = true;

function changeHook(hookIndex) {

  // save hook data into temp var
  var scoutHook = starHooks[hookIndex];

  // check to see if star is dead, if yes perform no action
  if (scoutHook.star.alive === false) {
    return false;
  }

  if (allowClick === true) {
    allowClick = false;
    // detach from hook if already attached to one
    //if (selectedHookTest != null) {
      detach();
    //}

    // set global variables
    selectedHookTest = scoutHook;
    cameraMode = 'hook';
    selectedHookTest.selected = true;
    hookGrappel.launch = true;

    // find the center point of the new hook, and update it for drawing grappel.
    selectedHook.centerX = selectedHookTest.posX+(selectedHookTest.size/2);
    selectedHook.centerY = selectedHookTest.posY+(selectedHookTest.size/2);

    // calculate how many frames the grappel will need to reach hook @60fps.
    var percent = (character.grappelDelay/1000);
    var frames = 60*percent;
    hookGrappel.interations = frames;
    hookGrappel.currentIteration = 0;

    setTimeout(function(){
      if (gameState != 'gameOver') {
        attach();
        repositionSwing();
        hookGrappel.launch = false;
      }
      allowClick = true;
    },character.grappelDelay);
  }
}
