<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Loading :active="isLoading"></Loading>
    <div class="function">
        <h5>商品管理</h5>
        <button class="btn btn-primary" type="button" @click="openModal(true)">新增一個產品</button>
    </div>
    <div class="card p-3">
      <table class="table">
          <thead>
              <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="200">編輯</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="item in products" :key="item.id">
                  <td>{{ item.category }}</td>
                  <td>{{ item.title }}</td>
                  <td class="text-right">
                      {{ $filters.currency(item.origin_price) }}
                  </td>
                  <td class="text-right">
                      {{ $filters.currency(item.price) }}
                  </td>
                  <td>
                      <span class="text-success" v-if="item.is_enabled">啟用</span>
                      <span class="text-mute" v-else>未啟用</span>
                  </td>
                  <td>
                      <div class="btn-group">
                      <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                      <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(item)">刪除</button>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
    <div class="pagination-wrapper">
      <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
    </div>
    <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
    <DeleteProductModal ref="deleteProductModal" :product="tempProduct" @confirm-delete="confirmDelete"></DeleteProductModal>
</template>

<script>
import ProductModal from '../components/ProductModal.vue'
import Pagination from '@/components/Pagination.vue'
import DeleteProductModal from '../components/DeleteModal.vue'

export default ({
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DeleteProductModal,
    Pagination
  },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
        //   console.log(res.data)
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.has_next = res.data.has_next
          this.has_pre = res.data.has_pre
        }
      })
    },
    openModal (isNew, item) {
      // console.log(isNew, item)
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    openDeleteModal (item) {
      this.tempProduct = { ...item }
      const deleteComponent = this.$refs.deleteProductModal
      deleteComponent.showModal()
    },
    updateProduct (item) {
      this.tempProduct = item

      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'

      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }

      const productComponent = this.$refs.productModal
      this.isLoading = true
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        this.isLoading = false
        productComponent.hideModal()
        if (res.data.success) {
        //   console.log(res.data)
          this.getProducts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: res.data.message.join('、')
          })
        }
      })
    },
    confirmDelete () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(url).then((res) => {
        // console.log(res)
        const deleteComponent = this.$refs.deleteProductModal
        deleteComponent.hideModal()
        this.getProducts()
      })
    //   this.$emit('delete-product', this.item)
    //   this.hideModal()
    }
  },
  created () {
    this.getProducts()
  }
})
</script>
