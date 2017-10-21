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


var backgroundStars = {
  canvas: null,
  context: null,
  numStars: null,
  starDensity: 1,
  stars: [],     // Stars in the scene, starts as an empty array
  layers: []
}

function setupBackgroundStars() {
  backgroundStars.canvas = document.createElement('canvas');
  backgroundStars.canvas.width = canvas.width;
  backgroundStars.canvas.height = canvas.height;
  backgroundStars.context = backgroundStars.canvas.getContext('2d');

  // Caculate how many stars should be on screen per 40px grid.
  var area = (canvas.width*canvas.height)/(40*40);
  backgroundStars.numStars = area*backgroundStars.starDensity;

	// randomly calculate the positions and sf.sizes of the stars
	// and store the positions in an array to be called / modified later.
	var max = 3;
	var med = 2;
	var min = 1;

	var starCount = 0;

	// create stars
	while(starCount <= backgroundStars.numStars) {
		var size = rand(1,3);
		var count = Math.round(max / size) * 5;

		// render more stars far away than up close which should
		// give a better feeling of depth
		if (size == 1) {
			size = max;
			count = 1;
		} else if (size == 2) {
			size = med;
			count = 24;
		} else {
			size = min;
			count = 80;
		}

		// create the instances of the stars
		createStar(size, count);
		starCount += count;
  }

  // create a panel for each star set
  // render stars to a layer
  drawStars(backgroundStars.context);

  // Panel 1
  backgroundStars.layers.push({canvas:backgroundStars.canvas,posX:0,posY:0});
  // Panel 2
  backgroundStars.layers.push({canvas:backgroundStars.canvas,posX:0,posY:canvas.height});
  // Panel 3
  backgroundStars.layers.push({canvas:backgroundStars.canvas,posX:canvas.width,posY:0});
  // Panel 4
  backgroundStars.layers.push({canvas:backgroundStars.canvas,posX:canvas.width,posY:canvas.height});
}

// star creation
function createStar(size, numberToCreate) {
	for (var i = 0; i < numberToCreate; i++) {

		var x = rand((size/2),canvas.width-(size/2));
		var y = rand((size/2),canvas.height-(size/2));

		backgroundStars.stars.push({
			x: x,
			y: y,
			s: size
		});
	}
}
//
function drawStars(context) {
  backgroundStars.stars.forEach(function(star) {
		var color;

    // big star color
		if (star.s == 3){
			color = 'rgba(255, 255, 255, 0.6)';
		}
    // med star color
		if (star.s == 2){
			color = 'rgba(255, 255, 255, 0.4)';
		}
    // small star color
		if (star.s == 1){
			color = 'rgba(255, 255, 255, 0.3)';
		}

		context.beginPath();
		context.arc(star.x, star.y, star.s, 0, Math.PI*2, true);
		context.closePath();
		context.fillStyle = color;
		context.fill();
	});
}


function drawBackgroundStars() {
  backgroundStars.layers.forEach(function(starPanel) {
    starPanel.posX += moveCanvas.moveSpeed*0.4;
    starPanel.posY += cameraY*0.02;

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
