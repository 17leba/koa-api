const user = require('debug')('user')
const userService = require('./../services/user')
const config = require('./../config')

module.exports = {
	async login(ctx) {
		let data = {
			success: false,
			message: '',
			user_id: ''
		}
		let postData = ctx.request.body
		let user = await userService.getExistUser(postData)
		if (!user) {
			data.message = `${postData.username}不存在`
		} else {
			// 后台管理者
			if(postData.type && postData.type === 'admin'){
				if(!config.AuthorizedUsers.includes(postData.username)){
					data.message = '当前用户无权访问'
					ctx.body = data
					return false
				}
			}
			let isPassword = userService.validPassword(postData.password, user.password)
			if (!isPassword) {
				data.message = '密码错误'
			} else {
				data.success = true
				data.message = '登录成功'
				data.user_id = user.user_id
				data.username = user.username
				// session
				let session = ctx.session
				session.isLogin = true
				session.username = user.username
				session.user_id = user.user_id
			}
		}

		ctx.body = data
	},
	async register(ctx) {
		let data = {
			success: false,
			message: ''
		}
		let postData = ctx.request.body
		let result = await userService.getExistUser({
			username: postData.username,
			email: postData.email
		})
		if (result) {
			data.message = '此用户已经存在'
		} else {
			data.success = true
			await userService.createUser({
				username: postData.username,
				password: postData.password,
				email: postData.email
			})
		}
		ctx.body = data
	},
	isLogin(ctx) {
		ctx.body = userService.isLogin(ctx)
	}
}