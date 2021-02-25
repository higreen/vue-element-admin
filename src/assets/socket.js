/**
 * WebSocket
 */
import { Message } from 'element-ui'
import { getAuth } from '@/assets/auth'

// 网址
const URL = 'ws://api.green.localhost/ws'
// 实例
let ws = null
// 事件
let events = {}
// 定时器
let timer = null

// 保持心跳
function keepHeartBeat() {
  if (!ws) return

  const auth = getAuth()
  if (!auth) {
    ws.close()
    return
  }

  socket.send('HeartBeat', auth)
  clearTimeout(timer)
  timer = setTimeout(() => keepHeartBeat(), 55000)
}

// 派发事件
function dispatchEvent(type, data) {
  const e = new MessageEvent(type, { data })
  ws.dispatchEvent(e)
}

const socket = {
  // 连接
  connect() {
    return
    if (ws) {
      ws.close()
      ws = null
    }

    ws = new WebSocket(URL)

    ws.onopen = function() {
      if (!timer) {
        keepHeartBeat()
      }
    }

    ws.onmessage = (e) => {
      console.log('message --------------------')
      console.log(e.data)
      const res = JSON.parse(e.data)
      if (res.type) {
        dispatchEvent(res.type, res.data)
      }
    }

    ws.onerror = (e) => {
      console.log('WebSocket error --------------------')
    }

    ws.onclose = () => {
      console.log('WebSocket close --------------------')
      ws = null
      events = {}
    }
  },
  // 发送数据
  send(type, data = '') {
    if (!ws) {
      Message.error('服务未连接')
      return false
    }
    if (!ws || ws.readyState !== 1) {
      Message.error('服务连接中')
      return false
    }

    try {
      const message = {
        type,
        data,
      }

      ws.send(JSON.stringify(message))

      return true
    } catch (e) {
      console.log(e.message)
      return false
    }
  },
  // 注册事件
  addEvent(type, listener) {
    if (!ws) {
      console.log('WebSocket is null')
      return
    }
    if (ws.readyState !== 1) {
      console.log('WebSocket connecting...')
      setTimeout(() => this.addEvent(type, listener), 1000)
      return
    }

    this.delEvent(type)
    events[type] = listener
    ws.addEventListener(type, events[type])
  },
  // 删除事件
  delEvent(type) {
    if (events[type]) {
      ws.removeEventListener(type, events[type])
    }
  },
}

export default socket
