function syncControllerTests(jasmine){
	this.jasmine = jasmine;
}

syncControllerTests.prototype.defineTestSuite = function() {
	var jasmine = this.jasmine;

	jasmine.describe('Sync Controller Tests', function() {

		var Alloy = require("alloy");
		var $;

    var responseJson = '{"players":[{
			"first_name": "Ross",
			"fppg": 67.12303797468354,
			"id": "15475-9524",
			"images": {
				"default": {
					"height": 200,
					"url": "http://www.google.com/",
					"width": 200
				}
			},
			"injured": false,
			"injury_details": "knee",
			"injury_status": "o",
			"last_name": "MacFarlane",
			"played": 59,
			"player_card_url": "http://www.google.com/",
			"position": "PG",
			"removed": false,
			"salary": 10600,
			"starting_order": null,
			"team": {
				"_members": ["687"],
				"_ref": "teams.id"
			}
		}, {
			"first_name": "Joe",
			"fppg": 28.9876938271605,
			"id": "15475-15860",
			"images": {
				"default": {
					"height": 200,
					"url": "http://www.google.com/",
					"width": 200
				}
			},
			"injured": false,
			"injury_details": null,
			"injury_status": null,
			"last_name": "Bloggs",
			"played": 71,
			"player_card_url": "http://www.google.com/",
			"position": "PF",
			"removed": false,
			"salary": 9300,
			"starting_order": null,
			"team": {
				"_members": ["687"],
				"_ref": "teams.id"
			}
		}]}';

		jasmine.beforeEach(function() {
 			/*Alloy.setSetting = function(name, value){};
 			Alloy.getSetting = function(name){ return 'string setting' };*/
      $ = Alloy.createController('sync');
      Alloy.apiCall = function(){};
		});

    jasmine.it("Calling sync function should send api call", function(){
			var apiSpy = jasmine.spyOn(Alloy, "apiCall");
			$.sync();
			jasmine.expect(apiSpy).toHaveBeenCalled();
		});

		jasmine.it("onSuccess with response data should call processPlayer and processAttachmentQueue", function(){
			var processPlayerSpy = jasmine.spyOn($, "processPlayer");
      var processAttachmentQueueSpy = jasmine.spyOn($, "processAttachmentQueue");
			$.onSuccess({data:responseJson});
			jasmine.spyOn($, "onSuccess");
			jasmine.expect(processPlayerSpy).toHaveBeenCalled();
      jasmine.expect(processAttachmentQueueSpy).toHaveBeenCalled();
		});

		jasmine.it("processAttachmentQueue should call downloadAttachment when the queue is not empty", function(){
			$.attachmentQueue = [{}];
			var downloadAttachmentSpy = jasmine.spyOn($, "downloadAttachment");
			var successSpy = jasmine.spyOn($, "syncComplete");
			$.processAttachmentQueue();
			jasmine.expect(downloadAttachmentSpy).toHaveBeenCalled();
			jasmine.expect(successSpy).not.toHaveBeenCalled();
		});

		jasmine.it("downloadAttachment should call downloadImage", function(){
			$.attachmentQueue = [{}];
			var downloadImageSpy = jasmine.spyOn(Alloy, "downloadImage");;
			jasmine.spyOn($, "getAttachmentFilename");
			$.downloadAttachment();
			jasmine.expect(downloadImageSpy).toHaveBeenCalled();
		});

		jasmine.it("downloadAttachmentSuccess should call processAttachmentQueue", function(){
			var processAttachmentQueueSpy = jasmine.spyOn($, "processAttachmentQueue");;
			$.downloadAttachmentSuccess();
			jasmine.expect(processAttachmentQueueSpy).toHaveBeenCalled();
		});

		jasmine.it("processAttachmentQueue should call syncComplete when the queue is empty", function(){
			$.attachmentQueue = [];
			var downloadAttachmentSpy = jasmine.spyOn($, "downloadAttachment");
			var successSpy = jasmine.spyOn($, "syncComplete");
			$.processAttachmentQueue();
			jasmine.expect(downloadAttachmentSpy).not.toHaveBeenCalled();
			jasmine.expect(successSpy).toHaveBeenCalled();
		});

		// jasmine.it("processPlayer should create model with the correct values", function(){
		// 	var createModelSpy = jasmine.spyOn(Alloy, "createModel").andReturn({
		// 		config:{columns:[]},
		// 		save:function(){}
		// 	});
		// 	$.createUserAudit(auditModel);
		// 	jasmine.expect(createModelSpy).toHaveBeenCalledWith("userAudit", {alloy_id:Ti.Utils.sha1(auditModel.Id+Alloy.currentUser), UserId: Alloy.currentUser, AuditId: auditModel.Id, TenantName:"string setting", IsDownloaded: false});
		// });
		//
		// jasmine.it("processPlayer should call model.set the correct amount of times", function(){
		// 	var createModelSpy = jasmine.spyOn(Alloy, "createModel").andReturn({
		// 		config:{
		// 			columns:{
		// 			    "Name": "TEXT",
		// 			    "FormId": "TEXT",
		// 			    "UserId": "TEXT",
		// 			    "IsVisible": "BOOL",
		// 			    "CreatedDateTime": "TEXT",
		// 			    "ModifiedDateTime": "TEXT",
		// 			    "ArchiveReinstateReason": "TEXT",
		// 			    "Version": "integer",
		// 			    "TenantName":"TEXT"
		// 			}
		// 		}
		// 	});
		// 	jasmine.spyOn($, "saveModel");
		// 	var currentModelSetSpy = jasmine.spyOn($, "setModelParameter");
		// 	$.createUserAudit(auditModel);
		// 	jasmine.expect(currentModelSetSpy.callCount).toEqual(0);
		// });
		//
		// jasmine.it("processPlayer should call save model", function(){
		// 	var createModelSpy = jasmine.spyOn(Alloy, "createModel").andReturn({
		// 		config:{
		// 			columns:{}
		// 		}
		// 	});
		// 	var saveSpy = jasmine.spyOn($, "saveModel");
		// 	var currentModelSetSpy = jasmine.spyOn($, "setModelParameter");
		// 	$.processAudit(auditModel);
		// 	jasmine.expect(saveSpy).toHaveBeenCalled();
		// });
	});
};

exports.syncControllerTests = syncControllerTests;
