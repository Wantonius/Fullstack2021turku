const express = require("express");
const bodyParser = require("body-parser");
const apiroutes = require("./routes/apiroutes")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");

let app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/turkushopping").then(
	() => console.log("Successfully connected to Mongodb"),
	(error) => console.log("Failed to connect to Mongodb. Reason:",error)
);


const ttl_diff = 3600000;

//MIDDLEWARE

createToken = () => {
	let token = "";
	let letters = "ABCDEFGHIJabcdefghij0123456789"
	for(let i=0;i<128;i++) {
		let temp = Math.floor(Math.random()*letters.length);
		token = token + letters[temp];
	}
	return token;
}

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({message:"forbidden 1"})
	}
	sessionModel.findOne({"token":req.headers.token}, function(err,session) {
		if(err) {
			console.log("Failed to find session. Reason:",err);
			return res.status(403).json({message:"forbidden 2"}) 
		}
		if(!session) {
			return res.status(403).json({message:"forbidden 3"})
		}
		let now = Date.now();
		if(session.ttl < now) {
			sessionModel.deleteOne({"_id":session._id}, function(err) {
				if(err) {
					console.log("Failed to remove session. Reason:",err);
				}
				return res.status(403).json({message:"forbidden 4"})
			})
		} else {
			req.session = {};
			req.session.user = session.user;
			session.ttl = now + ttl_diff;
			session.save(function(err) {
				if(err) {
					console.log("Failed to save session. Reason:",err);
				}
				return next();
			})
		}
	})
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(!req.body.password || !req.body.username) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(req.body.password.length < 8 || req.body.username.length < 4) {
		return res.status(400).json({message:"Bad Request"});
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(400).json({message:"Bad Request"});		
		}
		let user = new userModel({
			username:req.body.username,
			password:hash
		});
		user.save(function(err,user) {
			if(err) {
				console.log("Failed to register user, reason:",err);
				if(err.code === 11000) {
					return res.status(409).json({message:"Username already in use"})
				}
				return res.status(500).json({message:"Internal server error"})
			}
			return res.status(200).json({message:"success!"});
		})
	
	})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request 1"});
	}
	if(!req.body.password || !req.body.username) {
		return res.status(400).json({message:"Bad Request 2"});
	}
	if(req.body.password.length < 8 || req.body.username.length < 4) {
		return res.status(400).json({message:"Bad Request 3"});
	}
	userModel.findOne({"username":req.body.username},function(err,user) {
		if(err) {
			console.log("Login failed, reason:",err);
			return res.status(500).json({message:"Internal server error"})
		}
		if(!user) {
			return res.status(403).json({message:"forbidden"});
		}
		bcrypt.compare(req.body.password, user.password, function(err,success) {
			if(err) {
				console.log(err);
				return res.status(400).json({message:"Bad Request 4"});
			}
			if(!success) {
				return res.status(403).json({message:"forbidden"});
			} 		
			let token = createToken();
			let now = Date.now();
			let session = new sessionModel({
				user:user.username,
				ttl:now+ttl_diff,
				token:token
			})
			session.save(function(err,session) {
				if(err) {
					console.log("Failed to save session, reason:",err);
					return res.status(500).json({message:"Interal server error"});
				}
				return res.status(200).json({token:token}); 
			})			
		})
	})
});	

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({message:"not found"});
	}
	sessionModel.deleteOne({"token":req.headers.token}, function(err) {
		if(err) {
			console.log("Failed to remove session in logout. Reason:",err)
		}
		return res.status(200).json({message:"logged out"})
	})
})
	
app.use("/api",isUserLogged,apiroutes);

app.listen(3001);
console.log("Running in port 3001");