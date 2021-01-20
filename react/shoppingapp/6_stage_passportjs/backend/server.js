const express = require("express");
const bodyParser = require("body-parser");
const apiroutes = require("./routes/apiroutes")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);


let app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/turkushopping").then(
	() => console.log("Successfully connected to Mongodb"),
	(error) => console.log("Failed to connect to Mongodb. Reason:",error)
);

app.use(session({
	name:"shoppingapp-session",
	resave:false,
	secret:"myBestSecret",
	saveUninitialized:false,
	cookie:{
		maxAge:1000*60*60*24,
		httpOnly:true,
		sameSite:true
	},
	store:new mongoStore({
		collection:"sessions",
		mongooseConnection:mongoose.connection,
		ttl:60*60*24
	})
}))

app.use(passport.initialize());
app.use(passport.session());

//Passport login strategies

passport.use("local-login",new localStrategy({
		usernameField:"username",
		passwordField:"password",
		passReqToCallback:true
},function(req,username,password,done) {
	if(!req.body) {
		return done(null,false,{message:"Bad request"})
	}
	if(!req.body.password || !req.body.username) {
		return done(null,false,{message:"Bad request"})
	}
	if(req.body.password.length < 8 || req.body.username.length < 4) {
		return done(null,false,{message:"Bad request"})
	}
	userModel.findOne({"username":req.body.username},function(err,user) {
		if(err) {
			console.log("Login failed, reason:",err);
			return done(err);
		}
		if(!user) {
			return done(null,false,{message:"Please provide proper credentials"})
		}
		bcrypt.compare(req.body.password, user.password, function(err,success) {
			if(err) {
				console.log(err);
				return done(err);
			}
			if(!success) {
				return done(null,false,{message:"Please provide proper credentials"})
			} 		
			let token = createToken();
			req.session.token = token;
			req.session.user = user.username;
			return done(null,user);
		})
	})	
}));

passport.serializeUser(function(user,done) {
	done(null,user._id);
});

passport.deserializeUser(function(id,done) {
	userModel.findById(id,function(err,user) {
		if(err) {
			return done(err);
		}
		return done(null,user);
	})
});

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
	if(req.isAuthenticated()) {
		if(req.headers.token === req.session.token) {
			return next();
		} else {
			return res.status(403).json({message:"forbidden"})
		}
	} else {
		return res.status(403).json({message:"forbidden"})
	}
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

app.post("/login",passport.authenticate("local-login"),function(req,res) {
	return res.status(200).json({token:req.session.token})
});	

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({message:"not found"});
	}
	if(req.session) {
		req.logout();
		req.session.destroy();
		return res.status(200).json({message:"success"})
	}
	return res.status(404).json({message:"not found"});
})
	
app.use("/api",isUserLogged,apiroutes);

app.listen(3001);
console.log("Running in port 3001");