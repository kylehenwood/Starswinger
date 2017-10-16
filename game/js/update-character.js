  // update character
function updateCharacter() {
  //character.posX-(character.size/2);
  //character.posY-(character.size/2);

  character.posX = character.centerX-(character.size/2);
  character.posY = character.centerY-(character.size/2);

  //console.log('x:'+character.posX+',y:'+character.posY);
}


// draw character
function drawCharacter(ctx) {
  ctx.beginPath();
  ctx.rect(character.posX,character.posY,character.size,character.size);
  ctx.fillStyle = 'white';
  ctx.fill();
}
