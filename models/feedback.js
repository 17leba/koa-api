const {
	query
} = require('./../utils/db')

module.exports = {
	async insertFeedbackData(options) {
		let sql = `INSERT INTO feedback SET ?`
		console.log(sql)
		let result = await query(sql, options)
		return result
	}
}