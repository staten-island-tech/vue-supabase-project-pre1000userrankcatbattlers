<template>
  <div class="form">
    <h1>Test Form</h1>
    <div class="Input">
      <label for="email">Email: </label>
      <input type="email" id="email" />
    </div>
    <div class="Input">
      <label for="email">Password: </label>
      <input type="password" id="password" />
    </div>

    <div class="buttons">
      <button>Register</button>
      <button>Login</button>
    </div>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
