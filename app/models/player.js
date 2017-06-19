exports.definition = {
	config: {
		columns: {
			"FirstName": "string",
			"LastName": "string",
			"Fppg": "integer",
			"Injured": "boolean",
			"InjuryDetails": "string",
			"InjuryStatus": "string",
			"Played": "integer",
			"PlayerCardUrl": "string",
			"Position": "string",
			"Removed": "boolean",
			"Salary": "integer",
			"alloy_id": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "player"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/
		});

		return Collection;
	}
};
