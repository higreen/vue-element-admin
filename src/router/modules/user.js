import Layout from '@/layout'

export default {
  name: 'User',
  path: 'users',
  component: Layout,
  meta: { title: '用户', icon: 'user' },
  redirect: 'noRedirect',
  children: [
    {
      name: 'UserList',
      path: '/users',
      component: () => import('@/views/user/List'),
      meta: { title: '用户列表' },
      children: [
        {
          name: 'UserDetail',
          path: '/users/:id(\\d+)',
          component: () => import('@/views/user/Detail'),
          meta: { title: '详情', activeMenu: '/users' },
          hidden: true,
        },
      ],
    },
    {
      name: 'UserMoneyList',
      path: '/users/money',
      component: () => import('@/views/user/Money'),
      meta: { title: '余额明细' },
    },
    {
      name: 'UserPointList',
      path: '/users/point',
      component: () => import('@/views/user/Point'),
      meta: { title: '积分明细' },
    },
    {
      name: 'FeedbackList',
      path: '/users/feedback',
      component: () => import('@/views/user/Feedback'),
      meta: { title: '意见反馈' },
    },
  ],
}
