<template>
  <el-form label-width="80px">
    <el-upload
      class="upload"
      :action="url_upload"
      :show-file-list="false"
      :on-success="uploadSuccess"
    >
      <el-avatar shape="square" :size="150" :src="form.avatar" />
    </el-upload>
    <el-form-item label="昵称">
      <el-input v-model.trim="form.nickname" class="input" />
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model.trim="form.realname" class="input" />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model.trim="form.phone" class="input" maxlength="11" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model.trim="form.password" class="input" show-password placeholder="请输入新密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ajax from '@/assets/ajax'
import { url_upload } from '@/api'

export default {
  data() {
    return {
      url_upload,
      form: {
        avatar: '',
        avatar_file: '',
        nickname: '',
        realname: '',
        password: '',
        phone: '',
      },
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      ajax.get('/admin/user')
        .then((res) => {
          Object.assign(this.form, res)
        })
    },
    // 上传文件成功
    uploadSuccess(res, file) {
      this.form.avatar_file = res.data.filename
      this.form.avatar = URL.createObjectURL(file.raw)
    },
    submit() {
      ajax.put('/admin/user', this.form)
        .then((res) => {
          this.$message.success('保存成功')
          this.form.password = ''
          if (this.form.avatar_file) {
            this.$store.dispatch('user/setAvatar', this.form.avatar)
            this.form.avatar_file = ''
          }
        })
    },
  },
}
</script>

<style scoped>
::v-deep.el-avatar {
  background: unset;
}
.upload {
  position: absolute;
  z-index: 1;
  right: 0;
  margin-bottom: 15px;
  text-align: center;
}
.input {
  max-width: 300px;
}

@media screen and (max-width: 625px) {
  .upload {
    position: unset;
  }
}
</style>
