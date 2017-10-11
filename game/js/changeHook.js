// swapping hooks
var allowClick = true;

function changeHook(hookIndex) {

  // save hook data into temp var
  var scoutHook = starHooks[hookIndex];

  // check to see if star is dead, if yes perform no action
  if (scoutHook.star.alive === false) {
    return false;
  }

  if (allowClick === true) {
    allowClick = false;
    // detach from hook if already attached to one
    //if (selectedHookTest != null) {
      detach();
    //}

    // set global variables
    selectedHookTest = scoutHook;
    cameraMode = 'hook';
    selectedHookTest.selected = true;
    hookGrappel.launch = true;

    // find the center point of the new hook, and update it for drawing grappel.
    selectedHook.centerX = selectedHookTest.posX+(selectedHookTest.size/2);
    selectedHook.centerY = selectedHookTest.posY+(selectedHookTest.size/2);

    // calculate how many frames the grappel will need to reach hook @60fps.
    var percent = (character.grappelDelay/1000);
    var frames = 60*percent;
    hookGrappel.interations = frames;
    hookGrappel.currentIteration = 0;

    setTimeout(function(){
      if (gameState != 'gameOver') {
        attach();
        repositionSwing();
        hookGrappel.launch = false;
      }
      allowClick = true;
    },character.grappelDelay);
  }
}

// Progressively draw line from character to hook
// this is controlled by the game RAF engine, and the variable hookGrappel.launch
function grappelLaunch(context) {

  var increment = 0;
  swingDirection = null;
  swingSpeed = 0.1;
  //console.log('grappel launch!');

 if (increment < 1) {
   increment = (hookGrappel.currentIteration/hookGrappel.interations);
   hookGrappel.currentIteration += 1;
 }

 // regular sized triangle
 var triWidth = selectedHook.centerX-character.centerX;
 var triHeight = selectedHook.centerY-character.centerY;
 var triHypo = Math.hypot(triWidth,triHeight);
 var triAngle = Math.acos(triHeight/triHypo);

 // create small triangle by shrinking the hypotenuse
 // gameOverMoveSpeed = (-canvas.height-cameraY)/10;
 var smallHypo = triHypo*increment;
 var smallWidth = Math.sin(triAngle)*smallHypo;
 var smallHeight = Math.cos(triAngle)*smallHypo;

 // calculate positions for rope based on small triangle
 var ropeStartX = character.centerX;
 var ropeStartY = character.centerY;

 // if the character is on the right side of hook... else
 var ropeEndX = null;
 if (character.centerX > selectedHook.centerX) {
   ropeEndX = character.centerX-smallWidth;
 } else {
   ropeEndX = character.centerX+smallWidth;
 }
 var ropeEndY = character.centerY+smallHeight;

  // Draw line
  //-------------------------
  context.beginPath();
  context.lineWidth = 2;
  context.moveTo(character.centerX,character.centerY);
  context.lineTo(ropeEndX,ropeEndY);
  context.strokeStyle = 'red';
  context.stroke();
  context.closePath();

  if (testingBool === true) {
    //small triangle
    context.strokeStyle = 'gold';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(ropeStartX,ropeStartY);  // startPointX, startPointY
    context.lineTo(ropeEndX,ropeStartY); // HookX,HookY
    context.lineTo(ropeEndX,ropeEndY); // startPointY, HookX
    context.closePath();    // hypotinuse
    context.stroke();
  }
}

// fade last
function grappelDissipate() {
  // fade out previous grappel rope
}
