// all detail that appears infront of the character
var smallClouds = [];
var backgroundClouds = [];

function setupForeground() {
  createBackgroundCloud(0);
  //createBackgroundCloud(canvas.width);

  createSmallCloud(0);
  createSmallCloud(canvas.width);
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

  var backgroundCloudY = (canvas.height-40)+y2;
  backgroundClouds.forEach(function(cloudLayer) {
    //cloudLayer.posX += x1;
    if (cloudLayer.posX <= -canvas.width) {
      cloudLayer.posX = canvas.width;
    }
    if (cloudLayer.posX > canvas.width) {
      cloudLayer.posX = -canvas.width;
    }
    context.drawImage(cloudLayer.canvas,cloudLayer.posX,backgroundCloudY);
  });


  var smallCloudY = (canvas.height-96)+y3;
  smallClouds.forEach(function(cloudLayer) {
    cloudLayer.posX += x2;
    if (cloudLayer.posX < -canvas.width) {
      cloudLayer.posX = canvas.width;
    }
    if (cloudLayer.posX > canvas.width) {
      cloudLayer.posX = -canvas.width;
    }
    context.drawImage(cloudLayer.canvas,cloudLayer.posX,smallCloudY);
  });
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
