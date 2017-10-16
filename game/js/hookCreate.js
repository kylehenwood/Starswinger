// create a hook along with a canvas it is drawn on.
function createHook(position,isSafe) {
  // create a mini canvas for a hook, and add it to an array of hooks.
  var canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
  var context = canvas.getContext('2d'); // Pass the context to draw the star
  var hookPosition = starHooks.length;

  var star = {
    centerX: 32,
    centerY: 32,
    size: 6,
    strokeOffset: 16,
    bounds: 64,
    ring: 2, // ring position / health
    alive: true,
    safe: isSafe, //position in array
    index: hookPosition
  }

  // draw the hook.. if I could
  // drawHook(context,star,false);

  var hookSize = 64;

  // push hook into array
  starHooks.push({
    layer:canvas,
    context: context,
    star: star,
    size: hookSize,
    selected: false,
    posX: gridPositions[position].positionX,
    posY: gridPositions[position].positionY,
    centerX: gridPositions[position].positionX+(hookSize/2),
    centerY: gridPositions[position].positionY+(hookSize/2)
  });

  // draw the hook.. if I could
  drawHook(starHooks[hookPosition]);

  // clickable areas
  var clickyBounds = 64;
  elements.push({
    posX: gridPositions[position].positionX-clickyBounds,
    posY: gridPositions[position].positionY-clickyBounds,
    size: 64+(clickyBounds*2),
    index: hookPosition
  });
}
