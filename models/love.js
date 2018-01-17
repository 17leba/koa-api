
const { query } =  require('./../utils/db')
const Type = require('./../utils/type')

module.exports = {
	async getLoveRecords(options){
		let sql = `SELECT * FROM love_list where user_id="${options.user_id}"`
		if(options.love_id){
			sql = `${sql} and love_id="${options.love_id}"`
		}
		if(options.type){
			sql = `${sql} and type="${options.type}"`
		}
		sql = `${sql} limit ${options.start || 0},${options.end || 1}`
		console.log(sql)
		let result = await query(sql)
		return result
	},
	async insertLoveData(options){
		let sql = `INSERT INTO love_list SET ?`
		console.log(sql)
		let result = await query(sql, options)
		return result
	},
	async deleteLoveData(options){
		let sql = `DELETE FROM love_list where 
		user_id="${options.user_id}" 
		AND love_id="${options.love_id}" 
		AND type="${options.type}"`
		let result = await query(sql, options)
		return result
	}
}