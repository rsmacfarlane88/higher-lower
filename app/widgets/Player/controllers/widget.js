var args = arguments[0] || {};

var player = args.player;

$.name.text = player.get("FirstName") + " " + player.get("LastName");
$.position.text = player.get("Position");
$.gamesPlayed.text = player.get("Played") + " Played";
$.ppg.text = Math.round(player.get("Fppg") * 100) / 100 + " PPG";

var playerId = player.get("alloy_id").split('-');
playerId = playerId[playerId.length-1];

var imagePath = Ti.Filesystem.getFile(Alloy.playerImages.nativePath, playerId+".png");
$.playerImage.image = imagePath.nativePath;

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
