<template>
  <main>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content">
          <el-avatar class="avatar float-r" shape="square" :size="100" :src="info.avatar" />
          <div class="item">
            <span>昵称：</span>{{ info.nickname }}
          </div>
          <div class="item">
            <span>姓名：</span>{{ info.realname }}
          </div>
          <div class="item">
            <span>性别：</span>{{ info.gender | genderStr }}
          </div>
          <div class="item">
            <span>手机号：</span>{{ info.phone }}
          </div>
          <div class="item">
            <span>所在地：</span>{{ info.region }}
          </div>
          <div class="item">
            <span>余额：</span>{{ info.money }}
            <el-button type="info" size="mini" plain @click="showDialogMoney">修改</el-button>
          </div>
          <div class="item">
            <span>积分：</span>{{ info.point }}
            <el-button type="info" size="mini" plain @click="showDialogPoint">修改</el-button>
          </div>
          <div class="item">
            <span>推荐人：</span>{{ parentName }}
            <el-button type="info" size="mini" plain @click="showDialogParent">修改</el-button>
          </div>
          <div class="item">
            <span>注册时间：</span>{{ info.created_at }}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form ref="form" class="grid-content form" :model="form" label-width="5em">
          <el-form-item label="角色">
            <el-select v-model="form.role_id" placeholder="请选择所属角色" clearable>
              <el-option v-for="item in list_role" :key="item.value" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" />
          </el-form-item>
          <el-form-item class="text-r">
            <el-button type="primary" @click="saveInfo">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 弹窗 -->
    <el-dialog title="修改推荐人" :visible.sync="show_dialog_parent">
      <el-select
        v-model="parent_id"
        filterable
        remote
        placeholder="请输入姓名/手机号搜索推荐人"
        :remote-method="queryUser"
        :loading="loading"
      >
        <el-option v-for="item in list_user" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show_dialog_parent=false">取消</el-button>
        <el-button type="primary" @click="editParent">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="dialog" title="修改余额" :visible.sync="show_dialog_money">
      <div class="item">
        <el-radio v-model="is_plus" label="1">充值</el-radio>
        <el-radio v-model="is_plus" label="0">扣减</el-radio>
      </div>
      <el-input v-model="input_amount" class="item" placeholder="请填写数量" />
      <el-input v-model="input_remark" class="item" placeholder="备注信息" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="show_dialog_money=false">取消</el-button>
        <el-button type="primary" @click="editMoney">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="dialog" title="修改积分" :visible.sync="show_dialog_point">
      <div class="item">
        <el-radio v-model="is_plus" label="1">充值</el-radio>
        <el-radio v-model="is_plus" label="0">扣减</el-radio>
      </div>
      <el-input v-model="input_amount" class="item" placeholder="请填写数量" />
      <el-input v-model="input_remark" class="item" placeholder="备注信息" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="show_dialog_point=false">取消</el-button>
        <el-button type="primary" @click="editPoint">确定</el-button>
      </div>
    </el-dialog>
  </main>
</template>

<script>
import ajax from '@/assets/ajax'
import { queryRole, queryUser } from '@/api'

export default {
  name: 'UserDetail',
  filters: {
    genderStr(value) {
      return value === 1 ? '男' : (value === 2 ? '女' : '')
    },
  },
  data() {
    return {
      id: 0,
      parent_id: null,
      info: {
        money: '',
        point: '',
      },
      parent: {
        realname: '',
        nickname: '',
        phone: '',
      },
      form: {
        role_id: '',
        username: '',
        password: '',
      },
      list_role: [],
      list_user: [],
      input_amount: '',
      input_remark: '',
      loading: false,
      show_dialog_parent: false,
      show_dialog_money: false,
      show_dialog_point: false,
      is_plus: '1',
    }
  },
  computed: {
    parentName() {
      return `${this.parent.realname || this.parent.nickname} ${this.parent.phone}`
    },
  },
  created() {
    const { id } = this.$route.params
    this.id = id
    this.getInfo()
    this.queryRole()
  },
  methods: {
    // 显示对话框
    showDialogParent() {
      this.show_dialog_parent = true
    },
    showDialogMoney() {
      this.is_plus = '1'
      this.input_amount = this.input_remark = ''
      this.show_dialog_money = true
    },
    showDialogPoint() {
      this.is_plus = '1'
      this.input_amount = this.input_remark = ''
      this.show_dialog_point = true
    },
    // 查询信息
    getInfo() {
      ajax.get(`/admin/users/${this.id}`)
        .then(res => {
          const parent = res.parent || { realname: '', nickname: '', phone: '' }

          Object.assign(this.info, res.info)
          Object.assign(this.parent, parent)
          this.form.role_id = res.info.role_id || ''
          this.form.username = res.info.username
        })
    },
    // 保存信息
    saveInfo() {
      ajax.put(`/admin/users/${this.id}`, this.form)
        .then(() => {
          this.$message.success('保存成功')
        })
    },
    // 查询-角色
    queryRole() {
      queryRole()
        .then((res) => {
          this.list_role = res
        })
    },
    // 查询-用户
    queryUser(keyword) {
      this.loading = true
      queryUser({ keyword })
        .then(res => {
          const list = []
          res.forEach(i => {
            list.push({
              id: i.id,
              name: `${i.realname || i.nickname} ${i.phone}`,
            })
          })
          this.list_user = list
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 编辑-父级
    editParent() {
      ajax.patch(`/admin/users/${this.id}/parent`, { parent_id: this.parent_id })
        .then(() => {
          this.$message.success('修改成功')
          this.show_dialog_parent = false
          this.parent_id = null
          this.list_user = []
          this.getInfo()
        })
    },
    // 编辑-余额
    editMoney() {
      ajax.post(`/admin/users/${this.id}/money`, {
        amount: this.input_amount * (this.is_plus > 0 ? 1 : -1),
        remark: this.input_remark,
      }).then(() => {
        this.$message.success('修改成功')
        this.show_dialog_money = false
        this.getInfo()
      })
    },
    // 编辑-积分
    editPoint() {
      ajax.post(`/admin/users/${this.id}/point`, {
        amount: this.input_amount * (this.is_plus > 0 ? 1 : -1),
        remark: this.input_remark,
      }).then(() => {
        this.$message.success('修改成功')
        this.show_dialog_point = false
        this.getInfo()
      })
    },
  },
}
</script>

<style lang="scss" scoped="">
main {
  background: unset;
}
.grid-content {
  padding: 10px;
  overflow: hidden;
  border-radius: 4px;
  background: white;

  .item {
    margin: 10px 20px;

    > span {
      display: inline-block;
      width: 5em;
      margin-right: 5px;
      text-align: right;
      color: gray;
    }
  }
}
.avatar {
  margin: 5px;
}

.form {
  padding-top: 20px;
  padding-right: 20px;
}
::v-deep .el-dialog {
  width: 500px;

  .el-select {
    width: 100%;
  }
}

/* 弹窗 */
.dialog {
  .item {
    margin-bottom: 30px;
  }
}
</style>
