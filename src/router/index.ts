import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.path === '/login') return;

  // 检查 token
  const isLogin = sessionStorage.getItem('token');
  // 如果验证失败，跳转到登录页面
  if (!isLogin) return '/login';
  // 否则正常跳转
})


export default router
