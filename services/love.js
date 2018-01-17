const loveModel = require('./../models/love')
const userService = require('./../services/user')

const tools = require('./../utils/tools')

module.exports = {
	async getLoveRecords(data){
		let page = data.page || 1
		let limit = data.limit || 20
		let start = (page - 1) * limit
		let end = start + limit

		let result = await loveModel.getLoveRecords({
			user_id: data.user_id,
			love_id: data.love_id,
			type: data.type,
			start: start,
			end: end
		})
		return result
	},
	async updateLoveRecord(data){
		let result
		if(parseInt(data.tag) === 1){
			result = await loveModel.insertLoveData({
				user_id: data.user_id,
				love_id: data.love_id,
				type: data.type,
				title: data.title
			})
		}else{
			result = await loveModel.deleteLoveData({
				user_id: data.user_id,
				love_id: data.love_id,
				type: data.type
			})
		}
		return result
	},
	async getLoveForChannel(ctx,data){
		let result = {
			has_loved: false
		}
		// 登录状态
		let userInfo = userService.isLogin(ctx)
		if(userInfo.isLogin){
			let record = await loveModel.getLoveRecords({
				user_id: userInfo.user_id,
				love_id: data.love_id,
				type: data.type
			})
			if(record.length){
				result.has_loved = true
			}
		}
		return result
	}
}