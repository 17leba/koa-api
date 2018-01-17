const tools = require('./../utils/tools')

module.exports = {
	// musicChannel: tools.generateArray(-100,100),
	musicChannel: [
		// 263, //天猫理想生活
		// 76, //小清新
		// 188, //布鲁斯
		// 187, //世界音乐
		// 28, //动漫
		// 15, //说唱
		// 14, //电子
		// 13, //爵士
		// 8, //民谣
		// 7, //摇滚
		6, //粤语
		3, //七零
		// 2, //欧美
		1, //华语
		// 17, //日语
		// 18, //韩语
		// 194, //流行
		// 257, // 运动
		// 152, //休息
		// 32, //咖啡
		// 77, //Easy
		// 153, //工作学习
		// 152, //户外
	],
	musicKbps: [64, 128, 192],
	musicVersion: tools.generateArray(1,100),
	musicType: 'n',
	musicAppName: 'radio_website',
	musicHeaders: {
		'Referer': 'https://douban.fm/',
	    'Host': 'douban.fm',
	    'Cookie': 'bid=IUt-GFeg5J4'
	},
	musicUrl: 'https://douban.fm/j/v2/playlist',
	movieUrl: 'https://api.douban.com/v2/movie/search',
	bookUrl: 'https://api.douban.com/v2/book/',
	bookId: tools.generateArray(1000001,7000001)
}