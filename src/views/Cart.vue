<template>
    <div class="cart">
        <div class="container">
            <h1 class="title">My Cart</h1>
            <div class="row">
                <div class="col-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">品名</th>
                                <th scope="col">數量</th>
                                <th scope="col">單價</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in cart" :key="item.id">
                                <th scope="row">
                                    <div class="product-image">
                                        <img :src="item.product.imageUrl" alt="" class="img-fluid rounded border-0 mb-3">
                                    </div>
                                    {{ item.product.title }}
                                    <div class="text-success" v-if="item.coupon">
                                        已套用優惠券
                                    </div>
                                </th>
                                <td>
                                    <div class="input-group input-group-sm">
                                        <input type="number" class="form-control" v-model.number="item.qty" min="1" @change="updateCart(item)" :disabled="item.id === status.loadingItem">
                                        <div class="input-group-text">/ {{ item.product.unit }}</div>
                                    </div>
                                </td>
                                <td class="text-end">
                                    <small class="text-success" v-if="cart.final_total !== cart.total">折扣價</small>
                                    {{ $filters.currency(item.final_total) }}
                                </td>
                                <td>
                                    <button type="button" class="btn btn-outline-danger" @click="removeCartItem(item.id)" :disabled="status.loadingItem === item.id">
                                        <i class="fas fas-spinner fa-spin"></i>
                                        <font-awesome-icon class="bars" icon="fas fa-trash"/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default ({
  data () {
    return {
      products: [],
      product: {},
      cart: {},
      coupon_code: '',
      status: {
        loadingItem: '' // 對應品項id
      }
    }
  },
  inject: ['emitter'],
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        console.log('API Response', res.data)
        if (res.data.data && res.data.data.carts) {
          this.cart = res.data.data.carts
        }
      })
    },
    updateCart (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(api, { data: cart }).then((res) => {
        console.log(res.data)
        this.status.loadingItem = ''
        this.getCart()
      })
    }
  },
  created () {
    this.emitter.on('addCart', (data) => {
      console.log('接收資料', data)
      this.cart = data
      this.getCart()
    })
    this.getCart()
  }
})
</script>
