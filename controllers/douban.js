const curl = require('./../utils/curl')
const random = require('./../utils/random')
const config = require('./../config/douban')

const loveService = require('./../services/love')
const doubanService = require('./../services/douban')

const musicLog = require('debug')('random:music')
const movieLog = require('debug')('random:movie')
const bookLog = require('debug')('random:book')

module.exports = {
	async getMusic(ctx) {
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
		musicLog('channel is %d,kbps is %s,version is %d', channel, kbps, version)

		let result = await curl.get(config.musicUrl, {
			channel: channel,
			kbps: kbps,
			version: version,
			type: type,
			app_name: app_name
		}, {
			headers: config.musicHeaders
		})

		let loveData = await loveService.getLoveForChannel(ctx, {
			love_id: result.song[0] && result.song[0].aid,
			type: 'music'
		})

		ctx.body = Object.assign(result, loveData)
	},
	async getMovie(ctx) {
		// log
		movieLog('search keyword is %s', ctx.params.keyword)
		ctx.body = await curl.get(config.movieUrl, {
			q: ctx.params.keyword
		})
	},
	async getBook(ctx) {
		let bookResult, bookId
		if (ctx.query.book_id) {
			bookId = ctx.query.book_id
			bookResult = await curl.get(`${config.bookUrl}${bookId}`)
		} else {
			let {
				randomTag
			} = random({
				randomTag: await doubanService.getBookTags()
			})
			bookLog('random_tag is %s', randomTag)
			bookResult = await doubanService.getBookResult(randomTag)
			bookId = bookResult.id
		}
		bookLog('book_id is %s', bookId)

		let loveData = await loveService.getLoveForChannel(ctx, {
			love_id: bookId,
			type: 'book'
		})
		ctx.body = Object.assign(loveData, bookResult)
	}
}