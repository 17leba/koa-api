const loveService = require('./../services/love')
const userService = require('./../services/user')

module.exports = {
	async updateLoveRecord(ctx) {
		let data = {
			success: false,
			message: ''
		}
		let postData = ctx.request.body

		let userInfo = userService.isLogin(ctx)
		if (userInfo.isLogin) {
			postData.user_id = userInfo.user_id
			let record = await loveService.updateLoveRecord(postData)
			if (record) {
				data.success = true
				data.message = '操作成功'
			}
		} else {
			data.message = '未登录'
		}
		ctx.body = data
	},
	async getLoveRecords(ctx) {
		let userInfo = userService.isLogin(ctx)
		let result = {
			success: false,
			message: 'fail',
			data: []
		}
		if(userInfo.isLogin){
			result.success = true
			result.data = await loveService.getLoveRecords({
				user_id: userInfo.user_id,
				love_id: ctx.query.love_id,
				type: ctx.query.type,
				page: ctx.query.page,
				limit: ctx.query.limit
			})
		}else{
			result.message = '未登录'
		}
		ctx.body = result
	}
}