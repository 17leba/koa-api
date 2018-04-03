const blogModel = require('./../models/blog')

module.exports = {
	async updateArticle(data) {
		let result
		if(!data.article_id){
			result = await blogModel.insertArticle({
				admin: data.admin,
				title: data.title,
				description: data.content.slice(0,255),
				content: data.content,
				tags: data.tags
			})
			
		}else{
			result = await blogModel.updateArticle({
				id: data.article_id,
				title: data.title,
				description: data.content.slice(0,255),
				content: data.content,
				tags: data.tags
			})
		}
		return result
	},
	async getArticleList(data) {
		let page = data.page || 1
		let limit = data.limit || 20
		let start = (page - 1) * limit

		let result = await blogModel.getArticleRecords({
			start: start,
			limit: limit
		})
		return result
	},
	async getArticleDetail(data){
		let result = await blogModel.getArticleDetail({
			id: data.id
		})
		return result
	},
	async deleteArticle(data){
		let result = await blogModel.deleteArticle({
			id: data.id
		})
		return result
	},
	async getAllTags(){
		let data = await blogModel.getAllTags()
		let result = []
		data.forEach((data) => {
			result = result.concat(data.tags.split('|'))
		})
		// 去重
		result = [...new Set(result)]
		return result
	},
	async getListByTag(data){
		let page = data.page || 1
		let limit = data.limit || 20
		let start = (page - 1) * limit

		let result = await blogModel.getListByTag({
			tag: data.tag,
			start: start,
			limit: limit
		})
		return result
	}
}