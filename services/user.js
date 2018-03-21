const bcrypt = require('bcrypt')
const securityConfig = require('../config/security')
const config = require('./../config')

const userModel = require('./../models/user')
const tools = require('./../utils/tools')

module.exports = {
	async getExistUser(data) {
		let result = await userModel.getExistUser({
			email: data.email,
			username: data.username
		})
		return result
	},
	async getUserByPassword(data) {
		let result = await userModel.getUserByPassword({
			username: data.username,
			password: data.password
		})
		return result
	},
	async createUser(data) {
		const salt = bcrypt.genSaltSync(securityConfig.saltRounds)
		const hashedPassword = bcrypt.hashSync(data.password, salt)
		let result = await userModel.createUser({
			user_id: tools.randomID('user'),
			username: data.username,
			password: hashedPassword
		})
		return result
	},
	validPassword(password, bcryptPW) {
		return bcrypt.compareSync(password, bcryptPW)
	},
	isLogin(ctx) {
		let data = {
			isLogin: false,
			username: '',
			user_id: ''
		}
		let session = ctx.session
		if (session && session.isLogin) {
			// 后台管理者
			if(ctx.query.type && ctx.query.type === 'admin'){
				if(!config.AuthorizedUsers.includes(session.username)){
					data.message = '当前用户无权访问'
					return data
				}
			}
			data.isLogin = true
			data.username = session.username
			data.user_id = session.user_id
		}
		return data
	}
}