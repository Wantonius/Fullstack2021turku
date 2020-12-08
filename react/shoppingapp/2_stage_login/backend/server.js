const express = require("express");
const bodyParser = require("body-parser");
const apiroutes = require("./routes/apiroutes")
const bcrypt = require("bcrypt");

let app = express();

app.use(bodyParser.json());

//LOGIN DATABASES

let registeredUsers = [];
let loggedSessions = [];
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
		return res.status(403).json({message:"forbidden"})
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(req.headers.token === loggedSessions[i].token) {
			let now = Date.now();
			if(now > loggedSessions[i].ttl) {
				loggedSessions.splice(i,1);
				return res.status(403).json({message:"forbidden"});
			}
			loggedSessions[i].ttl = now+ttl_diff;
			req.session = {};
			req.session.user = loggedSessions[i].user;
			return next();
		}
	}
	return res.status(403).json({message:"forbidden"})
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
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({message:"Username is already in use"});
		}
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(400).json({message:"Bad Request"});		
		}
		let user = {
			username:req.body.username,
			password:hash
		}
		registeredUsers.push(user);
		console.log(registeredUsers);
		return res.status(200).json({message:"success!"});
	})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(!req.body.password || !req.body.username) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(req.body.password.length < 8 || req.body.username.length < 4) {
		return res.status(400).json({message:"Bad Request"});
	}

	for(let i=0;i<registeredUsers.length;i++) {
		if(registeredUsers[i].username === req.body.username) {
				bcrypt.compare(req.body.password,registeredUsers[i].password,function(err,success) {
					if(err) {
						return res.status(400).json({message:"Bad Request"});
					}
					if(!success) {
						return res.status(403).json({message:"forbidden"});
					} 		
					let token = createToken();
					let now = Date.now();
					let session = {
						user:req.body.username,
						ttl:now+ttl_diff,
						token:token
					}
					loggedSessions.push(session);
					return res.status(200).json({token:token}); 
				})
				return;
		}
	}
	return res.status(403).json({message:"forbidden"});	
});	

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({message:"not found"});
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(loggedSessions[i].token === req.headers.token) {
			loggedSessions.splice(i,1);
			return res.status(200).json({message:"success"});
		}
	}
	return res.status(404).json({message:"not found"});
})
	
app.use("/api",isUserLogged,apiroutes);

app.listen(3001);
console.log("Running in port 3001");