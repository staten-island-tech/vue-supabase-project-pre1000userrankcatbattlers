<template>
  <div class="circle">
    {{ ing.name }}
    {{ ing.type }}
    <img class="circle2" v-bind:src="ing.image" v-bind:alt="ing.name" />
  </div>
</template>

<script setup lang="ts">
const ing = defineProps({
  name: { type: String, required: true },
  type: String,
  image: String,
});
</script>

<style lang="scss" scoped></style>
