var args = arguments[0] || {};

$.helpText.text = "You'll see two players on screen, try to guess which of them has the most Points Per Game (PPG). \n\nThe game is over when you reach 10 points. Good luck!";

function closeWindow(e){
  $.helpWindow.close();
}
