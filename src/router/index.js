import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'items',
        name: 'ProductsList',
        component: () => import('../views/ProductsList.vue')
      },
      {
        path: 'product/:productId',
        name: 'ProductInfo',
        component: () => import('../views/ProductInfo.vue'),
        props: true
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: 'checkout/:orderId',
        name: 'Checkout',
        component: () => import('../views/Checkout.vue'),
        props: true
      },
      {
        path: 'articles',
        name: 'ArticlesList',
        component: () => import('../views/Topics.vue')
      },
      {
        path: 'articles/:articleId',
        name: 'ArticleInfo',
        component: () => import('../views/Article.vue'),
        props: true
      },
      {
        path: 'about',
        name: 'AboutUs',
        component: () => import('../views/AboutUs.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../views/Orders.vue')
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: () => import('../views/Coupons.vue')
      },
      {
        path: 'articles',
        name: 'AdminArticles',
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
