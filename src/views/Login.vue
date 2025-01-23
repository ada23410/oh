<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Loading :active="isLoading"></Loading>
    <div class="login">
      <div class="container">
          <form class="row" @submit.prevent="signIn">
              <div class="col-md-4">
                  <img class="logo" src="../../public/image/oh_my_logo_white.svg" alt="">
                  <h1 class="h3 mb-3 font-weight-normal text-center title">管理員登入</h1>
                  <div class="mb-2">
                  <label for="inputEmail" class="sr-only">帳號</label>
                  <input
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      placeholder="Email address"
                      required
                      autofocus
                      v-model="user.username"
                  />
                  </div>
                  <div class="mb-2">
                  <label for="inputPassword" class="sr-only">密碼</label>
                  <input
                      type="password"
                      id="inputPassword"
                      class="form-control"
                      placeholder="Password"
                      required
                      v-model="user.password"
                  />
                  </div>
                  <div class="text-center mt-4">
                  <button class="btn btn-primary btn-block w-100" type="submit">登入</button>
                  </div>
              </div>
          </form>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        isLoading: false
      }
    }
  },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.isLoading = true
      this.$http.post(api, this.user).then((res) => {
        this.isLoading = false
        // console.log(res)
        if (res.data.success) {
          const { token, expired } = res.data
          // console.log(token, expired)
          document.cookie = `Hexuid=hexToken${token}; expires=${new Date(expired).toUTCString()}; path=/`
          this.$router.push('/dashboard/products')
        }
      })
    }
  }
}
</script>
