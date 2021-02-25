<template>
  <main>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键词" @keyup.enter.native="search" />
      <el-select
        v-model="list_query.user_id"
        placeholder="用户"
        filterable
        remote
        clearable
        :remote-method="queryUser"
      >
        <el-option v-for="item in list_user" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button plain type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="reset">重置</el-button>
    </div>
    <!-- 表格-内容 -->
    <el-table
      ref="table"
      v-loading="is_loading"
      :data="list"
    >
      <el-table-column label="ID" prop="id" width="50" />
      <el-table-column label="用户" width="200">
        <template slot-scope="{row}">
          <el-avatar :src="row.user.avatar" />{{ row.user.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="IP" prop="ip" width="150" />
      <el-table-column label="代理" prop="agent" />
      <el-table-column label="登录时间" prop="created_at" width="180" />
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-show="total>0" :total="total" :page.sync="list_query.page" :limit.sync="list_query.size" @pagination="getList" />
  </main>
</template>

<script>
import Pagination from '@/components/Pagination'
import ajax from '@/assets/ajax'
import { queryUser } from '@/api'

export default {
  name: 'LogIn',
  components: { Pagination },
  data() {
    return {
      total: 0,
      list: [],
      list_query: {
        page: 1,
        size: 10,
        keyword: '',
        user_id: '',
      },
      list_query_copy: {},
      list_user: [],
      is_loading: false,
    }
  },
  created() {
    Object.assign(this.list_query_copy, this.list_query)
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
    // 查询列表
    getList() {
      if (this.is_loading) return
      this.is_loading = true

      ajax.get('/admin/logs/in', { params: this.list_query })
        .then(res => {
          this.list = res.list
          this.total = res.total
        })
        .finally(() => {
          this.is_loading = false
        })
    },
    // 查询用户
    queryUser(keyword) {
      queryUser(keyword).then(res => {
        this.list_user = res
      })
    },
  },
}
</script>
