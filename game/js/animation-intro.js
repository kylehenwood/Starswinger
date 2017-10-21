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
  cameraY = 25;
}

function createIntro() {}
function updateIntro() {
  if (intro.val < 50) {
    intro.val+= 1;
  }

  character.centerX = canvas.width/2;
  character.centerY = canvas.height/2;

  if (cameraY > 0) {
    cameraY -= 0.5;
  }


  if (intro.val >= 50) {
    cameraY = 0;
    backToMenu();
  }

  //console.log(character.centerY);
  //console.log('updateIntro');
}
