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
import { useRouter } from 'vue-router';
import ApiService from '../services/ApiService';  // Importar el servicio ApiService

// Definir variables reactivas para el formulario
const email = ref('');
const password = ref('');
const router = useRouter();  // Usar el enrutador de Vue para redirigir

// Función para manejar el inicio de sesión
const handleLogin = async () => {
  try {
    // Llamar a loginUser con las credenciales
    const response = await ApiService.login({ email: email.value, password: password.value });
    
    if (response && response.token) {
      // Si la respuesta contiene el token, guardarlo
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userName', response.nombre);
      router.push('/home'); // Cambiar a /home
    } else {
      console.error('Error al iniciar sesión');
    }
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error.message);
    alert(error.message); // Muestra un mensaje al usuario
  }
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
  height: 100vh; 
  position: relative;
  background: url(https://elmercantil.com/wp-content/uploads/2020/09/ezgif.com-resize-19.gif) no-repeat center;
  background-size: cover; 
  background-position: center center;
  background-attachment: fixed;
  box-shadow: 0 30px 40px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.login-html {
  width: 100%;
  max-width: 400px; 
  height: auto; 
  margin: auto; 
  padding: 40px; 
  background: rgba(40, 57, 101, 0.95); 
  border-radius: 10px; 
  position: absolute; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.title {
  text-align: center;
  color: #ffffff;
  margin-bottom: 20px; 
}

.group {
  margin-bottom: 25px;
}

.group .label {
  color: #bbb;
  font-size: 18px;
}

.group .input {
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  outline: none;
  transition: 0.3s ease-in-out;
}

.group .input:focus {
  background: rgba(255, 255, 255, 0.25);
}

.group .button {
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 30px;
  background: #1161ee;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s ease;
}

.group .button:hover {
  background-color: #0d47a1;
}

.foot-lnk {
  text-align: center;
  margin-top: 20px;
}

.foot-lnk p {
  color: #ffffff;
}

.foot-lnk a {
  color: #00e5ff;
  text-decoration: none;
}

.foot-lnk a:hover {
  text-decoration: underline;
}
</style>