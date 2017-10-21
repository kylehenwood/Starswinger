  // update character
function updateCharacter() {
  //character.posX-(character.size/2);
  //character.posY-(character.size/2);

  character.posX = character.centerX-(character.size/2);
  character.posY = character.centerY-(character.size/2);

  //console.log('x:'+character.posX+',y:'+character.posY);
}


// draw character
function drawCharacter(context) {

  updateCharacter();

  context.beginPath();
  context.rect(character.posX,character.posY,character.size,character.size);
  context.fillStyle = 'white';
  context.fill();
}


function characterReset() {
  //console.log('reset');
  character.centerX = (canvas.width/2);
  character.centerY = 0;
}
