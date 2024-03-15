<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Navbar></Navbar>
    <div class="main">
        <div class="container">
            <div class="recommend">
                <div class="marquee">
                    <div class="marquee-item">
                        <span  @mouseover="marqueeStop" @mouseout="marqueeMove" class="item">{{ message }}</span>
                    </div>
                </div>
                <div class="recommend-product">
                    <swiper class="mySwiper">
                        <swiper-slide>Slide 1</swiper-slide>
                        <swiper-slide>Slide 2</swiper-slide><swiper-slide>Slide 3</swiper-slide>
                        <swiper-slide>Slide 4</swiper-slide><swiper-slide>Slide 5</swiper-slide>
                        <swiper-slide>Slide 6</swiper-slide><swiper-slide>Slide 7</swiper-slide>
                        <swiper-slide>Slide 8</swiper-slide><swiper-slide>Slide 9</swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

export default ({
  components: {
    Navbar,
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      message: 'NEW OPEN ',
      intervalId: null
    }
  },
  methods: {
    // 跑馬燈
    marqueeMove () {
      if (this.intervalId != null) return
      this.intervalId = setInterval(() => {
        const start = this.message.substring(0, 1)
        const end = this.message.substring(1)
        this.message = end + start
      }, 100)
    },
    marqueeStop () {
      clearInterval(this.intervalId)
      this.intervalId = null
    },
    // Swiper
    setup () {
      const onSwiper = (swiper) => {
        console.log(swiper)
      }
      const onSlideChange = () => {
        console.log('slide change')
      }
      return {
        onSwiper,
        onSlideChange
      }
    }
  }
})
</script>
