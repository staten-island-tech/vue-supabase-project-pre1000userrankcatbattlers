<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
<!--   <nav>
    <RouterLink to="/home">User Page</RouterLink>
    <RouterLink to="/">Login Page</RouterLink>
  </nav> -->
  <h1 class="banner">
    cooking <span style="text-decoration: line-through">mama</span>
    <span style="font-weight: bolder; color: red">YOU.</span>
  </h1>
  <RouterView> </RouterView>
</template>

<style scoped>
body, html, *{
  margin: 0;
  padding: 0;
}

.banner {
  background-color: rgb(189, 189, 189);
  text-shadow: 0 0 6px red;
}
.banner:hover {
  transform: matrix(1, 2, 3, 4, 5, 6);
}
</style>
./stores/deathcount