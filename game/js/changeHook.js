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
    detach();

    // set global variables
    selectedHookTest = scoutHook;
    cameraMode = 'hook';
    selectedHookTest.selected = true;
    hookGrappel.launch = true;

    // find the center point of the new hook, and update it for drawing grappel.
    selectedHook.centerX = selectedHookTest.posX+(selectedHookTest.size/2);
    selectedHook.centerY = selectedHookTest.posY+(selectedHookTest.size/2);

    setTimeout(function(){
      if (gameState != 'gameOver') {
        attach();
        repositionSwing();
        allowClick = true;
        //hookGrappel.launch = false;
      }
    },character.grappelDelay);
  }
}


// Progressively draw line from character to hook
// this is controlled by the game RAF engine, and the variable hookGrappel.launch
function grappelLaunch(context) {


 // find hypo between character and hook.
 // find % of hypo length depending on delay (200ms)
 // draw new triangle using characterXY + new Hypo + angle

 // triangle 1
 // var triWidth = character.centerX-selectedHook.centerX;
 // var triHeight = character.centerY-selectedHook.centerY;
 var triWidth = selectedHook.centerX-character.centerX;
 var triHeight = selectedHook.centerY-character.centerY;
 var triHypo = Math.hypot(triWidth,triHeight);
 var triAngle = Math.acos(triHeight/triHypo);

 // create small triangle by shrinking the hypotenuse
 var smallHypo = triHypo/2;
 var smallWidth = Math.sin(triAngle)*smallHypo;
 var smallHeight = Math.cos(triAngle)*smallHypo;

 // calculate positions for rope based on small triangle
 var ropeStartX = character.centerX;
 var ropeStartY = character.centerY;

var ropeEndX = null;
 // if the character is on the right side of hook... else
 if (character.centerX > selectedHook.centerX) {
   ropeEndX = character.centerX-smallWidth;
 } else {
   ropeEndX = character.centerX+smallWidth;
 }
 var ropeEndY = character.centerY+smallHeight;

  // Draw line
  //-------------------------
  context.beginPath();
  context.lineWidth = 4;
  //context.moveTo(newCharacter.posX,newCharacter.posY);
  context.moveTo(character.centerX,character.centerY);
  //context.moveTo(character.posX,character.posY);
  //context.lineTo(selectedHook.centerX,selectedHook.centerY);
  //context.moveTo(ropeStartX,ropeStartY);
  context.lineTo(ropeEndX,ropeEndY);
  context.strokeStyle = 'blue';
  context.stroke();
  context.closePath();

  //console.log(newCharacter.posX+','+newCharacter.posY);
  //console.log(selectedHookTest.posX+','+selectedHookTest.posY);


  // small triangle
  context.strokeStyle = 'gold';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(ropeStartX,ropeStartY);  // startPointX, startPointY
  context.lineTo(ropeStartX+smallWidth,ropeStartY); // HookX,HookY
  context.lineTo(ropeStartX+smallWidth,ropeStartY+smallHeight); // startPointY, HookX
  context.closePath();    // hypotinuse
  context.stroke();
}

// fade last
function grappelDissipate() {
  // fade out previous grappel rope
}
