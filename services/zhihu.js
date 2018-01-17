
const curl = require('./../utils/curl')
const random = require('./../utils/random')
const config = require('./../config/zhihu')
const qslog = require('debug')('random:question')

module.exports = {
	async getQuestionById(id){
		let { limit, sortBy } = random({
			limit: config.limit,
			sortBy: config.sortBy
		})
		qslog('question_id is %d,sortBy is %s,limit is %s', id, sortBy, limit)
		
		let question = await curl.get(`https://www.zhihu.com/api/v4/questions/${id}`, null, {
			headers: config.headers
		})
		let answer = await curl.get(`https://www.zhihu.com/api/v4/questions/${id}/answers`, {
			include: config.include,
			limit: limit,
			sort_by: sortBy
		}, {
			headers: config.headers
		})

		return Object.assign(question, answer)
	}
}