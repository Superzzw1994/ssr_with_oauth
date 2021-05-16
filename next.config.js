const config = require('./config')
const {github} = config
const githubOauthUri = 'https://github.com/login/oauth/authorize'
const scope = 'user'
module.exports = {
  distDir: 'dist',
  pageExtensions: ['jsx', 'js', 'ts', 'tsx'],
  publicRuntimeConfig: {
    githubOauthUri,
    oauthUri: `${githubOauthUri}?client_id=${github.clientId}&scope=${scope}`
  }
}
