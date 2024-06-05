<script setup lang="ts">
import router from "@/router";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/localdeathcount";
const store = useUserStore();
import { storeToRefs } from "pinia";
const { isLogginPage } = storeToRefs(store);
</script>

<template>
  <div class="boxes" v-if="isLogginPage">
    <div class="bigbox1">
      <h1>Cooking</h1>
      <h1>
        <span style="text-decoration: line-through">mama</span>
        <span style="font-weight: bolder; color: red"> YOU.</span>
      </h1>
    </div>
    <div class="evilrouterview">
      <RouterView> </RouterView>
    </div>
  </div>

  <div class="bigbox2" v-if="!isLogginPage">
    <h1 class="banner">
      Cooking <span style="text-decoration: line-through">mama</span>
      <span style="font-weight: bolder; color: red"> YOU.</span>
    </h1>
  </div>
  <div class="routerview" v-if="!isLogginPage">
    <RouterView> </RouterView>
  </div>
</template>

<style scoped>
body,
html,
* {
  margin: 0;
  padding: 0;
}

.boxes {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.box {
  flex-grow: 1;
}

.evilrouterview {
  transform: rotate(10deg);
}

.routerview {
  margin-top: 50px;
  
}

.bigbox2 {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
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
.bigbox1 {
  display: flex;
  flex-direction: column;
  font-size: 50px;
  width: 50vw;
  height: 100vh;
  background-color: rgb(235, 235, 235);
  justify-content: center;
  align-items: center;
  text-shadow: 0 0 6px red;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
}

.banner:hover {
  transform: matrix(1, 2, 3, 4, 5, 6);
}
</style>
