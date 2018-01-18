const curl = require('./../utils/curl')
const random = require('./../utils/random')
const config = require('./../config/douban')
const loveService = require('./../services/love')

const music = require('debug')('random:music')
const movie = require('debug')('random:movie')
const book = require('debug')('random:book')

module.exports = {
	async getMusic (ctx){
		let {
			channel,
			kbps,
			version,
			type,
			app_name,
		} = random({
			channel: config.musicChannel,
			kbps: config.musicKbps,
			version: config.musicVersion,
			type: config.musicType,
			app_name: config.musicAppName
		})
		// log
		music('channel is %d,kbps is %s,version is %d', channel, kbps, version)

		
		let result = await curl.get(config.musicUrl,{
			channel: channel,
			kbps: kbps,
			version: version,
			type: type,
			app_name: app_name
		},{
			headers: config.musicHeaders
		})

		let loveData = await loveService.getLoveForChannel(ctx, {
			love_id: result.song[0] && result.song[0].aid,
			type: 'music'
		})

		ctx.body = Object.assign(result, loveData)
	},
	async getMovie (ctx){
		// log
		movie('search keyword is %s', ctx.params.keyword)
		ctx.body = await curl.get(config.movieUrl,{
			q: ctx.params.keyword
		})
	},
	async getBook (ctx){
		let bookId
		if(ctx.query.book_id){
			bookId = ctx.query.book_id
			let loveData = await loveService.getLoveForChannel(ctx, {
				love_id: bookId,
				type: 'book'
			})
			ctx.body = Object.assign(loveData,await curl.get(`${config.bookUrl}${bookId}`).catch(err => {
				book(`${bookId} is not found`)
			}))
			return
		}
		bookId = random({
			bookId: config.bookId
		}).bookId
		
		book('book_id is %s', bookId)

		let loveData = await loveService.getLoveForChannel(ctx, {
			love_id: bookId,
			type: 'book'
		})
		let result = await curl.get(`${config.bookUrl}${bookId}`).catch(err => {
			book(`${bookId} is not found`)
		})
		ctx.body = Object.assign(loveData, result)
	}
}