<template>
  <main>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键词" @keyup.enter.native="search" />
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
      <el-table-column label="名称" prop="name" />
      <el-table-column label="响应" prop="response" />
      <el-table-column label="执行时间（s）" prop="runtime" />
      <el-table-column label="创建时间" prop="created_at" width="200" />
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-show="total>0" :total="total" :page.sync="list_query.page" :limit.sync="list_query.size" @pagination="getList" />
  </main>
</template>

<script>
import Pagination from '@/components/Pagination'
import ajax from '@/assets/ajax'

export default {
  name: 'LogSchedule',
  components: { Pagination },
  data() {
    return {
      total: 0,
      list: [],
      list_query: {
        page: 1,
        size: 10,
        keyword: '',
      },
      list_query_copy: {},
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

      ajax.get('/admin/logs/schedule', { params: this.list_query })
        .then(res => {
          this.list = res.list
          this.total = res.total
        })
        .finally(() => {
          this.is_loading = false
        })
    },
  },
}
</script>
