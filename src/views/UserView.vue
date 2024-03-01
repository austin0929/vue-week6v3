<template>
   <nav-bar></nav-bar>
   <div class="container">
    <router-view></router-view>
   </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
    components: {
        NavBar
    }
}
</script>