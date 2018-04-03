const router = new require('koa-router')()
const douban = require('./../controllers/douban')
const zhihu = require('./../controllers/zhihu')
const wangyi = require('./../controllers/wangyi')

const user = require('./../controllers/user')
const love = require('./../controllers/love')
const feedback = require('./../controllers/feedback')
const upload = require('./../controllers/upload')
const blog = require('./../controllers/blog')

// random
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

// feedback
router.post('/random/feedback', feedback.postContent)

// upload image
router.post('/upload/image', upload.uploadImage)

// blog
router.post('/article/save', blog.updateArticle)
router.post('/article/delete', blog.deleteArticle)
router.get('/article/list', blog.getArticleList)
router.get('/article/:id', blog.getArticleDetail)
router.get('/tags', blog.getAllTags)
router.get('/tag/list', blog.getListByTag)
router.get('/search', blog.getSearchList)

module.exports = router