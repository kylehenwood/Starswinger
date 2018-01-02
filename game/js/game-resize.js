function gameResizeSetup() {
  window.addEventListener('resize', function(event){
    gameResized();
  });
}

// do stuff here
function gameResized() {
  console.log('Game Resized');
  setMouseVariables();
}
