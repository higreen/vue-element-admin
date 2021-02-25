import Layout from '@/layout'

export default {
  name: 'Log',
  path: 'logs',
  component: Layout,
  meta: { title: '日志', icon: 'el-icon-s-platform' },
  redirect: 'noRedirect',
  children: [
    {
      name: 'LogVersion',
      path: '/logs/version',
      component: () => import('@/views/log/Version'),
      meta: { title: '版本号' },
    },
    {
      name: 'LogIn',
      path: '/logs/in',
      component: () => import('@/views/log/In'),
      meta: { title: '登录日志' },
    },
    {
      name: 'LogOperation',
      path: '/logs/operation',
      component: () => import('@/views/log/Operation'),
      meta: { title: '操作日志' },
    },
    {
      name: 'LogSchedule',
      path: '/logs/schedule',
      component: () => import('@/views/log/Schedule'),
      meta: { title: '任务调度' },
    },
    {
      name: 'LogCallback',
      path: '/logs/callback',
      component: () => import('@/views/log/Callback'),
      meta: { title: '第三方回调' },
    },
  ],
}
