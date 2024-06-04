<template>
  <RouterLink to="/home" class="x"><v-icon name="bi-x-square-fill" scale="4"></v-icon></RouterLink>

  <div>
    <ol class="leaderboard">
      <li v-for="(user, index) in rankings">
        <div class="user">
          {{ user.username }}
          <span class="percent">{{ user.deaths }} deaths ({{ userContribution[index] }})</span>
        </div>
      </li>
    </ol>
  </div>
  <h2>*Deaths update when a user signs out.</h2>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted } from "vue";
import { supabase } from "../../utils/supabase";
import { CoSkillshare } from "oh-vue-icons/icons";
import { useUserStore } from "@/stores/localdeathcount";
const store = useUserStore();
import { storeToRefs } from "pinia";
const { localDeaths, aretheyintheleaderboardview } = storeToRefs(store);

onMounted(async () => {
  aretheyintheleaderboardview.value = true;
  if (aretheyintheleaderboardview) {
    await sendSupabaseDeath();
  }
  await getrankingdata();
});

async function sendSupabaseDeath() {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) return;
  const existingdeaths = (await supabase.from("profiles").select("deaths").eq("id", data.session.user.id)).data;
  if (existingdeaths == null) return;
  let deathnote = existingdeaths[0].deaths + localDeaths.value;
  console.log(deathnote);
  await supabase.from("profiles").update({ deaths: deathnote }).eq("id", data.session.user.id);
  localDeaths.value = 0;
}

type ranking = {
  id: string;
  username: string;
  deaths: number;
  isdead: boolean;
};

const totalDeaths: Ref<number> = ref(0);
const rankings: Ref<ranking[]> = ref([]);
const userContribution: Ref<string[]> = ref([]);
async function getrankingdata() {
  const response = await supabase.from("profiles").select().order("deaths", { ascending: false });
  rankings.value = response.data as ranking[];
  console.log(response);
  const response2 = await supabase.from("profiles").select("deaths.sum()");
  if (response2.data == null) return;
  totalDeaths.value = response2.data[0].sum;
  console.log(totalDeaths.value);
  userContribution.value = rankings.value.map((user) => {
    console.log(user.deaths);
    return (100 * (user.deaths / totalDeaths.value)).toFixed(2).toString() + "%";
  });
  console.log(userContribution);
}
</script>

<style scoped>
.leaderboard {
  display: flex;
  flex-direction: column;
}

.user {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.x,
h1 {
  z-index: 999;
  position: absolute;
  right: 0%;
  top: 0%;
  color: rgb(85, 26, 139);
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
