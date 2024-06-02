<template>
  <div>
    <button>Cat</button>
  </div>
</template>

<script setup lang="ts">
import { supabase } from "../../utils/supabase";
import { ref, onMounted, type Ref } from "vue";
import circleitem from "../components/circleitem.vue";
import { router } from "@/router";
import { RouterLink } from "vue-router";
</script>

<style scoped></style>
