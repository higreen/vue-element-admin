<template>
  <div class="login-container">
    <el-form ref="form" :model="form" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="form.username" placeholder="账号" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="form.password" :type="password_type" placeholder="密码" autocomplete="off" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="password_type === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button class="submit" :loading="is_loading" type="primary" @click.native.prevent="submit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import ajax from '@/assets/ajax'
import { title } from '@/settings'
import { setAuth } from '@/assets/auth'

export default {
  name: 'Login',
  data() {
    return {
      title,
      form: {
        username: 'admin',
        password: '123456',
      },
      password_type: 'password',
      is_loading: false,
    }
  },
  methods: {
    showPwd() {
      if (this.password_type === 'password') {
        this.password_type = ''
      } else {
        this.password_type = 'password'
      }
    },
    submit() {
      if (this.is_loading) return
      this.is_loading = true

      const data = { ...this.form }
      data.platform = window.navigator.platform
      ajax.post('/sign-in', data)
        .then((res) => {
          setAuth(res.Authorization)
          const url = this.$route.query.redirect || '/dashboard'
          this.$router.push(url)
        }).finally(() => {
          this.is_loading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }

  .submit {
    width: 100%;
    margin-top: 48px;
  }
}
</style>
