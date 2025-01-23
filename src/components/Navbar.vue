<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nav :class="{'hidden': !isNavbarVisible}" class="navbar navbar-expand-lg">
        <div class="container">
            <button class="base-menu" @click="openSidebar">
                <div class="menu-icon">
                    <font-awesome-icon class="bars" icon="fas fa-bars"/>
                </div>
                <div class="menu">Menu</div>
            </button>
            <router-link class="navbar-brand align-items-center" to="/home">
              <img  class="logo" src="../../public/image/oh_my_logo_color.svg" alt="">
            </router-link>
            <router-link class="text-decoration-none" to="/cart">
                <div class="user-cart">
                    <div class="user-cart-name">
                      <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                      <span class="ms-1">購物車</span>
                    </div>
                    <div class="user-cart-count">{{ cartCount }}</div>
                </div>
            </router-link>
        </div>
    </nav>
    <div :class="{'show': isSidebarVisible}" class="side-bar-menu">
        <div class="menu-list">
            <div class="container">
                <button class="base-menu" @click="closeSidebar">
                    <div class="menu-icon">
                        <font-awesome-icon class="bars" icon="fas fa-xmark"/>
                    </div>
                    <div class="menu">Menu</div>
                </button>
                <div class="col-md-6 m-auto">
                    <div class="list">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <router-link class="nav-link" to="/items" @click="closeSidebar">
                                    <div class="link-wrap">
                                      <div class="link-title">
                                        <div class="cn">商品列表</div>
                                        <div class="en">Collections</div>
                                      </div>
                                      <font-awesome-icon class="arrow" icon="fas fa-arrow-right"/>
                                    </div>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/articles" @click="closeSidebar">
                                  <div class="link-wrap">
                                      <div class="link-title">
                                        <div class="cn">文章列表</div>
                                        <div class="en">Topics</div>
                                      </div>
                                      <font-awesome-icon class="arrow" icon="fas fa-arrow-right"/>
                                    </div>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/about" @click="closeSidebar">
                                  <div class="link-wrap">
                                      <div class="link-title">
                                        <div class="cn">關於我們</div>
                                        <div class="en">About us</div>
                                      </div>
                                      <font-awesome-icon class="arrow" icon="fas fa-arrow-right"/>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-6 m-auto">
                    <div class="gallery"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default ({
  data () {
    return {
      isNavbarVisible: true,
      isSidebarVisible: false,
      cart: [],
      cartCount: 0
    }
  },
  inject: ['emitter'],
  methods: {
    openSidebar () {
      this.isSidebarVisible = true
    },
    closeSidebar () {
      this.isSidebarVisible = false
    },
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        console.log('API Response', res.data.data)
        if (res.data.data && res.data.data.carts) {
          this.cart = res.data.data.carts
          this.cartCount = this.cart.reduce((sum, cartItem) => sum + cartItem.qty, 0)
        } else {
          this.cart = []
          this.cartCount = 0
        }
      })
    }
  },
  created () {
    this.getCart()
    this.emitter.on('cart-updated', () => {
      this.getCart()
    })
  },
  beforeUnmount () {
    this.emitter.off('cart-updated')
  }
})
</script>
