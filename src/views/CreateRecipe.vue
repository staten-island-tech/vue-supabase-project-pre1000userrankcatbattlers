<template>
  <div>
    <button>Cat</button>
  </div>
</template>

<script setup>
import { supabase } from "../../utils/supabase";
import { ref, onMounted, type Ref } from "vue";
import circleitem from "../components/circleitem.vue";
import { router } from "@/router";
import { RouterLink } from "vue-router";

async function getingredients() {
  const response = await supabase.from("ingredients").select();
  console.log(response);
}
</script>

<style scoped></style>
