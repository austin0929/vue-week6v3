<template>
  <div>
    <ul class="row" style="list-style: none">
      <li class="col-md-3 mb-4" v-for="product in products" :key="product.id">
        <div class="card h-100">
          <img :src="product.imageUrl" class="card-img-top" alt="..." height="180" />
          <div class="card-body d-flex flex-column">
            <div class="mb-3">
              <h5 class="card-title">{{ product.title }}</h5>
              <p class="card-text">{{ product.description }}</p>
            </div>
            <div class="d-flex justify-content-between mt-auto">
              <button type="button" class="btn btn-secondary" @click="productDetail(product.id)">
                查看細節
              </button>
              <button type="button" class="btn btn-primary" @click.prevent="addCart(product)">
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    }
  },
  methods: {
    getProducts() {
      const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
      const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/products`
      this.$http.get(api).then((res) => {
        this.products = res.data.products
      }).catch((error) => {
        console.log(error)
      })
    },
    productDetail(productId) {
      this.$router.push(`/productdetail/${productId}`)
    },
    addCart(product) {
      const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
      const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
      const addCart = {
        product_id: product.id,
        qty: 1
      }
      this.$http.post(api, { data: addCart }).then((res) => {
        if (res.data.success) {
          alert('加入購物車!')
        }
      }).catch((error) => {
        alert('加入購物車失敗')
      })
    }
  },
  mounted() {
    this.getProducts()
  }
}
</script>