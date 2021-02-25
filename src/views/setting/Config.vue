<template>
  <main>
    <el-tabs value="tab2">
      <el-tab-pane label="金币" name="tab1">
        <div class="item">
          <label>签到奖励</label>
          <el-input v-model="form.point_sign" class="width-middle">
            <template slot="append">枚</template>
          </el-input>
        </div>
        <div class="item">
          <label>邀请奖励</label>
          <el-input v-model="form.point_invite" class="width-middle">
            <template slot="append">枚</template>
          </el-input>
        </div>
        <div class="item">
          <label>充值比例</label>
          <el-input v-model="form.point_topup" class="width-middle">
            <template slot="prepend">1枚金币</template>
            <template slot="append">元</template>
          </el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane label="提现" name="tab2">
        <div class="item">
          <label>提现功能</label>
          <div>
            <el-radio v-model="form.withdraw" label="1">开启</el-radio>
            <el-radio v-model="form.withdraw" label="0">关闭</el-radio>
          </div>
        </div>
        <div class="item">
          <label>是否审核</label>
          <div>
            <el-radio v-model="form.withdraw_check" label="1">开启</el-radio>
            <el-radio v-model="form.withdraw_check" label="0">关闭</el-radio>
          </div>
        </div>
        <div class="item">
          <label>最低金额</label>
          <el-input v-model="form.withdraw_min" class="width-middle">
            <template slot="append">元</template>
          </el-input>
        </div>
        <div class="item">
          <label>手续费</label>
          <el-input v-model="form.withdraw_service" class="width-middle">
            <template slot="append">%</template>
          </el-input>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-footer>
      <el-button type="primary" @click="set">保存</el-button>
    </el-footer>
  </main>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  name: 'Config',
  data() {
    return {
      form: {
        point_sign: '',
        point_invite: '',
        point_topup: '',
        withdraw: '1',
        withdraw_check: '1',
        withdraw_min: '',
        withdraw_service: '',
      },
    }
  },
  created() {
    this.get()
  },
  methods: {
    get() {
      ajax.get('/admin/setting/config')
        .then((res) => {
          Object.assign(this.form, res)
        })
    },
    set() {
      ajax.put('/admin/setting/config', this.form)
        .then((res) => {
          this.$message.success('保存成功')
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
  max-width: 600px;

  label {
    margin-right: 1em;
    min-width: 4em;
    font-size: 14px;
    color: #606266;
    white-space: nowrap;
  }
}
</style>
