function animateEaseOut(numHave,numWant,iterations) {
  var number = (numHave-numWant)/iterations;
  number = round2(number);
  //console.log(number);
  //console.log(numHave+','+numWant+','+iterations);
  return number;
}

function animateEaseIn(numHave,numWant,iterations) {
  var number = (numHave-numWant)/iterations;
  number = Math.round(number);
  //number = number-numWant;
  //console.log(number);
  return number;
}


function round2(num) {
  num = num*100;
  num = Math.round(num);
  num = num/100;
  return num;
}
