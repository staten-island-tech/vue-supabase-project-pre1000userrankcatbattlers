<script setup lang="ts">
import { supabase } from "../../utils/supabase";
import { ref, onMounted, type Ref } from "vue";
import circleitem from "../components/circleitem.vue";

type Ingredient = {
  name: string;
  image: string;
  type: string;
};

type recipeAnding = {
  name: string;
  ingredients: Array<string>;
};

type recipe = {
  "Dish Name": string;
  "ingredient 1": string;
  "ingredient 2"?: string;
  "ingredient 3"?: string;
  "ingredient 4"?: string;
  image?: string;
};

let recipeListName: Array<string> = [];
let recipeList: Array<string> = [];
const ingredients: Ref<Ingredient[]> = ref([]);
const recipes: Ref<recipe[]> = ref([]);

async function getingredients() {
  const response = await supabase.from("ingredients").select();
  console.log(response);
  ingredients.value = response.data as Ingredient[];
  console.log(ingredients.value);

  const response2 = await supabase.from("recipes").select();
  console.log(response2);
  recipes.value = response2.data as recipe[];
  console.log(recipes.value);
  recipeListName = recipes.value.map((dish) => dish["Dish Name"]);
  recipeList = recipes.value.map((dish: recipe) =>
    [
      dish["ingredient 1"],
      dish["ingredient 2"],
      dish["ingredient 3"],
      dish["ingredient 4"],
    ]
      .sort()
      .filter((ing) => ing)
      .join(";")
  );

  console.log(recipeListName);
  console.log(recipeList);
  console.log(Object.keys(recipeList).length);
}

onMounted(async () => {
  await getingredients();
});

const selectedIngredients: Ref<Ingredient[]> = ref([]);
let selectedoption = "Cow head";
let selectedoption2 = "Cow head";
let selectedoption3 = "Cow head";
let selectedoption4 = "Cow head";

function add(ingname: string) {
  console.log(ingname);
  if (selectedIngredients.value.length >= 4) return;
  let pushingredient = ingredients.value.filter(
    (ing: Ingredient) => ing.name == ingname
  );
  console.log(pushingredient);
  selectedIngredients.value.push(pushingredient[0]);
  console.log(selectedIngredients);
}

function remove(ing: Ingredient) {
  console.log("removed" + ing);
  selectedIngredients.value.splice(selectedIngredients.value.indexOf(ing), 1);
}

const allIngredients = recipes.value
  .flatMap((dish) => [
    dish["ingredient 1"],
    dish["ingredient 2"],
    dish["ingredient 3"],
    dish["ingredient 4"],
  ])
  .filter((ingredient) => ingredient !== null);
console.log(allIngredients); //THIS DOES NOT WORK PLEASE MAKE THIS OPERATE AFTER RECIPES EXISTS SO THAT THE ARRAY DOESn'T RETURN NOTHING!!!!! AND SO OUR 3 or was it 4 IF-else statements work.

let userdishname: string = "";
function check() {
  const cooking = selectedIngredients.value
    .map((ing) => ing.name)
    .sort()
    .join(";");
  console.log(selectedIngredients.value);
  console.log(cooking);
  const index = recipeList.indexOf(cooking);
  console.log(index);
  if (allIngredients.includes(cooking)) {
    alert("There is nothing there you fool.");
    console.log("index is null");
  } else {
    if (index === -1) {
      if (recipeListName.includes(userdishname)) {
        console.log(recipeListName);
        console.log(userdishname);
        console.log("this is NOT a new recipe name");
        alert("Name of recipe has been taken. Please be more original.");
        userdishname = "";
      } else {
        console.log("you have created a new dish! Check out the recipe book!");
        alert("New Dish!");
        /*  insertRecipe(); Use this after testing cause I don't want to do the table again*/
      }
    } else {
      console.log("this is NOT a new recipe");
      alert("you are cooking something that already exists");
      return;
    }
  }
}

async function insertRecipe() {
  //get the user input after the check function
  await supabase.from("recipes").insert({
    "Dish Name": "CHEESE",
    "ingredient 1": "cheese",
    "ingredient 2": "cheese",
    "ingredient 3": "cheese",
    "ingredient 4": "cheese",
    image: null,
    saturation: 50,
    thirst: 0,
  });
}

const scrollable: Ref<HTMLDivElement | null> = ref(null);
function scroll(e: WheelEvent) {
  if (!scrollable.value) return;
  e.preventDefault();
  scrollable.value.scrollLeft += e.deltaY;
}
</script>

<template>
  <div class="selectedIngredients">
    <div>
      <circleitem
        v-for="ing in selectedIngredients"
        :name="ing.name"
        :type="ing.type"
        :image="ing.image"
        @click="remove(ing)"
      />
    </div>
  </div>

  <label for="dishname">Name your dish!</label>
  <input
    v-model="userdishname"
    type="text"
    id="dishname"
    name="name"
    required
    minlength="4"
    maxlength="18"
    size="10"
  />

  <label for="ingredient1">Choose Ingredient 1</label>
  <select
    name="One"
    id="ingredient1"
    v-model="selectedoption"
    @change="add(selectedoption)"
  >
    <option v-for="ing in ingredients" :value="ing.name">
      {{ ing.name }}
    </option>
  </select>
  <label for="ingredient2">Choose Ingredient 2</label>
  <select
    name="Two"
    id="ingredient2"
    v-model="selectedoption2"
    @change="add(selectedoption2)"
  >
    <option v-for="ing in ingredients" :value="ing.name">
      {{ ing.name }}
    </option>
  </select>
  <label for="ingredient3">Choose Ingredient 3</label>
  <select
    name="Three"
    id="ingredient3"
    v-model="selectedoption3"
    @change="add(selectedoption3)"
  >
    <option v-for="ing in ingredients" :value="ing.name">
      {{ ing.name }}
    </option>
  </select>
  <label for="ingredient4">Choose Ingredient 4</label>
  <select
    name="Four"
    id="ingredient4"
    v-model="selectedoption4"
    @change="add(selectedoption4)"
  >
    <option v-for="ing in ingredients" :value="ing.name">
      {{ ing.name }}
    </option>
  </select>

  <label for="dishsaturation">How filling will your dish be? (0-100)</label>
  <input
    type="number"
    id="dishsaturation"
    name="name"
    required
    min="0"
    max="100"
    size="10"
  />

  <label for="dishydration"
    >What is the hydration level of this dish? (0-100)</label
  >
  <input
    type="number"
    id="dishydration"
    name="name"
    required
    min="0"
    max="100"
    size="10"
  />

  <button class="submit" @click="check">Create Recipe</button>
</template>

<style scoped>
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

.selectedIngredients {
  height: 220px;
  background-color: blueviolet;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
