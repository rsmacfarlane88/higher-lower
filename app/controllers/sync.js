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
  $.processAttachmentQueue();
};

$.processPlayer = function(player){
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

    $.attachmentQueue.push(player.images.default.url);
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
