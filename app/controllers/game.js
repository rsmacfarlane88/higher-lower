var args = arguments[0] || {};
var shuffle = require('knuth-shuffle');

var playersCollection = Alloy.createCollection('player');
playersCollection.fetch();

var score = $.score.text = 0;
var players = [];
var mainPlayer, secondPlayer;
var mainPlayerWidget, secondPlayerWidget;

_.each(playersCollection.models, function(p){
  players.push(p);
});

var shuffledPlayers = shuffle.knuthShuffle(players);

function getNextPlayer(){
  var nextPlayer = shuffledPlayers.shift();
  shuffledPlayers.push(nextPlayer);
  return nextPlayer;
}

$.startGame = function(){
  $.refreshGame();
}

$.refreshGame = function(){
  $.resultBar.hide();
  $.playerA.removeAllChildren();
  $.playerB.removeAllChildren();

  mainPlayer = getNextPlayer();
  secondPlayer = getNextPlayer();

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

function endGame(){
  $.container.hide();
  $.endGame.show();
}

function exitGame(e){
  $.gameWindow.close();
}

function playerClickedCallback(selectedId){
  if(selectedId == mainPlayer.get("alloy_id")){
    if(mainPlayer.get("Fppg") > secondPlayer.get("Fppg")){
      score++;
      mainPlayerWidget.showPpg(true);
      secondPlayerWidget.showPpg(false);
      $.resultBar.backgroundColor = "#2DC2BD";
      $.resultText.text = "CORRECT!";
    }else{
      mainPlayerWidget.showPpg(false);
      secondPlayerWidget.showPpg(true);
      $.resultBar.backgroundColor = "#a63446";
      $.resultText.text = "WRONG!";
    }
  }else{
    if(secondPlayer.get("Fppg") > mainPlayer.get("Fppg")){
      score++;
      mainPlayerWidget.showPpg(false);
      secondPlayerWidget.showPpg(true);
      $.resultBar.backgroundColor = "#2DC2BD";
      $.resultText.text = "CORRECT!";
    }else{
      mainPlayerWidget.showPpg(true);
      secondPlayerWidget.showPpg(false);
      $.resultBar.backgroundColor = "#a63446";
      $.resultText.text = "WRONG!";
    }
  }

  $.resultBar.show();

  $.score.text = score;
  setTimeout(function(){
    if(score < 10){
      refreshGame();
    }else{
      endGame();
    }
  }, 2000);
}
