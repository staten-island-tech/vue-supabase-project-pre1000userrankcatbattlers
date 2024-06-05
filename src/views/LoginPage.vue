<script setup>
import router from "@/router";
import { onMounted, ref } from "vue";
import Auth from "../components/Auth.vue";
import { supabase } from "../../utils/supabase";
import { useUserStore } from "@/stores/localdeathcount";
const store = useUserStore();
import { storeToRefs } from "pinia";
const { aretheyintheleaderboardview, isLogginPage } = storeToRefs(store);

async function changePage() {
  await router.push("/home");
}

onMounted(() => {
  isLogginPage.value = true;
  aretheyintheleaderboardview.value = false;
});
</script>

<template>
  <div class="container">
    <Auth />
  </div>
</template>

<style scoped>
* {
  margin-left: 40px;
}
.container {
  position: absolute;
  top: 20vh;
  left: 50vw;
  background-color: #9086ae;
  box-shadow: inset 0px 0px 10px 0px;
  padding: 40px 40px 100px 40px;
  border-radius: 20px;
}
</style>
