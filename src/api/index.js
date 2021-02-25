import ajax from '@/assets/ajax'

// 上传文件接口
const url_upload = process.env.VUE_APP_BASE_API + '/upload'
const url_upload_img = `${url_upload}/image`

// 查询-角色
function queryRole() {
  return ajax.get('/admin/roles/query')
}

// 查询-用户
function queryUser(keyword = '') {
  return ajax.get('/admin/users/query', { params: { keyword }})
}

// 查询-店铺
function queryShop(keyword = '') {
  return ajax.get('/admin/shops/query', { params: { keyword }})
}

// 查询-银行
function queryBank() {
  return ajax.get('/api/bank')
}

export {
  url_upload,
  url_upload_img,
  queryBank,
  queryRole,
  queryShop,
  queryUser,
}
