// all detail that appears infront of the character
// parralax

function setupBackground() {}

function drawBackground() {
  // draw clouds at the bottom of screen.

  //drawBackgroundMoon(canvas.context);
  //drawBackgroundClouds(canvas.context);
}


function drawBackgroundMoon(context) {
  context.beginPath();
  context.arc(canvas.width/2, canvas.height+80, 200, 0, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();
  context.closePath();
}

function drawBackgroundClouds(context) {
  context.beginPath();
  context.rect(0,canvas.height-120,canvas.width,canvas.height);
  context.fillStyle = 'rgba(255,255,255,0.2)';
  context.fill();
  context.closePath();
}

// background contains... small stars (differing sizes / layers)
// MOON + lightrays
// shooting stars
// aruroa?
