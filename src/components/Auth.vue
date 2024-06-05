<script setup>
import { ref } from "vue";
import { supabase } from "../../utils/supabase";

const loading = ref(false);
const email = ref("");
const password = ref("");
const username = ref("");

import router from "@/router";

async function handleLogin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    alert(`Wrong password! Your password, ${password.value} is for the account with email evil${email.value}!`);
    return;
  }
  await router.push("/home");
}

async function handleSignup() {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    await supabase.from("profiles").update({ username: username.value }).eq("id", data.user.id);

    if (error) throw error;
    await router.push("/home");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
}

let loginpage = ref(true);

function movetosignup() {
  loginpage.value = false;
}

function movetologin() {
  loginpage.value = true;
}
</script>

<template>
  <div class="container1">
    <form class="row flex-center flex" @submit.prevent="">
      <div class="col-6 form-widget">
        <div>
          <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
        </div>
        <div>
          <input class="inputField" required type="username" placeholder="Username" v-model="username" v-if="!loginpage" />
        </div>
        <div>
          <input class="inputField" required type="password" placeholder="Password" v-model="password" />
        </div>
        <div>
          <input
            type="submit"
            class="button block log"
            @click="
              handleSignup;
              movetologin;
            "
            :value="loading ? 'Loading' : 'Sign Up'"
            :disabled="loading"
            v-if="!loginpage"
          />
        </div>
        <div>
          <input type="submit" class="button block" @click="handleLogin" :value="loading ? 'Loading' : 'Login'" :disabled="loading" v-if="loginpage" />
        </div>
      </div>
    </form>
    <hr />
  </div>
  <div class="container2">
    <div>
      <input
        type="submit"
        class="button block log"
        @click="movetologin"
        :value="loading ? 'Loading' : 'Already have an account? Login'"
        :disabled="loading"
        v-if="!loginpage"
      />
    </div>
    <div>
      <input
        type="submit"
        class="button block"
        @click="movetosignup"
        :value="loading ? 'Loading' : 'Create new account'"
        :disabled="loading"
        v-if="loginpage"
      />
    </div>
  </div>
</template>

<style scoped>
* {
  font-size: 20px;
  margin-top: 9px;
  text-align: center;
}

.button {
  margin: 0 auto;
  display: block;
}

hr {
  margin-top: 45px;
}

.log {
  margin-top: 20px;
}
</style>
