function gameOverSetup() {
  gameOver.canvas = document.createElement('canvas');
  gameOver.canvas.width = canvas.width;
  gameOver.canvas.height = canvas.height;
  gameOver.context = gameOver.canvas.getContext('2d');

  gameOver.context.rect(0,0,canvas.width,canvas.height)
  gameOver.context.fillStyle = 'rgba(000,000,000,0.6)';
  gameOver.context.fill();

  gameOver.context.fillStyle = 'white';
  gameOver.context.font = '24px lato';
  gameOver.context.textAlign="center";
  gameOver.context.fillText('GAME OVER: '+gameUserInterface.score, canvas.width/2, canvas.height/2);
}
