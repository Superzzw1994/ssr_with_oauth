const axios = require('axios')
const config = require('../config')
const {clientId, clientSecret, requestTokenUrl} = config.github
module.exports = server => {
  server.use(async (ctx, next) => {
    if (ctx.path === '/auth') {
      const code = ctx.query.code
      if (!code) {
        ctx.body = 'code not exist'
        return
      }
      const result = await axios({
        method: 'POST',
        url: requestTokenUrl,
        data: {
          client_id: clientId,
          client_secret: clientSecret,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      })
      if (result.status === 200 && (result.data && !result.data.error)) {
        ctx.session.githubAuth = result.data
        const {access_token, token_type, scope} = result.data
        const userInfo = await axios({
          method: 'GET',
          url: 'https://api.github.com/user',
          headers: {
            'Authorization': `${token_type} ${access_token}`
          }
        })
        ctx.session.userInfo = userInfo.data
        ctx.redirect('/')
      } else {
        ctx.body = `request token failed ${result.message}`
      }
    } else {
      await next()
    }
  })
}
