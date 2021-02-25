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
      <el-table-column label="路由" prop="route" />
      <el-table-column label="查询" prop="query" />
      <el-table-column label="内容" prop="content">
        <template slot-scope="{$index}">
          <button class="el-button el-button--success is-plain el-button--mini" @click="showContent($index)">查看</button>
        </template>
      </el-table-column>
      <el-table-column label="IP" prop="ip" width="150" />
      <el-table-column label="创建时间" prop="created_at" width="180" />
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-show="total>0" :total="total" :page.sync="list_query.page" :limit.sync="list_query.size" @pagination="getList" />
    <!-- 弹窗 -->
    <el-dialog title="请求内容" :visible.sync="show_dialog">{{ dialog_content }}</el-dialog>
  </main>
</template>

<script>
import Pagination from '@/components/Pagination'
import ajax from '@/assets/ajax'

export default {
  name: 'LogCallback',
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
      dialog_content: '',
      is_loading: false,
      show_dialog: false,
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

      ajax.get('/admin/logs/callback', { params: this.list_query })
        .then(res => {
          this.list = res.list
          this.total = res.total
        })
        .finally(() => {
          this.is_loading = false
        })
    },
    // 显示内容
    showContent(index) {
      const item = this.list[index]
      this.dialog_content = item.content
      this.show_dialog = true
    },
  },
}
</script>
