var args = arguments[0] || {};
var shuffle = require('knuth-shuffle');

var playersCollection = Alloy.createCollection('player');
playersCollection.fetch();

var score;
var players = [];
var mainPlayer;
var secondPlayer;
var mainPlayerWidget;
var secondPlayerWidget;

_.each(playersCollection.models, function(player){
  players.push(player);
});

$.getNextPlayer = function(){
  var nextPlayer = players.shift();
  players.push(nextPlayer);
  return nextPlayer;
}

$.setScore = function(newScore){
  score = newScore;
  $.scoreLabel.text = score;
};

$.setResult = function(isCorrect){
  if(isCorrect){
    $.resultBar.backgroundColor = "#2DC2BD";
    $.resultText.text = "CORRECT!";
  }else{
    $.resultBar.backgroundColor = "#a63446";
    $.resultText.text = "WRONG!";
  }
  $.resultBar.show();
}

$.startGame = function(){
  players = shuffle.knuthShuffle(players);
  $.setScore(0);
  $.refreshGame();
}

$.refreshGame = function(){
  $.resultBar.hide();
  $.playerA.removeAllChildren();
  $.playerB.removeAllChildren();

  mainPlayer = $.getNextPlayer();
  secondPlayer = $.getNextPlayer();

  mainPlayerWidget = Alloy.createWidget('Player', {
    player: mainPlayer,
    clickedCallback: playerClickedCallback
  });

  secondPlayerWidget = Alloy.createWidget('Player', {
    player: secondPlayer,
    clickedCallback: playerClickedCallback
  });

  $.playerA.add(mainPlayerWidget.getView());
  $.playerB.add(secondPlayerWidget.getView());
}

$.endGame = function(){
  $.container.hide();
  $.endGameContainer.show();
}

function exitGame(e){
  $.gameWindow.close();
}

function playerClickedCallback(selectedId){
  if(selectedId === mainPlayer.get("alloy_id")){
    if(mainPlayer.get("Fppg") > secondPlayer.get("Fppg")){
      $.setScore(score+1);
      mainPlayerWidget.showPpg(true);
      secondPlayerWidget.showPpg(false);
      $.setResult(true);
    }else{
      mainPlayerWidget.showPpg(false);
      secondPlayerWidget.showPpg(true);
      $.setResult(false);
    }
  }else{
    if(secondPlayer.get("Fppg") > mainPlayer.get("Fppg")){
      $.setScore(score+1);
      mainPlayerWidget.showPpg(false);
      secondPlayerWidget.showPpg(true);
      $.setResult(true);
    }else{
      mainPlayerWidget.showPpg(true);
      secondPlayerWidget.showPpg(false);
      $.setResult(false);
    }
  }

  setTimeout(function(){
    if(score < 10){
      $.refreshGame();
    }else{
      $.endGame();
    }
  }, 2000);
}
