require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./middleware/tokenAuthenticate');

app.use(express.json());

const serverData = [
	{
		username: 'Jason',
		secret: 'Lives in a lazer tag'
	}, {
		username: 'Willo',
		secret: 'woah'
	}, {
		username: 'Buckalo',
		secret: 'hey'
	}, {
		username: 'Jorgeo',
		secret: 'gorge'
	}
]

app.get('/serverData', authenticateToken, (req, res) => {
	res.json(serverData.filter(post => post.username === req.user.name));
})

app.post('/login', (req, res) => {
	//Authentication USER
	console.log(req.body.username);
	const username = req.body.username;
	const user = { name: username };
	//Assuming that the authentication has been completed the JWT.sign should also include
	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
	res.json({ accessToken });
})

app.listen(4000, () => {
	console.log("Server is listening on port 4000");
});