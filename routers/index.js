const router = new require('koa-router')()

// const chat = require('./chat')
const api = require('./api')

// router.use('/chat', chat.routes(), chat.allowedMethod())
router.use('/api', api.routes(), api.allowedMethods())

router.get(/.*$/, async (ctx) => {
	let title = 'ypb'
	await ctx.render('index.html', {
	    title,
  	})
})

module.exports = router
