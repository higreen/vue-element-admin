<template>
  <main class="chat-box">
    <div class="people-list">
      <p v-show="!list_user.length" class="el-alert el-alert--info is-center is-light">暂无用户连线</p>
      <ul class="list">
        <template v-for="(item, index) in list_user">
          <li :key="index" class="clearfix" :class="{active:index===list_user_index}" @click="changeUser(index)">
            <img :src="item.avatar" alt="avatar">
            <div class="about">
              <div class="name">{{ item.nickname }}</div>
              <div class="status">
                <i class="fa fa-circle online" /> online
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <div class="chat">
      <div class="chat-history">
        <ul>
          <template v-for="(item,index) in list_msg">
            <li v-if="item.sender==1" :key="index" class="clearfix">
              <div class="message-data align-right">
                <span class="message-data-time">{{ item.created_at }}</span>
                <span class="message-data-name">我</span>
                <i class="fa fa-circle me" />
              </div>
              <div class="message other-message float-right">{{ item.content }}</div>
            </li>
            <li v-else :key="index">
              <div class="message-data">
                <span class="message-data-name">
                  <i class="fa fa-circle online" />
                  {{ nickname }}
                </span>
                <span class="message-data-time">{{ item.created_at }}</span>
              </div>
              <div class="message my-message">{{ item.content }}</div>
            </li>
          </template>
        </ul>
      </div>
      <div class="chat-message clearfix">
        <el-input v-model="form.content" type="textarea" autosize placeholder="请输入内容" @keyup.enter="sendMessage" />
        <el-button type="success" @click="sendMessage">发送</el-button>
      </div>
    </div>
  </main>
</template>

<script>
import ajax from '@/assets/ajax'
import socket from '@/assets/socket'

export default {
  name: 'CustomerService',
  data() {
    return {
      list: [],
      list_user: [],
      list_user_index: null,
      list_msg: [],
      form: {
        is_service: true,
        to_uid: 2,
        content: '',
        content_type: 0,
      },
    }
  },
  computed: {
    nickname() {
      const user = this.list_user[this.list_user_index]
      return user ? user.nickname : ''
    },
  },
  created() {
    this.getList()
  },
  mounted() {
    socket.addEvent('CustomerService', this.renderMessage)
  },
  methods: {
    changeUser(index) {
      this.list_user_index = index
      this.list_msg = this.list_user[index].messages
    },
    scrollToBottom() {
      if (!this.dom_msg) {
        this.dom_msg = document.getElementById('chat_msg')
      }

      setTimeout(() => {
        this.dom_msg.scroll({
          top: 100000,
          behavior: 'smooth',
        })
      }, 50)
    },
    // 查询列表
    getList() {
      //
    },
    /* getMessage() {
      const user = this.list_user[this.list_user_index]
      let openid = user ? user.openid : ''
      let url = '/web/index.php?c=site&a=entry&m=ewei_shopv2&do=web&r=property.chat.get'
      url += `&openid=${openid}`

      $.get(url, (res) => {
        const users = res.result.users
        if (users.length) {
          users.forEach((i) => {
            let index = this.list_user.findIndex((j) => j.openid === i.openid)
            if (index === -1) {
              i.messages = []
              this.list_user.push(i)
            }
          })
        }

        const messages = res.result.messages
        if (messages.length) {
          messages.forEach((item) => {
            this.list_msg.push(item)
          })
          this.scrollToBottom()
        }

        if (this.list_user_index === null) {
          this.list_user_index = 0
        }
      }, 'json')
    },*/
    // 发送消息
    sendMessage() {
      const user = this.list_user[this.list_user_index]
      // if (!user) return

      const data = { ...this.form }
      if (!data.content) return

      const res = socket.send('CustomerService', data)
      if (res) {
        this.form.content = ''
      }
    },
    renderMessage(e) {
      console.log('renderMessage')
      console.log(e)
      this.list_msg.push(e.data)
    },
  },
}
</script>

<style scoped>
.chat-box {
  display: flex;
  margin: 30px auto 0;
  padding: 0 15px;
  max-width: 1000px;
  background: #444753;
  border-radius: 5px;
}

.people-list {
  margin-right: 15px;
  width: 260px;
}
.people-list > p {
  margin-top: 15px;
  margin-right: 15px;
  text-align: center;
}
.people-list .search {
  padding: 20px;
}
.people-list input {
  border-radius: 3px;
  border: none;
  padding: 14px;
  color: white;
  background: #6A6C75;
  width: 90%;
  font-size: 14px;
}
.people-list .fa-search {
  position: relative;
  left: -25px;
}
.people-list ul {
  padding-right: 15px;
  height: 770px;
}
.people-list ul li {
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}
.people-list ul li.active {
  background: lightgray;
}
.people-list img {
  float: left;
  width: 50px;
  height: 50px;
}
.people-list .about {
  float: left;
  margin-top: 8px;
}
.people-list .about {
  padding-left: 8px;
}
.people-list .status {
  color: #92959E;
}

.chat {
  flex: 1;
  background: #F2F5F8;
  border-top: 1px solid #444753;
  border-bottom: 1px solid #444753;
  color: #434651;
}
.chat .chat-header {
  padding: 20px;
  border-bottom: 2px solid white;
}
.chat .chat-header img {
  float: left;
}
.chat .chat-header .chat-about {
  float: left;
  padding-left: 10px;
  margin-top: 6px;
}
.chat .chat-header .chat-with {
  font-weight: bold;
  font-size: 16px;
}
.chat .chat-header .chat-num-messages {
  color: #92959E;
}
.chat .chat-header .fa-star {
  float: right;
  color: #D8DADF;
  font-size: 20px;
  margin-top: 12px;
}
.chat .chat-history {
  padding: 30px 30px 20px;
  border-bottom: 2px solid white;
  overflow-y: scroll;
  height: calc(100% - 112px)
}
.chat .chat-history .message-data {
  margin-bottom: 15px;
}
.chat .chat-history .message-data-time {
  color: #a8aab1;
  padding-left: 6px;
}
.chat .chat-history .message {
  color: white;
  padding: 5px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  margin-bottom: 10px;
  width: 90%;
  position: relative;
}
.chat .chat-history .message:after {
  bottom: 100%;
  left: 7%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #86BB71;
  border-width: 10px;
  margin-left: -10px;
}
.chat .chat-history .my-message {
  background: #86BB71;
}
.chat .chat-history .other-message {
  background: #94C2ED;
}
.chat .chat-history .other-message:after {
  border-bottom-color: #94C2ED;
  left: 93%;
}
.chat .chat-message {
  display: flex;
  padding: 30px;
}
.chat .chat-message input {
  width: 100%;
  border: none;
  padding: 10px 20px;
  font: 14px/22px "Lato", Arial, sans-serif;
  margin-bottom: 10px;
  border-radius: 5px;
  resize: none;
}
.chat .chat-message .fa-file-o, .chat .chat-message .fa-file-image-o {
  font-size: 16px;
  color: gray;
  cursor: pointer;
}

.online, .offline, .me {
  margin-right: 3px;
  font-size: 10px;
}

.online {
  color: #86BB71;
}

.offline {
  color: #E38968;
}

.me {
  color: #94C2ED;
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: right;
}

.float-right {
  float: right;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.clearfix img{
  border-radius: 52px;
  overflow: hidden;
}
</style>
