// game intro (after load)
// slow -- 5/8 seconds

// animates from stars down, introducing the character and title.
var intro = {
  val: 0,
  speed: 320
}

function setupIntro() {
  gameState = 'gameIntro';
  menuStage = 1;

  // make sure elements used in this comp are set to invisible.
  logo.alpha = 0;
  playButton.alpha = 0;
  menuAlpha = 0;
  intro.val = 0;
  cameraY = 2000;
}

function createIntro() {}
function updateIntro() {
  if (intro.val < 1000) {
    intro.val+= 10;
  }

  newCharacter.posX = canvas.width/2;
  newCharacter.posY = canvas.height/2;

  if (cameraY > 0) {
    cameraY -= 50;
  }


  if (intro.val >= 1000) {
    backToMenu();
  }
  console.log(newCharacter.posY);
  console.log('updateIntro');
}
