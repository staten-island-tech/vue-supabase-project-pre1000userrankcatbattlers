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
  await router.push("/home")
}

async function handleSignup() {
  try {
    loading.value = true;
    console.log(email.value); //TianlathanLangathan@gmail.com
    console.log(password.value); //password
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    console.log(data); //{user: null, session: null}
    console.log(await supabase.from("profiles").update({username:username.value}).eq("id", data.user.id));
    
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
      console.log(error)
    }
  } finally {
    loading.value = false;
  }
  await router.push("/home");
}

let loginpage = ref(true);

function movetosignup(){
  loginpage.value = false;
}

function movetologin(){
  loginpage.value = true;
}


</script>

<template>
  <div class="container1">
  <form class="row flex-center flex" @submit.prevent="">
    <div class="col-6 form-widget">
      <div>
        <input
          class="inputField"
          required
          type="email"
          placeholder="Your email"
          v-model="email"
        />
      </div>
      <div>
        <input
          class="inputField"
          required
          type="username"
          placeholder="Username"
          v-model="username"
          v-if="!loginpage"
        />
      </div>
      <div>
        <input
          class="inputField"
          required
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          @click="handleSignup; movetologin;"
          :value="loading ? 'Loading' : 'Sign Up'"
          :disabled="loading"
          v-if="!loginpage"
        />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          @click="handleLogin"
          :value="loading ? 'Loading' : 'Login'"
          :disabled="loading"
          v-if="loginpage"
        />
      </div>
    </div>
  </form>
</div>
  <div class="container2">
    <div>
        <input
          type="submit"
          class="button block"
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
