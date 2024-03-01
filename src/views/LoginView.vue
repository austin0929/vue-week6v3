<template>
           <div class="container">
            <div class="row justify-content-center loginContent">
                <h1 class="h3 mb-3 font-weight-normal">
                    請先登入
                </h1>
                <div class="col-8">
                    <form id="form" class="form-signin" @submit.prevent="signIn">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="username" placeholder="name@example.com"
                                v-model="user.username"
                                required autofocus>
                            <label for="username">Email address</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control" id="password" placeholder="Password"
                             v-model="user.password"
                             required>
                            <label for="password">Password</label>
                        </div>
                        <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
                            登入
                        </button>
                    </form>
                </div>
                            <p class="mt-5 mb-3 text-muted">
                &copy; 2021~∞ - 六角學院
            </p>
            </div>
        </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      const { VITE_APP_URL } = import.meta.env       
      const api = `${VITE_APP_URL}/admin/signin`
      this.$http.post(api, this.user).then((res) => {
         const { token, expired } = res.data
         document.cookie = `vuetoken=${token}; expires=${new Date(expired)};`;
         this.$router.push('/products')
      }).catch((error) => {
        alert('登入失敗')
      })
  } 
  }
}
</script>

<style>
.loginContent {
    height: 100%;
    text-align: center;
}

.loginContent {
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}
</style>