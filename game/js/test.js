 // Starwizard star test
(function() {
  setup();
  controls();

  // setup
  gameOverSetup();
  createGrid();
  createPanel();
  drawGameSetup();
  //characterSetup();
  mouseTestSetup();

  // !todo remove this primitive method of setting start position.
  // set starting hook
  selectedHookTest = starHooks[0];
  newCharacter.posX = 50;
  newCharacter.posY = selectedHookTest.posY;
  // need to redo this
  changeHook();
  repositionSwing();

  // RAF
  runGame();
}());




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
