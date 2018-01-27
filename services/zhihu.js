const redis = require('redis')
const client = redis.createClient()
const {
	promisify
} = require('util')
const getAsync = promisify(client.get).bind(client)
const curl = require('./../utils/curl')
const cheerio = require('cheerio')

const config = require('./../config/zhihu')

const qsLog = require('debug')('random:question')

module.exports = {
	async getQuestion(opt) {
		let question = await curl.get(`https://www.zhihu.com/api/v4/questions/${opt.id}`, null, {
			headers: config.headers
		})
		let answer = await curl.get(`https://www.zhihu.com/api/v4/questions/${opt.id}/answers`, {
			include: config.include,
			limit: opt.limit,
			sort_by: opt.sortBy
		}, {
			headers: config.headers
		})
		// 处理content中的图片
		answer.data.forEach((v, i) => {
			v.content = this.parseContentHtml(v.content)
		})
		return Object.assign(question, answer)
	},
	async getZHTopic(userTocken = config.urlTocken) {
		let result = []
		let loopGetTopic = async function(url = `https://api.zhihu.com/people/${userTocken}/following_topics`) {
			let response = await curl.get(url, null, {
				headers: config.headers
			})

			let list = response.data
			if (list.length && !response.paging.is_end) {
				for (let i = 0, len = list.length; i < len; i++) {
					result.push(list[i].id)
				}
				await loopGetTopic(response.paging.next)
			}
		}
		await loopGetTopic()
		return result
	},
	async redisTopic() {
		let redisTopicList = await getAsync('topicList')
		if (redisTopicList) {
			return JSON.parse(redisTopicList)
		}
		let topicList = await this.getZHTopic()
		// 存入redis
		client.set('topicList', JSON.stringify(topicList), 'EX', 7 * 24 * 60 * 60)
		return topicList
	},
	parseContentHtml(html) {
		$ = cheerio.load(html)
		let $lazy = $('.lazy')
		// forEach：jQuery对象转换为Dom对象
		Array.from($lazy).forEach((v, i) => {
			$(v).attr('src', $(v).data('actualsrc'))
		})
		return $.text()
	}
}