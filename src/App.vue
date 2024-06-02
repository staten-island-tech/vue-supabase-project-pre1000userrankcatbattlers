<script setup lang="ts"></script>

<template>
  <nav>
    <RouterLink to="/home">User Page</RouterLink>
    <RouterLink to="/">Login Page</RouterLink>
  </nav>
  <RouterView> </RouterView>
  <h1>cooking <span style="text-decoration: line-through;">mama</span> <span style="font-weight: bolder; color:red;">YOU.</span></h1>
<!--   <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/login">Login Page</RouterLink>
  </nav> -->
  <RouterView/>
</template>

<style scoped>

</style>
