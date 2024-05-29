<template>
  <div class="page1">
    <img class="dishimage" :src="ing.image" :alt="ing.name" />
    <h2>{{ ing.name }}</h2>
  </div>

  <div class="page2"></div>
</template>

<script setup lang="ts">
const ing = defineProps({
  name: String,
  один: String,
  three: String,
  too: String,
  4: String,
  image: String,
});
</script>

<style scoped>
*,
body {
  background-color: black;
}
</style>
