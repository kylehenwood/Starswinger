 // Starwizard star test
(function() {
  setupCanvas();

  controls();
  mouseTestSetup();
  // setup
  gameOverSetup();
  createPauseCanvas();
  createIntroCanvas();

  // create game canvas element
  drawGameSetup();

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
    case '#game-loading':
      setupLoading();
      break;

    default: gameLoading();
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
