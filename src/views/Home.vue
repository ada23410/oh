<template>
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
                      :pagination="{ clickable: true }"
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
                          <a @click="getProduct(item.id)">
                            <h5 class="card-title">{{ item.title }}</h5>
                            <div class="card-img-top rounded border-0" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                          </a>
                          <div class="card-body">
                            <div class="price">NT${{ item.origin_price }}</div>
                            <div class="add-to-cart" @click="addCart(item.id)">
                              <font-awesome-icon class="bars me-2" icon="fas fa-bag-shopping"/>放入袋中
                            </div>
                            <div class="add-to-favorite"  @click="toggleFavorite(item)">
                              <font-awesome-icon :icon="['fas', 'heart']"  :class="{ 'like': favorites.includes(item.id) }"/>
                            </div>
                          </div>
                        </div>
                      </swiper-slide>
                  </swiper>
              </div>
              <div class="d-flex justify-content-end mt-3">
                <router-link class="icon-link" to="/items">
                  All Products
                  <font-awesome-icon class="bars" icon="fas fa-arrow-right"/>
                </router-link>
              </div>
          </div>
      </div>
  </div>
  <div class="about-us mt-5">
    <div class="container">
      <div class="about-section">
        <div class="about-us-title">
          <h5>ABOUT US</h5>
        </div>
        <div class="about-us-content">
          <h6 class="tag">#樂活飲食精選</h6>
          <h3 class="title">oh~賣蔬果店</h3>
          <div class="content">
            <p>專門銷售各種飲料（如手工啤酒、精釀咖啡、茶飲等）和醃漬物（如醃黃瓜pickles、橄欖black olives、泡菜kimchi等）。這些產品既可獨立享用，也可作為搭配美食的佳品。</p>
          </div>
          <router-link class="call-to-action" to="/about">
            查看資訊
            <font-awesome-icon class="bars" icon="fas fa-arrow-right"/>
          </router-link>
        </div>
      </div>
    </div>
    <div class="about-cover"></div>
  </div>
  <div class="topics mt-5">
    <div class="container">
      <div class="topics-section">
        <div class="topics-title">
          <h5>TOPICS</h5>
        </div>
        <div class="topics-content">
          <swiper class="mySwiper" :modules="modules"
                :slidesPerView="'auto'"
                :pagination="{ clickable: true }"
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
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }"
                @swiper="onSwiper"
                @slideChange="onSlideChange">
                <swiper-slide v-for="item in articles" :key="item.id">
                  <a @click="getArticle(item.id)">
                    <div class="card">
                        <div class="card-img-top rounded border-0" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                      <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <p class="card-text">{{ item.description }}</p>
                        <span class="tag">{{ item.tag }}</span>
                      </div>
                    </div>
                  </a>
                </swiper-slide>
            </swiper>
        </div>
        <div class="d-flex justify-content-end mt-3">
          <router-link class="icon-link" to="/articles">
            All Topics
            <font-awesome-icon class="bars" icon="fas fa-arrow-right"/>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="shop mt-5">
    <div class="container">
      <div class="shop-section">
        <div class="shop-title">
          <h5>SHOP</h5>
        </div>
        <div class="shop-content">
          <div class="shop-image rounded border-0">
            <img src="../../public/image/about_cover.png" alt="shop-image">
          </div>
          <div class="shop-information">
            <div class="name">oh~賣蔬果店</div>
            <div class="opening-hours">
              <span class="subtitle">營業時間</span>
              <span class="content">全年無休，每日09:00 - 21:00</span>
            </div>
            <div class="tel">
              <span class="subtitle">電話</span>
              <span class="content">(02)1234-5678</span>
            </div>
            <div class="address">
              <span class="subtitle">地址</span>
              <span class="content">太陽市果蔬區健康路1號</span>
            </div>
          </div>
        </div>
      </div>
      <div class="banner">
        <div class="slogan">NEW OPEN!</div>
        <div class="content">消費金額超過1,000元免費，查看詳情看更多優惠。</div>
        <a class="call-to-action">
            點此了解詳情
            <font-awesome-icon class="bars" icon="fas fa-arrow-right"/>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, A11y } from 'swiper/modules'
import favorites from '@/methods/favorite'
import 'swiper/css'
import 'swiper/css/pagination'

export default {
  components: {
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
      pagination: {},
      articles: [],
      favorites: []
    }
  },
  inject: ['emitter'],
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
        modules: [Pagination, A11y]
      }
    },
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        // console.log(res.data)
        this.products = res.data.products
      })
    },
    getProduct (id) {
      this.$router.push(`/product/${id}`)
    },
    getArticles () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles`
      this.$http.get(api).then((res) => {
        // console.log(res.data.articles)
        this.articles = res.data.articles
      })
    },
    getArticle (id) {
      this.$router.push(`/articles/${id}`)
    },
    addCart (productId) {
      console.log(productId)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: productId,
        qty: 1
      }
      this.$http.post(api, { data: cart }).then((res) => {
        console.log(res.data)
        console.log('發出事件', res.data)
        this.emitter.emit('addCart', res.data)
      })
    },
    toggleFavorite (item) {
      console.log(item.id)
      this.favorites = favorites.toggleFavorite(this.favorites, item.id)
    }
  },
  mounted () {
    this.setup() // 确保在mounted生命周期钩子中调用
  },
  created () {
    // console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH)
    this.favorites = favorites.loadFavorites()
    this.getProducts()
    this.getArticles()
  }
}
</script>
