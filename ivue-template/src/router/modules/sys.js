import Layout from '@/layout'

const sysRouter = {
  path: '/sys',
  component: Layout,
  redirect: '/sys/sysBasic',
  name: 'System',
  meta: {
    title: '系统管理',
    icon: 'example',
    roles: ['superAdmin', 'admin']
  },
  children: [
    {
      path: 'basic',
      component: () => import('@/views/sys/sysBasic'),
      name: 'basic',
      meta: {
        title: '基础信息设置',
        roles: ['superAdmin', 'admin']
      }
    }, {
      path: 'admin',
      component: () => import('@/views/sys/sysAdmin'),
      name: 'admin',
      meta: {
        title: '操作员管理',
        roles: ['superAdmin', 'admin']
      }
    }, {
      path: 'config',
      component: () => import('@/views/sys/sysConfig'),
      name: 'config',
      meta: {
        title: '系统管理',
        roles: ['', 'admin']
      }
    }, {
      path: 'data',
      component: () => import('@/views/sys/sysData'),
      name: 'data',
      meta: {
        title: '备份恢复数据库',
        roles: ['superAdmin', 'admin']
      }
    }, {
      path: 'init',
      component: () => import('@/views/sys/sysInit'),
      name: 'init',
      meta: {
        title: '初始化数据库',
        roles: ['superAdmin', 'admin']
      }
    }, {
      path: 'log',
      component: () => import('@/views/sys/sysLog'),
      name: 'log',
      meta: {
        title: '操作日志管理',
        roles: ['superAdmin', 'admin']
      }
    }
  ]
}

export default sysRouter
