var testBootstrap = require('/test/tests');

console.log("Tests enabled:"+testBootstrap.testsEnabled());
if (testBootstrap.testsEnabled()){
	testBootstrap.start();
}
else {
	$.window.open();

	var syncManager = Alloy.createController('sync');
	syncManager.sync();
}

function startGame(e){
	var gameController = Alloy.createController('game');
	gameController.getView().open();
	gameController.startGame();
}
