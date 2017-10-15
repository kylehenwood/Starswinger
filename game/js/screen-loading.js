// load all assets, once loaded start the game / intro.

var gameLoading = {
  canvas: null,
  context: null,
  progress: 0,
  loadTime: 1000
}

function setupLoading() {
  gameState = 'loading';

  setTimeout(function(){
    //gameState = 'gameIntro';
    backToMenu();
  },gameLoading.loadTime);

  gameLoading.canvas = document.createElement('canvas');
  gameLoading.canvas.width = canvas.width;
  gameLoading.canvas.height = canvas.height;
  gameLoading.context = gameLoading.canvas.getContext('2d');
}

// faux loading bar currently
function updateLoading(context) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // overlay
  context.beginPath();
  context.rect(0,0,canvas.width,canvas.height)
  context.fillStyle = 'rgba(255,000,000,1)';
  context.fill();
  context.closePath();

  // loading icon
  context.beginPath();
  context.rect((canvas.width/2)-120,(canvas.height/2)-120,240,240)
  context.fillStyle = 'rgba(255,255,255,1)';
  context.fill();
  context.closePath();

  // faux loading bar
  var barStart = (canvas.width/2)-120;
  var barLength = 240;

  if(gameLoading.progress < 100) {
    gameLoading.progress+=2;
  }

  barLength = barLength*(gameLoading.progress/100);
  context.beginPath();
  context.rect(barStart,(canvas.height/2)+160,barLength,4)
  context.fillStyle = 'rgba(255,255,255,1)';
  context.fill();
  context.closePath();

}
