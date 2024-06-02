<script setup lang="ts">
import { supabase } from "../../utils/supabase";
import { ref, onMounted, type Ref } from "vue";
import circleitem from "../components/circleitem.vue";
import { router } from "@/router";
import { RouterLink } from "vue-router";
const health: Ref<number> = ref(100);
const burn = ref(0);
const loading = ref(true);
const dialog: Ref<HTMLDialogElement | null> = ref(null);
const cooking2: Ref<recipe | null> = ref(null);
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
//actual ingredient / cooking stuff
const ingredients: Ref<Ingredient[]> = ref([]);
const ingredientsfiltered: Ref<Ingredient[]> = ref([]);
const recipes: Ref<recipe[]> = ref([]);
async function getingredients() {
  const response = await supabase.from("ingredients").select();
  console.log(response);
  ingredients.value = response.data as Ingredient[];
  ingredientsfiltered.value = response.data as Ingredient[];

  const response2 = await supabase.from("recipes").select();
  console.log(response2);
  recipes.value = response2.data as recipe[];
  console.log(recipes);
}

onMounted(async () => {
  await getingredients();
  getType();
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

function die() {
  localStorage.clear();
  confirm("You got cooked!");
  console.log("OWWW");
  window.location.reload();
  return;
}

const timeout: Ref<NodeJS.Timeout | null> = ref(null);
async function DoofenshmirtzEvilIncorporated() {
  console.log("meow");
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
      .filter((ing) => ing)
      .join(";");
  });
  console.log(cookingRecipes);
  const index = cookingRecipes.indexOf(cooking);
  if (index === -1) {
    burn.value++;
    const burning = async () => {
      if (health.value < 1) die();

      health.value -= Math.ceil(Math.random() * burn.value);
      timeout.value = setTimeout(burning, 100);
    };
    if (!timeout.value) timeout.value = setTimeout(burning, 100);
    return;
  }
  if (timeout.value) {
    alert("you successfully put yourself out!");
    clearTimeout(timeout.value);
    timeout.value = null;
  }

  cooking2.value = recipes.value[index];
  if (!dialog.value) return;
  dialog.value.showModal();

  health.value -= Math.ceil(Math.random() * burn.value);
  if (burn.value > 0) burn.value--;
}

function explode() {
  if (!dialog.value) return;
  dialog.value.close();

  selectedIngredients.value = [];
}
const actualalltypewithoutdupes: Ref<string[]> = ref([]);
//Getting types for filtering purposes
function getType() {
  // don't cook without ingredients, worst mistake of my life
  if (ingredients.value.length === 0) return;
  const alltype = ingredients.value.map((ing: Ingredient) => {
    return ing.type;
  });
  console.log(alltype);
  actualalltypewithoutdupes.value = Array.from(new Set(alltype));
  console.log(actualalltypewithoutdupes);
}

//button filtering
function filterbar(type: string) {
  if (type === "all") {
    ingredientsfiltered.value = ingredients.value;
    return;
  }
  ingredientsfiltered.value = ingredients.value.filter(
    (ing) => ing.type == type
  );
}

// DESPITE ALL MY RAGE
const scrollable: Ref<HTMLDivElement | null> = ref(null);
function scroll(e: WheelEvent) {
  if (!scrollable.value) return;
  e.preventDefault();
  scrollable.value.scrollLeft += e.deltaY;
}

async function signOut() {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    // @ts-ignore
    alert(error.message);
  } finally {
    loading.value = false;
    await router.push("/");
  }
}

async function createNewRecipe() {
  await router.push("/new");
}
</script>

<template>
  <main>
    <button @click="signOut">log Out</button>
    <button @click="createNewRecipe">Create New Recipes</button>
    <dialog ref="dialog" class="dialog">
      <h2>thou be cooking {{ cooking2 ? cooking2["Dish Name"] : "slop" }}</h2>
      <button alt="click escape to return" @click="explode">
        click to return
      </button>
    </dialog>
    <h1>
      ❤ {{ health < 1 ? 0 : health }}
      <span style="font-size: small">/100</span>
      <span v-if="timeout"
        >YOU ARE BURNING!!! gasoline level:
        <span style="color: red; font-weight: bolder">{{ burn }}</span></span
      >
      <span v-if="burn > 0 && !timeout"
        >gasoline level: <span style="font-weight: bold">{{ burn }}</span></span
      >
    </h1>
    <RouterLink v-if="!timeout" id="book" to="/book"
      ><v-icon name="vi-file-type-chef-cookbook" scale="4"></v-icon
    ></RouterLink>
    <div class="activeingredients">
      <circleitem
        v-for="ing in selectedIngredients"
        :name="ing.name"
        :type="ing.type"
        :image="ing.image"
        @click="remove(ing)"
      >
        {{ ing.name }}
      </circleitem>
    </div>
    <button
      class="button-92"
      role="button"
      @click="DoofenshmirtzEvilIncorporated"
    >
      Kook
    </button>
    <div class="ingredients">
      <div class="filtertabs">
        <button id="all" @click="filterbar('all')">all</button>
        <button
          v-for="atype in actualalltypewithoutdupes"
          :id="atype"
          :key="atype"
          @click="filterbar(atype)"
        >
          {{ atype }}
        </button>
      </div>
      <div class="scrollable" ref="scrollable" @wheel="scroll">
        <circleitem
          v-for="ing in ingredientsfiltered"
          :name="ing.name"
          :type="ing.type"
          :image="ing.image"
          class="ingredient"
          @click="add(ing)"
        />
        <button @click="die" class="die" title="free rewards!!">
          <circleitem
            name="The Escape Plan"
            type="tool"
            image="https://i.imgflip.com/494yn4.jpg"
          ></circleitem>
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* CSS */
.button-92 {
  width: 100%;
  text-align: center;
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
  height: 220px;
  background-color: blueviolet;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.ingredient {
  cursor: pointer;
  border: 2px solid black;
  padding: 2px;
}

.filtertabs {
  position: absolute;
  bottom: 26%;
  left: 10%;
  z-index: 98;
}

#book {
  height: 150px;
  width: 150px;
  position: absolute;
  top: 0%;
  right: 0%;
  background-color: rgb(85, 26, 139);
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 100rem;
}

.scrollable {
  background-color: rgb(241, 241, 241);
  position: absolute;
  bottom: 0%;
  left: 10%;
  width: 80vw;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  z-index: 99;
  gap: 2px;
}

/* "centered" */
.dialog {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 40%;
}

.die {
  filter: opacity(0);
  transition: filter 1s linear;
  /* it's a square image whatever */
  cursor: pointer;
  width: 10px;
  height: 10px;
}

.die:hover {
  filter: opacity(1);
}
</style>
