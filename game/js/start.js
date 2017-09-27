$(document).ready(function(){
  start();
});

function start() {
  var button = $('.js-start-button');
  var viewport = $('.js-viewport');

  button.click(function(){
    button.toggleClass('start-button--active');
    viewport.toggleClass('viewport--start');
  });
}