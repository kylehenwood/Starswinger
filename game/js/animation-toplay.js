function animateStart() {
  gameState = 'animateGameStart';
  character.centerX = (canvas.width/2);
}

var camera = {
  cameraX: 0,
  cameraY: 0
}

var start = {
  state: 0,
  count: 0,
}

function updateStart() {

  var context = canvas.ctx;

  if (start.count < 200) {
    start.count++
  } else {
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
  //context.drawImage(logo.canvas,logo.posX+=(moveCanvas.moveSpeed*0.6),logo.posY);
  context.drawImage(logo.canvas,logo.posX,logo.posY);
  context.restore();

  //context.drawImage(platform.canvas,platform.posX+=(moveCanvas.moveSpeed*1.3),platform.posY);
  context.drawImage(platform.canvas,platform.posX,platform.posY);
}
