function drawHook(hookVariable) {

  var layer = hookVariable.context; // this hook variable
  var star = hookVariable.star;
  var saftey = hookVariable.star.safe;
  //var saftey = star.safe;
  var hookData = hookVariable.star;
  //console.log(hookData.selected);

  if (star.alive === false) {
    // this star is dead, return false;
    // ungrappel if selected
    detach();
    return;
  }

  //alert ('connected shockwave');

  // clear this canvas
  layer.clearRect(0, 0, 64, 64);

  // circle
  layer.beginPath();
  layer.arc(star.centerX, star.centerY, star.size, 0, Math.PI*2, true);
  layer.closePath();
  layer.fillStyle = 'white';
  layer.fill();
  layer.closePath();

  // star stroke/progress
  layer.beginPath();
  layer.lineWidth = 1;
  layer.strokeStyle = 'white';
  layer.arc(star.centerX, star.centerY, star.size+star.strokeOffset, 0, Math.PI*2, true);
  layer.closePath();
  layer.stroke();

  var radius = 23;
  var startAngle = 2 * Math.PI;
  var endAngle; //var endAngle = ring * Math.PI
  var counterClockwise = true;

  // drain star
  if (hookVariable.selected === true && saftey === false && star.alive === true && character.swinging === true) {
    // drain star power & increase score
    gameUserInterface.score += 1;
    star.ring -= 0.01;
    if (star.ring <= 0 && star.alive === true) {
      star.alive = false;
    }
  }

  // gets updated when character is swinging from it
  endAngle = star.ring * Math.PI;

  layer.beginPath();
  layer.lineWidth = 3;
  layer.strokeStyle = 'red';
  layer.arc(star.centerX, star.centerY, radius, startAngle, endAngle, counterClockwise);
  layer.stroke();
  layer.closePath();

  // visual bounds
  // gonna need a switch statement
  if (hookVariable.selected === true) {
    layer.strokeStyle = 'lime';
    layer.lineWidth = 2;
  } else {
    layer.strokeStyle = 'red';
    layer.lineWidth = 1;
  }
  if (saftey === true) {
    layer.lineWidth = 3;
    layer.strokeStyle = 'cyan';
  }

  layer.beginPath();
  layer.rect(star.centerX-(star.bounds/2),star.centerY-(star.bounds/2),star.bounds,star.bounds);

  if (star.alive === false) {
    layer.fillStyle = 'red';
    layer.fill();
  }
  layer.stroke();
}
