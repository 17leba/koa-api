const router = new require('koa-router')()
const douban = require('./../controllers/douban')
const zhihu = require('./../controllers/zhihu')
const wangyi = require('./../controllers/wangyi')

const user = require('./../controllers/user')
const love = require('./../controllers/love')

router.get('/random/music', douban.getMusic)
router.get('/random/movie/:keyword', douban.getMovie)
router.get('/random/book', douban.getBook)
router.get('/random/question', zhihu.getQuestion)
router.get('/random/news', wangyi.getNews)

// user
router.post('/user/login', user.login)
router.post('/user/register', user.register)
router.get('/user/is_login', user.isLogin)
router.post('/love/update', love.updateLoveRecord)
router.get('/love/list', love.getLoveRecords)

module.exports = router