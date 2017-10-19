function animateStart() {
  gameState = 'animateGameStart';
  character.centerX = (canvas.width/2);
  logo.alpha = 1;
  logo.posX = (canvas.width/2)-(logo.width/2);

  // reset variables
  start = {
    state: 1,
    count: 0,
    moved: 1,
    logoAlpha: 100,
    platformAlpha: 100
  }

}

var start = {
  state: 1,
  count: 0,
  moved: 1,
  logoAlpha: 100,
  platformAlpha: 100
}

var startMove = 0;

function updateStart() {

  //console.log(start.state);
  //console.log(cameraY);


  var context = canvas.context;
  var cloudUp = 120;

  //----
  // state 1
  // Move character, platform and title
  if (start.state === 1){
    if (startMove < cloudUp-2) {
      var progress = animateEaseOut(cloudUp,startMove,24);
      startMove += progress;
      moveCanvas.moveSpeed = -progress*1.5;
      cameraY -= progress;


      character.centerY-=progress*0.6;
      platform.posY-=progress*0.6;

      character.centerX+=moveCanvas.moveSpeed;
      platform.posX+=moveCanvas.moveSpeed;
    } else {
      start.state = 2;
      startMove = 0;
    }
    context.drawImage(platform.canvas,platform.posX,platform.posY);
  }

  //----
  // state 2
  // Jump character then grappel
  // fade in game hooks
  if (start.state === 2) {
    if (character.centerY < logo.posY+4) {
      start.state = 4;
    }
    var jumpHeight = (logo.posY-character.centerY)/16;
    character.centerY += jumpHeight;
  }


  //----
  // move cameraY back to 0
  // fade out platform (crumble animation)
  if (start.state === 2) {
    if (cameraY > 0-1) {
      start.state = 4;
    }
    var cameraMove = (0-cameraY)/16;
    cameraY += cameraMove;
    platform.posY += cameraMove*0.6;
  }



  //----
  // state 4
  if (start.state === 4) {
    start.state = 1;
    startGame();
  }

  // fade out logo
  if (start.logoAlpha > 2) {
    var logoAlpha = (0-start.logoAlpha)/24;
    start.logoAlpha += logoAlpha;

    context.save();
    context.globalAlpha = (start.logoAlpha/100);
    context.drawImage(logo.canvas,logo.posX+=moveCanvas.moveSpeed,logo.posY);
    context.restore();
  }

  // fade out platform
  if (start.state >= 2 && start.platformAlpha > 0+1) {
    var platformAlpha = (0-start.platformAlpha)/8;
    start.platformAlpha += platformAlpha;
    context.save();
    context.globalAlpha = (start.platformAlpha/100);
    context.drawImage(platform.canvas,platform.posX,platform.posY);
    context.restore();
  }
}
