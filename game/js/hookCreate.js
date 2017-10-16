// create a hook along with a canvas it is drawn on.
function createHook(position,isSafe) {
  // create a mini canvas for a hook, and add it to an array of hooks.
  var canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
  var context = canvas.getContext('2d'); // Pass the context to draw the star

  var star = {
    x: 32,
    y: 32,
    size: 6,
    strokeOffset: 16,
    bounds: 64,
    ring: 2, // ring position / health
    alive: true,
    safe: isSafe //position in array
  }
  // draw the hook
  drawHook(context,star,false);
  // each hook lives on a 5x10 - 1-50
  starHooks.push({
      layer:canvas,
      ctx: context,
      star: star,
      size: 64,
      selected: false,
      posX: gridPositions[position].positionX,
      posY: gridPositions[position].positionY
  });

  var hookPosition = starHooks.length -1;

  // clickable areas
  var clickyBounds = 64;
  elements.push({
    posX: gridPositions[position].positionX-clickyBounds,
    posY: gridPositions[position].positionY-clickyBounds,
    size: 64+(clickyBounds*2),
    index: hookPosition
  });
}
