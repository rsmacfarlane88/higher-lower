function gameControllerTests(jasmine){
	this.jasmine = jasmine;
}

gameControllerTests.prototype.defineTestSuite = function() {
	var jasmine = this.jasmine;

	jasmine.describe('Game Controller Tests', function() {

		var Alloy = require("alloy");
		var $;

		jasmine.beforeEach(function() {
 			/*Alloy.setSetting = function(name, value){};
 			Alloy.getSetting = function(name){ return 'string setting' };*/
      $ = Alloy.createController('game');
      $.refreshGame = function(){};
		});

		jasmine.it("Refresh game is called on starting the game", function(){
			var startGameSpy = jasmine.spyOn($, "refreshGame");
			$.startGame();
			jasmine.expect(startGameSpy).toHaveBeenCalled();
		});

		jasmine.it("Score is set to 0 on starting the game", function(){
			jasmine.spyOn($, "refreshGame");
			var setScoreSpy = jasmine.spyOn($, "setScore");
			$.startGame();
			jasmine.expect(setScoreSpy).toHaveBeenCalledWith(0);
		});
	});
};

exports.gameControllerTests = gameControllerTests;
