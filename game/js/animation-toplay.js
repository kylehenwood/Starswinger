function animateStart() {
  gameState = 'animateGameStart';
  start.xCamera = canvas.width/2;
  newCharacter.posX = (canvas.width/2)-32;
}

var camera = {
  cameraX: 0,
  cameraY: 0
}

var start = {
  state: 0,
  count1: 0,
}

function updateStart() {

  var context = canvas.ctx;

  // floating platform
  //newCharacter.posX += 0.5;



  if (logo.alpha > 0) {
    logo.alpha -= 0.010;
    if (logo.alpha < 0){
      logo.alpha = 0;
    }
  }
  console.log(logo.alpha);

  context.save();
  context.globalAlpha = logo.alpha;
  context.drawImage(logo.canvas,logo.posX+=(moveCanvas.moveSpeed*0.6),logo.posY);
  context.restore();

  context.drawImage(platform.canvas,platform.posX+=(moveCanvas.moveSpeed*1.3),platform.posY);
}
