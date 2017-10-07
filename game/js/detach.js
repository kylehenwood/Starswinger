function detach() {
  gravity = 0;
  cameraMode = 'character';
  newCharacter.swinging = false;
}


function attach() {
  gravity = 0;
  cameraMode = 'hook';
  newCharacter.swinging = true;
}
