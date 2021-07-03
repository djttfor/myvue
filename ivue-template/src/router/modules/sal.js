import Layout from '@/layout'

const salRouter = {
  path: '/sal',
  component: Layout,
  redirect: '/sal/search',
  name: 'Salary',
  meta: {
    title: '薪资管理',
    icon: 'shopping',
    roles: ['superAdmin', 'admin', 'manager', 'performance']
  },
  children: [
    {
      path: 'search',
      component: () => import('@/views/sal/salarySearch'),
      name: 'search',
      meta: {
        title: '工资表查询',
        roles: ['superAdmin', 'admin', 'manager', 'performance']
      }
    }, {
      path: 'month',
      component: () => import('@/views/sal/salMonth'),
      name: 'month',
      meta: {
        title: '月末处理',
        roles: ['superAdmin', 'admin', 'manager', 'performance']
      }
    }, {
      path: 'sob',
      component: () => import('@/views/sal/salSob'),
      name: 'sob',
      meta: {
        title: '工资账号管理',
        roles: ['superAdmin', 'admin', 'manager', 'performance']
      }
    }, {
      path: 'sobCfg',
      component: () => import('@/views/sal/salSobCfg'),
      name: 'sobCfg',
      meta: {
        title: '员工账号设置',
        roles: ['superAdmin', 'admin', 'manager', 'performance']
      }
    }, {
      path: 'table',
      component: () => import('@/views/sal/salTable'),
      name: 'table',
      meta: {
        title: '工资表管理',
        roles: ['superAdmin', 'admin', 'manager', 'performance']
      }
    }
  ]

}

export default salRouter
