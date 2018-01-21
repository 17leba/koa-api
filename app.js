const Koa = require('koa')
const json = require('koa-json')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const path = require('path')
const views = require('koa-views')
const routers = require('./routers/index')
const static = require('koa-static')

const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const mysqlConfig = require('./config/mysql')

const staticPath = './static'

const sessionMysqlConfig = {
	user: mysqlConfig.USER,
	password: mysqlConfig.PASSWORD,
	database: mysqlConfig.DATABASE,
	host: mysqlConfig.HOST,
}

app.use(session({
	key: 'USER_SID',
	store: new MysqlStore(sessionMysqlConfig)
}))

app.use(bodyParser())
app.use(json())

app.use(static(
	path.join(__dirname, staticPath)
))

app.use(views(path.join(__dirname, './views'), {
	extension: 'nunjucks'
}))

app.use(routers.routes()).use(routers.allowedMethods())

app.use(async ctx => {
	ctx.body = 'hello ypber'
})

app.listen(3000)