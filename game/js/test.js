 // Starwizard star test
(function() {
  setup();
  controls();

  // setup
  createGrid();
  createPanel();
  drawGameSetup();
  //characterSetup();
  mouseTestSetup();

  // !todo remove this primitive method of setting start position.
  // set starting hook
  selectedHookTest = starHooks[0];
  newCharacter.currentPosX = 50;
  newCharacter.currentPosY = selectedHookTest.posY;
  // need to redo this
  changeHook();
  repositionSwing();

  // RAF
  runGame();
}());
