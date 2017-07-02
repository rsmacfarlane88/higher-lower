var args = arguments[0] || {};
var endPoint = "http://rsmacfarlane.com/wp-content/uploads/2016/11/Player.json";
var currentAttachment;
$.attachmentQueue = [];

$.sync = function(){
  Alloy.apiCall(endPoint, null, $.onSuccess, $.onFail);
};

$.onSuccess = function(e){
  var response = JSON.parse(e.data);
  _.each(response.players, $.processPlayer);
  _.each(response.teams, $.processTeam);
  $.processAttachmentQueue();
};

$.processPlayer = function(player){
    var playerModel = Alloy.createModel('player', {
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
    });

    if(player.team && player.team._members){
      playerModel.set({"TeamId": player.team._members[0]});
    }

    playerModel.save();

    $.attachmentQueue.push(player.images.default.url);
};

$.processTeam = function(team){
  Alloy.createModel('team', {
    City: team.city,
    Code: team.code,
    FullName: team.full_name,
    Name: team.name,
    alloy_id: team.id
  }).save();
};

$.processAttachmentQueue = function(){
  if($.attachmentQueue.length > 0){
    $.downloadAttachment();
  }else{
    $.syncComplete();
  }
};

$.downloadAttachment = function(){
  currentAttachment = $.attachmentQueue.shift();
  var fileName = $.getAttachmentFilename();
  Alloy.downloadImage(currentAttachment, fileName, $.downloadAttachmentSuccess, $.getImageFail);
};

$.downloadAttachmentSuccess = function(){
  $.processAttachmentQueue();
};

$.getAttachmentFilename = function(){
  var splitFile = currentAttachment.split('/');
  var filename = splitFile[splitFile.length - 1];
  return filename;
};

$.getImageFail = function(e){
  $.processAttachmentQueue();
};

$.onFail = function(e){
  alert(e.code);
};

$.syncComplete = function(){
  args.success();
};
