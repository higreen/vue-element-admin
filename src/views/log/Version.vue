<template>
  <main>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-button-group>
        <el-button type="primary" @click="add">发布新版本</el-button>
      </el-button-group>
    </div>
    <!-- 表格-内容 -->
    <el-table ref="table" v-loading="is_loading" :data="list">
      <el-table-column label="版本号" prop="name" width="160" />
      <el-table-column label="简介" prop="intro" />
      <el-table-column label="下载链接">
        <template slot-scope="{row}">
          <button class="el-button el-button--success is-plain el-button--mini" @click="copy(row.src,$event)">复制</button>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" prop="created_at" width="160" />
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="list_query.page" :limit.sync="list_query.size" @pagination="getList" />
    <!-- 弹窗表单 -->
    <el-dialog :visible.sync="show_form" title="版本信息">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="版本号">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.intro" type="textarea" :rows="5" />
        </el-form-item>
        <el-form-item label="安装包">
          <input type="file" accept=".apk" @change="chooseFile">
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
import { url_upload } from '@/api'
import clip from '@/utils/clipboard'

export default {
  name: 'LogVersion',
  components: { Pagination },
  data() {
    return {
      url_upload,
      total: 0,
      list: [],
      list_query: {
        page: 1,
        size: 10,
        name: '',
      },
      form: {
        name: '',
        intro: '',
        file: '',
      },
      // 状态
      is_loading: false,
      show_form: false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 复制
    copy(text, e) {
      clip(text, e)
    },
    // 选择文件
    chooseFile(e) {
      const file = e.target.files[0]
      const data = new FormData()
      data.append('file', file)
      ajax.post(this.url_upload, data).then(res => {
        this.form.file = res.filename
      })
    },
    // 添加
    add() {
      this.list_index = null
      this.show_form = true
    },
    // 查询列表
    getList() {
      if (this.is_loading) return
      this.is_loading = true

      ajax.get('/admin/logs/version', { params: this.list_query })
        .then(res => {
          this.list = res.list
          this.total = res.total
        })
        .finally(() => {
          this.is_loading = false
        })
    },
    // 保存信息
    saveInfo() {
      ajax.post('/admin/logs/version', this.form)
        .then(() => {
          this.$message.success('添加成功')
          this.show_form = false
          this.getList()
        })
    },
  },
}
</script>
