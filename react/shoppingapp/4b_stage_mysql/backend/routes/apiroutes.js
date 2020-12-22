const express = require("express");
const mysql = require("mysql");

let con = mysql.createConnection({
	host:"localhost",
	user:"test",
	password:"test",
	database:"turkushopping"
});

let router = express.Router();

router.get("/shopping",function(req,res) {
	let sql = "SELECT * FROM items WHERE user=?";
	let values = [req.session.user];
	if(req.query.type) {
		sql = "SELECT * FROM items WHERE user=? AND type=?";
		values = [req.session.user,req.query.type.toLowerCase()];
	}
	con.query(sql,values,function(err,items) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal server error"});
		}
		return res.status(200).json(items);
	})
});

router.post("/shopping",function(req,res) {
	let sql = "INSERT INTO items (type,count,price,user) VALUES(?,?,?,?)";
	let values = [req.body.type.toLowerCase(),req.body.count,req.body.price,req.session.user];
	con.query(sql,values,function(err) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal server error"});
		}
		return res.status(201).json({message:"created successfully"});
	})		
})

router.delete("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let sql = "DELETE FROM items WHERE _id=? AND user=?";
	let values =[tempId,req.session.user];
	con.query(sql,values,function(err,result) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal server error"});
		}
		if(result.affectedRows === 0) {
			return res.status(404).json({message:"not found"})
		}
		return res.status(200).json({message:"success"});
	})
})

router.put("/shopping/:id",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"})
	}
	if(!req.body.type) {
		return res.status(400).json({message:"Bad request"})
	}
	let tempId = parseInt(req.params.id,10);
	let sql = "UPDATE items SET type=?, count=?, price=? WHERE _id=? AND user=?";
	let values = [req.body.type,req.body.count,req.body.price,tempId,req.session.user];
	con.query(sql,values,function(err,result) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal server error"});
		}
		if(result.affectedRows === 0) {
			return res.status(404).json({message:"not found"})
		}
		return res.status(200).json({message:"success"});		
	})
})

module.exports = router;