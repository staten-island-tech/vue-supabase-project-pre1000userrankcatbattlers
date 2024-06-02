<script setup>
import { supabase } from "../../utils/supabase";
import { onMounted, ref, toRefs } from "vue";

const props = defineProps(["session"]);
const { session } = toRefs(props);

const loading = ref(true);
const username = ref("");
const website = ref("");
const avatar_url = ref("");
const food_img = ref("");

onMounted(() => {
  getProfile();
});

async function getProfile() {
  try {
    loading.value = true;
    const { user } = session.value;

    const { data, error, status } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url, food_img`)
      .eq("id", user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
      food_img.value = data.food_img;
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

// const indexnum = ref(0);
// function change() {
//   indexnum.value += 1;
//   console.log(indexnum.value);
//   setTimeout(change, 1000);
// }

const indexnum = ref(0);
function change() {
  indexnum.value += 1;
  if (indexnum.value > 3) {
    indexnum.value = 1;
  }
  console.log(indexnum.value);
}

setInterval(change, 1000);

async function updateProfile() {
  try {
    loading.value = true;
    const { user } = session.value;

    const updates = {
      id: user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      food_img: food_img.value,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="session.user.email" disabled />
    </div>
    <div>
      <label for="username">Name</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="url" v-model="website" />
    </div>
    <div>
      <label for="food_img">Food Image</label>
      <input id="food_img" type="url" v-model="food_img" />
    </div>
    <div>
      <img :src="food_img" :alt="username" />
    </div>
    <div>
      <img src="" alt="" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">
        Sign Out
      </button>
    </div>
  </form>
</template>
