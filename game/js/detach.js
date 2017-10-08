var starConnected = false;

// detach from hook.
function detach() {
  // do nothing if the detatch function is called multiple times in a row
  if (starConnected === true) {
    starConnected = false;
  } else {
    return false;
  }

  //console.log("detach");
  cameraMode = 'character';
  newCharacter.swinging = false;

  // de select the selected hook;
  if (selectedHookTest != null) {
    selectedHookTest.selected = false; // allow the hook to be selected again
    drawHook(selectedHookTest.ctx,selectedHookTest.star,selectedHookTest);
    selectedHookTest = null;
  }
}



// attach to a hook.
function attach() {
  // do nothing if the detatch function is called multiple times in a row
  if (starConnected === false) {
    starConnected = true;
  } else {
    return false;
  }
  if (selectedHookTest != null) {
    //console.log("attach");
    gravity = 0;
    cameraMode = 'hook';
    selectedHookTest.selected = true;
    newCharacter.swinging = true;   // if character.connected === true, start draining the stars power.
  }
}
