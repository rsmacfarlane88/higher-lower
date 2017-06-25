var args = arguments[0] || {};
var attachmentQueue;
var endPoint = "http://rsmacfarlane.com/wp-content/uploads/2016/11/Player.json";
var attachmentQueue = [];

$.sync = function(){
  Alloy.apiCall(endPoint, null, onSuccess, onFail);
};

function onSuccess(e){
  var response = JSON.parse(e.data);
  _.each(response.players, processPlayer);
  processAttachmentQueue();
}

function processPlayer(player){
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
};

function processAttachmentQueue(){
  
}

function onFail(e){
  alert(e.code);
}
