<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Loading :active="isLoading"></Loading>
    <table class="table mt-4">
        <thead>
            <tr>
                <th width="120">購買時間</th>
                <th width="120">E-mail</th>
                <th width="120">購買款項</th>
                <th width="100">應付金額</th>
                <th width="100">是否付款</th>
                <th width="120">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, key) in orders" :key="key">
                <td>{{ $filters.date(item.create_at) }}</td>
                <td>{{ item.user.email }}</td>
                <td class="text-right">
                    <ul class="list-unstyled">
                        <li v-for="(product, i) in item.products" :key="i">
                            {{ product.product.title }}
                            數量：{{ product.qty }}
                            {{ product.product.unit }}
                        </li>
                    </ul>
                </td>
                <td class="text-right">
                    {{ item.total }}
                </td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" :id="`paidSwitch${item.id}`"
                                v-model="item.is_paid"
                                @change="updatePaid(item)">
                        <label class="form-check-label" :for="`paidSwitch${item.id}`">
                            <span v-if="item.is_paid">已付款</span>
                            <span v-else>未付款</span>
                        </label>
                    </div>
                </td>
                <td>
                    <div class="btn-group">
                    <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">檢視</button>
                    <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(item)">刪除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <pagination  :pages="pagination" @emit-pages="getProducts"></pagination>
    <orderModal ref="orderModal" :order="tempOrder" @update-order="updateOrder"></orderModal>
    <deleteOrderModal ref="deleteOrderModal" :order="tempOrder" @confirm-delete="deleteOrder"></deleteOrderModal>
</template>

<script>
import orderModal from '../components/OrderModal.vue'
import deleteOrderModal from '../components/DeleteModal.vue'
import pagination from '../components/Pagination.vue'

export default ({
  components: {
    orderModal,
    deleteOrderModal,
    pagination
  },
  data () {
    return {
      orders: {},
      pagination: {},
      tempOrder: {},
      isNew: false,
      isLoading: false,
      currentPage: 1
    }
  },
  methods: {
    getOrders (currentPage = 1) {
      this.currentPage = currentPage
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`
      this.isLoading = true
      this.$http.get(api, this.tempProduct).then((res) => {
        // console.log(res.data)
        this.isLoading = false
        this.orders = res.data.orders
        this.pagination = res.data.pagination
        this.has_next = res.data.has_next
        this.has_pre = res.data.has_pre
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempOrder = {}
      } else {
        this.tempOrder = { ...item }
      }
      this.isNew = isNew
      const orderComponent = this.$refs.orderModal
      orderComponent.showModal()
    },
    openDeleteModal (item) {
      this.tempOrder = { ...item }
      const deleteComponent = this.$refs.deleteOrderModal
      deleteComponent.showModal()
    },
    updateOrder (item) {
      this.tempOrder = item
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      this.isLoading = true
      this.$http.put(api, { data: paid }).then((res) => {
        this.isLoading = false
        this.getOrders(this.currentPage)
        this.$httpMessageState(res, '更新付款狀態')
      })
    },
    deleteOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.isLoading = true
      this.$http.delete(api).then((res) => {
        // console.log(res.data)
        this.isLoading = false
        const deleteComponent = this.$refs.deleteOrderModal
        deleteComponent.hideModal()
        this.getOrders(this.currentPage)
      })
    }
  },
  created () {
    this.getOrders()
  }
})
</script>
