// scoreboard UI
$(document).ready(function(){
  scoreboard();

  var scoreTrigger = $('.js-sidebar-trigger');
  var scoreSidebar = $('.js-score-sidebar');

  scoreTrigger.click(function(){
    //scoreSidebar.fadeToggle();
    scoreSidebar.toggleClass('score-sidebar--show');
  });


});

function scoreboard() {
  var list = $('.js-score-list');
  var item = $('.js-score-item');
  var name = 'Test User'

  var amount = 20;

  var topscore = 100000;

  var newcount = null;
  var newscore = null;


  list.html('');

  for (i = 0; i < amount; i++) {
    newcount = i;

    newitem();
  }

  function newitem() {

    var difference = rand(80,98)/100;

    if (newscore == null) {
      newscore = topscore;
    } else {
      var difference = rand(80,98)/100;
      newscore = newscore*difference;
      newscore = Math.round(newscore);
    }

    var barwidth = Math.round((newscore/topscore)*100);


    var result = item.clone();
    result.find('.js-score-position').html(newcount+1);
    result.find('.js-score-item-score').html(newscore);
    result.find('.js-score-item-name').html(name);
    result.find('.js-score-item-bar').css({'width':barwidth+'%'});
    list.append(result);

  }
}



// random function - no really
function rand(min,max) {
  var num = Math.random() * (max - min) + min;
  return Math.ceil(num);
}
