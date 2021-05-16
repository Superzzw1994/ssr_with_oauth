const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const Redis = require('ioredis')
const session = require('koa-session')
const RedisSessionStore = require('./server/sessionStore')
const auth = require('./server/auth')
const App = next({
  dev: process.env.NODE_ENV === 'development'
})
const handleNext = App.getRequestHandler()
const redis = new Redis()
App.prepare().then(() => {
  const server = new Koa()
  server.keys = ['zzw1994529']
  const SESSION_CONFIG = {
    key: 'jid',
    store: new RedisSessionStore(redis)
  }
  const router = new Router()
  router.get('/user/:id', async (ctx) => {
    const id = ctx.params.id
    await handleNext(ctx.req, ctx.res, {
      pathname: '/user',
      query: {
        id
      }
    })
    ctx.respond = false
  })
  server.use(session(SESSION_CONFIG, server))
  auth(server)
  router.get('/api/user/info', async ctx => {
    const user = ctx.session.userInfo
    if (!user) {
      ctx.status = 401
      ctx.body = 'Need Login'
    } else {
      ctx.body = user
      ctx.set('Content-Type', 'application/json')
    }
  })
  server.use(router.routes())
  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session
    await handleNext(ctx.req, ctx.res)
    ctx.respond = false
  })
  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })
  server.listen(3000, () => console.log('koa start'))
})
