// generate swing trajectory based on hook selection (fires on hook change)
function repositionSwing() {

  //console.log('reposition');

  // get swing angle and rope length / draw a triangle.
  trajectory.characterPosX = character.centerX;
  trajectory.characterPosY = character.centerY;
  trajectory.starPosX = selectedHookTest.centerX;
  trajectory.starPosY = selectedHookTest.centerY;

  // make the negative values positive
  var triWidth = trajectory.starPosX-trajectory.characterPosX;
  var triHeight = trajectory.starPosY-trajectory.characterPosY;

  trajectory.hypotenuse = Math.hypot(triWidth,triHeight);

  // update character positions on hook change

  // calculate new angle based on triangle
  var adjacent = Math.abs(triHeight);
  var angle = Math.acos(adjacent/trajectory.hypotenuse);
  var direction;

  //
  if (trajectory.characterPosX < trajectory.starPosX) {
      //console.log('swingLeft');
      direction = 'left';
      currentAngle = toDeg(angle)*-1;
  } else {
      currentAngle = toDeg(angle);
      direction = 'right';
      //console.log('swingRight');
  }

  // I have a problem getting the correct ANGLE when the position of the swing is ABOVE the star...
  // fix? increase or subtract an extra 90deg when character position falls into these regions.
  if (trajectory.characterPosY < trajectory.starPosY) {
    // if above left
    if (trajectory.characterPosX < trajectory.starPosX) {
      currentAngle = -90-(90+currentAngle);
    }
    // if above right
    if (trajectory.characterPosX > trajectory.starPosX) {
       currentAngle = 90+(90-currentAngle);
    }
  }

  // maintain momentium when switching between hooks when the swing direction is the same.
  if (direction ==='left' && swingDirection === 'left' || direction ==='right' && swingDirection === 'right') {
    // remove momentem if hook is oppisite to direction swining
    momentiumIncrease = momentiumIncrease*0.5;
  } else {
    // keep momentem if swinging in same direction
    momentiumIncrease = momentiumIncrease*1.2;
  }
}
