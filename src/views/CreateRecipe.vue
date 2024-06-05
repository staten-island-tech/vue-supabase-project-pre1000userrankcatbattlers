<script setup lang="ts">
import { supabase } from "../../utils/supabase";
import { ref, onMounted, type Ref } from "vue";
import circleitem from "../components/circleitem.vue";
import { useUserStore } from "@/stores/localdeathcount";
const store = useUserStore();
import { storeToRefs } from "pinia";
const { aretheyintheleaderboardview, isLogginPage } = storeToRefs(store);


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

let recipeListName: Array<string> = [];
let recipeList: Array<string> = [];
const ingredients: Ref<Ingredient[]> = ref([]);
const recipes: Ref<recipe[]> = ref([]);

async function getingredients() {
  const response = await supabase.from("ingredients").select();
  ingredients.value = response.data as Ingredient[];

  const response2 = await supabase.from("recipes").select();
  recipes.value = response2.data as recipe[];
  recipeListName = recipes.value.map((dish) => dish["Dish Name"]);
  recipeList = recipes.value.map((dish: recipe) =>
    [dish["ingredient 1"], dish["ingredient 2"], dish["ingredient 3"], dish["ingredient 4"]]
      .sort()
      .filter((ing) => ing)
      .join(";")
  );
}

onMounted(async () => {
  isLogginPage.value = false
  aretheyintheleaderboardview.value = false;
  await getingredients();
});

const selectedIngredients: Ref<Ingredient[]> = ref([]);
let selectedoption1 = "";
let selectedoption2 = "";
let selectedoption3 = "";
let selectedoption4 = "";

function add(ingname: string) {
  if (selectedIngredients.value.length >= 4) return;
  let pushingredient = ingredients.value.filter((ing: Ingredient) => ing.name == ingname);
  selectedIngredients.value.push(pushingredient[0]);
}

const allIngredients = recipes.value
  .flatMap((dish) => [dish["ingredient 1"], dish["ingredient 2"], dish["ingredient 3"], dish["ingredient 4"]])
  .filter((ingredient) => ingredient !== null);

let userdishname: string = "";
let userdishimage: string = "";
function check() {
  const cooking = selectedIngredients.value
    .map((ing) => ing.name)
    .sort()
    .join(";");
  const index = recipeList.indexOf(cooking);
  if (allIngredients.includes(cooking)) {
    alert("There is nothing there you fool.");
  } else {
    if (index === -1) {
      if (recipeListName.includes(userdishname)) {
        alert("Name of recipe has been taken. Please be more original.");
        userdishname = "";
      } else {
        alert("you have created a new dish! Check out the recipe book!");
        insertRecipe();
      }
    } else {
      alert("you are cooking something that already exists");
      return;
    }
  }
}

async function insertRecipe() {
  //get the user input after the check function
  await supabase.from("recipes").insert({
    "Dish Name": userdishname,
    "ingredient 1": selectedoption1 ? selectedoption1 : null,
    "ingredient 2": selectedoption2 ? selectedoption2 : null,
    "ingredient 3": selectedoption3 ? selectedoption3 : null,
    "ingredient 4": selectedoption4 ? selectedoption4 : null,
    image: userdishimage,
  });
}
</script>

<template>
  <RouterLink to="/home" class="x"><v-icon name="bi-x-square-fill" scale="4"></v-icon></RouterLink>

  <div class="selectedIngredients">
    <circleitem v-for="ing in selectedIngredients" :name="ing.name" :type="ing.type" :image="ing.image"/>
  </div>
<div class="forming">
  <label for="dishname">Name your dish!</label>
  <input v-model="userdishname" type="text" id="dishname" name="name" required minlength="4" maxlength="18" size="10" />

  <label for="dishimage">Input Dish Image Address</label>
  <input v-model="userdishimage" type="text" id="dishimage" name="name" required size="10" />

  <label for="ingredient1">Choose Ingredient 1</label>
  <select name="One" id="ingredient1" v-model="selectedoption1" :disabled="selectedoption1 ? true : false" @change="add(selectedoption1)">
    <option v-for="ing in ingredients" :value="ing.name">
      {{ ing.name }}
    </option>
  </select>
  <label for="ingredient2">Choose Ingredient 2</label>
  <select name="Two" id="ingredient2" v-model="selectedoption2" :disabled="selectedoption2 ? true : false" @change="add(selectedoption2)">
    <option v-for="ing in ingredients" :value="ing.name">
      {{ ing.name }}
    </option>
  </select>
  <label for="ingredient3">Choose Ingredient 3</label>
  <select name="Three" id="ingredient3" v-model="selectedoption3" :disabled="selectedoption3 ? true : false" @change="add(selectedoption3)">
    <option v-for="ing in ingredients" :value="ing.name">
      {{ ing.name }}
    </option>
  </select>
  <label for="ingredient4">Choose Ingredient 4</label>
  <select name="Four" id="ingredient4" v-model="selectedoption4" :disabled="selectedoption4 ? true : false" @change="add(selectedoption4)">
    <option v-for="ing in ingredients" :value="ing.name">
      {{ ing.name }}
    </option>
  </select>

  <button class="submit" @click="check">Create Recipe</button>
</div>
</template>

<style scoped>
label{
  color:white;
}

.forming{
  display: flex;
  flex-direction: column;
  width: 25vw;
  margin: auto;
  padding-top: 10px
}

.submit{
  margin:10px;
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

.selectedIngredients {
  z-index: 3;
  height: 220px;
  display: flex;
  flex-direction: row;
  gap: 46px;
  background-image: url("/frame.png");
  width: 880px;
  padding-left: 145px;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: auto;
  margin-right: auto;
}

.x,
h1 {
  z-index: 999;
  position: absolute;
  right: 0%;
  top: 5%;
  color: #BAA7FF;
}
</style>
