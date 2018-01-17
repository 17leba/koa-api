const loveService = require('./../services/love')

module.exports = {
	async updateLoveRecord (ctx){
		let data = {
			success: false,
			message: 'fail'
		}
		let postData = ctx.request.body
		let record = await loveService.updateLoveRecord(postData)
		console.log(record)
		if(record){
			data.success = true
			data.message = '操作成功'
		}
		ctx.body = data
	},
	async getLoveRecords(ctx){
		let result = await loveService.getLoveRecords({
			user_id: ctx.query.user_id,
			love_id: ctx.query.love_id,
			type: ctx.query.type,
			page: ctx.query.page,
			limit: ctx.query.limit
		})
		ctx.body = result
	}
}