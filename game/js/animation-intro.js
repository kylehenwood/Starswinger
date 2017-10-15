// game intro (after load)
// slow -- 5/8 seconds

// animates from stars down, introducing the character and title.


function setupIntro() {
  gameState = 'menuAnimation';
  menuStage = 1;

  logo.alpha = 0;
  playButton.alpha = 0;
  menuAlpha = 0;
}
function createIntro() {}
function updateIntro() {
  gameState = 'gameMenu';
}
