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
    detach();
    // set global variable to hook
    selectedHookTest = scoutHook;
    cameraMode = 'hook';
    selectedHookTest.selected = true;


    setTimeout(function(){
      if (gameState != 'gameOver') {
        attach();
        repositionSwing();
        allowClick = true;
      }
    },character.grappelDelay);
  }
}
