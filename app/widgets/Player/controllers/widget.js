var args = arguments[0] || {};

var player = args.player;

$.name.text = player.get("FirstName") + " " + player.get("LastName");
$.position.text = player.get("Position");
$.gamesPlayed.text = player.get("Played") + " Played";
$.ppg.text = player.get("Fppg") + " PPG";
$.playerImage.image = player.get("ImageUrl");

function playerClicked(e){
  args.clickedCallback(player.get("alloy_id"));
}

$.showPpg = function(isCorrect){
  $.ppg.show()
  if(isCorrect){
    $.ppg.backgroundColor = "green";
  }else{
    $.ppg.backgroundColor = "red";
  }
};
