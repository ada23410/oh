<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
      <div class="wrapper d-flex w-100 align-items-stretch">
        <div class="sidebar">
          <NavbarDashboard></NavbarDashboard>
        </div>
        <div class="content w-100">
          <ToastMessage></ToastMessage>
          <router-view/>
        </div>
      </div>
</template>
<script>
import emitter from '@/methods/emitter'
import ToastMessage from '@/components/ToastMessage.vue'
import NavbarDashboard from '../components/NavbarDashboard.vue'

export default {
  components: {
    NavbarDashboard,
    ToastMessage
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)Hexuid\s*=\s*hexToken([^;]*).*$)|^.*$/, '$1')
    // console.log(token)
    this.$http.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api, this.user).then((res) => {
      // console.log(res)
      if (!res.data.success) {
        this.$router.push('/login')
      }
    })
  }
}
</script>
