// all detail that appears infront of the character
// parralax

function setupBackground() {
  setupBackgroundStars();
}

function drawBackground() {
  drawBackgroundStars();
  // draw clouds at the bottom of screen.
  //drawBackgroundMoon(canvas.context);
  //drawBackgroundClouds(canvas.context);
}


// function drawBackgroundMoon(context) {
//   context.beginPath();
//   context.arc(canvas.width/2, canvas.height+128, 200, 0, 2 * Math.PI, false);
//   context.fillStyle = 'white';
//   context.fill();
//   context.closePath();
// }


// background contains... small stars (differing sizes / layers)
// MOON + lightrays
// shooting stars
// aruroa?

var starLayers = [];
var backgroundCameraY = 0;

function createStarPanel(density,size) {
  var panel = document.createElement('canvas');
  panel.width = canvas.width;
  panel.height = canvas.height;
  panel.context = panel.getContext('2d');

  // how many stars on this panel?
  var area = (canvas.width*canvas.height)/(40*40);
  var starCount = area*density;
  var starSize = size;
  var starColor = 'rgba(255, 255, 255, 0.3)';

  // draw stars on panel
  for (var i = 0; i < starCount; i++) {
    var starX = rand((size/2),canvas.width-(size/2));
    var starY = rand((size/2),canvas.height-(size/2));

    panel.context.beginPath();
    panel.context.arc(starX, starY, starSize, 0, Math.PI*2, true);
    panel.context.closePath();
    panel.context.fillStyle = starColor;
    panel.context.fill();
  }
  return panel;
}


function setupBackgroundStars() {

  // DENSITY, SIZE

  var starPanel0 = createStarPanel(0.1,1);
  starLayers.push({canvas:starPanel0,posZ:0.3,posX:0,posY:0});
  starLayers.push({canvas:starPanel0,posZ:0.3,posX:0,posY:canvas.height});
  starLayers.push({canvas:starPanel0,posZ:0.3,posX:canvas.width,posY:0});
  starLayers.push({canvas:starPanel0,posZ:0.3,posX:canvas.width,posY:canvas.height});

  var starPanel1 = createStarPanel(0.01,2);
  starLayers.push({canvas:starPanel1,posZ:0.6,posX:0,posY:0});
  starLayers.push({canvas:starPanel1,posZ:0.6,posX:0,posY:canvas.height});
  starLayers.push({canvas:starPanel1,posZ:0.6,posX:canvas.width,posY:0});
  starLayers.push({canvas:starPanel1,posZ:0.6,posX:canvas.width,posY:canvas.height});

  var starPanel2 = createStarPanel(0.025,3);
  starLayers.push({canvas:starPanel2,posZ:1,posX:0,posY:0});
  starLayers.push({canvas:starPanel2,posZ:1,posX:0,posY:canvas.height});
  starLayers.push({canvas:starPanel2,posZ:1,posX:canvas.width,posY:0});
  starLayers.push({canvas:starPanel2,posZ:1,posX:canvas.width,posY:canvas.height});

  // var starPanel3 = createStarPanel(0.05,3);
  // starLayers.push({canvas:starPanel3,posZ:1.4,posX:0,posY:0});
  // starLayers.push({canvas:starPanel3,posZ:1.4,posX:0,posY:canvas.height});
  // starLayers.push({canvas:starPanel3,posZ:1.4,posX:canvas.width,posY:0});
  // starLayers.push({canvas:starPanel3,posZ:1.4,posX:canvas.width,posY:canvas.height});

}



// Called by RAF
function drawBackgroundStars() {
  starLayers.forEach(function(starPanel) {

    // organic move
    //starPanel.posX -= 0.05*starPanel.posZ;
    //console.log(starCameraY);

    //backgroundCameraY;

    //console.log(starCameraMoveY);

    // camera move
    var cameraReducer = 0.8;

    starPanel.posX += (moveCanvas.moveSpeed*cameraReducer)*starPanel.posZ;
    starPanel.posY = (backgroundCameraY*cameraReducer)*starPanel.posZ;

    // vertical
    if (starPanel.posY+canvas.height <= 0) {
      starPanel.posY = starPanel.posY+(canvas.height*2)
    }
    if (starPanel.posY >= canvas.height) {
      starPanel.posY = starPanel.posY-(canvas.height*2)
    }

    // horizonal
    if (starPanel.posX+canvas.width <= 0) {
      starPanel.posX = starPanel.posX+(canvas.width*2)
    }
    if (starPanel.posX >= canvas.width) {
      starPanel.posX = starPanel.posX-(canvas.width*2)
    }

    // draw
    canvas.context.drawImage(starPanel.canvas,starPanel.posX,starPanel.posY);
  });
}
