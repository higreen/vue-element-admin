<template>
  <main>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键词" @keyup.enter.native="search" />
      <el-button plain type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="reset">重置</el-button>
      <el-button-group>
        <el-button type="primary" @click="add">添加</el-button>
      </el-button-group>
    </div>
    <!-- 表格-内容 -->
    <el-table ref="table" v-loading="is_loading" :data="list">
      <el-table-column label="名称" prop="name" />
      <el-table-column label="简介" prop="intro" />
      <el-table-column label="是否封禁" width="150">
        <template slot-scope="{row}">
          <el-switch v-model="row.is_forbidden" active-color="#ff4949" @change="editForbidden(row.id)" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" width="180" />
      <el-table-column label="更新时间" prop="updated_at" width="180" />
      <el-table-column label="操作" align="center" width="180" class-name="table-column-action">
        <template v-if="row.id!==1" slot-scope="{row,$index}">
          <el-button plain type="info" size="mini" icon="el-icon-edit" @click="edit($index)" />
          <el-button plain type="danger" size="mini" icon="el-icon-delete" @click="del(row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-show="total>0" :total="total" :page.sync="list_query.page" :limit.sync="list_query.size" @pagination="getList" />
    <!-- 弹窗表单 -->
    <el-dialog :visible.sync="show_form" title="角色信息">
      <el-form label-position="left" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.intro" />
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            ref="tree"
            show-checkbox
            node-key="name"
            :accordion="true"
            :data="list_permission"
            :default-checked-keys="list_permission_checked"
            :props="defaultProps"
          >
            <span slot-scope="{node,data}" class="custom-tree-node">{{ data.meta.title }}</span>
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show_form = false">取消</el-button>
        <el-button type="primary" @click="saveInfo">保存</el-button>
      </div>
    </el-dialog>
  </main>
</template>

<script>
import Pagination from '@/components/Pagination'
import ajax from '@/assets/ajax'

export default {
  name: 'Role',
  components: { Pagination },
  data() {
    return {
      total: 0,
      list: [],
      list_index: null,
      list_query: {
        page: 1,
        size: 10,
        name: '',
      },
      list_query_copy: {},
      list_permission: [],
      list_permission_checked: [],
      form: {
        name: '',
        intro: '',
        permissions: [],
      },
      routesData: [],
      // 状态
      is_loading: false,
      show_form: false,
      defaultProps: {
        children: 'children',
        label: 'title',
      },
    }
  },
  created() {
    Object.assign(this.list_query_copy, this.list_query)
    this.list_permission = [...this.$store.state.permission.original_routes]
    this.getList()
  },
  methods: {
    // 搜索
    search() {
      this.list_query.page = 1
      this.getList()
    },
    // 重置
    reset() {
      Object.assign(this.list_query, this.list_query_copy)
      this.getList()
    },
    // 添加
    add() {
      this.list_index = null
      this.show_form = true
    },
    // 编辑
    edit(index) {
      const item = this.list[index]
      Object.assign(this.form, item)
      this.list_index = index
      this.list_permission_checked = [...item.permissions]
      this.show_form = true
    },
    editForbidden(id) {
      ajax.patch(`/admin/roles/${id}/forbidden`)
        .then(() => {
          this.$message.success('操作成功')
        })
    },
    // 查询列表
    getList() {
      if (this.is_loading) return
      this.is_loading = true

      ajax.get('/admin/roles', { params: this.list_query })
        .then((res) => {
          res.list.forEach((item) => {
            item.is_forbidden = Boolean(item.is_forbidden)
          })

          this.list = res.list
          this.total = res.total
        })
        .finally(() => {
          this.is_loading = false
        })
    },
    // 保存信息
    saveInfo() {
      const data = this.form
      let id = 0
      let method = 'post'
      let url = '/admin/roles'

      if (this.list_index !== null) {
        id = this.list[this.list_index].id
      }
      if (id) {
        method = 'put'
        url = `url/${id}`
      }

      // 提取权限名称
      const checked_nodes = this.$refs.tree.getCheckedKeys()
      const half_checked_nodes = this.$refs.tree.getHalfCheckedKeys()
      data.permissions = [...checked_nodes, half_checked_nodes]

      ajax({
        method,
        url,
        data,
      }).then(() => {
        this.$message.success('保存成功')
        this.show_form = false
        this.getList()
      })
    },
    // 删除
    del(id) {
      ajax.delete(`/admin/roles/${id}`)
        .then(() => {
          this.$message.success('删除成功')
          this.getList()
        })
    },
  },
}
</script>
