<template>
  <div id="app">
    <div class="container">
      <div class="mt-4">
        <!-- 購物車列表 -->
        <div class="text-end">
          <button class="btn btn-outline-danger" type="button" @click.prevent="delAllCart">
            清空購物車
          </button>
        </div>
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 150px">數量/單位</th>
              <th class="text-end">單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="carts">
              <tr v-for="cart in carts" :key="cart.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm">
                    <i class="fas fa-spinner fa-pulse"></i>
                    x
                  </button>
                </td>
                <td>
                  {{ cart.product.title }}
                  <!-- <div class="text-success">已套用優惠券</div> -->
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <input
                        min="1"
                        type="number"
                        class="form-control"
                        v-model.number="cart.qty"
                        @change="updateCartNum(cart, cart.qty)"
                      />
                      <span class="input-group-text" id="basic-addon2">{{
                        cart.product.unit
                      }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  <span>單價 : {{ cart.product.price }}</span>
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ totalPrice.total }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ totalPrice.final_total }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="my-5 row justify-content-center">
        <VForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="sendOrder">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <VField
              id="email"
              name="email"
              type="email"
              class="form-control"
              placeholder="請輸入 Email"
              rules="required|email"
              :class="{ 'is-invalid': errors['email'] }"
              v-model="form.user.email"
            ></VField>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <VField
              id="name"
              name="name"
              type="text"
              class="form-control"
              placeholder="請輸入姓名"
              rules="required"
              :class="{ 'is-invalid': errors['name'] }"
              v-model="form.user.name"
            ></VField>
            <ErrorMessage name="name" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <VField
              id="tel"
              name="tel"
              type="text"
              class="form-control"
              placeholder="請輸入電話"
              :rules="isPhone"
              :class="{ 'is-invalid': errors['tel'] }"
              v-model="form.user.tel"
            ></VField>
            <ErrorMessage name="tel" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <VField
              id="address"
              name="address"
              type="text"
              class="form-control"
              placeholder="請輸入地址"
              rules="required"
              :class="{ 'is-invalid': errors['address'] }"
              v-model="form.user.address"
            ></VField>
            <ErrorMessage name="address" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <VField
              id="message"
              class="form-control"
              name="message"
              cols="30"
              rows="10"
              as="textarea"
              v-model="form.message"
            ></VField>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-danger">送出訂單</button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: [],
      totalPrice: {},
      form: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCarts() {
      const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
      const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.carts = res.data.data.carts
        this.totalPrice = {
          final_total: res.data.data.final_total,
          total: res.data.data.total
        }
      })
    },
    delAllCart() {
      const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
      const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`
      this.$http
        .delete(api)
        .then((res) => {
          alert('購物車已清空')
          console.log(res)
          this.getCarts()
        })
        .catch((error) => {
          alert('購物車無資料')
        })
    },
    updateCartNum(cart, qty = 1) {
      const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
      const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${cart.id}`
      console.log(cart, qty)
      const cartNum = {
        product_id: cart.product_id,
        qty
      }
      this.$http.put(api, { data: cartNum }).then((res) => {
        console.log(res)
        this.getCarts()
      })
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    sendOrder() {
      const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
      const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/order`
      this.$http
        .post(api, { data: this.form })
        .then((res) => {
          if (res.data.success) {
            console.log(res)
            alert('訂單已送出')
            this.getCarts()
            this.$refs.form.resetForm()
          }
        })
        .catch((error) => {
          alert('購物車無資料')
        })
    }
  },
  mounted() {
    this.getCarts()
  }
}
</script>