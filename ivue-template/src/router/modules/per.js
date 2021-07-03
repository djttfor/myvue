import Layout from '@/layout'

const perRouter = {
  path: '/per',
  component: Layout,
  redirect: '/per/ec',
  alwaysShow: true,
  name: 'Personnel',
  meta: {
    title: '人事管理',
    icon: 'peoples',
    roles: ['superAdmin', 'admin', 'manager',
      'recruiter', 'personnel']
  },
  children: [
    {
      path: 'ec',
      component: () => import('@/views/per/perEc'),
      name: 'ec',
      meta: {
        title: '员工奖惩',
        roles: ['superAdmin', 'admin', 'manager',
          'recruiter', 'personnel']
      }
    },
    {
      path: 'emp',
      component: () => import('@/views/per/perEmp'),
      name: 'emp',
      meta: {
        title: '员工资料',
        roles: ['superAdmin', 'admin', 'manager',
          'recruiter', 'personnel']
      }
    },
    {
      path: 'mv',
      component: () => import('@/views/per/perMv'),
      name: 'mv',
      meta: {
        title: '员工调动',
        roles: ['superAdmin', 'admin', 'manager',
          'recruiter', 'personnel']
      }
    },
    {
      path: 'salary',
      component: () => import('@/views/per/perSalary'),
      name: 'salary',
      meta: {
        title: '员工调薪',
        roles: ['superAdmin', 'admin', 'manager',
          'recruiter']
      }
    },
    {
      path: 'train',
      component: () => import('@/views/per/perTrain'),
      name: 'train',
      meta: {
        title: '员工培训',
        roles: ['superAdmin', 'admin', 'manager',
          'recruiter', 'personnel', 'train']
      }
    }
  ]

}

export default perRouter
