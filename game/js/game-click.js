// each hook created also pushes its click area into this array
var elements = [];

// mouseTestSetup;
function mouseTestSetup() {
  var elem = canvas.id;
  var viewportOffset = elem.getBoundingClientRect();
  // the problem...
  elem.left = viewportOffset.left;
  elem.top = viewportOffset.top;

  elem.addEventListener('click', function(event) {
    var mouseX = event.pageX - elem.left;
    var mouseY = event.pageY - elem.top;
    var click = false;
    elements.forEach(function(element) {
      if (mouseY > element.posY && mouseY < element.posY + element.size
          && mouseX > element.posX && mouseX < element.posX + element.size) {
          //alert('clicked on hook '+element.index);
          click = true;
          detach();
          changeHook('mouse',element.index);
      }
    });

    if (click === false) {
      detach();
    }
  });
}

// draw this on own canvas and render once as a group every frame, rather than loop
function drawClicky() {
  //console.log(elements.length);
  elements.forEach(function(element) {
    element.posX+=moveCanvas.moveSpeed;
    canvas.ctx.fillStyle = 'rgba(0,255,0,0.1)';
    canvas.ctx.fillRect(element.posX, element.posY, element.size, element.size);
  });
}


// controls
// holds the value of currently selected hook, on hook change
// this value should be placed back into starhooks array.
// while the new selected hook should be found here.
function controls() {
  document.addEventListener('keydown', function(event) {
  //$(document).keydown(function(e) {
      switch(event.which) {
          case 37: // left
          changeHook('key',-1);
          break;

          case 38: // up
          break;

          case 39: // right
          changeHook('key',1);
          break;

          case 32: // spacebar
          detach();
          break;

          case 40: // down
          break;

          default: return; // exit this handler for other keys
      }
      event.preventDefault(); // prevent the default action (scroll / move caret)
  }, false);
}
