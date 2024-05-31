<template>
  <div class="page1">
    <img class="dishimage" :src="ing.image" :alt="ing.name" />
    <h2>{{ ing.name }}</h2>
  </div>
  <div v-for="ings in ing.ingredients">
    <img class="ingredientpic" :src="ings.image" :alt="ing.name" />
    <h2>{{ ings.name }}</h2>
  </div>
  <div class="page2"></div>
  <button>Plus</button>
  <button>Minus</button>
</template>

<script setup lang="ts">
import { supabase } from "../../utils/supabase";
import { ref, onMounted, type Ref } from "vue";

type Ingredient = {
  name: string;
  image: string;
  type: string;
};

type recipe = {
  "Dish Name": string;
  "ingredient 1": string;
  "ingredient 2"?: string;
  "ingredient 3"?: string;
  "ingredient 4"?: string;
  image?: string;
};

const ingredients: Ref<Ingredient[]> = ref([]);
const recipes: Ref<recipe[]> = ref([]);
async function getingredients() {
  const response = await supabase.from("ingredients").select();
  console.log(response);
  ingredients.value = response.data as Ingredient[];

  const response2 = await supabase.from("recipes").select();
  console.log(response2);
  recipes.value = response2.data as recipe[];
}

onMounted(async () => {
  await getingredients();
  await pageload();
});

let dish = "Dish";
let activelistofing = [];
async function pageload() {
  let recipenumber = 0;
  dish = recipes.value[recipenumber]["Dish Name"];
  console.log(dish);
  recipes.value[recipenumber];
}
</script>

<style scoped>
*,
body {
  background-color: black;
}
</style>
