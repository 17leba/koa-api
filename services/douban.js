const cheerio = require('cheerio')
const redis = require('redis')
const client = redis.createClient()
const {
	promisify
} = require('util')
const getAsync = promisify(client.get).bind(client)

const tools = require('./../utils/tools')
const curl = require('./../utils/curl')
const config = require('./../config/douban')
const random = require('./../utils/random')

module.exports = {
	async getBookTags() {
		let bookTags = await getAsync('bookTags')
		if (bookTags) {
			return JSON.parse(bookTags)
		}
		let tagHtml = await curl.get('https://book.douban.com/tag/?view=cloud')
		let $ = cheerio.load(tagHtml)
		let result = []
		let domArr = Array.from($('table.tagCol td').find('a'))
		domArr.forEach(v => {
			result.push($(v).text().trim())
		})
		// 存入redis
		client.set('bookTags', JSON.stringify(result), 'EX', 7 * 24 * 60 * 60)
		return result
	},
	async getBookResult(tag) {
		let {
			bookCount
		} = random({
			bookCount: config.bookCount
		})
		let searchResult = await curl.get(`${config.bookSearchUrl}`, {
			tag: tag,
			count: bookCount
		})
		let {
			bookResult
		} = random({
			bookResult: searchResult.books
		})
		return bookResult
	}
}