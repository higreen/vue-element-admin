<template>
  <main>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="内容">
        <tinymce v-model="form.html" module="html_notice" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveInfo">保存</el-button>
        <el-button type="info" plain @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import ajax from '@/assets/ajax'

export default {
  name: 'NoticeForm',
  components: { Tinymce },
  data() {
    return {
      id: 0,
      form: {
        name: '',
        html: '',
      },
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      this.id = id
      this.getInfo(id)
    }
  },
  methods: {
    // 取消
    cancel() {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.push('/site/notices')
    },
    // 查询信息
    getInfo(id) {
      ajax.get(`/admin/notices/${id}`)
        .then(res => {
          Object.assign(this.form, res)
        })
    },
    // 保存信息
    saveInfo() {
      let method = 'post'
      let url = '/admin/notices'
      if (this.id) {
        method = 'put'
        url = `${url}/${this.id}`
      }

      ajax({
        method,
        url,
        data: this.form,
      }).then(res => {
        this.$message.success('保存成功')
        this.$store.dispatch('tagsView/delView', this.$route)
        this.$router.push('/site/notices')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  article {
    padding: 0 30px;
  }
  h1 {
    text-align: center;
  }
  address {
    text-align: right;
  }

  figure {
    margin: 50px 0;

    .img {
      display: inline-block;
      width: 150px;
      height: 150px;
      margin: 10px;
      vertical-align: top;
      border-radius: 5px;
    }
  }

</style>
