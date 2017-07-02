var args = arguments[0] || {};

var player = args.player;

$.name.text = player.get("FirstName") + " " + player.get("LastName");
$.position.text = player.get("Position");
$.gamesPlayed.text = player.get("Played") !== null ? player.get("Played") : "0" + " Played";
$.ppg.text = Math.round(player.get("Fppg") * 100) / 100 + " PPG";

var playerId = player.get("alloy_id").split('-');
playerId = playerId[playerId.length-1];

var imagePath = Ti.Filesystem.getFile(Alloy.playerImages.nativePath, playerId+".png");
if(imagePath.exists()){
  $.playerImage.image = imagePath.nativePath;
}

$.teamImage.image = "/images/teams/"+player.get("TeamId") + ".png";

function playerClicked(e){
  args.clickedCallback(player.get("alloy_id"));
}

$.showPpg = function(isCorrect){
  $.ppg.show()
  if(isCorrect){
    $.ppg.backgroundColor = "#2DC2BD";
  }else{
    $.ppg.backgroundColor = "#a63446";
  }
};
