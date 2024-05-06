<script setup lang="ts">
import { supabase } from "../utils/supabase";
import { ref, onMounted } from "vue";

const ingredients = ref([]);

async function getingredients() {
  const response = await supabase.from("ingredients").select();
  console.log(response);
  ingredients.value = response.data;
}

onMounted(() => {
  getingredients();
});
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/login">Login Page</RouterLink>
  </nav>
  <RouterView> </RouterView>

  <!--   <ul>
    <li v-for="ingredient in ingredients" :key="ingredient.id">
      {{ ingredient.name }}
    </li>
  </ul> -->
</template>

<style scoped></style>
