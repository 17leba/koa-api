const curl = require('./../utils/curl')
const random = require('./../utils/random')
const config = require('./../config/wangyi')
const loveService = require('./../services/love')

const newsLog = require('debug')('random:news')

module.exports = {
	async getNews(ctx) {
		let newsId
		if (ctx.query.news_id) {
			newsId = ctx.query.news_id
		} else {
			let {
				channelId,
				fn
			} = random({
				channelId: config.channelList,
				fn: config.fn
			})
			newsLog('channelId is %s,fn is %s', channelId, fn)

			let newsList = await curl.get(config.dynamicUrl, {
				from: channelId,
				devId: config.devId,
				offset: config.offset,
				size: config.size,
				fn: fn
			})
			let {
				selectNews
			} = random({
				selectNews: newsList[channelId]
			})
			newsId = selectNews.docid
		}
		newsLog('newsId is %s', newsId)

		let result = await curl.get(`https://c.m.163.com/nc/article/${newsId}/full.html`)

		let loveData = await loveService.getLoveForChannel(ctx, {
			love_id: newsId,
			type: 'news'
		})
		ctx.body = Object.assign(result, loveData, {
			news_id: newsId
		})
	}
}