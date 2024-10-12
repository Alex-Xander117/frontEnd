<template>
  <div class="login-wrap">
    <div class="login-html">

      <h2 class="title">Inicio de sesión</h2>

      <form @submit.prevent="handleLogin">
        <div class="group">
          <label for="email" class="label">Email</label>
          <input type="email" id="email" class="input" v-model="email" required />
        </div>

        <div class="group">
          <label for="password" class="label">Password</label>
          <input type="password" id="password" class="input" v-model="password" required />
        </div>
        <div class="group">

          <button type="submit" class="button">Login</button>
        </div>
      </form>
      <div class="foot-lnk">

        <p>¿No tienes cuenta? <router-link to="/register">Regístrate ahora</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = () => {
  //lógica para conectar con el backend
  console.log('Email:', email.value, 'Password:', password.value);
};
</script>

<style scoped>
body {
  margin: 0;
  color: #6a6f8c;
  background: #c8c8c8;
  font: 600 16px/18px 'Open Sans', sans-serif;
}

*,
:after,
:before {
  box-sizing: border-box;
}

.login-wrap {
  width: 100%;
  margin: auto;
  max-width: 800px;
  min-height: 670px;
  position: relative;
  background: url(https://static.vecteezy.com/system/resources/previews/003/216/275/large_2x/inventory-control-illustration-concept-vector.jpg) no-repeat center;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.login-html {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 90px 70px 50px 70px;
  background: rgba(40, 57, 101, 0.9);
}

.title {
  text-align: center;
  color: white;
  margin-bottom: 20px;
}

.group {
  margin-bottom: 15px;
}

.group .label {
  color: #aaa;
  font-size: 12px;
}

.group .input {
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.group .button {
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 25px;
  background: #1161ee;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}

.group .button:hover {
  background-color: #0e4bcc;
}

.foot-lnk {
  text-align: center;
  margin-top: 20px;
}

.foot-lnk a {
  color: #fff;
  text-decoration: none;
}

.foot-lnk a:hover {
  text-decoration: underline;
}
</style>