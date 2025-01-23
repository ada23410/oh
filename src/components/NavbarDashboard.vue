<template>
    <Loading :active="isLoading"></Loading>
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <img class="logo" src="../../public/image/oh_my_logo_white.svg" alt="">
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/dashboard/products" class="nav-link active" aria-current="page">
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'book']" />
          </span>
          <span class="title">商品管理</span>
        </router-link>
      </li>
      <li>
          <router-link to="/dashboard/orders" class="nav-link text-white">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'clipboard']" />
            </span>
            <span class="title">
              訂單管理
            </span>
          </router-link>
      </li>
      <li>
        <router-link to="/dashboard/coupons" class="nav-link text-white">
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'dollar-sign']" />
          </span>
          <span class="title">優惠卷管理</span>
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/articles" class="nav-link text-white">
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'pen']" />
          </span>
          <span class="title">文章管理</span>
        </router-link>
      </li>
      <li>
        <hr>
        <a class="nav-link text-white" @click.prevent="logout">
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'user']" />
          </span>
          <span class="title">帳號登出</span>
        </a>
      </li>
    </ul>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      this.isLoading = true
      // console.log(api)
      this.$http.post(api, this.user).then((res) => {
        this.isLoading = false
        // console.log(res)
        if (res.data.success) {
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>
