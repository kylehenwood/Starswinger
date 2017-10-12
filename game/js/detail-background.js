// all detail that appears infront of the character
function setupBackground() {}

function drawBackground() {
  // draw clouds at the bottom of screen.
  canvas.ctx.beginPath();
  canvas.ctx.rect(0,canvas.height-120,canvas.width,canvas.height);
  canvas.ctx.fillStyle = 'rgba(255,255,255,0.2)';
  canvas.ctx.fill();
}


// background contains... small stars (differing sizes / layers)
// MOON + lightrays
// shooting stars
// aruroa?
