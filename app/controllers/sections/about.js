var args = arguments[0] || {};

$.aboutText.text = "This is a free app developed by Ross MacFarlane. \n\nVersion: " + Ti.App.version+" \n\nArtwork Atributions: App logo by icons8.com https://icons8.com";

function closeWindow(e){
  $.aboutWindow.close();
}
