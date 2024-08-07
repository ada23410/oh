import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Homeboard.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'items',
        component: () => import('../views/ProductsList.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('../views/ProductInfo.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/Checkout.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/Topics.vue')
      },
      {
        path: 'articles/:articleId',
        component: () => import('../views/Article.vue')
      },
      {
        path: 'about',
        component: () => import('../views/AboutUs.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/Orders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/Coupons.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/ArticleList.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
