<!-- eslint-disable no-undef -->
<template>
    <div class="product-info mt-5">
        <div class="container">
            <div aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Collections</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
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
                      <div class="title">{{ product.title }}</div>
                      <div class="content">{{ product.content }}</div>
                      <div class="description">{{ product.description }}</div>
                      <div class="h5" v-if="!product.price">{{ product.origin_price }}元</div>
                      <div class="origin-price" v-if="product.price">{{ product.origin_price }}元</div>
                      <div class="price" v-if="product.price">{{ product.price }}元</div>
                    <hr>
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
        </div>
    </div>
</template>

<script>
export default ({
  data () {
    return {
      product: {},
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
        console.log(res.data)
        this.product = res.data.product
      })
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
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        console.log(res.data.carts)
      })
    }
  },
  created () {
    const productId = this.$route.params.productId
    this.getProduct(productId)
  }
})
</script>
