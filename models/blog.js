const {
	query
} = require('./../utils/db')

module.exports = {
	async insertArticle(options) {
		let sql = `INSERT INTO article SET ?`
		console.log(sql)
		let result = await query(sql, options)
		return result
	},
	async updateArticle(options){
		let sql = `UPDATE article SET
			title='${options.title}',
			content='${options.content}',
			description='${options.description}'
			where id=${options.id}`
		console.log(sql)
		let result = await query(sql)
		return result
	},
	async getArticleRecords (options){
		let sql = `SELECT * FROM article order by create_time desc limit ${options.start || 0},${options.limit || 20}`
		console.log(sql)
		let result = await query(sql)
		return result
	},
	async getArticleDetail(options){
		let sql = `SELECT * FROM article where id=${options.id}`
		console.log(sql)
		let result = await query(sql)
		return result
	},
	async deleteArticle(options){
		let sql = `DELETE FROM article where id=${options.id}`
		console.log(sql)
		let result = await query(sql)
		return result
	}
}