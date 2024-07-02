<template>
    <div class="check-out">
        <div class="container">
            <div class="form">
                <h5 class="title">訂單確認</h5>
            </div>
            <div class="table-responsive">
                <form @submit.prevent="payOrder">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">品名</th>
                                <th scope="col">數量</th>
                                <th scope="col">單價</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in order.products" :key="item.id">
                                <td>{{ item.product.title }}</td>
                                <td>{{ item.qty }}/{{ item.product.unit }}</td>
                                <td class="text-end">{{ item.final_total }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" class="text-end">總計</td>
                                <td class="text-end">{{ order.total }}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div class="form">
                        <h5 class="title">收件人資訊</h5>
                    </div>
                    <table class="table">
                        <tbody>
                        <tr>
                            <th width="100">Email</th>
                            <td>{{ order.user.email }}</td>
                        </tr>
                        <tr>
                            <th>姓名</th>
                            <td>{{ order.user.name }}</td>
                        </tr>
                        <tr>
                            <th>收件人電話</th>
                            <td>{{ order.user.tel }}</td>
                        </tr>
                        <tr>
                            <th>收件人地址</th>
                            <td>{{ order.user.address }}</td>
                        </tr>
                        <tr>
                        <th>付款狀態</th>
                        <td>
                            <span v-if="!order.is_paid">尚未付款</span>
                            <span v-else class="text-success">付款完成</span>
                        </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="text-end" v-if="order.is_paid === false">
                        <button class="btn btn-dark">確認付款去</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default ({
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
      isLoading: false
    }
  },
  methods: {
    getOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(api).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.order = res.data.order
        }
      })
    },
    payOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(api).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.getOrder()
        }
      })
    }
  },
  created () {
    // 取出訂單編號
    this.orderId = this.$route.params.orderId
    // console.log(this.orderId)
    this.getOrder()
  }
})
</script>
