<template>
  <main>
    <el-form label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="内容">
        <Tinymce v-model="form.html" module="html_faq" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import ajax from '@/assets/ajax'

export default {
  name: 'FaqFrom',
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
    // 查询信息
    getInfo(id) {
      ajax.get(`/admin/faqs/${id}`)
        .then(res => {
          Object.assign(this.form, res)
        })
    },
    // 保存信息
    saveInfo() {
      let method = 'post'
      let url = '/admin/faqs'
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
        this.$router.push('/site/faq')
      })
    },
  },
}
</script>
