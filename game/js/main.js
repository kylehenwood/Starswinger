// javascripts
$(document).ready(function(){
  viewportToggle();
  scoreUpdater();
  busPosition();
});


// bus position
function busPosition(){
  var triggerLeft = $('.js-trigger-left');
  var triggerRight = $('.js-trigger-right');
  var bus = $('.js-bus');
  var position = 3;
  var direction;
  var busPosition = ['music-bus--pos1','music-bus--pos2','music-bus--pos3','music-bus--pos4','music-bus--pos5'];


  triggerLeft.click(function(){
    direction = 'left';
    updatePosition();
  });

  triggerRight.click(function(){
    direction = 'right';
    updatePosition();
  });

  function updatePosition() {

    if (direction == 'right') {
      position += 1;
      if (position >= 5) {
        position = 5;
      }
    } else {
      position -= 1;
      if (position <= 1) {
        position = 1;
      }
    }

    for (var i = 0; i < busPosition.length; i++) {
      bus.removeClass(busPosition[i]);
    }



    var positionClass = busPosition[(position-1)];

    bus.addClass(positionClass);
  }
}
/*
$(document).keydown(function(e) {
  switch(e.which) {
    case 37: // left
      direction = 'left';
      updatePosition();
      break;

    case 39: // right
      direction = 'right';
      updatePosition();
      break;

    default: return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});
*/

// score sprite updater
function scoreUpdater () {

  var score = 0;
  var scoreElem = $('.js-score');
  var scoreClass = 'level-score__multiplier--';
  var prevClass = null;

  function updateScore() {

    var classVal = scoreClass+score;

    scoreElem.removeClass(prevClass);
    scoreElem.addClass(classVal);
    prevClass = classVal;

    setTimeout(function(){
      score += 1;
      if (score == 9) {
        score = 0;
      }
      updateScore();
    },600);
  }
  updateScore();
}





// scale viewport
function viewportToggle() {

  var viewport = $('.js-viewport');
  var viewportState = [];
  var viewportButton = [];

  // iphone4
  viewportState.push('viewport--iphone4');
  viewportButton.push($('.js-iphone4'));

  // iphone5
  viewportState.push('viewport--iphone5');
  viewportButton.push($('.js-iphone5'));

  // iphone6
  viewportState.push('viewport--iphone6');
  viewportButton.push($('.js-iphone6'));

  // iphone6+
  viewportState.push('viewport--iphone6p');
  viewportButton.push($('.js-iphone6p'));

  //-- functions
  function bindViewport(button,state) {
    button.click(function(){
      purgeViewport();
      viewport.addClass(state);
      button.addClass('application-navigation__item--active');
    });
  }

  // iterate through all possible states and remove them.
  function purgeViewport () {
    for (var i = 0; i < arrayLength; i++) {
      viewport.removeClass(viewportState[i]);
      viewportButton[i].removeClass('application-navigation__item--active');
    }
  }

  // loop
  var arrayLength = viewportButton.length;

  for (var i = 0; i < arrayLength; i++) {
    var button = viewportButton[i];
    var state = viewportState[i];
    bindViewport(button,state);
  }

  // set
  function setViewport() {
    var button = viewportButton[0];
    var state = viewportState[0];

    purgeViewport();
    viewport.addClass(state);
    button.addClass('application-navigation__item--active');
  }
  setViewport();
}