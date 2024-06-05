<script setup lang="ts">
import router from "@/router";
import { RouterView } from "vue-router";
</script>

<template>
  <h1 class="banner">
    Cooking <span style="text-decoration: line-through">mama</span>
    <span style="font-weight: bolder; color: red"> YOU.</span>
  </h1>
  <div class="routerview">
    <RouterView> </RouterView>
  </div>
</template>

<style scoped>
body, html, *{
  margin: 0;
  padding: 0;
}

.routerview{
  margin-top: 50px;
}

.banner {
  background-color: rgb(235, 235, 235);
  text-shadow: 0 0 6px red;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;

}
.banner:hover {
  transform: matrix(1, 2, 3, 4, 5, 6);
}
</style>