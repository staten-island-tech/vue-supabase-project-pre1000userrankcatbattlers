<script setup lang="ts">
import { supabase } from "../../utils/supabase";
import { ref, onMounted, type Ref } from "vue";
import circleitem from "../components/circleitem.vue";
const health: Ref<number | null> = ref(100);
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
});

const selectedIngredients: Ref<Ingredient[]> = ref([]);

function add(ing: Ingredient) {
  console.log(ing);
  if (selectedIngredients.value.length >= 4) return;
  selectedIngredients.value.push(ing);
  console.log(selectedIngredients);
}

function remove(ing: Ingredient) {
  console.log(ing);
  selectedIngredients.value.splice(selectedIngredients.value.indexOf(ing), 1);
}

async function DoofenshmirtzEvilIncorporated() {
  const cooking = selectedIngredients.value
    .map((ing) => ing.name)
    .sort()
    .join(";");
  console.log(cooking);
  const cookingRecipes = recipes.value.map((ind: recipe) => {
    return [
      ind["ingredient 1"],
      ind["ingredient 2"],
      ind["ingredient 3"],
      ind["ingredient 4"],
    ]
      .sort()
      .join(";");
  });
  console.log(cookingRecipes);
  const index = cookingRecipes.indexOf(cooking);
  if (index === -1) {
    alert("DESPITE ALL MY RAGE");
    const die = async () => {
      if (health.value === null) {
        localStorage.clear();
        confirm("You died!");
        window.location.reload();
        return;
      }
      health.value -= Math.ceil(Math.random() * 10);
      if (health.value < 1) {
        health.value = null;
        confirm("You are burning!");
        return;
      }
      setTimeout(die, 100);
    };
    setTimeout(die, 100);
    return;
  }
  alert(`you are cooking ${recipes.value[index]["Dish Name"]}`);
}
</script>

<template>
  <main>
    <h1>
      ❤ {{ health === null ? 0 : health
      }}<span style="font-size: small">/100</span>
    </h1>
    <RouterLink id="book" to="/book">📖</RouterLink>
    <circleitem
      v-for="ing in selectedIngredients"
      :name="ing.name"
      :type="ing.type"
      :image="ing.image"
      @click="remove(ing)"
    >
      {{ ing.name }}
    </circleitem>
    <button
      class="button-92"
      role="button"
      @click="DoofenshmirtzEvilIncorporated"
    >
      Kook
    </button>
    <div class="ingredients">
      <div class="filtertabs">
        <button id="meat">Meat</button>
        <button id="vegetable">Vegetable</button>
        <button id="fruit">Fruit</button>
        <button id="grain">Grain</button>
        <button id="condiment">Condiment</button>
        <button id="dairy">Water</button>
      </div>
      <div class="scrollable">
        <circleitem
          v-for="ing in ingredients"
          :name="ing.name"
          :type="ing.type"
          :image="ing.image"
          @click="add(ing)"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
/* CSS */
.button-92 {
  --c: #fff;
  /* text color */
  background: linear-gradient(90deg, #0000 33%, #fff5, #0000 67%)
      var(--_p, 100%) / 300% no-repeat,
    #001aff;
  /* background color */
  color: #0000;
  border: none;
  transform: perspective(500px) rotateY(calc(20deg * var(--_i, -1)));
  text-shadow: calc(var(--_i, -1) * 0.08em) -0.01em 0 var(--c),
    calc(var(--_i, -1) * -0.08em) 0.01em 2px #0004;
  outline-offset: 0.1em;
  transition: 0.3s;
  position: absolute;
  z-index: 100;
}

.button-92:hover,
.button-92:focus-visible {
  --_p: 0%;
  --_i: 1;
}

.button-92:active {
  text-shadow: none;
  color: var(--c);
  box-shadow: inset 0 0 9e9Q #0005;
  transition: 0s;
}

.button-92 {
  font-weight: bold;
  font-size: 2rem;
  margin: 0;
  cursor: pointer;
  padding: 0.1em 0.3em;
}

.activeingredients {
  background-color: blueviolet;
}
.filtertabs {
  position: absolute;
  bottom: 24.9%;
  left: 10%;
  z-index: 98;
}

#book {
  font-size: 50px;
  height: 150px;
  width: 150px;
  position: absolute;
  top: 0%;
  right: 0%;
  background-color: bisque;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scrollable {
  background-color: rgb(241, 241, 241);
  position: absolute;
  bottom: 0%;
  left: 10%;
  max-width: 80vw;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  z-index: 99;
}
</style>
