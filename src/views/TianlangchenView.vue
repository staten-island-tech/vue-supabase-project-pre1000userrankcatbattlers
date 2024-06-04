<template>
    <RouterLink to="/home" class="x"
    ><v-icon name="bi-x-square-fill" scale="4"></v-icon
  ></RouterLink>
  <div class="leaderboard">
  <div class="user" v-for="user in rankings"> 
      <h2>{{ user.username }}</h2> 
      <h2>{{ user.deaths }}</h2>
    </div>
<h2>*Deaths update when a user signs out.</h2>

  </div>
</template>

<script setup lang="ts">
import {ref, type Ref, onMounted } from 'vue';
import {supabase} from "../../utils/supabase";
import { CoSkillshare } from 'oh-vue-icons/icons';

type ranking = {
  'id': string,
  'username': string,
  'deaths': number,
  'isdead': boolean,
}

const rankings: Ref<ranking[]> = ref([])
async function getrankingdata() {
  const response = await supabase.from("profiles").select()  .order('deaths', { ascending: false });
  console.log(response);
  rankings.value = response.data as ranking[];
  console.log(rankings.value)
}
let users: Ref<Array<string>> = ref([]);
let usersdeaths: Ref<Array<number>> = ref([])

onMounted(async () => {
  await getrankingdata();
});

</script>

<style scoped>

.x,
h1 {
  z-index: 999;
  position: absolute;
  right:0%;
  top:0%;
  color:rgb(85, 26, 139);
}


.ingredients {
  width: 30vw;
  height: 10vh;

  position: absolute;
  left: 0px;
  bottom: 0px;

  background-color: red;
  border-radius: 0% 10% 10% 0%;
}
</style>
