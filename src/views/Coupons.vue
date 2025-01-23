<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="function">
        <h5>優惠券管理</h5>
        <button class="btn btn-primary" type="button" @click="openModal(true)">新增優惠券</button>
    </div>
    <div class="card p-3">
      <table class="table">
          <thead>
              <tr>
                  <th width="120">名稱</th>
                  <th width="120">折扣百分比</th>
                  <th width="120">到期日</th>
                  <th width="100">是否啟用</th>
                  <th width="120">編輯</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item, key) in coupons" :key="key">
                  <td>{{ item.title }}</td>
                  <td>{{ item.percent }}%</td>
                  <td class="text-right">
                      {{ $filters.date(item.due_date) }}
                  </td>
                  <td>
                      <span class="text-success" v-if="item.is_enabled">啟用</span>
                      <span class="text-mute" v-else>未啟用</span>
                  </td>
                  <td>
                      <div class="btn-group">
                      <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                      <button class="btn btn-outline-danger btn-sm" @click="openDeleteCouponModal(item)">刪除</button>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
    <couponModal ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupon"></couponModal>
    <deleteCouponModal ref="deleteCouponModal" @confirm-delete="deleteCoupon"></deleteCouponModal>
</template>

<script>
import couponModal from '../components/CouponModal.vue'
import deleteCouponModal from '../components/DeleteModal.vue'

export default ({
  components: {
    // eslint-disable-next-line vue/no-unused-components
    couponModal,
    deleteCouponModal
  },
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      pagination: {},
      isNew: false
    }
  },
  methods: {
    getCoupons () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http.get(api).then((res) => {
        // console.log(res.data)
        this.coupons = res.data.coupons
        this.pagination = res.data.pagination
      })
    },
    openModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      const couponComponent = this.$refs.couponModal
      couponComponent.showModal()
    },
    openDeleteCouponModal (item) {
      this.tempCoupon = { ...item }
      const deleteCouponComponent = this.$refs.deleteCouponModal
      deleteCouponComponent.showModal()
    },
    updateCoupon (tempCoupon) {
      if (this.isNew) {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
        const couponComponent = this.$refs.couponModal
        this.$http.post(api, { data: tempCoupon }).then((res) => {
        //   console.log(res.data, tempCoupon)
          this.$httpMessageState(res, '新增優惠券')
          this.getCoupons()
          couponComponent.hideModal()
        })
      } else {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        const couponComponent = this.$refs.couponModal
        this.$http.put(api, { data: this.tempCoupon }).then((res) => {
        //   console.log(res.data)
          this.$httpMessageState(res, '更新優惠券')
          this.getCoupons()
          couponComponent.hideModal()
        })
      }
    },
    deleteCoupon () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      const deleteCouponComponent = this.$refs.deleteCouponModal
      this.$http.delete(api).then((res) => {
        // console.log(res.data)
        this.$httpMessageState(res, '刪除優惠券')
        deleteCouponComponent.hideModal()
        this.getCoupons()
      })
    }
  },
  created () {
    this.getCoupons()
  }
})
</script>
