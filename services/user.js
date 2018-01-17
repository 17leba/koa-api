const bcrypt = require('bcrypt')
const securityConfig = require('../config/security')
const moment = require('moment')

const userModel = require('./../models/user')
const tools = require('./../utils/tools')

module.exports = {
	async getExistUser(data){
		let result = await userModel.getExistUser({
			email: data.email,
			username: data.username
		})
		return result
	},
	async getUserByPassword(data){
		let result = await userModel.getUserByPassword({
			username: data.username,
			password: data.password
		})
		return result
	},
	async createUser(data){
		const salt = bcrypt.genSaltSync(securityConfig.saltRounds)
		const hashedPassword = bcrypt.hashSync(data.password, salt)
		let result = await userModel.createUser({
			user_id: tools.randomID('user'),
			username: data.username,
			password: hashedPassword
			// create_time: moment().format('YYYY-MM-DD HH:mm:ss')
		})
		return result
	},
	async validPassword(password, bcryptPW){
		return bcrypt.compareSync(password, bcryptPW)
	},
	isLogin(ctx){
		let data = {
			isLogin: false,
			username: '',
			user_id: ''
		}
		let session = ctx.session
		if(session && session.isLogin){
			data.isLogin = true
			data.username = session.username
			data.user_id = session.user_id
		}
		return data
	}
}