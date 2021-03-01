<template>
  <main>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键词" @keyup.enter.native="search" />
      <el-select v-model="list_query.role_id" placeholder="角色" clearable @change="search">
        <el-option v-for="item in list_role" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button plain type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="reset">重置</el-button>
    </div>
    <!-- 表格-内容 -->
    <el-table ref="table" v-loading="is_loading" :data="list" @filter-change="filter">
      <el-table-column label="用户" width="200">
        <template slot-scope="{row}">
          <el-avatar :src="row.avatar" />{{ row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="realname" />
      <el-table-column label="性别" prop="gender" />
      <el-table-column label="电话" prop="phone" />
      <el-table-column label="封禁" column-key="is_forbidden" :filters="filer_forbidden" :filter-multiple="false">
        <template slot-scope="{row}">
          <el-switch v-model="row.is_forbidden" active-color="#ff4949" @change="editForbidden(row.id)" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" width="160" />
      <el-table-column label="更新时间" prop="updated_at" width="160" />
      <el-table-column label="操作" align="center" width="160" class-name="table-column-action">
        <template slot-scope="{row}">
          <el-button plain type="info" size="mini" icon="el-icon-view" title="查看" @click="view(row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格-分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="list_query.page" :limit.sync="list_query.size" @pagination="getList" />
  </main>
</template>

<script>
import Pagination from '@/components/Pagination'
import ajax from '@/assets/ajax'
import { queryRole } from '@/api'

export default {
  name: 'UserList',
  components: { Pagination },
  data() {
    return {
      total: 0,
      is_loading: false,
      list: [],
      list_query: {
        page: 1,
        size: 10,
        keyword: '',
        role_id: '',
        is_forbidden: '',
      },
      list_query_copy: {},
      list_role: [],
      filer_forbidden: [
        { text: '正常', value: 0 },
        { text: '被封禁', value: 1 },
      ],
    }
  },
  created() {
    Object.assign(this.list_query_copy, this.list_query)
    this.getList()
    this.queryRole()
  },
  activated() {
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
      this.$refs.table.clearFilter()
      this.$refs.table.clearSort()
      this.getList()
    },
    // 筛选
    filter(e) {
      this.list_query.is_forbidden = e.is_forbidden[0]
      this.getList()
    },
    // 列表
    getList() {
      if (this.is_loading) return
      this.is_loading = true

      ajax.get('/admin/users', { params: this.list_query })
        .then(res => {
          res.list.forEach(i => {
            i.is_forbidden = Boolean(i.is_forbidden)
            i.gender = i.gender === 1 ? '男' : (i.gender === 2 ? '女' : '')
          })

          this.list = res.list
          this.total = res.total
        })
        .finally(() => {
          this.is_loading = false
        })
    },
    // 查询-角色
    queryRole() {
      queryRole()
        .then(res => {
          this.list_role = res
        })
    },
    // 查看
    view(id) {
      this.$router.push(`/users/${id}`)
    },
    editForbidden(id) {
      ajax.patch(`/admin/users/${id}/forbidden`)
        .then(() => {
          this.$message.success('操作成功')
        })
    },
  },
}
</script>
