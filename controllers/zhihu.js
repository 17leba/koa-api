const curl = require('./../utils/curl')
const random = require('./../utils/random')
const config = require('./../config/zhihu')
const third = require('./../utils/third')
const zhihuService = require('./../services/zhihu')
const loveService = require('./../services/love')

const qslog = require('debug')('random:question')

module.exports = {
	async getQuestion(ctx){
		if(ctx.query.question_id){
			let loveData = await loveService.getLoveForChannel(ctx, {
				love_id: ctx.query.question_id,
				type: 'question'
			})
			let result = await zhihuService.getQuestionById(ctx.query.question_id)
			ctx.body = Object.assign(loveData, result)
			return
		}
		let { topicId } = random({
			topicId: await third.redisTopic()
		})
		qslog('topic_id is %d', topicId)
		
		let { questionRes } = random({
			questionRes: (await curl.get(`https://api.zhihu.com/topics/${topicId}/essence_feeds`,null,{
				headers: config.headers
			})).data
		})

		let { questionId } = random({
			questionId: questionRes.target.question.id
		})

		let loveData = await loveService.getLoveForChannel(ctx, {
			love_id: questionId,
			type: 'question'
		})
		ctx.body = Object.assign(loveData,await zhihuService.getQuestionById(questionId))
	}
}