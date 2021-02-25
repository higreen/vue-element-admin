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
    <el-table
      ref="table"
      v-loading="is_loading"
      :data="list"
      @selection-change="selectionChange"
    >
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="创建时间" prop="created_at" width="180" />
      <el-table-column label="更新时间" prop="updated_at" width="180" />
      <el-table-column label="操作" align="center" width="180" class-name="table-column-action">
        <template slot-scope="{row}">
          <el-button plain type="info" size="mini" icon="el-icon-edit" @click="edit(row.id)" />
          <el-button plain type="danger" size="mini" icon="el-icon-delete" @click="del(row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格-底部 -->
    <div v-show="list.length" class="table-footer">
      <el-button type="danger" size="small" plain @click="del(null)">批量删除</el-button>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="list_query.page" :limit.sync="list_query.size" @pagination="getList" />
  </main>
</template>

<script>
import Pagination from '@/components/Pagination'
import ajax from '@/assets/ajax'

export default {
  name: 'AgreementList',
  components: { Pagination },
  data() {
    return {
      total: 0,
      list: [],
      list_checked: [],
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
    // 添加
    add() {
      this.$router.push('/site/agreements/create')
    },
    // 编辑
    edit(id) {
      this.$router.push(`/site/agreements/${id}`)
    },
    // 多选
    selectionChange(e) {
      const ids = []
      e.forEach((item) => ids.push(item.id))
      this.list_checked = ids
    },
    // 查询列表
    getList() {
      if (this.is_loading) return
      this.is_loading = true

      ajax.get('/admin/agreements', { params: this.list_query })
        .then(res => {
          this.list = res.list
          this.total = res.total
        })
        .finally(() => {
          this.is_loading = false
        })
    },
    // 删除
    del(id) {
      // 批量操作
      if (!id) {
        if (!this.list_checked.length) {
          return this.$message.error('请选择操作项')
        }

        id = this.list_checked.join(',')
      }

      ajax.delete(`/admin/agreements/${id}`)
        .then(() => {
          this.$message.success('删除成功')
          this.getList()
        })
    },
  },
}
</script>
