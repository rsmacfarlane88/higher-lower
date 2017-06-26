

/**
 * TitaniumReporter, by Guilherme Chapiewski - http://guilhermechapiewski.com
 *
 * TitaniumReporter is a Jasmine reporter that outputs spec results to a new
 * window inside your iOS application. It helps you develop Titanium Mobile
 * applications with proper unit testing.
 *
 * More info at http://github.com/guilhermechapiewski/titanium-jasmine
 *
 * Usage:
 *
 * jasmine.getEnv().addReporter(new jasmine.TitaniumReporter());
 * jasmine.getEnv().execute();
 */
function TitaniumReporter(runName) {
	// create Titanium Window and WebView to display results
	this.titaniumTestWindow = Titanium.UI.createWindow({
		title : 'Application Tests',
		backgroundColor : 'black',
		zIndex : 999
	});

	this.runDescription = runName;
	this.titaniumTestsResultsWebView = Ti.UI.createWebView({
		html : '',
		borderRadius: 1,
		scalesPageToFit: true
	});
	this.titaniumTestWindow.add(this.titaniumTestsResultsWebView);
	this.titaniumTestWindow.open();
	console.log("##teamcity[blockOpened name='Tests']");
	console.log("##teamcity[testSuiteStarted name='Tests']");
	this.testResults = '';
	this.testResultsHeader = '<html><head><style type="text/css">body{font-size:10px;font-family:helvetica;}</style></head><body>';
	this.testResultsFooter = '</body></html>';
};

TitaniumReporter.prototype.updateTestResults = function(message) {
	this.testResults += message;
	this.titaniumTestsResultsWebView.setHtml(this.testResultsHeader + this.testResults + this.testResultsFooter);
}


TitaniumReporter.prototype.reportRunnerResults = function(runner) {
	var results = runner.results();
	var overallResult = results.passed() ? "Success" : "Fail";
	console.log("##teamcity[testSuiteFinished name='Tests']");
	console.log("##teamcity[blockClosed name='Tests']");
	console.log("##teamcity[progressFinish 'Building App Integration']");
	if(results.passed()){
		console.log("##teamcity[buildStatus status='SUCCESS' text='Build Succesfull']");
	}else{
		var count = results.totalCount - results.passedCount;
		console.log("##teamcity[buildProblem description=' Tests Failed:"+count+"' identity='Tests']");
		console.log("##teamcity[buildStatus status='FAILURE' text='Build failed due to unit test failures - Tests Failed:"+count+"']");
	}

	var resultColor = results.passed() ? "#009900" : "FF0000";
	this.log('<b><font color="' + resultColor + '">[' + overallResult + ']</font> ' + results.passedCount + ' of ' + results.totalCount + ' assertions passed.</b><br><br>');
	this.log('<h3>Test Runner Finished.</h3>');
	this.writeTestResultsToFile();
}

TitaniumReporter.prototype.reportRunnerStarting = function(runner) {
	this.log('<h3>Test Runner Started.</h3>');
}

TitaniumReporter.prototype.reportSpecResults = function(spec) {
	console.log("##teamcity[testStarted name='"+spec.description+"' captureStandardOutput='true']");

	var color = '#009900';
	var pass = spec.results().passedCount + ' pass';
	var fail = null;
	if (!spec.results().passed()) {
		color = '#FF0000';
		fail = spec.results().failedCount + ' fail';
	}

	var msg = ' (' + pass;
	if (fail) {
		msg += ', ' + fail
	}
	msg += ')';

	this.log('- <font color="' + color + '">' + spec.description + '</font>' + msg + '<br>');

	if (!spec.results().passed()) {
		console.log("Failed Test");
		for (var i = 0; i < spec.results().items_.length; i++) {
			if (!spec.results().items_[i].passed_) {
				console.log("##teamcity[testFailed name='"+spec.description+"' message='"+spec.results().items_[i].message+"' details='Expected:"+ spec.results().items_[i].expected + " Actual:"+spec.results().items_[i].actual+"']");

				this.log('&nbsp;&nbsp;&nbsp;&nbsp;(' + (i + 1) + ') <i>' + spec.results().items_[i].message + '</i><br>');
				if (spec.results().items_[i].expected) {
					this.log('&nbsp;&nbsp;&nbsp;&nbsp;- Expected: "' + spec.results().items_[i].expected + '"<br>');
				}
				this.log('&nbsp;&nbsp;&nbsp;&nbsp;- Actual result: "' + spec.results().items_[i].actual + '"<br>');
				this.log('<br>');
			}
		}
	}else{

	}
	console.log("##teamcity[testFinished name='"+spec.description+"']");
	//Ti.API.debug(JSON.stringify(spec.results()));
}

TitaniumReporter.prototype.reportSpecStarting= function(spec) {

		//this.log('[' + spec.suite.description + '] ' + spec.description + '... ');
}

TitaniumReporter.prototype.reportSuiteResults = function(suite) {
	var results = suite.results();

	this.log('<b>[' + suite.description + '] ' + results.passedCount + ' of ' + results.totalCount + ' assertions passed.</b><br><br>');
}

TitaniumReporter.prototype.log = function(str) {
	this.updateTestResults(str);
}

TitaniumReporter.prototype.writeTestResultsToFile = function() {

	var unitTestsDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "UnitTests");
	unitTestsDir.createDirectory();

	var resultsFile = Titanium.Filesystem.getFile(unitTestsDir.nativePath, this.runDescription + "Results.html");
	if (resultsFile != null) {
		resultsFile.write(this.testResults);
	}
}

exports.TitaniumReporter = TitaniumReporter;
