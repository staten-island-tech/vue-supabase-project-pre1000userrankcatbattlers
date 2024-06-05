<template>
  <RouterLink to="/home" class="x"><v-icon name="bi-x-square-fill" scale="4"></v-icon></RouterLink>
  <h2 class="Nvai">** Warning! Skill Based Navigation **</h2>
  <div class="bigger">
    <div class="big">
      <button class="btn minus" @click="attempt(-1)">
        <v-icon name="md-arrowcircleleft-round" scale="4" />
      </button>

      <div class="book">
        <div class="page page1">
          <img class="dishimage" v-if="dish" :src="dish.image" :alt="dishname" />
          <h2>{{ dishname }}</h2>
        </div>
        <div class="page page2">
          <div v-for="ings in activelistofing" class="ingredient">
            <img class="ingredientpic" :src="ings.image" :alt="ings.name" />
            <h2>{{ ings.name }}</h2>
          </div>
        </div>
      </div>
      
      <button class="btn plus" @click="attempt(1)">
        <v-icon name="md-arrowcircleright-round" scale="4" />
      </button>
    </div>
  </div>
  <qte v-if="isAttempt" @win="win" @lose="lose" class="qte" />
  <h2 class="Nvai2">page {{ recipenumber+1 }} out of {{recipes.length}} </h2>
</template>

<script setup lang="ts">
import { supabase } from "../../utils/supabase";
import { ref, onMounted, type Ref } from "vue";
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

const ingredients: { [key: string]: Ingredient } = {};
const recipes: Ref<recipe[]> = ref([]);
async function getingredients() {
  const response = await supabase.from("ingredients").select();
  response.data?.forEach((ingredient) => {
    ingredients[ingredient.name] = ingredient as Ingredient;
  });
  const response2 = await supabase.from("recipes").select();
  recipes.value = response2.data as recipe[];
}

onMounted(async () => {
  isLogginPage.value = false;
  aretheyintheleaderboardview.value = false;
  await getingredients();
  await pageload();
});

let dish: recipe | undefined;
let dishname = "dish";
let activelistofing: Ref<Ingredient[]> = ref([]);
const recipenumber = ref(9);
async function pageload() {
  activelistofing.value = [];
  dish = recipes.value[recipenumber.value];
  dishname = recipes.value[recipenumber.value]["Dish Name"];
  const allingredients = recipes.value.map((ind: recipe) => {
    return [ind["ingredient 1"], ind["ingredient 2"], ind["ingredient 3"], ind["ingredient 4"]];
  });

  for (let i = 0; i < allingredients[recipenumber.value].length; i++) {
    let key = allingredients[recipenumber.value][i];
    if (!key) continue;
    activelistofing.value.push(ingredients[key]);
  }
}

// @ts-ignore; ts stop being a hater‼
import qte from "../components/qte.vue";
const isAttempt = ref(false);
const nav = ref(0);
function attempt(num: number) {
  if (isAttempt.value) return;
  isAttempt.value = true;
  nav.value = num;
}

function win() {
  isAttempt.value = false;
  change(nav.value);
  nav.value = 0;
}

async function lose() {
  isAttempt.value = false;
  alert("YOU FAILED");
  recipenumber.value = Math.floor(Math.random() * recipes.value.length);
  await pageload();
}

async function change(num: number) {
  recipenumber.value += num;
  if (recipenumber.value > recipes.value.length - 1) recipenumber.value = 0;
  if (recipenumber.value < 0) recipenumber.value = recipes.value.length - 1;
  await pageload();
}
</script>

<style scoped>
.Nvai {
  color: white;
}

.Nvai2 {
  color: white;

}

body {
  background-color: pink;
}

.x,
h1 {
  z-index: 999;
  position: absolute;
  right: 0%;
  top: 5%;
  color: #baa7ff;
}

.bigger {
  display: flex;
  align-items: center;
  justify-content: center;
}

.big {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* that centers the buttons */
  margin-top: 0;
  position: absolute;
  top: -5%;
  left: 5%;
}

.ingredientpic {
  max-width: 100px;
  max-height: 100px;
}

.dishimage {
  max-width: 300px;
  max-height: 300px;
  min-width: 300px;
  min-height: 300px;
}

/* top | right | bottom | left */
.book {
  display: grid;
  grid-template-rows: 1;
  flex-grow: 1;
  margin: 10%;
  background-image: url("https://t3.ftcdn.net/jpg/02/04/69/00/360_F_204690037_aEFcF8RiqS95F8pJJp3q3Xk0fumRIAjj.jpg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  color: black;
  width: 80vw;
  height: 40vw;
  background-color: red;
}

.page {
  max-height: 80%;
  top: 10vh;
}

.page1 {
  /* background-color: rgba(255,0,0,0.5); */
  grid-column: 1/1;
  position: relative;
  left: 12vw;
  width: 22vw;
}

.page2 {
  /* background-color: rgba(0,255,0,0.5); */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2px;
  grid-column: 2/2;
  position: relative;
  max-width: 50%;
  left: 5vw;
}

.ingredient {
  /* background-color: rgba(0,0,255,0.5); */
  margin: 10px;
}

.btn {
  max-width: 70px;
  max-height: 70px;
  min-width: 70px;
  min-height: 70px;
  border: none;
  background-color: transparent;
  color: #baa7ff;
  transition: transform 10s ease-in;
  transform: scale(1);
}

.btn:hover {
  transform: scale(100);
}

.plus {
  transform-origin: right;
}

.minus {
  transform-origin: left;
}

.qte {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>
