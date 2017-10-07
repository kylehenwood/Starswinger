// Interface --------------------
function updateInterface() {
  canvas.ctx.textBaseline="middle";
  fpsCounter(canvas.ctx);
  scoreCounter(canvas.ctx);
  valueIndicator(canvas.ctx);
}

function valueIndicator(ctx) {
  ctx.fillStyle = 'white';
  ctx.font = '24px lato';
  //ctx.fillText('Val: '+momentiumAngle, 16, canvas.height-24);

  var deg = Math.round(toDeg(momentiumAngle),2);

  ctx.fillText('Angle: '+deg, 16, canvas.height-48);
  ctx.fillText('Momentum: '+momentiumIncrease, 16, canvas.height-24);
}

// fps display
var lastCalledTime;
var fps;
function fpsCounter(ctx) {
  if(!lastCalledTime) {
     lastCalledTime = performance.now();
     fps = 0;
     return;
  }
  delta = (performance.now() - lastCalledTime)/1000;
  lastCalledTime = performance.now();
  fps = Math.round(1/delta);

  ctx.fillStyle = 'white';
  ctx.font = '24px lato';
  ctx.fillText('FPS: '+fps, 16, 24);
}

function scoreCounter(ctx) {
  ctx.fillStyle = 'white';
  ctx.font = '24px lato';
  ctx.fillText('SCORE: '+gameUserInterface.score, canvas.width-200, 24);
}
