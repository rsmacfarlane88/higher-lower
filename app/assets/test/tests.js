function tests() {
};

tests.prototype.testsEnabled = function(){
	var tests = Alloy.createController("testsEnabled");
	return tests.testsEnabled;
}

tests.prototype.start = function(){
	var jasmine = require('/test/lib/jasmine');
	var jasmineTitanium = require('/test/lib/jasmine-titanium');
	var reporter = new jasmineTitanium.TitaniumReporter("HigherLower");

  var testModule = require('/test/controllers/game');
	testSuite = new testModule.gameControllerTests(jasmine);
	testSuite.defineTestSuite(jasmine);

	jasmine.jasmine.getEnv().addReporter(reporter);
	jasmine.jasmine.getEnv().execute();
}

exports.tests = tests;
