<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Navbar></Navbar>
    <router-view></router-view>
    <Footer></Footer>
</template>

<script>
import emitter from '../methods/emitter'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default ({
  components: {
    Navbar,
    Footer
  },
  provide () {
    return {
      emitter
    }
  }
})
</script>
