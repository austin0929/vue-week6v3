import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'userview',
      component: () => import('../views/UserView.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/ProductsView.vue'),
        },
        {
          path: 'productdetail/:id',
          name: 'productdetail',
          component: () => import('../views/ProductDetailView.vue')
        },
        {
          path: 'carts',
          name: 'carts',
          component: () => import('../views/CartsView.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
    },
  ]
})

export default router
