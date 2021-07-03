import Layout from '@/layout'

const staRouter = {
  path: '/sta',
  component: Layout,
  redirect: '/sta/all',
  name: 'statistical',
  meta: {
    title: '统计管理',
    icon: 'chart',
    roles: ['superAdmin', 'admin', 'manager',
      'recruiter', 'personnel']
  },
  children: [
    {
      path: 'all',
      component: () => import('@/views/sta/staAll'),
      name: 'all',
      meta: {
        title: '综合信息统计',
        roles: ['superAdmin', 'admin', 'manager',
          'recruiter', 'personnel']
      }
    }, {
      path: 'pers',
      component: () => import('@/views/sta/staPers'),
      name: 'pers',
      meta: {
        title: '人事信息统计',
        roles: ['superAdmin', 'admin', 'manager',
          'recruiter', 'personnel']
      }
    }, {
      path: 'record',
      component: () => import('@/views/sta/staRecord'),
      name: 'record',
      meta: {
        title: '人事记录统计',
        roles: ['superAdmin', 'admin', 'manager',
          'recruiter', 'personnel']
      }
    }, {
      path: 'score',
      component: () => import('@/views/sta/staScore'),
      name: 'score',
      meta: {
        title: '员工积分统计',
        roles: ['superAdmin', 'admin', 'manager',
          'recruiter', 'personnel']
      }
    }
  ]
}

export default staRouter
