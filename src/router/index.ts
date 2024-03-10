import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 路由匹配是严格的一条路径，整个组件都在一条匹配路径上进行嵌套，所以只要子组件匹配不到路由就会重匹配到这里，即 404
// 子组件匹配分为两种情况，一种是找不到对应的路由，即上面这种情况，另一种是路由已经完全匹配完了。这个时候就不往下匹配了，直接挂空组件
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 我们约定：任何含有 children 的路由的 path 字段，都以 '/' 结尾。
  // 不要在内层路由的 path 字段，用 '/' 开头，这会破坏嵌套顺序。（以 '/' 开头的路由将从根开始匹配）
  // 这两个规则将方便 sideBar 的构建，务必遵守。
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      component: HomeView,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          meta: {
            name: '首页',
            icon: 'Menu',
          },
          component: () => import('../views/Dashboard.vue'),
        },
        {
          path: 'table/',
          name: 'table',
          meta: {
            name: '表格示例',
            icon: 'List'
          },
          children: [
            {
              path: 'easyTable',
              name: 'easyTable', 
              meta: {
                name: '简单表格',
              },
              component: () => import('../views/Table.vue'),
            },
          ]
        },
        {
          path: 'user',
          name: 'user',
          meta: {
            name: '个人中心',
            icon: 'UserFilled',
          },
          component: () => import('../views/AccountCenter.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue')
    },

  ]
})

router.beforeEach((to, from) => {
  // console.log('here')
  // console.log(localStorage.getItem('token'))
  // console.log(to.path)
  if (to.path === '/login') {
    // 到登录页面，检查有没有 token
    if (localStorage.getItem('token')) {
      // console.log('已登录')
      // console.log(from.path)
      return from.path ? from.path : '/';
    }else {
      // console.log('未登录，需要 login')
      return true;
    }
  } else {
    // 到非登录页面，检查 token
    const isLogin = localStorage.getItem('token');
    // 如果验证失败，跳转到登录页面
    if (!isLogin) {
      // console.log('验证失败')
      return '/login';
    }else {
      // 否则正常跳转
      // console.log('正常跳转')
      return true;
    }
  }
})


export default router
