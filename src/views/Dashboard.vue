<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <NavbarDashboard></NavbarDashboard>
    <router-view/>
</template>

<script>
import emitter from '@/methods/emitter'
import NavbarDashboard from '../components/NavbarDashboard.vue'

export default {
  components: {
    NavbarDashboard
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)Hexuid\s*=\s*hexToken([^;]*).*$)|^.*$/, '$1')
    console.log(token)
    this.$http.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api, this.user).then((res) => {
      console.log(res)
      if (!res.data.success) {
        this.$router.push('login')
      }
    })
  }
}
</script>
