// connected to star[0] at game start
var starConnected = true;

// detach from hook.
function detach() {
  // do nothing if the detatch function is called multiple times in a row
  if (starConnected === true) {
    starConnected = false;
  } else {
    return;
  }

  //console.log("detach");
  cameraMode = 'character';
  character.swinging = false;

  // de select the selected hook;
  if (selectedHook != null) {
    selectedHook.selected = false; // allow the hook to be selected again
    drawHook(selectedHook);
    selectedHook = null;
  }
}



// attach to a hook.
function attach() {
  // do nothing if the detatch function is called multiple times in a row
  if (starConnected === false) {
    starConnected = true;
  } else {
    return;
  }

  if (selectedHook != null) {
    //console.log("attach");
    gravity = 0;
    cameraMode = 'hook';
    selectedHook.selected = true;
    character.swinging = true;   // if character.connected === true, start draining the stars power.
  }
}
