import Layout from '@/layout'

export default {
  name: 'Site',
  path: '/site',
  component: Layout,
  meta: { title: '站点管理', icon: 'component' },
  redirect: 'noRedirect',
  children: [
    {
      name: 'SlideList',
      path: '/site/slides',
      component: () => import('@/views/site/Slide'),
      meta: { title: '轮播图' },
    },
    {
      name: 'BannerList',
      path: '/site/banners',
      component: () => import('@/views/site/Banner'),
      meta: { title: '横幅广告' },
    },
    {
      name: 'NoticeList',
      path: '/site/notices',
      component: () => import('@/views/site/notice/List'),
      meta: { title: '公告通知' },
      children: [
        {
          name: 'NoticeCreate',
          path: '/site/notices/create',
          component: () => import('@/views/site/notice/Form'),
          meta: { title: '添加', activeMenu: '/site/notices' },
          hidden: true,
        },
        {
          name: 'NoticeEdit',
          path: '/site/notices/:id(\\d+)',
          component: () => import('@/views/site/notice/Form'),
          meta: { title: '编辑', activeMenu: '/site/notices' },
          hidden: true,
        },
      ],
    },
    {
      name: 'FaqList',
      path: '/site/faq',
      component: () => import('@/views/site/faq/List'),
      meta: { title: '常见问题' },
      children: [
        {
          name: 'FaqCreate',
          path: '/site/faq/create',
          component: () => import('@/views/site/faq/Form'),
          meta: { title: '添加', activeMenu: '/site/faq' },
          hidden: true,
        },
        {
          name: 'FaqEdit',
          path: '/site/faq/:id(\\d+)',
          component: () => import('@/views/site/faq/Form'),
          meta: { title: '编辑', activeMenu: '/site/faq' },
          hidden: true,
        },
      ],
    },
    {
      name: 'AgreementList',
      path: '/site/agreements',
      component: () => import('@/views/site/agreement/List'),
      meta: { title: '服务协议' },
      children: [
        {
          name: 'AgreementCreate',
          path: '/site/agreements/create',
          component: () => import('@/views/site/agreement/Form'),
          meta: { title: '添加', activeMenu: '/site/agreements' },
          hidden: true,
        },
        {
          name: 'AgreementEdit',
          path: '/site/agreements/:id(\\d+)',
          component: () => import('@/views/site/agreement/Form'),
          meta: { title: '编辑', activeMenu: '/site/agreements' },
          hidden: true,
        },
      ],
    },
    {
      name: 'CustomerService',
      path: '/site/customer',
      component: () => import('@/views/site/Customer'),
      meta: { title: '在线客服' },
    },
  ],
}
