// each hook created also pushes its click area into this array
var elements = [];

// mouseTestSetup;
function mouseTestSetup() {
  var elem = canvas.id;
  var viewportOffset = elem.getBoundingClientRect();
  // the problem...
  elem.left = viewportOffset.left;
  elem.top = viewportOffset.top;

  // add event listener for clicks on canvas.
  elem.addEventListener('click', function(event) {
    // Temporary fix
    var mouseX = event.pageX - elem.left;
    var mouseY = event.pageY - elem.top;

    // every click, check to see if click is over any of the elements in the elements array.
    // if yes, get the index of that element, and set the current hook to that
    if (gameState === "playGame") {
      playClick(mouseX,mouseY);
    }
    if (gameState === "gamePaused" || gameState === "playGame") {
      pauseClick(mouseX,mouseY);
    }
    if (gameState === "gameOver") {
      gameOverClick(mouseX,mouseY);
    }
    //console.log(gameState);
  });
}

// GAMESTATE: PLAY
// every click, check to see if click is over any of the elements in the elements array.
// if yes, get the index of that element, and set the current hook to that
function playClick(mouseX,mouseY) {
  if (gameState === "playGame") {

    // check to see if user clicked anything, if this stays false through all clicks, detach from hook.
    var clickedSomething = false;

    elements.forEach(function(element) {
      if (mouseY > element.posY && mouseY < element.posY+element.size
        && mouseX > element.posX+moveCanvas.currentPos && mouseX < element.posX+moveCanvas.currentPos+element.size) {
        clickedSomething = true;
        changeHook(element.index);
      }
    });
    // paused button
    if (mouseY > canvas.height-80 && mouseX < 80) {
      clickedSomething = true;
    }

    if (clickedSomething === false) {
      detach();
    }
  }
}


// GAMESTATE: PLAY || PAUSED
function pauseClick(mouseX,mouseY) {
  if (mouseY > canvas.height-80 && mouseX < 80) {
    gamePause();
  }
}



// !todo
var gameOverElements = [];
var gameOverElement = {
  name: 'restartButton',
  //action: restart(),
  posX: null,
  posY: null,
  width: null,
  height: null
}

function gameOverClick(mouseX,mouseY) {
  restartGame();
}



// draw this on own canvas and render once as a group every frame, rather than loop
var clickAreas = {
  canvas: null,
  context: null
}

function drawClicky() {
  var clickCanvas = document.createElement('canvas');
      clickCanvas.width = gamePanel.canvas.width;
      clickCanvas.height = gamePanel.canvas.height;
  var clickContext = clickCanvas.getContext('2d'); // Pass the context to draw the star

  clickAreas.canvas = clickCanvas;
  clickAreas.context = clickContext;

  elements.forEach(function(element) {
    //element.posX+moveCanvas.currentPos;
    clickContext.fillStyle = 'rgba(0,255,0,0.1)';
    clickContext.fillRect(element.posX, element.posY, element.size, element.size);
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
          //changeHook('key',-1);
          break;

          case 38: // up
          break;

          case 39: // right
          //changeHook('key',1);
          break;

          case 32: // spacebar
          if (gameState === "playGame") {
            detach();
          }
          break;

          case 40: // down
          break;

          case 82 && 17: // ctrl + r
          location.reload();
          break;

          case 82: // R (restart)
          if (gameState === "gamePaused" || gameState === "playGame" || gameState === "gameOver") {
            restartGame();
          }
          break;

          case 80: // P (pause)
          if (gameState === "gamePaused" || gameState === "playGame") {
            gamePause();
          }
          break;

          default: return; // exit this handler for other keys
      }
      event.preventDefault(); // prevent the default action (scroll / move caret)
  }, false);
}
