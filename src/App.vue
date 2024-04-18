<script setup>
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
  <button id="book">📖</button>

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
      <div class="circle">
        <h2>once</h2>
        <h2>image</h2>
      </div>
      <div class="circle">
        <h2>twice</h2>
        <h2>image</h2>
      </div>
      <div class="circle">
        <h2>thrice</h2>
        <h2>image</h2>
      </div>
      <div class="circle">
        <h2>fourice</h2>
        <h2>image</h2>
      </div>
      <div class="circle">
        <h2>fivrice</h2>
        <h2>image</h2>
      </div>
      <div class="circle">
        <h2>sixrice</h2>
        <h2>image</h2>
      </div>
      <div class="circle">
        <h2>once</h2>
        <h2>image</h2>
      </div>
      <div class="circle">
        <h2>twice</h2>
        <h2>image</h2>
      </div>
      <div class="circle">
        <h2>thrice</h2>
        <h2>image</h2>
      </div>
      <div class="circle">
        <h2>fourice</h2>
        <h2>image</h2>
      </div>
      <div class="circle">
        <h2>fivrice</h2>
        <h2>image</h2>
      </div>
      <div class="circle">
        <h2>sixrice</h2>
        <h2>image</h2>
      </div>
    </div>
  </div>

  <!--   <ul>
    <li v-for="ingredient in ingredients" :key="ingredient.id">
      {{ ingredient.name }}
    </li>
  </ul> -->
</template>

<style scoped>
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

.circle {
  margin: 35px;
  background-color: rgb(255, 207, 148);
  max-width: 150px;
  max-height: 150px;
  min-width: 150px;
  min-height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
