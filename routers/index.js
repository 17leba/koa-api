const router = new require('koa-router')()

const api = require('./api')

router.use('/api', api.routes(), api.allowedMethods())

router.get(/.*$/, async (ctx) => {
	let title = 'ypb'
	await ctx.render('index.html', {
		title,
	})
})

module.exports = router