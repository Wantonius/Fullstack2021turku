const express = require("express");
const bodyParser = require("body-parser");
const apiroutes = require("./routes/apiroutes")
const bcrypt = require("bcrypt");
const mysql = require("mysql");

let app = express();

app.use(bodyParser.json());

let con = mysql.createConnection({
	host:"localhost",
	user:"test",
	password:"test",
	database:"turkushopping"
})

con.connect(function(err) {
	if(err) {
		console.log("Failed to connect to database!");
		throw err;
	}
	let sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) UNIQUE, password VARCHAR(256))";
	con.query(sql, function(err,result) {
		if(err) {
			console.log("Failed to create table users!");
			throw err;
		}
		console.log("Created table users if it did not exist",result);
	})

	sql = "CREATE TABLE IF NOT EXISTS sessions (id INT AUTO_INCREMENT PRIMARY KEY, token VARCHAR(128), ttl BIGINT, user VARCHAR(50))";
	con.query(sql, function(err,result) {
		if(err) {
			console.log("Failed to create table users!");
			throw err;
		}
		console.log("Created table sessions if it did not exist",result);
	})	
	
	sql = "CREATE TABLE IF NOT EXISTS items (_id INT AUTO_INCREMENT PRIMARY KEY,type VARCHAR(80), count INT, price FLOAT, user VARCHAR(50))"

	con.query(sql, function(err,result) {
		if(err) {
			console.log("Failed to create table users!");
			throw err;
		}
		console.log("Created table items if it did not exist",result);
	})		
});

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
	let sql = "SELECT * FROM sessions WHERE token=?";
	con.query(sql,[req.headers.token],function(err,result) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal Server error"});
		}
		if(result.length === 0) {
			return res.status(403).json({message:"forbidden"});
		}
		let session = result[0];
		let now = Date.now();
		if(now > session.ttl) {
			sql = "DELETE FROM sessions WHERE token=?"
			con.query(sql,[session.token],function(err) {
				if(err) {
					console.log(err);
					return res.status(500).json({message:"Internal Server error"});
				}
				return res.status(403).json({message:"forbidden"});
			})
		} else {
			req.session = {};
			req.session.user = session.user;
			let tempttl = now + ttl_diff;
			sql = "UPDATE sessions SET ttl=? WHERE token=?";
			con.query(sql,[tempttl,session.token],function(err) {
				if(err) {
					console.log(err);
					return res.status(500).json({message:"Internal Server error"});
				}
				console.log("Success in isUserLogged");
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
		let sql = "INSERT INTO users (username,password) VALUES (?)"
		let values = [req.body.username, hash];
		con.query(sql,[values],function(err,result) {
			if(err) {
				if(err.errno === 1062) {
					return res.status(409).json({message:"Username is already in use"})
				}
				console.log(err);
				return res.status(500).json({message:"Internal server error"})
			}
			return res.status(200).json({message:"success"})
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
	let sql = "SELECT * FROM users WHERE username = ?";
	con.query(sql,[req.body.username],function(err,result) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal Server error"});
		}
		if(result.length === 0) {
			return res.status(403).json({message:"forbidden"})
		}
		bcrypt.compare(req.body.password, result[0].password, function(err,success) {
			if(err) {
				console.log(err);
				return res.status(400).json({message:"Bad Request 4"});
			}
			if(!success) {
				return res.status(403).json({message:"forbidden"});
			} 		
			let token = createToken();
			let now = Date.now();
			let ttl = now + ttl_diff;
			sql = "INSERT INTO sessions (user,token,ttl) VALUES (?)"
			let values = [result[0].username,token,ttl];
			con.query(sql,[values],function(err) {
				if(err) {
					console.log(err);
					return res.status(500).json({message:"Internal Server error"});
				}
				return res.status(200).json({token:token});
			})		
		});
	})
});	

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({message:"not found"});
	}
	let sql = "DELETE FROM sessions WHERE token=?";
	con.query(sql,[req.headers.token],function(err) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal Server error"});
		}
		return res.status(200).json({message:"success"})
	})

})
	
app.use("/api",isUserLogged,apiroutes);

app.listen(3001);
console.log("Running in port 3001");