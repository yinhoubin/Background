import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import login from '../components/pages/login'
import home from '../components/pages/home'
//二级路由
import manage from '../components/pages/manage'
import manage1 from '../components/views/manage'
import user1 from '../components/views/user'
import device1 from '../components/views/device'
import news1 from '../components/views/news'
//三级路由
import managecreate from '../components/views/managecreate'
import usercreate from '../components/views/usercreate'
import newscreate from '../components/views/newscreate'
import devicecreate from '../components/views/devicecreate'

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: 'manage',
          component: manage,
          children: [
            {
              path: 'create/:id',
              component: managecreate,
              name: '添加/修改管理员',
            },
            {
              path: '',
              component: manage1,
              name: '管理员列表页',
            }
          ]
        },
        {
          path: 'user',
          component: manage,
          children: [
            {
              path: 'create/:id',
              component: usercreate,
              name: '添加/修改用户',
            },
            {
              path: '',
              component: user1,
              name: '用户列表页',
            }
          ]
        },
        {
          path: 'device',
          component: manage,

          children: [
            {
              path: 'create/:id',
              component: devicecreate,
              name: '添加/修改设备',
            },
            {
              path: '',
              component: device1,
              name: '设备列表页',
            }
          ]
        },
        {
          path: 'news',
          component: manage,
          children: [
            {
              path: 'create/:id',
              component: newscreate,
              name: '添加/修改通知',
            },
            {
              path: '',
              component: news1,
              name: '通知列表页',
            }
          ]
        },
        {
          path: '',
          redirect: 'news'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
