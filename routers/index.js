const router = new require('koa-router')()

// const chat = require('./chat')
const api = require('./api')

// router.use('/chat', chat.routes(), chat.allowedMethod())
router.use('/api', api.routes(), api.allowedMethods())

module.exports = router
