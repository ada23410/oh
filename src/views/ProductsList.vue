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
                      <h5 class="card-title">{{ item.title }}</h5>
                      <div class="card-img-top rounded border-0" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                      <div class="card-body">
                      <a href="#" class="price">NT${{ item.origin_price }}</a>
                      <a href="#" class="add-to-cart"><font-awesome-icon class="bars me-2" icon="fas fa-bag-shopping"/>放入袋中</a>
                      <a href="#" class="add-to-favorite">
                          <font-awesome-icon class="bars" icon="fas fa-heart"/>
                      </a>
                      </div>
                  </div>
              </div>
          </div>
          <div aria-label="..." class="mt-2">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: !pagination.has_pre }">
                <a class="page-link" href="#" tabindex="-1" @click.prevent="prev">Previous</a>
              </li>
              <li class="page-item" v-for="page in totalPages" :key="page" :class="{active: currentPage === page}">
                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: !pagination.has_next }">
                <a class="page-link" href="#" @click.prevent="next">Next</a>
              </li>
            </ul>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      filter: '',
      currentPage: 1,
      perPage: 9,
      filteredProducts: [],
      pagination: { current_page: 1, total_pages: 1, has_next: false, has_pre: false } // 初始化 pagination
    }
  },
  methods: {
    // API 取得所有商品資訊
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products
          this.updateFilteredProducts()
          this.updatePagination()
        }
      }).catch((error) => {
        console.error('Error fetching products:', error)
        this.pagination = { current_page: 1, total_pages: 1, has_next: false, has_pre: false }
      })
    },
    // 設置篩選分類
    setFilter (category) {
      this.filter = category
      this.currentPage = 1
      this.updateFilteredProducts()
      this.updatePagination()
    },
    // 上一頁
    prev () {
      if (this.currentPage > 1) {
        this.currentPage--
        this.updatePagination()
      }
    },
    // 下一頁
    next () {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.updatePagination()
      }
    },
    goToPage (page) {
      this.currentPage = page
      this.updatePagination()
    },
    updateFilteredProducts () {
      if (this.filter === '') {
        this.filteredProducts = this.products
      } else {
        this.filteredProducts = this.products.filter(item => item.category === this.filter)
      }
    },
    updatePagination () {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      this.pagination.total_pages = Math.ceil(this.filteredProducts.length / this.perPage)
      this.pagination.has_pre = this.currentPage > 1
      this.pagination.has_next = this.currentPage < this.pagination.total_pages
      this.paginatedProducts = this.filteredProducts.slice(start, end)
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
    }
  },
  watch: {
    filter () {
      this.setFilter(this.filter)
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
