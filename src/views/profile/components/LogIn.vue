<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="item of list" :key="item.id" :timestamp="item.created_at" placement="top">
        <span>IP地址：{{ item.ip }}</span>
        <el-tag :type="item.type" size="mini">{{ item.type_str }}</el-tag>
        {{ item.content }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      ajax.get('/admin/logs/in', { params: { size: 10, user_id: 0 }})
        .then(res => {
          res.list.forEach(i => {
            const agent = i.agent
            i.type = ''
            i.type_str = '电脑'

            if (agent.includes('MicroMessenger')) {
              i.type = 'success'
              if (agent.includes('wechatdevtools')) {
                i.type_str = '微信开发工具'
              } else if (agent.includes('MQQBrowser')) {
                i.type_str = '微信浏览器'
              } else {
                i.type_str = '微信小程序'
              }
            } else if (agent.includes('Mobile')) {
              i.type = 'success'
              i.type_str = '手机'
            }
          })
          this.list = [...res.list]
        })
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-tag {
    margin-left: 10px;
  }
</style>
