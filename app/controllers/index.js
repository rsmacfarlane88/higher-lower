var testBootstrap = require('/test/tests');
var tests = new testBootstrap.tests();
var syncing = false;

console.log("Tests enabled:"+tests.testsEnabled());
if (tests.testsEnabled()){
	tests.start();
}
else {
	$.spinner.show();
	$.window.open();
	if(OS_ANDROID){
		checkStoragePermissions();
		startSync();
	}else{
		startSync();
	}
}

function checkStoragePermissions(){
	var hasStoragePermissions = Titanium.Filesystem.hasStoragePermissions();
	if(!hasStoragePermissions){
		Titanium.Filesystem.requestStoragePermissions(function(e){
			if(!e.success){
				alert("You can change storage permissions later from app settings");
			}else{
				startSync();
			}
		});
	}else{
		startSync();
	}
}

function startSync(){
	syncing = true;
	var syncManager = Alloy.createController('sync/sync', { success: syncComplete });
	syncManager.sync();
}

function syncComplete(){
	$.spinner.hide();
	$.menuItems.show();
	syncing = false;
}

function startGame(e){
	if(!syncing){
		var gameController = Alloy.createController('sections/game');
		gameController.getView().open();
		gameController.startGame();
	}
}

function showHelp(e){
	var helpController = Alloy.createController('sections/help');
	helpController.getView().open();
}

function showAbout(e){
	var aboutController = Alloy.createController('sections/about');
	aboutController.getView().open();
}
