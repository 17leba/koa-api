const Koa = require('koa')
const json = require('koa-json')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const routers = require('./routers/index')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const mysqlConfig = require('./config/mysql')

const sessionMysqlConfig= {
  	user: mysqlConfig.USER,
  	password: mysqlConfig.PASSWORD,
  	database: mysqlConfig.DATABASE,
  	host: mysqlConfig.HOST,
}

app.use(session({
  	key: 'USER_SID',
  	store: new MysqlStore(sessionMysqlConfig)
}))

console.log(new MysqlStore(sessionMysqlConfig))
app.use(bodyParser())
app.use(json())
app.use(routers.routes()).use(routers.allowedMethods())

app.use(async ctx => {
	ctx.body = 'hello'
})

app.listen(3000)