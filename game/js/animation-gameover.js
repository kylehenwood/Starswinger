function setupGameOverAnimation() {
  gameState = 'animateGameOver';
  animateGameOver.state = 1;
  soundFalling();
  updateGameOver();
}

var animateGameOver = {
  state: 1,
  overlayAlpha: 0,
  progress: 0,
  set: false,
  amount: null
}

var stageOne;

function updateGameOverAnimation() {
  //console.log(cameraY);
  //console.log(starCameraY);


  //::state 1
  // Camera move up X amount
  if (animateGameOver.state === 1) {

    if (animateGameOver.set === false) {
      animateGameOver.set = true;
      var currentNum = cameraY;
      var amountMove = -160;
      var valueWant = cameraY-amountMove;
    }

    var duration = 20;
    //var valueWant = -160;
    var valueHave = cameraY;
    var animProgress = animationProgress(duration,animateGameOver.progress);
    var animation = EasingFunctions.easeOutQuad(animProgress.value/100);
    var valueHave = valueWant*animation;

    animateGameOver.progress = animProgress.value;

    if (animProgress.complete === true) {
      console.log('working as intended');
      animateGameOver.progress = 0;
      animateGameOver.state = 2;
    }

    cameraY = valueHave+currentNum;
    starCameraMoveY = valueHave*0.2;

  }

  //::state 2
  // Camera mode down + slow;
  if (animateGameOver.state === 2) {

    var duration = 200;
    var valueWant = 160;
    var animProgress = animationProgress(duration,animateGameOver.progress);
    var animation = EasingFunctions.easeInOutQuad(animProgress.value/100);
    var valueHave = valueWant*animation;

    animateGameOver.progress = animProgress.value;

    if (animProgress.complete === true) {
      console.log('working as intended');
      animateGameOver.progress = 0;
      animateGameOver.state = 3;
    }

    cameraY = valueHave;
    starCameraMoveY = valueHave*0.2;
  }


  //::state 3
  if (animateGameOver.state === 3) {
    gameState = 'gameOver';
    animateGameOver.state = 1;
    return;
  }
}
