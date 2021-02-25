import ajax from '@/assets/ajax'

// 查询列表
function getList(module) {
  return ajax({
    url: `/admin/categories/${module}`,
    method: 'get',
  })
}

// 保存信息
function saveInfo(module, id, data) {
  return ajax({
    url: id ? `/admin/categories/${module}/${id}` : `/admin/categories/${module}`,
    method: id ? 'put' : 'post',
    data,
  })
}

// 保存排序
function saveSort(module, data) {
  return ajax({
    url: `/admin/categories/${module}/sort`,
    method: 'put',
    data,
  })
}

// 删除信息
function delInfo(module, id) {
  return ajax({
    url: `/admin/categories/${module}/${id}`,
    method: 'delete',
  })
}

export {
  getList,
  saveInfo,
  saveSort,
  delInfo,
}
