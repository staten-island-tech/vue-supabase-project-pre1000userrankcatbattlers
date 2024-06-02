<template>
  <RouterLink to="/" class="x"><v-icon name="bi-x-square-fill" scale="4"></v-icon></RouterLink>

  <div class="bigger">
    <div class="big">
      <button class="btn minus" @click="change(-1)">
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

      <button class="btn plus" @click="change(1)">
        <v-icon name="md-arrowcircleright-round" scale="4" />
      </button>
    </div>
  </div>
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

const ingredients: {[key:string]:Ingredient} = {};
const recipes: Ref<recipe[]> = ref([]);
async function getingredients() {
  const response = await supabase.from("ingredients").select();
  console.log(response);
  response.data?.forEach(ingredient => {
    ingredients[ingredient.name] = ingredient as Ingredient;
  });
  console.log(ingredients)

  const response2 = await supabase.from("recipes").select();
  console.log(response2);
  recipes.value = response2.data as recipe[];
}

onMounted(async () => {
  await getingredients();
  await pageload();
});

let dish: recipe|undefined;
let dishname = "dish";
let activelistofing: Ref<Ingredient[]> = ref([]);
let recipenumber = 9;
async function pageload() {
  console.log(recipenumber)
  activelistofing.value = [];
  dish = recipes.value[recipenumber];
  dishname = recipes.value[recipenumber]["Dish Name"];
  console.log(dish);
  const allingredients = recipes.value.map((ind:recipe)=> {
    return [
      ind["ingredient 1"],
      ind["ingredient 2"],
      ind["ingredient 3"],
      ind["ingredient 4"],
    ]
  })
  console.log(allingredients[recipenumber]); //rice, egg, oil, salt
  console.log(ingredients['rice']) //object with name image and type of the ingredient

  for(let i = 0; i < allingredients[recipenumber].length; i++){
  let key = allingredients[recipenumber][i]
  if (!key) continue;
  console.log(key)
  activelistofing.value.push(ingredients[key])
  console.log(activelistofing.value)
  }
}

async function change(num:number){
  recipenumber += num;
  console.log(recipenumber)
  if (recipenumber > recipes.value.length-1) recipenumber = 0;
  if (recipenumber < 0) recipenumber = recipes.value.length-1;
  await pageload();
}

</script>

<style scoped>

body{
  background-color: pink;
}

.x,
h1 {
  z-index: 999;
  position: absolute;
  right:0%;
  top:0%;
  color:rgb(85, 26, 139);
}

.bigger {
  display:flex;
  align-items: center;
  justify-content: center;
}

.big {
  display:flex;
  flex-direction: row;
  align-items: center;
  /* that centers the buttons */
  margin-top: 0;
  position:absolute;
  top:0%;
  left:5%;
}

.ingredientpic{
  max-width: 100px;
  max-height: 100px;
}

.dishimage{
  max-width: 300px;
  max-height: 300px;
  min-width: 300px;
  min-height: 300px;
}

/* top | right | bottom | left */
.book{
  display:grid;
  grid-template-rows: 1;
  flex-grow: 1;
  margin: 10%;
  background-image: url("https://t3.ftcdn.net/jpg/02/04/69/00/360_F_204690037_aEFcF8RiqS95F8pJJp3q3Xk0fumRIAjj.jpg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  color: black;
  width:80vw;
  height:40vw;
  background-color: red;
}

.page {
  max-height:80%;
  top:10vh;
}

.page1 {
  /* background-color: rgba(255,0,0,0.5); */
  grid-column:1/1;
  position:relative;
  left:12vw;
  width:22vw;
}

.page2 {
  /* background-color: rgba(0,255,0,0.5); */
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap:2px;
  grid-column:2/2;
  position:relative;
  max-width:50%;
  left:5vw;
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
  color: rgb(85, 26, 139);
  transition: transform 10s ease-in;
  transform:scale(1);
}

.btn:hover {
  transform:scale(100);
}

.plus {
  transform-origin: right;
}

.minus {
  transform-origin: left;
}

</style>
