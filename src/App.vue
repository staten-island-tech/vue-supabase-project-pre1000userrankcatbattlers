<script setup lang="ts">
import {RouterView} from 'vue-router'
import { userSessionStore } from './stores/userSession';
import {supabase} from '../utils/supabase'

const userSession = userSessionStore()

//listen for auth events (sign i n, signout, refresh)
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event)
  userSession.session = session
})
</script>

<template>
  <nav>
    <RouterLink to="/home">User Page</RouterLink>
    <RouterLink to="/">Login Page</RouterLink>
  </nav>
  <h1 class="banner">
    cooking <span style="text-decoration: line-through">mama</span>
    <span style="font-weight: bolder; color: red">YOU.</span>
  </h1>
  <RouterView> </RouterView>
</template>

<style scoped>
.banner {
  background-color: rgb(189, 189, 189);
  text-shadow:0 0 6px red;
}
.banner:hover {
  transform: matrix(1, 2, 3, 4, 5, 6);
}
</style>
