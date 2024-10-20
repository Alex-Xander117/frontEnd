<!-- src/layouts/MainLayout.vue -->
<template>
  <div>
    <header>
      <nav>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
        <router-link to="/home">Home</router-link>
        <router-link to="/service">Service</router-link>
      </nav>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <p>Footer Content</p>
    </footer>
  </div>
</template>

<style scoped>
header {
  background-color: #f8f9fa;
  padding: 10px;
}
footer {
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
}
nav a {
  margin: 0 10px;
}
</style>
