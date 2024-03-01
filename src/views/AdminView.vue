<template>
  <nav-bar></nav-bar>
  <div class="container">
    <router-view></router-view>
    adminPage
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  components: {
    NavBar
  },
  mounted() {
    const { VITE_APP_URL } = import.meta.env
    const api = `${VITE_APP_URL}/api/user/check`
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)vuetoken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = myCookie
    this.$http.post(api).then((res) => {
      console.log(res)
    }).catch((error) => {
         this.$router.push('/login')
    })
  }
}
</script>