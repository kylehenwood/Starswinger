function setupGameOverAnimation() {
  gameState = 'animateGameOver';
  animateGameOver.state = 1;
  soundFalling();
  updateGameOver();
}

//--------

var animateGameOver = {
  state: 1,
  overlayAlpha: 0,
  amount: null
}

function updateGameOverAnimation() {

  //::state 1
  // Camera move up X amount
  if (animateGameOver.state === 1) {

    // animation parameters
    var anim = {
      from: cameraY,
      to: cameraY-200,
      duration: 80,
      easing: 'easeOutQuad'
    }

    // get new value
    val = animateNum(anim.from,anim.to,anim.duration,anim.easing);

    // updated animated value
    cameraY = val.value;

    // if animation finished
    if (val.complete === true) {
      console.log('done');
      animateGameOver.state = 2;
    }
  }


  //::state 2
  // Camera mode down + slow;
  if (animateGameOver.state === 2) {
      // animation parameters
      var anim = {
        from: cameraY,
        to: 0,
        duration: 48,
        easing: 'easeInOutQuad'
      }

      // get new value
      val = animateNum(anim.from,anim.to,anim.duration,anim.easing);

      // updated animated value
      cameraY = val.value;

      // if animation finished
      if (val.complete === true) {
        console.log('done');
        animateGameOver.state = 3;
      }
  }

  //::state 3
  if (animateGameOver.state === 3) {
    gameState = 'gameOver';
    animateGameOver.state = 1;
    return;
  }


  //console.log(cameraY);

}
