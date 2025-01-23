<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Navbar></Navbar>
    <div>
      <ToastMessage></ToastMessage>
      <router-view></router-view>
    </div>
    <Footer></Footer>
</template>

<script>
import emitter from '../methods/emitter'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ToastMessage from '@/components/ToastMessage.vue'

export default ({
  components: {
    Navbar,
    Footer,
    ToastMessage
  },
  provide () {
    return {
      emitter
    }
  }
})
</script>
