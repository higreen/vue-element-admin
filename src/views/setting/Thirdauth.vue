<template>
  <main>
    <el-tabs value="weixin_mini">
      <el-tab-pane label="微信小程序" name="weixin_mini">
        <div class="item">
          <label>应用ID</label>
          <el-input v-model="form.weixin_mini.app_id" />
        </div>
        <div class="item">
          <label>应用密钥</label>
          <el-input v-model="form.weixin_mini.app_secret" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="微信公众号" name="weixin_offiaccount">
        <div class="item">
          <label>应用ID</label>
          <el-input v-model="form.weixin_offiaccount.app_id" />
        </div>
        <div class="item">
          <label>应用密钥</label>
          <el-input v-model="form.weixin_offiaccount.app_secret" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="微信APP" name="weixin_app">
        <div class="item">
          <label>应用ID</label>
          <el-input v-model="form.weixin_app.app_id" />
        </div>
        <div class="item">
          <label>应用密钥</label>
          <el-input v-model="form.weixin_app.app_secret" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="微信开放平台" name="weixin_oplatform">
        <div class="item">
          <label>应用ID</label>
          <el-input v-model="form.weixin_oplatform.app_id" />
        </div>
        <div class="item">
          <label>应用密钥</label>
          <el-input v-model="form.weixin_oplatform.app_secret" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="微信商户号" name="weixin_mch">
        <div class="item">
          <label>商户号</label>
          <el-input v-model="form.weixin_mch.mch_id" />
        </div>
        <div class="item">
          <label>商户密钥</label>
          <el-input v-model="form.weixin_mch.mch_key" />
        </div>
        <div class="item">
          <label>回调网址</label>
          <el-input v-model="form.weixin_mch.notify_url" />
        </div>
        <div class="item">
          <label>证书cert</label>
          <el-tag v-if="form.weixin_mch.sslcert" type="success">已上传</el-tag>
          <input type="file" @change="uploadFile('cert', $event)">
        </div>
        <div class="item">
          <label>证书key</label>
          <el-tag v-if="form.weixin_mch.sslkey" type="success">已上传</el-tag>
          <input type="file" @change="uploadFile('key', $event)">
        </div>
      </el-tab-pane>
      <el-tab-pane label="支付宝小程序" name="alipay_mini">
        <div class="item">
          <label>应用ID</label>
          <el-input v-model="form.alipay_mini.app_id" />
        </div>
        <div class="item">
          <label>应用密钥</label>
          <el-input v-model="form.alipay_mini.app_key" type="textarea" />
        </div>
        <div class="item">
          <label>回调网址</label>
          <el-input v-model="form.alipay_mini.notify_url" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="支付宝APP" name="alipay_app">
        <div class="item">
          <label>应用ID</label>
          <el-input v-model="form.alipay_app.app_id" />
        </div>
        <div class="item">
          <label>应用密钥</label>
          <el-input v-model="form.alipay_app.app_key" type="textarea" />
        </div>
        <div class="item">
          <label>回调网址</label>
          <el-input v-model="form.alipay_app.notify_url" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="腾讯地图" name="tencent_map">
        <div class="item">
          <label>KEY</label>
          <el-input v-model="form.tencent_map.key" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="腾讯短信" name="tencent_sms">
        <div class="item">
          <label>SDK AppID</label>
          <el-input v-model="form.tencent_sms.id" />
        </div>
        <div class="item">
          <label>App Key</label>
          <el-input v-model="form.tencent_sms.key" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="阿里云短信" name="aliyun_sms">
        <div class="item">
          <label>签名</label>
          <el-input v-model="form.aliyun_sms.sign" />
        </div>
        <div class="item">
          <label>ID</label>
          <el-input v-model="form.aliyun_sms.id" />
        </div>
        <div class="item">
          <label>Secret</label>
          <el-input v-model="form.aliyun_sms.secret" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="七牛云" name="qiniu">
        <div class="item">
          <label>AccessKey</label>
          <el-input v-model="form.qiniu.access_key" />
        </div>
        <div class="item">
          <label>SecretKey</label>
          <el-input v-model="form.qiniu.secret_key" />
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-footer class="text-r">
      <el-button type="primary" @click="set">保存</el-button>
    </el-footer>
  </main>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  name: 'Thirdauth',
  data() {
    return {
      form: {
        alipay_mini: {
          app_id: '',
          app_key: '',
          notify_url: '',
        },
        alipay_app: {
          app_id: '',
          app_key: '',
          notify_url: '',
        },
        aliyun_sms: {
          sign: '',
          id: '',
          secret: '',
        },
        qiniu: {
          access_key: '',
          secret_key: '',
        },
        tencent_map: {
          key: '',
        },
        tencent_sms: {
          id: '',
          key: '',
        },
        weixin_mini: {
          app_id: '',
          app_secret: '',
        },
        weixin_offiaccount: {
          app_id: '',
          app_secret: '',
        },
        weixin_app: {
          app_id: '',
          app_secret: '',
        },
        weixin_mch: {
          mch_id: '',
          mch_key: '',
          notify_url: '',
          sslcert: '',
          sslkey: '',
        },
        weixin_oplatform: {
          app_id: '',
          app_secret: '',
        },
      },
    }
  },
  created() {
    this.get()
  },
  methods: {
    get() {
      ajax.get('/admin/setting/thirdauth')
        .then(res => {
          Object.assign(this.form, res)
        })
    },
    set() {
      ajax.put('/admin/setting/thirdauth', this.form)
        .then(res => {
          this.$message.success('保存成功')
        })
    },
    // 上传文件
    uploadFile(file, e) {
      const data = new FormData()
      data.append('file', e.target.files[0])
      ajax.post('/upload', data)
        .then(res => {
          const filename = res.filename
          if (file === 'cert') {
            this.form.weixin_mch.sslcert = filename
          } else {
            this.form.weixin_mch.sslkey = filename
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.el-tabs {
  margin-bottom: 20px;
}

.item {
  display: flex;
  align-items: center;
  margin: 20px 0;

  label {
    width: 120px;
    font-size: 14px;
    color: #606266;
  }
}

::v-deep .el-tag {
  margin-right: 1em;
}
</style>
