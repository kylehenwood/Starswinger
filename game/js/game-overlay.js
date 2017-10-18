var gameOverlay = {
  alpha: 0
};


function setupGameOverlay() {
  gameOverlay.canvas = document.createElement('canvas');
  gameOverlay.canvas.width = canvas.width;
  gameOverlay.canvas.height = canvas.height;
  gameOverlay.context = gameOverlay.canvas.getContext('2d');

  gameOverlay.context.beginPath();
  gameOverlay.context.rect(0,0,canvas.width,canvas.height)
  gameOverlay.context.fillStyle = 'rgba(000,000,000,0.6)';
  gameOverlay.context.fill();
}



// 'fade-in' || 'fade-out'
function updateGameOverlay(context,state) {
  if (state === 'fade-in') {
      if (gameOverlay.alpha < 1) {
        gameOverlay.alpha += 0.02;
      } else {
        gameOverlay.alpha = 1;
      }
      context.save();
      context.globalAlpha = gameOverlay.alpha;
      context.drawImage(gameOverlay.canvas,0,0);
      context.restore();
  }

  if (state === 'fade-out') {
      if (gameOverlay.alpha > 1) {
        gameOverlay.alpha -= 0.05;
      } else {
        gameOverlay.alpha = 0;
      }
      context.save();
      context.globalAlpha = gameOverlay.alpha;
      context.drawImage(gameOverlay.canvas,0,0);
      context.restore();
  }
}
