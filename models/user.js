const bcrypt = require('bcrypt')
const securityConfig = require('./../config/security')

const {
	query
} = require('./../utils/db')
const Type = require('./../utils/type')

module.exports = {
	async getExistUser(options) {
		let sql = `SELECT * FROM user where username="${options.username}" or email="${options.email}"`
		let result = await query(sql)

		if (Type.isArray(result) && result.length > 0) {
			result = result[0]
		} else {
			result = null
		}
		return result
	},
	async getUserByPassword(options) {
		let sql = `SELECT * FROM user where password="${options.password}" and username="${options.username}"`
		let result = await query(sql)
		if (Type.isArray(result) && result.length > 0) {
			result = result[0]
		} else {
			result = null
		}
		return result
	},
	async createUser(options) {
		let sql = `INSERT INTO user SET ?`
		let result = await query(sql, options)
		return result
	}
}