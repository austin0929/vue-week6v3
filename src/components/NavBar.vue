<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">Navbar</a> -->
      <router-link to="/" class="navbar-brand">首頁</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <!-- <a class="nav-link" aria-current="page" href="#">後台</a> -->
            <router-link to="/admin" class="nav-link">後台</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/carts" class="nav-link">購物車</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">登入</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" @click.prevent="logOut">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logOut() {
      const { VITE_APP_URL } = import.meta.env
      const api = `${VITE_APP_URL}/logout`
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          alert('已登出')
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>