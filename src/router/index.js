import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout'),
    children: [
      {
        path: '/',
        component: () => import('@/views/home')
      },
      {
        path: '/category/:id',
        component: () => import('@/views/category')
      },
      {
        path: '/category/sub/:id',
        component: () => import('@/views/category/sub')
      }
    ]
  }
]

// 创建路由实例
const router = createRouter({
  // 使用 hash 路由模式
  history: createWebHashHistory(),
  // 配置路由规则
  routes
})

export default router
