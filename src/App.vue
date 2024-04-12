<script setup>
import { supabase } from "../utils/supabase";
import { ref, onMounted } from "vue";
import slider from "./components/GroupSlider.vue";
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
  <slider />
  <!--   <ul>
    <li v-for="ingredient in ingredients" :key="ingredient.id">
      {{ ingredient.name }}
    </li>
  </ul> -->
</template>
