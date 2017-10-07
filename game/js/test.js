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
