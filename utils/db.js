const mysql = require('mysql')
const config = require('./../config/mysql')

const pool = mysql.createPool({
	host: config.HOST,
	user: config.USER,
	password: config.PASSWORD,
	database: config.DATABASE
})

let query = (sql, values) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err)
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						reject(err)
					} else {
						resolve(rows)
					}
					connection.release()
				})
			}
		})
	})
}

module.exports = {
	query
}