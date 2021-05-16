class RedisSessionStore {
  constructor(client) {
    this.client = client
  }

  // 获取存取的session数据
  async get(id) {
    const sessionId = this.getRedisSessionId(id)
    const value = await this.client.get(sessionId)
    if (!value) {
      return null
    }
    try {
      return JSON.parse(value)
    } catch (e) {
      console.log(e)
    }
  }

  // 存储session数据到redis
  async set(id, value, ttl) {
    const sessionId = this.getRedisSessionId(id)
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000)
    }
    try {
      const content = JSON.stringify(value)
      if (ttl) {
        await this.client.setex(sessionId, ttl, content)
      } else {
        await this.client.set(sessionId, content)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 删除session
  async destroy(id) {
    const sessionId = this.getRedisSessionId(id)
    this.client.del(sessionId)
  }

  getRedisSessionId = (id) => {
    return `ssid:${id}`
  }
}


module.exports = RedisSessionStore
