<!-- eslint-disable no-undef -->
<template>
    <div class="product-info mt-5">
        <div class="container">
            <div aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/">Home</router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <router-link to="/items">Collections</router-link>
                  </li>
                  <li v-if="product" class="breadcrumb-item active" aria-current="page">
                    {{ product.title }}
                  </li>
                  <li v-else class="breadcrumb-item active" aria-current="page">
                    Loading...
                  </li>
                </ol>
            </div>
            <div class="row">
                <div class="col-md-6">
                  <div class="img-wrap">
                    <img :src="product.imageUrl" alt="" class="img-fluid rounded border-0 mb-3">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="information">
                      <div class="category">{{ product.category }}</div>
                      <div class="title-wrap">
                        <div class="title">{{ product.title }}</div>
                        <div class="add-to-favorite"  @click="toggleFavorite(product.id)">
                          <font-awesome-icon :icon="['fas', 'heart']"  :class="{ 'like': favorites.includes(product.id) }"/>
                        </div>
                      </div>
                      <div class="content">
                        <p>{{ product.content }}</p>
                      </div>
                      <div class="d-flex align-items-center justify-content-between mt-3">
                        <div class="h5" v-if="!product.price">{{ product.origin_price }}元</div>
                        <div class="origin-price" v-if="product.price">{{ product.origin_price }}元</div>
                        <div class="price" v-if="product.price">{{ product.price }}元</div>
                      </div>
                      <div class="add-content">
                        <div class="input-group">
                          <button class="btn btn-outline-secondary" type="button">-</button>
                          <input type="text" class="form-control" value="1">
                          <button class="btn btn-outline-secondary" type="button">+</button>
                        </div>
                        <button type="button" class="add-to-cart" @click="addCart(product.id)" :disabled="this.status.loadingItem === product.id">
                          <i class="fas fas-spinner fa-spin"></i>
                          <div v-if="this.status.loadingItem === product.id" class="spinner-grow text-danger spinner-grow-sm" role="status">
                              <span class="visually-hidden">Loading...</span>
                          </div>
                          加到購物車
                        </button>
                      </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="content">
                    <h2 class="title">商品介紹</h2>
                    <div class="description" v-html="product.description"></div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="related-product">
                    <h2 class="title">其他相關商品</h2>
                      <swiper class="mySwiper" :modules="modules"
                        :slidesPerView="'auto'"
                        :breakpoints="{
                          '320': {
                            slidesPerView: 1,
                            spaceBetween: 20,
                          },
                          '540': {
                            slidesPerView: 2,
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
                        <swiper-slide v-for="item in products" :key="item.id">
                          <div class="card">
                            <a @click="getProduct(item.id)">
                              <h5 class="card-title">{{ item.title }}</h5>
                              <div class="card-img-top rounded border-0">
                                <img :src="item.imageUrl">
                              </div>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import favorites from '@/methods/favorite'
import 'swiper/css'
import 'swiper/css/pagination'

export default ({
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      product: {},
      products: [],
      favorites: [],
      isLoading: false,
      cart: {},
      status: {
        loadingItem: '' // 對應品項id
      }
    }
  },
  inject: ['emitter'],
  methods: {
    getProduct (productId) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${productId}`
      this.$http(api).then((res) => {
        // console.log(res.data)
        this.product = res.data.product
        if (this.product.description) {
          this.product.description = this.formatDescription(this.product.description)
        }
      })
    },
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.products = res.data.products
        }
      })
    },
    formatDescription (description) {
      return description
        .replace(/。/g, '。<br>') // 在句號後換行
        .replace(/^內容物：/m, '<h2 class="subtitle">內容物</h2>')
        .replace(/^保存期限：/m, '<h2 class="subtitle">保存期限</h2>')
        .replace(/^保存方式：/m, '<h2 class="subtitle">保存方式</h2>')
        .replace(/^食用方法：/m, '<h2 class="subtitle">食用方法</h2>')
        .replace(/^營養成分：/m, '<h2 class="subtitle">營養成分</h2>')
    },
    addCart (productId) {
      // console.log(productId)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = productId
      const cart = {
        product_id: productId,
        qty: 1
      }
      this.$http.post(api, { data: cart }).then((res) => {
        this.status.loadingItem = ''
        console.log(res.data)
        console.log('發出事件', res.data)
        this.emitter.emit('addCart', res.data)
      })
    },
    toggleFavorite (item) {
      // console.log(item)
      if (this.product && this.product.id) {
        this.favorites = favorites.toggleFavorite(this.favorites, this.product.id)
        this.emitter.emit('push-message', {
          style: 'success',
          title: this.isFavorite ? '已從最愛移除！' : '已加入最愛！'
        })
      }
    }
  },
  created () {
    this.favorites = favorites.loadFavorites()
    const productId = this.$route.params.productId
    this.getProduct(productId)
    this.getProducts()
  }
})
</script>
