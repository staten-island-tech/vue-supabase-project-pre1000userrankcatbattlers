<template>
  <div class="circle" :title="ing.name">
    <h2 class="name"> {{ ing.name }}</h2>
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
  margin: 35px 0;
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
  position: relative;
  text-align: center;
  color: black;
}

.name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #e0dfdc;
  background-color: #333;
  letter-spacing: .1em;
  
}

h2{
  font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;
  font-size: 10px;
  padding: 8px 5px;
  text-align: center;
  text-transform: uppercase;
  text-rendering: optimizeLegibility;
}

.type{
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
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

}
</style>
