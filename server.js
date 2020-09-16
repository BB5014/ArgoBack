require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connection = require("./configuration/db.config");

const app = express();

app.use(cors());
// parse requests of content-type : application/json
app.use(bodyParser.json());

// parse requests of content-type : application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/getMembers", (req, res) => {
	let getMembers = "SELECT * FROM member ORDER BY name";
	connection.query(getMembers, (err, results) => {
		if (err) {
			res.status(500).json("Erreur lors de la récupération des données");
		} else {
			res.status(200).json(results);
		}
	});
});

app.post("/api/newMember", (req, res) => {
	let name = req.body.name;
	let quality = req.body.quality;

	const insertNewMember = "INSERT INTO member (name, quality) VALUES (?,?)";
	connection.query(insertNewMember, [name, quality], (err, results) => {
		if (err) {
			res.status(404).json("Erreur lors de la création");
		} else {
			res.status(201).json({ message: "Argonaute créé avec succès" });
		}
		console.log(results);
	});
});

app.delete("/api/deleteMember/:id", (req, res) => {
	const id = req.params.id;

	const deleteMember = "DELETE FROM member WHERE id = ?";
	connection.query(deleteMember, id, (err, results) => {
		if (err) {
			res.status(500).send("Erreur lors de la modification");
		} else {
			res.sendStatus(200);
		}
		console.log(results);
	});
});

// set port, listen for requests

app.listen(process.env.PORT, (err) => {
	if (err) {
		throw new Error("Something bad happened...");
	}

	console.log(`Server is listening on ${process.env.PORT}`);
});
