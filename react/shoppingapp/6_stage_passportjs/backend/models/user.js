const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	username:{type:String,unique:true},
	password:String
})

module.exports = mongoose.model("User",Schema);

/* More complex user management

let Schema = mongoose.Schema({
	local: {
		username:{type:String,unique:true},
		password:String
	},
	facebook: {
		username:String,
		accessToken:String,
		email:String
	},
	twitter: {
		//
	},
	google: {
		//
	},
	amazon: {
		//
	},
	linkedIn: {
		//
	}	
	...
})


*/