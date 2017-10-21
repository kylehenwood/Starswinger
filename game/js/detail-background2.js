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


function drawBackgroundMoon(context) {
  context.beginPath();
  context.arc(canvas.width/2, canvas.height+80, 200, 0, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();
  context.closePath();
}


// background contains... small stars (differing sizes / layers)
// MOON + lightrays
// shooting stars
// aruroa?


var backgroundStars = {
  numStars: null,
  starDensity: 1,
  stars: [],     // Stars in the scene, starts as an empty array
  layers: []
}

function setupBackgroundStars() {
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
			count = 20;
		} else {
			size = min;
			count = 80;
		}

		// create the instances of the stars
		createStar(size, count);
		starCount += count;
  }

  // create a panel for each star set
  for(var i=min; i<=max+1; i++) {
    var buffer = document.createElement('canvas');
    buffer.width = canvas.width;
    buffer.height = canvas.height;
    var bufferContext = buffer.getContext('2d');
    // render stars to a layer
    renderStars(i, bufferContext);

    backgroundStars.layers.push({x: 0, s: i, buffer: buffer,posX: 0})
  }
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

function renderStars(size, bufferContext) {
	for (var i = 0; i < backgroundStars.numStars; i++) {

		// So that we don't have to do a sf.stars[i] a million times below
		// we just grab and hold a reference to the star we're working on
		// and use the x, y and s properties throughout the code
		var star = backgroundStars.stars[i];

		// skip the star if it's not the appropriate size
		if (star.s != size) {
			continue;
		}

		var color;

    // big star color
		if (star.s == 3){
			color = "rgba(255, 255, 255, 0.6)";
		}
    // med star color
		if (star.s == 2){
			color = "rgba(255, 255, 255, 0.4)";
		}
    // small star color
		if (star.s == 1){
			color = "rgba(255, 255, 255, 0.3)";
		}

		bufferContext.beginPath();
		bufferContext.arc(star.x, star.y, star.s, 0, Math.PI*2, true);
		bufferContext.closePath();
		bufferContext.fillStyle = color;
		bufferContext.fill();
	}
}


function drawBackgroundStars() {
  var layer = backgroundStars.layers[0];
  backgroundStars.layers.forEach(function(layer) {
    layer.posX += moveCanvas.moveSpeed*0.4;
    console.log(layer.posX);
    canvas.context.drawImage(layer.buffer,layer.posX,0);
  });
}
