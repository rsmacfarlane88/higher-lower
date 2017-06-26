var testBootstrap = require('/test/tests');
var tests = new testBootstrap.tests();

console.log("Tests enabled:"+tests.testsEnabled());
if (tests.testsEnabled()){
	tests.start();
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
