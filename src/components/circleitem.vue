<template>
  <div class="circle">
    {{ ing.name }}
    {{ ing.type }}
    <img class="circle2" :src="ing.image" :alt="ing.name" />
  </div>
</template>

<script setup lang="ts">
const ing = defineProps({
  name: { type: String, required: true },
  type: String,
  image: String,
});
</script>

<style lang="css" scoped>
.circle {
  margin: 35px;
  background-color: rgb(255, 207, 148);
  max-width: 150px;
  max-height: 150px;
  min-width: 150px;
  min-height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.circle2 {
  margin: 35px;
  background-color: rgb(255, 207, 148);
  max-width: 100px;
  max-height: 100px;
  min-width: 100px;
  min-height: 100px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
