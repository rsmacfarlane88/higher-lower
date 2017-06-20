var syncManager = Alloy.createController('sync');
syncManager.sync();

$.index.open();

function startGame(e){
	var gameController = Alloy.createController('game');
	gameController.getView().open();
	gameController.startGame();
}
