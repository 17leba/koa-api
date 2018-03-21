const userService = require('./../services/user')
const blogService = require('./../services/blog')
const config = require('./../config')

module.exports = {
	async updateArticle (ctx){
		let result = {
			success: false,
			message: ''
		}
		let postData = ctx.request.body
		let userInfo = userService.isLogin(ctx)

		if(!userInfo.isLogin || !config.AuthorizedUsers.includes(userInfo.username)){
			result.message = '未登录或者无权限'
			ctx.body = result
			return
		}
		if(!postData.title.trim()){
			result.message = '标题为空'
			ctx.body = result
			return
		}
		if(!postData.content.trim()){
			result.message = '内容为空'
			ctx.body = result
			return
		}
		postData.admin = userInfo.username || ''

		let record = await blogService.updateArticle(postData)
		if (record) {
			result.success = true
			result.message = '操作成功'
		}
		ctx.body = result
	},
	async getArticleList (ctx){
		let result = {
			success: false,
			message: '',
			data: []
		}
		result.success = true
		result.data = await blogService.getArticleList({
			page: +ctx.query.page,
			limit: ctx.query.limit
		})
		ctx.body = result
	},
	async getArticleDetail(ctx){
		let result = {
			success: false,
			message: '',
			data: {}
		}
		let data = await blogService.getArticleDetail({
			id: ctx.params.id
		})
		if(data){
			result.success = true
			result.data = data.length && data[0]
		}else{
			result.message = '没有此篇文章'
		}
		ctx.body = result
	},
	async deleteArticle(ctx){
		let result = {
			success: false,
			message: '操作失败',
		}
		let postData = ctx.request.body
		let userInfo = userService.isLogin(ctx)

		if(!userInfo.isLogin || !config.AuthorizedUsers.includes(userInfo.username)){
			result.message = '未登录或者无权限'
			ctx.body = result
			return
		}
		let data = await blogService.deleteArticle(postData)
		if(data){
			result.success = true
			result.message = '删除成功'
		}
		ctx.body = result
	}
}