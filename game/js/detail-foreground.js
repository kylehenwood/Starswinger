// all detail that appears infront of the character
var tinyClouds = [];
var smallClouds = [];
var backgroundClouds = [];

function setupForeground() {
  createBackgroundCloud(0);
  createBackgroundCloud(canvas.width);

  createSmallCloud(0);
  createSmallCloud(canvas.width);

  createTinyCloud(0);
  createTinyCloud(canvas.width);

}

// HOW TO MAKE THE CLOUDS ENDLESS???

function updateForeground(context,cameraX,cameraY) {
  // draw clouds at the bottom of screen.

  var y3 = cameraY*1.6;
  var y2 = cameraY*1.4;
  var y1 = cameraY*1.2;

  var x3 = cameraX*1.4;
  var x2 = cameraX*1.2;
  var x1 = cameraX;

  // make the clouds move even when stationary
  x1 -= 0.1;
  x2 -= 0.2;
  x3 -= 0.3;

  var backgroundCloudY = (canvas.height-40)+y1;
  cloudMove(context,backgroundClouds[0],backgroundClouds[1],x1,backgroundCloudY);

  var smallCloudY = (canvas.height-80)+y2;
  cloudMove(context,smallClouds[0],smallClouds[1],x2,smallCloudY);

  var tinyCloudY = (canvas.height-120)+y3;
  cloudMove(context,tinyClouds[0],tinyClouds[1],x3,tinyCloudY);
}


// move the two cloud layers and position so they do not overlap or distance from each other
// at any point
function cloudMove(context,cloudLayer,cloudOther,posX,posY) {
  cloudLayer.posX += posX;
  cloudOther.posX += posX;

  if (cloudLayer.posX < -canvas.width) {
    cloudLayer.posX = cloudOther.posX+canvas.width;
  }
  if (cloudLayer.posX > canvas.width) {
    cloudLayer.posX = cloudOther.posX-canvas.width;
  }
  if (cloudOther.posX < -canvas.width) {
    cloudOther.posX = cloudLayer.posX+canvas.width;
  }
  if (cloudOther.posX > canvas.width) {
    cloudOther.posX = cloudLayer.posX-canvas.width;
  }
  context.drawImage(cloudLayer.canvas,cloudLayer.posX,posY);
  context.drawImage(cloudOther.canvas,cloudOther.posX,posY);
}


//--
function createBackgroundCloud(posX) {

  var backgroundCloud = {
    canvas: null,
    context: null,
    posX: posX
  }

  backgroundCloud.canvas = document.createElement('canvas');
  backgroundCloud.canvas.width = canvas.width;
  backgroundCloud.canvas.height = 400;
  backgroundCloud.context = backgroundCloud.canvas.getContext('2d');

  backgroundCloud.context.beginPath();
  backgroundCloud.context.rect(0,0,backgroundCloud.canvas.width,160);
  backgroundCloud.context.fillStyle = 'rgba(255,255,255,0.4)';
  backgroundCloud.context.fill();
  backgroundCloud.context.closePath();

  // cloud line cap
  backgroundCloud.context.beginPath();
  backgroundCloud.context.rect(0,0,1,160);
  backgroundCloud.context.fillStyle = 'rgba(255,0,0,1)';
  backgroundCloud.context.fill();
  backgroundCloud.context.closePath();

  backgroundClouds.push(backgroundCloud);
}



function createSmallCloud(posX) {
  var smallCloud = {
    canvas: null,
    context: null,
    posX: posX
  }
  smallCloud.canvas = document.createElement('canvas');
  smallCloud.canvas.width = canvas.width;
  smallCloud.canvas.height = 400;
  smallCloud.context = smallCloud.canvas.getContext('2d');

  var context = smallCloud.context;

  // upper
  context.beginPath();
  context.rect(0,0,120,64);
  context.fillStyle = 'rgba(255,255,255,0.2)';
  context.fill();
  context.closePath();

  context.beginPath();
  context.rect(240,24,120,64);
  context.fillStyle = 'rgba(255,255,255,0.3)';
  context.fill();
  context.closePath();

  context.beginPath();
  context.rect(424,40,64,64);
  context.fillStyle = 'rgba(255,255,255,0.2)';
  context.fill();
  context.closePath();

  context.beginPath();
  context.rect(0+600,0,120,64);
  context.fillStyle = 'rgba(255,255,255,0.2)';
  context.fill();
  context.closePath();

  context.beginPath();
  context.rect(240+600,24,120,64);
  context.fillStyle = 'rgba(255,255,255,0.3)';
  context.fill();
  context.closePath();

  context.beginPath();
  context.rect(424+600,40,64,64);
  context.fillStyle = 'rgba(255,255,255,0.2)';
  context.fill();
  context.closePath();

  // lower
  context.beginPath();
  context.rect(24,304,64,64);
  context.fillStyle = 'rgba(255,255,255,0.1)';
  context.fill();
  context.closePath();

  context.beginPath();
  context.rect(144,160,120,64);
  context.fillStyle = 'rgba(255,255,255,0.2)';
  context.fill();
  context.closePath();

  context.beginPath();
  context.rect(240,264,80,64);
  context.fillStyle = 'rgba(255,255,255,0.3)';
  context.fill();
  context.closePath();

  context.beginPath();
  context.rect(24+600,304,64,64);
  context.fillStyle = 'rgba(255,255,255,0.1)';
  context.fill();
  context.closePath();

  context.beginPath();
  context.rect(144+600,160,120,64);
  context.fillStyle = 'rgba(255,255,255,0.2)';
  context.fill();
  context.closePath();

  context.beginPath();
  context.rect(240+600,264,80,64);
  context.fillStyle = 'rgba(255,255,255,0.3)';
  context.fill();
  context.closePath();

  smallClouds.push(smallCloud);
}

function createTinyCloud(posX) {
  var tinyCloud = {
    canvas: null,
    context: null,
    posX: posX
  }

  tinyCloud.canvas = document.createElement('canvas');
  tinyCloud.canvas.width = canvas.width;
  tinyCloud.canvas.height = 400;
  tinyCloud.context = tinyCloud.canvas.getContext('2d');

  var context = tinyCloud.context;

  // drawClouds randomly? (no overlap)
  var height = 24;
  var width = 24;

  var canvasWidth = tinyCloud.canvas.width;
  var canvasHeight = tinyCloud.canvas.Height;

  while (width < canvas.width-24) {
    var cloudPosY = 8*rand(0,40);
    var cloudWidth = 8*rand(3,6);
    var cloudHeight = 24;

    context.beginPath();
    context.fillStyle = 'rgba(255,255,255,0.1)';
    context.fillRect(width,cloudPosY,cloudWidth,cloudHeight);
    context.closePath();

    width += cloudWidth+(24*rand(2,4));
    console.log(width);
  }

  tinyClouds.push(tinyCloud);
}
