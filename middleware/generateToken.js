const jwt = require('jsonwebtoken');
const generateAccessToken = (user) => {
	console.log(user)
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' })
}
const generateRefreshToken = (user) => {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '20m' })
}
module.exports = { generateAccessToken, generateRefreshToken }