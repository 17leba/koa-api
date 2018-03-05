const feedbackService = require('./../services/feedback')
const userService = require('./../services/user')

module.exports = {
	async postContent (ctx){
		let data = {
			success: false,
			message: ''
		}
		let postData = ctx.request.body
		let userInfo = userService.isLogin(ctx)

		if(!postData.content.trim()){
			data.message = '内容为空'
			ctx.body = data
			return
		}
		postData.user_id = userInfo.user_id || ''

		let record = await feedbackService.updateFeedbackRecord(postData)
		if (record) {
			data.success = true
			data.message = '操作成功'
		}
		ctx.body = data
	}
}