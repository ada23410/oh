<template>
  <Loading :active="isLoading"></Loading>
  <div class="cover">
    <div class="container">
      <h1 class="title">Collections</h1>
    </div>
  </div>
  <div class="product-navigation">
    <div class="container">
      <div class="navigation">
        <div aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Collections</li>
          </ol>
        </div>
        <div class="category">
          <ul class="nav nav-underline">
            <button type="button" class="nav-link" @click="setFilter('')">全部產品</button>
            <button type="button" class="nav-link" v-for="item in categoryData" :key="item" @click="setFilter(item)">
              {{ item }}
            </button>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="products-list">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 my-3 my-sm-3 my-md-5" v-for="item in paginatedProducts" :key="item.id">
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
              <div class="add-to-favorite" @click="toggleFavorite(item)">
                <font-awesome-icon :icon="['fas', 'heart']" :class="{ 'like': favorites.includes(item.id) }"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination :pages="pagination" @emit-pages="goToPage" />
    </div>
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue'
import favorites from '../methods/favorite'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      products: [],
      filter: '', // 當前篩選的分類
      currentPage: 1,
      perPage: 9,
      filteredProducts: [],
      pagination: { current_page: 1, total_pages: 1, has_next: false, has_pre: false },
      favorites: [],
      isLoading: false
    }
  },
  inject: ['emitter'],
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.products = res.data.products
          this.updateProducts()
        }
      }).catch((error) => {
        console.error('Error fetching products:', error)
        this.pagination = { current_page: 1, total_pages: 1, has_next: false, has_pre: false }
      })
    },
    getProduct (id) {
      this.$router.push(`/product/${id}`)
    },
    setFilter (category) {
      this.filter = category
      this.currentPage = 1
      // 更新路由的查詢參數
      this.$router.push({ query: { category } })
    },
    goToPage (page) {
      this.currentPage = page
      this.updateProducts()
    },
    toggleFavorite (item) {
      this.favorites = favorites.toggleFavorite(this.favorites, item.id)
      this.emitter.emit('push-message', {
        style: 'success',
        title: '已加入最愛！'
      })
    },
    updateProducts () {
      // 獲取篩選條件
      const categoryFilter = this.filter || this.$route.query.category || ''

      // 根據篩選條件篩選產品
      if (categoryFilter) {
        this.filteredProducts = this.products.filter(product => product.category === categoryFilter)
      } else {
        this.filteredProducts = this.products // 如果沒有篩選條件，顯示全部產品
      }

      // 分頁邏輯
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      this.pagination.total_pages = Math.ceil(this.filteredProducts.length / this.perPage)
      this.pagination.has_pre = this.currentPage > 1
      this.pagination.has_next = this.currentPage < this.pagination.total_pages
      this.paginatedProducts = this.filteredProducts.slice(start, end)
    },
    addCart (productId) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = { product_id: productId, qty: 1 }
      this.$http.post(api, { data: cart }).then((res) => {
        if (res.data.success) {
          this.emitter.emit('addCart', res.data)
          this.emitter.emit('push-message', {
            style: 'success',
            title: '商品已加入購物車！'
          })
        } else {
          throw new Error(res.data.message || '加入商品失敗！')
        }
      })
    }
  },
  computed: {
    categoryData () {
      if (!this.products || this.products.length === 0) {
        return []
      }
      const allCategories = this.products.map(product => product.category)
      return Array.from(new Set(allCategories))
    },
    totalPages () {
      return this.pagination.total_pages
    },
    paginatedProducts () {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.filteredProducts.slice(start, end)
    }
  },
  watch: {
    // 當路由的查詢參數變化時，更新分類篩選
    '$route.query.category' (newCategory) {
      this.filter = newCategory || ''
      this.currentPage = 1
      this.updateProducts()
    }
  },
  created () {
    this.favorites = favorites.loadFavorites()
    this.filter = this.$route.query.category || ''
    this.getProducts()
  }
}
</script>
