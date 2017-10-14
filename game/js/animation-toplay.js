function animateStart() {
  gameState = 'animateGameStart';
}

var start = {
  state: 0
}

function updateStart() {
  //gameState = 'gamePlay';
  // if (moveCanvas.moveSpeed >= -40) {
  //   moveCanvas.moveSpeed -= 0.1;
  //   moveCanvas.currentPos += moveCanvas.moveSpeed;
  // } else {
    startGame();
  //}
}
