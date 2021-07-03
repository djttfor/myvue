import Layout from '@/layout'
/*
roles: ['superAdmin', 'admin','manager'
 ,'recruiter','ROLE_ personnel','train'
 ,'performance','employee']
 */
const empRouter = {
  path: '/emp',
  component: Layout,
  redirect: '/emp/basic',
  alwaysShow: true,
  name: 'Employees',
  meta: {
    title: '员工资料',
    icon: 'people',
    roles: ['superAdmin', 'admin', 'manager',
      'recruiter', 'personnel', 'train',
      'performance', 'employee']
  },
  children: [
    {
      path: 'basic',
      component: () => import('@/views/emp/empBasic'),
      name: 'basic',
      meta: {
        title: '基础资料',
        roles: ['superAdmin', 'admin', 'manager',
          'recruiter', 'personnel', 'train',
          'performance', 'employee']
      }
    },
    {
      path: 'adv',
      component: () => import('@/views/emp/empAdv'),
      name: 'adv',
      meta: {
        title: '高级资料',
        roles: ['superAdmin', 'admin', 'manager',
          'recruiter', 'personnel', 'train',
          'performance', 'employee']
      }
    }
  ]

}

export default empRouter
