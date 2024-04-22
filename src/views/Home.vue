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
                <div class="recommend-product mt-5">
                    <swiper class="mySwiper" :modules="modules"
                        :slidesPerView="'auto'"
                        navigation
                        :pagination="{ clickable: true }"
                        :scrollbar="{ draggable: true }"
                        :breakpoints="{
                          '320': {
                            slidesPerView: 1,
                            spaceBetween: 20,
                          },
                          '540': {
                            slidesPerView: 1,
                            spaceBetween: 20,
                          },
                          '768': {
                            slidesPerView: 2,
                            spaceBetween: 40,
                          },
                          '1124': {
                            slidesPerView: 3,
                            spaceBetween: 30,
                          },
                        }"
                        @swiper="onSwiper"
                        @slideChange="onSlideChange">
                        <swiper-slide v-for="item in products" :key="item.id">
                          <div class="card">
                            <h5 class="card-title">{{ item.title }}</h5>
                            <div class="card-img-top rounded border-0" style="height: 450px; background-size: cover; background-position: center;border-radius: 0;" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                            <div class="card-body">
                              <a href="#" class="price">NT${{ item.origin_price }}</a>
                              <a href="#" class="add-to-cart"><font-awesome-icon class="bars me-2" icon="fas fa-bag-shopping"/>放入袋中</a>
                              <a href="#" class="add-to-favorite">
                                <font-awesome-icon class="bars" icon="fas fa-heart"/>
                              </a>
                            </div>
                          </div>
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="d-flex justify-content-end mt-3">
                  <a class="icon-link" href="#">
                    All Products
                    <font-awesome-icon class="bars" icon="fas fa-arrow-right"/>
                  </a>
                </div>
            </div>
        </div>
    </div>
    <div class="about-us mt-5">
      <div class="about-section">
        <div class="container">
          <h5>ABOUT US</h5>
        </div>
      </div>
      <div class="about-cover"></div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { Swiper, SwiperSlide, Navigation, Pagination, Scrollbar, A11y } from 'swiper/vue'
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
      intervalId: null,
      modules: [],
      onSwiper: null,
      onSlideChange: null,
      products: [],
      pagination: {}
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
        onSlideChange,
        modules: [Navigation, Pagination, Scrollbar, A11y]
      }
    },
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        // console.log(res.data)
        this.products = res.data.products
      })
    }
  },
  created () {
    this.getProducts()
  }
})
</script>
