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
            <a class="navbar-brand align-items-center" href="#">ooh</a>
            <router-link class="text-decoration-none" to="/cart">
                <div class="user-cart">
                    <div class="user-cart-name">購物車</div>
                    <div class="user-cart-count">0</div>
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
                                <router-link class="nav-link" to="/items">Collections
                                    <font-awesome-icon class="arrow" icon="fas fa-arrow-right"/>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/articles">Topics
                                    <font-awesome-icon class="arrow" icon="fas fa-arrow-right"/>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/about">About us
                                    <font-awesome-icon class="arrow" icon="fas fa-arrow-right"/>
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
      isSidebarVisible: false
    }
  },
  methods: {
    openSidebar () {
      this.isSidebarVisible = true
    },
    closeSidebar () {
      this.isSidebarVisible = false
    }
  }
})
</script>
