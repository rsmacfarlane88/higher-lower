function mainControllerTests(jasmine){
	this.jasmine = jasmine;
}

mainControllerTests.prototype.defineTestSuite = function() {
	var jasmine = this.jasmine;
	var module = require('/controllers/mainController');
	var startupModule = require('/controllers/startupController');

	jasmine.describe('mainController Tests', function() {
		var controller;
		var fakeViewManager;
		var fakeStartupController;
		var fakappproperties;
		var fakenetworkstatus;
		var fakesettingscontroller;
		var fakelocalization;

		jasmine.beforeEach(function() {
			fakeAnalytics = {};
			fakeAnalytics.trackPageView = function(){};
			fakenetworkstatus = { isNetworkOnline: function(){ return true; }, setServerOnlineStatus: function(){} };
			logoutController = { showStart: function(){}, performStartup: function(){} };
			fakeViewManager = { launchMain: function(){}, closeMain: function(){}, setDownloadProgress:function(){}, hideDownloadProgress:function(){}, showForms:function(){}, showLoading:function(){}, hideLoading:function(){}};
			fakeStartupController = new startupModule.startupController(fakenetworkstatus, fakeViewManager, fakeAnalytics);
			controller = new module.mainController(fakeStartupController);
		});

		jasmine.it('init calls get branding info', function(){
			var BrandingSpy = jasmine.spyOn(controller.api, "getBrandingInfo");
			jasmine.spyOn(fakeViewManager, "showLoading");
			controller.init();
			jasmine.expect(BrandingSpy).toHaveBeenCalled();
		});

		jasmine.it('launchMain where network is online calls startSync', function(){
			var viewmanagerspy = jasmine.spyOn(fakeViewManager, "launchMain");
			var syncSpy = jasmine.spyOn(controller.syncController, "startSync");

			jasmine.spyOn(fakenetworkstatus, "isNetworkOnline").andReturn(true);

			jasmine.spyOn(controller.appProperties, "getString").andCallFake(function(propertyName){
				if (propertyName === "currentUser"){
					return 'testUser';
				}
				if (propertyName === "database"){
					return 'testDb';
				}
				if (propertyName === "firstDownload_testUser_testDb"){
					return null;
				}
			})
			controller.launchMain();
			jasmine.expect(syncSpy).toHaveBeenCalled();
		});

		jasmine.it('launchMain where network is online calls startSync', function(){
			var viewmanagerspy = jasmine.spyOn(fakeViewManager, "launchMain");
			var hideDownloadSpy = jasmine.spyOn(fakeViewManager, "hideDownloadProgress");

			jasmine.spyOn(fakenetworkstatus, "isNetworkOnline").andReturn(false);

			jasmine.spyOn(controller.appProperties, "getString").andCallFake(function(propertyName){
				if (propertyName === "currentUser"){
					return 'testUser';
				}
				if (propertyName === "database"){
					return 'testDb';
				}
				if (propertyName === "firstDownload_testUser_testDb"){
					return null;
				}
			})
			controller.launchMain();
			jasmine.expect(hideDownloadSpy).toHaveBeenCalled();
		});

	});
}

exports.mainControllerTests = mainControllerTests;
