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
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">手工啤酒</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">醃漬物</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">健康小食</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" aria-disabled="true">有機蔬果</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="products-list">
        <div class="container">
            <div class="row">
                <div class="col-4 my-5" v-for="item in products" :key="item.id">
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
        </div>
        <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
    </div>
</template>

<script>
import Pagination from '../components/Pagination.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      itemsPerPage: 9
    }
  },
  components: {
    Pagination
  },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      this.$http.get(api).then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.has_next = res.data.has_next
          this.has_pre = res.data.has_pre
        }
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
