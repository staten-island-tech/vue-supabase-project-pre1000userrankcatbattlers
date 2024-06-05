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
import { useUserStore } from "@/stores/localdeathcount";
const store = useUserStore();
import { storeToRefs } from "pinia";
const { localDeaths, aretheyintheleaderboardview, isLogginPage } = storeToRefs(store);
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
  ingredients.value = response.data as Ingredient[];
  ingredientsfiltered.value = response.data as Ingredient[];

  const response2 = await supabase.from("recipes").select();
  recipes.value = response2.data as recipe[];
}

onMounted(async () => {
  isLogginPage.value = false
  aretheyintheleaderboardview.value = false;
  await getingredients();
  getType();
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) return;
  const response = (await supabase.from("profiles").select("isdead").eq("id", data.session.user.id)).data;
  if (!response || response.length === 0) return;
  dead.value = response[0].isdead;
  if (dead.value) await die();
});


const selectedIngredients: Ref<Ingredient[]> = ref([]);

function add(ing: Ingredient) {
  if (selectedIngredients.value.length >= 4) return;
  selectedIngredients.value.push(ing);
}

function remove(ing: Ingredient) {
  selectedIngredients.value.splice(selectedIngredients.value.indexOf(ing), 1);
}

import { suntzuquotes } from "../ts/suntzu";

const dead = ref(false);
let tianlangchendyingressurection = ref("");
let suntzuinput = ref("");
let suntzuquote = ref("");

async function checkmymate_suntzu() {
  if (suntzuinput.value !== suntzuquote.value) return;
  dead.value = false;
  health.value = 100;
  suntzuinput.value = "";
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) return;
  await supabase.from("profiles").update({ isdead: dead.value }).eq("id", data.session.user.id);
  alert("You can continue cooking.");
}

async function die() {
  health.value = 0;
  dead.value = true;
  burn.value = burn.value*2;
  if(timeout.value) {
    clearTimeout(timeout.value);
    timeout.value = null;
  }
  confirm("You got cooked!");
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) return;
  await supabase.from("profiles").update({ isdead: dead.value }).eq("id", data.session.user.id);
  suntzuquote.value = suntzuquotes[Math.floor(Math.random() * suntzuquotes.length)];
  localDeaths.value++;
}

