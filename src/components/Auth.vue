<script setup>
import { ref } from "vue";
import { supabase } from "../../utils/supabase";

const loading = ref(false);
const email = ref("");
const password = ref("");

async function handleSignup() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
}

async function handleLogin() {
  try {
    loading.value = true;
    console.log(email.value);
    console.log(password.value);
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;

    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="">
    <div class="col-6 form-widget">
      <p class="description">Sign in via magic link with your email below</p>
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
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          @click="handleLogin"
          :value="loading ? 'Loading' : 'Sign Up'"
          :disabled="loading"
        />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          @click="handleSignup"
          :value="loading ? 'Loading' : 'Sign in'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>
