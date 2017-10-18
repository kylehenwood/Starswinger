 // Starwizard star test
(function() {

  // this needs to be called first
  setupCanvas();

  // create game canvas element
  drawGameSetup();

  controls();
  mouseTestSetup();
  createMenu()

  // setup sub canvases
  gameOverSetup();
  pauseSetup();
  createIntro();

  setupForeground();

  setupGameOverlay();
  loadAudio();

  // point at which game starts...
  var urlHash = window.location.hash;
  //console.log(urlHash);
  switch(urlHash) {
    case '#game-play': // play game
      startGame();
      break;
    case '#game-intro':
      setupIntro();
      break;
    case '#game-menu':
      setupMenu();
      break;
    case '#game-loading':
      setupLoading();
      break;

    default: setupLoading();
  }

  // RAF
  runGame();


}());

// I want the game level & the game intro to co-exist.



// need to build a state engine or something
/*
  game.state = loading
  game.state = intro
  game.state = intro waiting (play now) + settings
  game.state = settings (settings:controls:stats)
  game.state = play
  game.state = play.pause
  game.state = play.pause.menu
  game.state = gameOver
*/
