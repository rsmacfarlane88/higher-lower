var args = arguments[0] || {};
var attachmentQueue;

$.sync = function(){
  attachmentQueue = [];
  var playersFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'data/players.json');
  var playersJson = playersFile.read().text;

  var jsonResponse = JSON.parse(playersJson);

  _.each(jsonResponse.players, function(player){
    Alloy.createModel('player', {
      FirstName: player.first_name,
      LastName: player.last_name,
      Fppg: player.fppg,
      Injured: player.injured,
      InjuryDetails: player.injury_details,
      InjuryStatus: player.injury_status,
      Played: player.played,
      PlayerCardUrl: player.player_card_url,
      Position: player.position,
      Removed: player.removed,
      Salary: player.salary,
      alloy_id: player.id,
      ImageUrl: player.images.default.url
    }).save();

    attachmentQueue.push(player.images.default.url);
  });
};
