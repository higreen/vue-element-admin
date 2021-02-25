<template>
  <main>
    <el-tabs value="tab1">
      <el-tab-pane label="登录日志" name="tab1">
        <LogIn />
      </el-tab-pane>
      <el-tab-pane label="账号信息" name="account">
        <Account />
      </el-tab-pane>
    </el-tabs>
  </main>
</template>

<script>
import LogIn from './components/LogIn'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { LogIn, Account },
  data() {
    return { }
  },
}
</script>
