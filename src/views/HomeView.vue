<script setup lang="ts">
import { supabase } from "../../utils/supabase";
import { ref, onMounted, type Ref } from "vue";
type Ingredient = {
  name: string;
  image: string;
  type: string;
};

const ingredients: Ref<Ingredient[]> = ref([]);
async function getingredients() {
  const response = await supabase.from("ingredients").select();
  console.log(response);
  ingredients.value = response.data as Ingredient[];
}

onMounted(async () => {
  await getingredients();
});
</script>

<template>
  <main>
    <RouterLink id="book" to="/book">📖</RouterLink>
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
        <div class="circle" v-for="ing in ingredients">
          {{ ing.name }}
          {{ ing.type }}
          <img class="circle2" v-bind:src="ing.image" v-bind:alt="ing.name" />
        </div>
      </div>
    </div>
  </main>
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

.circle2 {
  margin: 35px;
  background-color: rgb(255, 207, 148);
  max-width: 100px;
  max-height: 100px;
  min-width: 100px;
  min-height: 100px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
