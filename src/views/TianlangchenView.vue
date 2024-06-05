<template>
  <RouterLink to="/home" class="x"><v-icon name="bi-x-square-fill" scale="4"></v-icon></RouterLink>
  <div class="page">
    <div class="board">
      <h2 class="boardhead">Death Ranking</h2>
      <ol class="leaderboard">
        <li class="user" v-for="(user, index) in rankings">
          <div class="userdata">
            {{ user.username }}
            <span class="percent">{{ user.deaths }} deaths ({{ userContribution[index] }})</span>
          </div>
        </li>
      </ol>
    </div>
  </div>
  <div class="totaldeath">Total deaths accumulated by all users: {{ totalDeaths }}</div>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted } from "vue";
import { supabase } from "../../utils/supabase";
import { CoSkillshare } from "oh-vue-icons/icons";
import { useUserStore } from "@/stores/localdeathcount";
const store = useUserStore();
import { storeToRefs } from "pinia";
const { localDeaths, aretheyintheleaderboardview, isLogginPage } = storeToRefs(store);

onMounted(async () => {
  isLogginPage.value = false;
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
  const response2 = await supabase.from("profiles").select("deaths.sum()");
  if (response2.data == null) return;
  totalDeaths.value = response2.data[0].sum;
  userContribution.value = rankings.value.map((user) => {
    return (100 * (user.deaths / totalDeaths.value)).toFixed(2).toString() + "%";
  });
}
</script>

<style scoped>
h2 {
  color: white;
}

.board {
  display: flex;
  flex-direction: column;
  width: 100%;
}

h2.boardhead {
  text-align: center;
  width: 100%;
  margin: 0 auto;
}

ol.leaderboard {
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: column;
  counter-reset: list-number;
  margin: 0 auto;
  width: 100%;
  font-size: 1px;
  box-shadow: 0px 15px 11px #7a7a7d;
  padding: 0;
}

li.user {
  display: flex;
  flex-direction: row;
  color: black;
  background-color: rgb(255, 255, 142);
  font-size: 1rem;
  counter-increment: list-number;
  display: inline-flex;
}
@media screen and (min-width: 600px) {
  ol.leaderboard {
    width: 80%;
  }

  li.user {
    font-size: 2rem;
  }
}

li.user .userdata {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  max-width: none;
}

li.user:nth-child(odd) {
  background-color: rgb(255, 137, 137);
}

li.user::before {
  color: black;
  content: counter(list-number, decimal) ") ";
  text-align: right;
  font-weight: bold;
  width: 2ch;
  margin-right: 1ch;
}

li.user:nth-child(1):before {
  color: rgb(255, 215, 0);
  content: "🥇";
}
li.user:nth-child(2):before {
  color: rgb(128, 128, 128);
  content: "🥈";
}
li.user:nth-child(3):before {
  color: rgb(161, 86, 0);
  content: "🥉";
}

.x {
  z-index: 999;
  position: absolute;
  right: 0%;
  top: 5%;
  color: #baa7ff;
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

.totaldeath {
  background-color: pink;
  margin-top: 50px;
  width: 25vw;
}
</style>
