<template>
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
        <div class="col-4 my-5" v-for="item in paginatedProducts" :key="item.id">
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
      filter: '',
      currentPage: 1,
      perPage: 9,
      filteredProducts: [],
      pagination: { current_page: 1, total_pages: 1, has_next: false, has_pre: false },
      favorites: []
    }
  },
  inject: ['emitter'],
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
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
      this.updateProducts()
    },
    prev () {
      if (this.currentPage > 1) {
        this.currentPage--
        this.updateProducts()
      }
    },
    next () {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.updateProducts()
      }
    },
    goToPage (page) {
      this.currentPage = page
      this.updateProducts()
    },
    toggleFavorite (item) {
      this.favorites = favorites.toggleFavorite(this.favorites, item.id)
    },
    updateProducts () {
      if (this.filter === '') {
        this.filteredProducts = this.products
      } else {
        this.filteredProducts = this.products.filter(item => item.category === this.filter)
      }

      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      this.pagination.total_pages = Math.ceil(this.filteredProducts.length / this.perPage)
      this.pagination.has_pre = this.currentPage > 1
      this.pagination.has_next = this.currentPage < this.pagination.total_pages
      this.paginatedProducts = this.filteredProducts.slice(start, end)
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
    }
  },
  computed: {
    categoryData () {
      if (!this.products || this.products.length === 0) return []
      const categories = this.products.map(product => product.category)
      return [...new Set(categories)]
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
  created () {
    this.favorites = favorites.loadFavorites()
    this.getProducts()
  }
}
</script>
