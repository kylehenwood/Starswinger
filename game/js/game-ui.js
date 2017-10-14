var guiAlpha = 0;

// Interface --------------------
function updateInterface() {
  canvas.ctx.textBaseline="middle";
  fpsCounter(canvas.ctx);

  if (gameState === 'playGame') {
    if (guiAlpha < 1) {
      guiAlpha += 0.02;
    }
  } else {
    if (guiAlpha > 0) {
      guiAlpha -= 0.02;
    }
  }


  if (gameState === 'playGame') {
    canvas.ctx.save();
    canvas.ctx.globalAlpha = guiAlpha;
    scoreCounter(canvas.ctx);
    valueIndicator(canvas.ctx);
    canvas.ctx.restore();
  }
}

function valueIndicator(ctx) {
  ctx.fillStyle = 'white';
  ctx.font = '24px lato';
  //ctx.fillText('Val: '+momentiumAngle, 16, canvas.height-24);

  var deg = Math.round(toDeg(momentiumAngle),2);
  ctx.textBaseline="bottom";
  ctx.textAlign="right";
  ctx.fillText(deg+' :Angle', canvas.width-24, canvas.height-56);
  ctx.fillText(Math.round(momentiumIncrease,2)+' :Momentum', canvas.width-24, canvas.height-24);
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
  ctx.textBaseline="top";
  ctx.textAlign="left";
  ctx.font = '24px lato';
  ctx.fillText('FPS: '+fps, 24, 24);
}

function scoreCounter(ctx) {
  ctx.fillStyle = 'white';
  ctx.textBaseline="top";
  ctx.textAlign="right";
  ctx.font = '24px lato';
  ctx.fillText('SCORE: '+gameUserInterface.score, canvas.width-24, 24);
}
