const curl = require('./../utils/curl')
const random = require('./../utils/random')
const config = require('./../config/wangyi')
const loveService = require('./../services/love')

const news = require('debug')('random:news')

module.exports = {
	async getNews(ctx){
		let newId = ctx.query.news_id
		if(newId){
			let loveData = await loveService.getLoveForChannel(ctx, {
				love_id: newId,
				type: 'news'
			})
			ctx.body = Object.assign(await curl.get(`https://c.m.163.com/nc/article/${newId}/full.html`),{
				news_id: newId
			}, loveData)
			return
		}
		let { channelId, fn } = random({
			channelId: config.channelList,
			fn: config.fn
		})
		news('channelId is %s,fn is %s', channelId, fn)

		let newsList = await curl.get(config.dynamicUrl,{
			from: channelId,
			devId: config.devId,
			offset: config.offset,
			size: config.size,
			fn: fn
		})
		let { selectNews } = random({
			selectNews: newsList[channelId]
		})
		news('newsId is %s', selectNews.docid)

		let loveData = await loveService.getLoveForChannel(ctx, {
			love_id: selectNews.docid,
			type: 'news'
		})
		ctx.body = Object.assign(await curl.get(`https://c.m.163.com/nc/article/${selectNews.docid}/full.html`),{
			news_id: selectNews.docid
		}, loveData)
	}
}