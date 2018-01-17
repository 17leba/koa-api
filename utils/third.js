const redis = require('redis')
const client = redis.createClient()
const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

const zhihuConfig = require('./../config/zhihu')
const curl = require('./curl')

module.exports = {
	async getZHTopic (userTocken='2a8481dfd21e459d4386b86960c96049'){
		let result = []
		let loopGetTopic = async function(url=`https://api.zhihu.com/people/${userTocken}/following_topics`){
			let response = await curl.get(url, null, {
				headers: zhihuConfig.headers
			})

			let list = response.data
			if(list.length && !response.paging.is_end){
				for(let i = 0,len = list.length;i < len;i++){
					result.push(list[i].id)
				}
				await loopGetTopic(response.paging.next)
			}
		}
		await loopGetTopic()
		return result
	},
	async redisTopic(){
		let redisTopicList = await getAsync('topicList')
		if(redisTopicList){
			return JSON.parse(redisTopicList)
		}
		let topicList = await this.getZHTopic()
		// 存入redis
		client.set('topicList', JSON.stringify(topicList), 'EX', 7 * 24 * 60 * 60)

		return topicList
	}
}