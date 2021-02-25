<template>
  <main>
    <el-header class="text-r">
      <el-upload
        accept="image/*"
        :action="url_upload"
        :show-file-list="false"
        :on-success="uploadSuccess"
      >
        <el-button type="primary" @click="list_index=null">添加轮播图</el-button>
      </el-upload>
    </el-header>
    <ul class="list">
      <template v-for="(item,index) in list">
        <li :key="index" class="item">
          <img :src="item.cover" class="image cursor-pointer" @click="edit(index)">
          <div>
            <el-input v-model="item.link" placeholder="">
              <template slot="prepend">链接：</template>
            </el-input>
            <el-input v-model="item.sort" placeholder="">
              <template slot="prepend">排序：</template>
            </el-input>
          </div>
          <div>
            <el-button type="primary" size="mini" plain @click="saveInfo(item)">保存</el-button>
            <el-button type="danger" size="mini" plain @click="delInfo(index)">删除</el-button>
          </div>
        </li>
      </template>
    </ul>
    <el-alert v-show="!list.length" title="暂无数据" type="info" center :closable="false" />
  </main>
</template>

<script>
import ajax from '@/assets/ajax'
import { url_upload } from '@/api'
export default {
  name: 'SlideList',
  data() {
    return {
      url_upload,
      list: [],
      list_index: null,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 编辑
    edit(index) {
      this.list_index = index
      document.querySelector('.el-upload__input').click()
    },
    // 上传文件成功
    uploadSuccess(res, file) {
      if (this.list_index !== null) {
        const item = this.list[this.list_index]
        item.cover = URL.createObjectURL(file.raw)
        item.cover_file = res.data.filename
        return
      }

      // 添加新轮播图
      this.saveInfo({
        cover_file: res.data.filename,
      })
    },
    // 查询列表
    getList() {
      ajax.get('/admin/slides')
        .then((res) => {
          this.list = res
        })
    },
    // 保存信息
    saveInfo(item) {
      if (item.id) {
        ajax.put(`/admin/slides/${item.id}`, item)
          .then(() => {
            this.$message.success('保存成功')
          })
      } else {
        ajax.post('/admin/slides', item)
          .then(() => {
            this.$message.success('添加成功')
            this.getList()
          })
      }
    },
    // 删除
    delInfo(index) {
      const id = this.list[index].id

      ajax.delete(`/admin/slides/${id}`)
        .then(() => {
          this.list.splice(index, 1)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
  .list {
    padding: 0;
    margin: 0 20px;
  }
  .item {
    display: flex;
    margin-bottom: 15px;

    img {
      width: 350px;
      height: auto;
      border-radius: 5px;
    }

    > div:nth-child(2) {
      flex: 1;
      margin: 0 30px;
    }

    > div:last-child {
      width: 130px;
    }
  }
</style>
