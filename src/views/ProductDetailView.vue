<template>
     <div class="row justify-content-center">
          <div class="col-sm-6">
            <img class="img-fluid" :src="product.imageUrl" alt="">
          </div>
          <div class="col-sm-6">
            <span class="badge bg-primary rounded-pill p-2 mb-3">{{product.category}}</span>
            <p>商品描述：{{ product.description }}</p>
            <p>商品內容：{{ product.content  }}</p>
            <div class="h5" v-if="!product.price">{{ product.origin_price  }} 元</div>
            <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
            <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
              <div class="input-group">
                <input type="number" class="form-control" v-model.number="prductQty" min="1">
                <button type="button" class="btn btn-primary" @click="addCartData(product)">加入購物車</button>
              </div>
          </div>
      </div>
</template>

<script>
export default {
    data () {
      return {
        product: {},
        prodcutId: '',
        prductQty: 1
      }
    },
    methods: {
      getProduct () {
        this.prodcutId = this.$route.params.id
           console.log(this.prodcutId);
        const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
        const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${this.prodcutId}`
          this.$http.get(api).then((res) => {
          this.product = res.data.product
      }).catch((error) => {
        console.log(error)
      })
    },
      addCartData (product) {
        const addCart = {
          product_id: product.id,
          qty: this.prductQty
        };
        const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
        const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
        console.log(api);
        this.$http.post(api, { data: addCart }).then((res) => {
          this.prductQty = 1
        }).catch((error) => {
        console.log(error)
      })
      }
    },
    mounted() {
       this.getProduct()
    },
}
</script>