import Layout from '@/layout'

export default {
  name: 'setting',
  path: '/setting',
  component: Layout,
  meta: { title: '系统设置', icon: 'el-icon-s-tools' },
  redirect: 'noRedirect',
  children: [
    {
      name: 'Role',
      path: '/setting/roles',
      component: () => import('@/views/setting/Role'),
      meta: { title: '角色' },
    },
    {
      name: 'Config',
      path: '/setting/config',
      component: () => import('@/views/setting/Config'),
      meta: { title: '参数配置' },
    },
    {
      name: 'Thirdauth',
      path: '/setting/thirdauth',
      component: () => import('@/views/setting/Thirdauth'),
      meta: { title: '第三方授权' },
    },
  ],
}