const timeout: Ref<NodeJS.Timeout | null> = ref(null);
async function DoofenshmirtzEvilIncorporated() {
  console.log("meow");
  const cooking = selectedIngredients.value
    .map((ing) => ing.name)
    .sort()
    .join(";");
  const cookingRecipes = recipes.value.map((ind: recipe) => {
    return [ind["ingredient 1"], ind["ingredient 2"], ind["ingredient 3"], ind["ingredient 4"]]
      .sort()
      .filter((ing) => ing)
      .join(";");
  }); // cheese;cheese;egg;egg;

  const index = cookingRecipes.indexOf(cooking);
  if (index === -1) {
    burn.value++;
    const burning = async () => {
      if (health.value < 1 && !dead.value) {
        die();
        return;
      } 

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
  if (health.value < 1) await die()
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
  actualalltypewithoutdupes.value = Array.from(new Set(alltype));
}

//button filtering
function filterbar(type: string) {
  if (type === "all") {
    ingredientsfiltered.value = ingredients.value;
    return;
  }
  ingredientsfiltered.value = ingredients.value.filter((ing) => ing.type == type);
}

// DESPITE ALL MY RAGE
const scrollable: Ref<HTMLDivElement | null> = ref(null);
function scroll(e: WheelEvent) {
  if (!scrollable.value) return;
  e.preventDefault();
  scrollable.value.scrollLeft += e.deltaY;
}

async function sendSupabaseDeath() {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) return;
  const existingdeaths = (await supabase.from("profiles").select("deaths").eq("id", data.session.user.id)).data;
  if (existingdeaths == null) return;
  let deathnote = existingdeaths[0].deaths + localDeaths.value;
  await supabase.from("profiles").update({ deaths: deathnote }).eq("id", data.session.user.id);
  localDeaths.value = 0;
}

async function signOut() {
  try {
    loading.value = true;
    await sendSupabaseDeath();
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

async function leaderboard() {
  await router.push("/lead");
}
</script>

<template>
  <main>
    <div class="dialogue" v-if="dead">

      <h2 v-if="suntzuquote" class="suntzuquote">{{ suntzuquote }}</h2>
      <label>
        type the Sun Tzu:
        <input v-model="suntzuinput" type="text" @input="checkmymate_suntzu" />
      </label>
    </div>
    <div v-if="!dead">
      <button @click="signOut">log Out</button>
      <button @click="createNewRecipe">Create New Recipes</button>
      <button @click="leaderboard">Death Leaderboard</button>
      <dialog ref="dialog" class="dialog">
        <div class="dialogue" v-if="cooking2">
          <img :src="cooking2.image" alt="" class="dishimage" />
          <h2>thou be cooking {{ cooking2["Dish Name"] }}</h2>
        </div>
        <p v-else>you are NOT cooking</p>
        <button alt="click escape to return" @click="explode">click to return</button>
      </dialog>
      <h2>
        ❤ {{ health < 1 ? 0 : health }}
        <span style="font-size: small">/100   </span>
        <span v-if="timeout"
          >YOU ARE BURNING!!! gasoline level: <span style="color: red; font-weight: bolder">{{ burn }}</span></span
        >
        <span v-if="burn > 0 && !timeout"
          >gasoline level: <span style="font-weight: bold">{{ burn }}</span></span
        >
      </h2>
      <RouterLink v-if="!timeout" id="book" to="/book"><v-icon name="vi-file-type-chef-cookbook" scale="4"></v-icon></RouterLink>
      <div class="activeingredients">
        <div v-for="index in 4" :key="index">
          <circleitem
            v-if="selectedIngredients[index - 1]"
            :name="selectedIngredients[index - 1].name"
            :type="selectedIngredients[index - 1].type"
            :image="selectedIngredients[index - 1].image"
            @click="remove(selectedIngredients[index - 1])"
          >
          </circleitem>
        </div>
      </div>
      <button class="start-btn" @click="DoofenshmirtzEvilIncorporated"><v-icon name="gi-small-fire" scale="4" /></button>
      <div class="ingredients">
        <div class="filtertabs">
          <button id="all" @click="filterbar('all')">all</button>
          <button v-for="atype in actualalltypewithoutdupes" :id="atype" :key="atype" @click="filterbar(atype)">
            {{ atype }}
          </button>
        </div>
        <div class="scrollable" ref="scrollable" @wheel="scroll">
          <circleitem v-for="ing in ingredientsfiltered" :name="ing.name" :type="ing.type" :image="ing.image" class="ingredient" @click="add(ing)" />
          <button @click="die" class="die" title="free rewards!!">
            <circleitem name="The Escape Plan" type="tool" image="https://i.imgflip.com/494yn4.jpg"></circleitem>
          </button>
        </div>
      </div>
    </div>
<div id="background-video"><video src="/seal/catty.mp4" autoplay loop muted></video></div> 
  </main>
</template>

<style scoped>

h2{
  color:white;
}

dialog h2{
  color: black;
}

.suntzuquote {
  user-select: none;
}

.dishimage {
  max-width: 450px;
  min-width: 450px;
  max-height: 450px;
  min-height: 450px;
}

#background-video {
  width: 110vw;
  height: 110vh;
  position: fixed;
  right: -35%;
  pointer-events: none;
  bottom: 0;
  z-index: -1;
  
}

.start-btn {
  text-align: center;
  display: flex;
  margin: 5px;
  font-weight: bold;
  padding: 10px 10px 10px 10px;
  background-color: rgb(255, 149, 88);
  text-shadow: -1px -1px black, 1px 1px white;
  color: red;
  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
  -o-border-radius: 7px;
  border-radius: 7px;
  border-color: rgb(255, 234, 142);
  box-shadow: 0 0.2em gray;
  cursor: pointer;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
}

.activeingredients {
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

.ingredient {
  cursor: pointer;
  border: 2px solid black;
  padding: 2px;
}

.filtertabs {
  z-index: 98;
  display:flex;
  flex-direction: column;
  width:min-content;
  position:absolute;
  left:2%;
  bottom:1%;
}
.filtertabs button {
  font-size: 25px;
}

#book {
  height: 150px;
  width: 150px;
  position: absolute;
  top: 0%;
  right: 0%;
  background-color: #5B527D;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 100rem;
  z-index: 9999;
}

.scrollable {
  position: absolute;
  bottom: 0%;
  left: 10%;
  width: 80vw;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  z-index: 99;
  gap: 40px;
  padding: 0 10px;
  background-color: #5B527D;
  box-shadow: inset  0px 0px 10px 0px;
}

.dialog {
  position: absolute;
  width: 40%;
  z-index: 9999;
}

.dialog button {
  width: 100%;
  text-align: center;
}

.dialogue {
  display: flex;
  flex-direction: column;
  align-items: center;
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
