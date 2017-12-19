// Ease Out
function animateEaseOut(numWant,numHave,iterations) {
  var complete = false;
  var number;

  // when numWant is within 0.01 of numHave, end animation by setting number to 0 and firing a callback
  if (numWant-numHave > 2 && numWant-numHave < 2) {
    number = numWant;
    complete = true;
    console.log('animationComplete');
  } else {
    number = (numWant-numHave)/iterations;
    number = round2(number);
  }

  //console.log(number);
  //console.log(numHave+','+numWant+','+iterations);
  return number;
}


function round2(num) {
  num = num*100;
  num = Math.round(num);
  num = num/100;
  return num;
}


// handles the calculating of animation profress based on duration
function animationProgress(a,b) {
  var progress = 100/a;
  var value = b+progress;
  var complete = false;

  if (Math.round(value) >= 100) {
    value: 100,
    complete = true
  }
  return {
    value:value,
    complete:complete
  };
}



/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}
