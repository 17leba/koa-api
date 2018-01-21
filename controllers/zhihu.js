const curl = require('./../utils/curl')
const random = require('./../utils/random')
const config = require('./../config/zhihu')
const zhihuService = require('./../services/zhihu')
const loveService = require('./../services/love')

const qsLog = require('debug')('random:question')

module.exports = {
	async getQuestion(ctx) {
		let questionId
		if (ctx.query.question_id) {
			questionId = ctx.query.question_id
		} else {
			let {
				topicId
			} = random({
				topicId: await zhihuService.redisTopic()
			})
			qsLog('topic_id is %d', topicId)

			let {
				questionRes
			} = random({
				questionRes: (await curl.get(`https://api.zhihu.com/topics/${topicId}/essence_feeds`, null, {
					headers: config.headers
				})).data
			})
			questionId = questionRes.target.question.id
		}
		qsLog('question_id is %d', questionId)

		let loveData = await loveService.getLoveForChannel(ctx, {
			love_id: questionId,
			type: 'question'
		})

		let {
			limit,
			sortBy
		} = random({
			limit: config.limit,
			sortBy: config.sortBy
		})
		let result = await zhihuService.getQuestion({
			limit: limit,
			sortBy: sortBy,
			id: questionId
		})
		qsLog('question_id is %d,sortBy is %s,limit is %s', questionId, sortBy, limit)

		ctx.body = Object.assign(result, loveData)
	}
}