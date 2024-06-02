<script setup>
import { router } from "../router/index";
import { onMounted, ref } from "vue";
import Account from "../components/Account.vue";
import Auth from "../components/Auth.vue";
import { supabase } from "../../utils/supabase";
import { FunctionsError } from "@supabase/supabase-js";
const session = ref();

function changePage() {
  router.push("/home");
}
onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <changePage v-if="session" :session="session" />
    <Auth v-else />
  </div>
</template>
