// all detail that appears infront of the character
function setupForeground() {}

function drawForeground() {
  // draw clouds at the bottom of screen.
  canvas.ctx.beginPath();
  canvas.ctx.rect(0,canvas.height-80,canvas.width,canvas.height);
  canvas.ctx.fillStyle = 'rgba(255,255,255,0.8)';
  canvas.ctx.fill();
}
