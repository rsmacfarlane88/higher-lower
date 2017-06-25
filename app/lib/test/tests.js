function testsEnabled(){
	var tests = Alloy.createController("testsEnabled");
	return tests.testsEnabled;
}

function start(){
	var jasmine = require('/test/lib/jasmine');
	var jasmineTitanium = require('/test/lib/jasmine-titanium');
	var reporter = new jasmineTitanium.TitaniumReporter("HigherLower");

  var testModule = require('/test/controllers/game');
	testSuite = new testModule.gameControllerTests(jasmine);
	testSuite.defineTestSuite(jasmine);

	jasmine.jasmine.getEnv().addReporter(reporter);
	jasmine.jasmine.getEnv().execute();
}

exports.testsEnabled = testsEnabled;
exports.start = start;
