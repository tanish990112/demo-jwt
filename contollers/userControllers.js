const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports.SignUp =  async (req, res,) => {
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await users.create({
            username: req.body.username,
			password: newPassword
		})
		res.json({ status: 'ok' })
	}catch (err) {
		res.json({ status: 'error', error: "Please Find A diffrenent Username "})
	}
}

module.exports.Login = async (req, res) => {
	
	const user = await users.findOne({
		username: req.body.username,
	})

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid login' })
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)
	if (isPasswordValid) {
		const token = jwt.sign(
			{
				username: user.username,
			},
			'secret123'
		)
		return res.json({ status: 'ok', user: token })
	
	} else {
		return res.json({ status: 'error', user: false })
	}
}

module.exports.quoteRender = async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, 'secret123')
		const username = decoded.username
		const user = await users.findOne({ username : username })
		return res.json({ status: 'ok', quote: user.quote, name: user.username })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'You need to login first'})
	}
}

module.exports.Quote = async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, 'secret123')
		const username = decoded.username
		await users.updateOne(
			{ username : username },
			{ $set: { quote: req.body.quote } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
}