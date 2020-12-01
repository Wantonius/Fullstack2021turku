const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());

//DATABASE

let database = [];
let id = 100;

app.get("/api/shopping",function(req,res) {
	return res.status(200).json(database);
});

app.post("/api/shopping",function(req,res) {
	let item = {
		type:req.body.type,
		price:req.body.price,
		count:req.body.count,
		id:id
	}
	id++;
	database.push(item);
	return res.status(201).json({message:"success!"})
})

app.delete("/api/shopping/:id",function(req,res) {
	let id = parseInt(req.params.id,10);
	let tempDatabase = database.filter(item => item.id !== id);
	database = tempDatabase;
	return res.status(200).json({message:"success!"});
})

app.put("/api/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let item = {
		type:req.body.type,
		price:req.body.price,
		count:req.body.count,
		id:tempId
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			database.splice(i,1,item);
			return res.status(200).json({message:"success!"});
		}
	}
	return res.status(404).json({message:"not found!"});
})

app.listen(3000);
console.log("Running in port 3000");