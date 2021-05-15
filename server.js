const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const App = next({
  dev: process.env.NODE_ENV === 'development'
})

const handleNext = App.getRequestHandler()

App.prepare().then(() => {
  const server = new Koa()
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
  server.use(router.routes())
  server.use(async (ctx, next) => {
    await handleNext(ctx.req, ctx.res)
    ctx.respond = false
  })
  server.listen(3000, () => console.log('koa start'))
})
