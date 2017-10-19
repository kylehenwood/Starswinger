function animateEaseOut(numHave,numWant,iterations) {
  var number = (numHave-numWant)/iterations;
  //console.log(numHave+','+numWant+','+iterations);
  return number;
}

function animateEaseIn(numHave,numWant,iterations) {
  var number = (numHave-numWant)/iterations;
  //number = number-numWant;
  console.log(number);
  return number;
}
