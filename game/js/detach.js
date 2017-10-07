function detach() {
  gravity = 0;
  cameraMode = 'character';
  selectedHook = null;
  newCharacter.swinging = false;

  // de select the selected hook;
}


function attach() {
  gravity = 0;
  cameraMode = 'hook';
  newCharacter.swinging = true;
}
