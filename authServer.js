require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('./middleware/generateToken');

app.use(express.json());

var refreshTokenDatabase = [];

app.post('/token', (req, res) => {
	const clientRefreshToken = req.body.token;
	if (clientRefreshToken == null) return res.sendStatus(401);
	if (!refreshTokenDatabase.includes(clientRefreshToken)) return res.sendStatus(403);
	jwt.verify(clientRefreshToken, process.env.REFRESH_TOKEN_SECRET,
		(err, user) => {
			if (err) return res.sendStatus(403);
			const accessToken = generateAccessToken({ name: user.name }); //10-25 minutes
			res.json({ accessToken });
		}
	);
});

app.delete('/logout', (req, res) => {
	refreshTokenDatabase = refreshTokenDatabase.filter(token => token !== req.body.token);
	res.sendStatus(204);
})

app.post('/login', (req, res) => {
	//Authentication USER
	console.log(req.body.username);
	const username = req.body.username;
	const user = { name: username };
	//Assuming that the authentication has been completed the JWT.sign should also include
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);
	refreshTokenDatabase.push(refreshToken);
	res.json({ accessToken, refreshToken });
})

app.listen(6000, () => {
	console.log("Server is listening on port 6000");
});