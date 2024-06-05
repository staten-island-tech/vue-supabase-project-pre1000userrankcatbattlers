<script setup>
import router from "@/router";
import { onMounted, ref } from "vue";
import Auth from "../components/Auth.vue";
import { supabase } from "../../utils/supabase";
import { useUserStore } from "@/stores/localdeathcount";
const store = useUserStore();
import { storeToRefs } from "pinia";
const { aretheyintheleaderboardview } = storeToRefs(store);

async function changePage() {
  await router.push("/home");
}

onMounted(() => {
  aretheyintheleaderboardview.value = false;
});
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Auth />
  </div>
</template>

<style scoped>

</style>