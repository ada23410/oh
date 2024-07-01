<template>
    <div class="cart">
        <div class="container">
            <div class="cart-function">
              <h5 class="title">My Cart</h5>
              <button type="button" class="btn btn-dark delete-all" @click="removeAllCartItem">全部刪除</button>
            </div>
            <div class="row">
                <div class="col-12">
                  <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">品名</th>
                                <th scope="col">數量</th>
                                <th scope="col">單價</th>
                                <th scope="col">功能</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-if="cart.carts">
                              <tr v-for="item in cart.carts" :key="item.id">
                                  <th scope="row">
                                    <div class="product-detail d-flex align-items-center">
                                      <div class="product-image me-3">
                                          <img :src="item.product.imageUrl" alt="" class="img-fluid rounded border-0 mb-3">
                                      </div>
                                      <div>
                                        <div class="product-title">{{ item.product.title }}</div>
                                        <div class="text-success" v-if="item.coupon">
                                            已套用優惠券
                                        </div>
                                      </div>
                                    </div>
                                  </th>
                                  <td>
                                      <div class="input-group input-group-sm">
                                          <input type="number" class="form-control" v-model.number="item.qty" min="1" @change="updateCart(item)" :disabled="item.id === status.loadingItem">
                                          <div class="input-group-text">/ {{ item.product.unit }}</div>
                                      </div>
                                  </td>
                                  <td class="align-middle">
                                      <div>
                                        <small class="text-success" v-if="cart.final_total !== cart.total">折扣價</small>
                                        <div>{{ $filters.currency(item.final_total) }}</div>
                                      </div>
                                  </td>
                                  <td class="align-middle">
                                      <button type="button" class="btn btn-outline-danger" @click="removeCartItem(item.id)" :disabled="status.loadingItem === item.id">
                                          <i class="fas fas-spinner fa-spin"></i>
                                          <font-awesome-icon class="bars" icon="fas fa-trash"/>
                                      </button>
                                  </td>
                              </tr>
                            </template>
                        </tbody>
                        <tfoot>
                          <tr>
                              <td class="text-end" colspan="3">總計</td>
                              <td class="text-end">{{ $filters.currency(cart.total) }}</td>
                          </tr>
                          <tr v-if="cart.final_total !== cart.total">
                              <td class="text-end text-success" colspan="3">折扣價</td>
                              <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
                          </tr>
                        </tfoot>
                    </table>
                  </div>
                </div>
                <div class="col-6"></div>
                <div class="col-6">
                  <div class="input-group mb-3 input-group-sm">
                      <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                      <div class="input-group-append">
                          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                              套用優惠碼
                          </button>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      product: {},
      cart: [],
      coupon_code: '',
      status: {
        loadingItem: ''
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
          this.cart = res.data.data
        } else {
          this.cart = []
        }
      })
    },
    updateCart (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(api, { data: cart }).then((res) => {
        // console.log(res.data)
        this.status.loadingItem = ''
        this.getCart()
      })
    },
    removeCartItem (item) {
      // console.log(item)
      this.status.loadingItem = item
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item}`
      this.$http.delete(api).then((res) => {
        // console.log('API Response', res.data)
        this.status.loadingItem = ''
        this.getCart()
      })
    },
    removeAllCartItem () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      this.$http.delete(api).then((res) => {
        this.getCart()
        // console.log(res)
      })
    },
    addCouponCode () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.$http.post(api, { data: coupon }).then((res) => {
        console.log(res.data)
        this.getCart()
      })
    }
  },
  created () {
    this.emitter.on('addCart', (data) => {
      // console.log('接收資料', data)
      this.cart = data
    })
    this.getCart()
  }
}
</script>
