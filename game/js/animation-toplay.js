function animateStart() {
  gameState = 'animateGameStart';
  character.centerX = (canvas.width/2);
  logo.alpha = 1;
  logo.posX = (canvas.width/2)-(logo.width/2);
}

var start = {
  state: 0,
  count: 0,
}

function updateStart() {

  var context = canvas.context;

  if (start.count < 200) {
    start.count++
    moveCanvas.moveSpeed = -0.8;
  } else {
    moveCanvas.moveSpeed = 0;
    startGame();
  }

  // floating platform
  character.centerX += 0.5;



  if (logo.alpha > 0) {
    logo.alpha -= 0.010;
    if (logo.alpha < 0){
      logo.alpha = 0;
    }
  }
  //console.log(logo.alpha);

  context.save();
  context.globalAlpha = logo.alpha;
  context.drawImage(logo.canvas,logo.posX+=(moveCanvas.moveSpeed*0.6),logo.posY);
  //context.drawImage(logo.canvas,logo.posX,logo.posY);
  context.restore();

  context.drawImage(platform.canvas,platform.posX+=(moveCanvas.moveSpeed*1.3),platform.posY);
  //context.drawImage(platform.canvas,platform.posX,platform.posY);
}
