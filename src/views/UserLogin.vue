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
      console.log(response); // Verifica si el campo "nombre" está presente

      router.push('/home');
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
  margin: auto;
  max-width: 700px;
  min-height: 670px;
  position: relative;
  background: url(https://static.vecteezy.com/system/resources/previews/003/216/275/large_2x/inventory-control-illustration-concept-vector.jpg) no-repeat center;
  background-size: 800px; /* Escala la imagen para cubrir completamente el contenedor */
  background-position: center center;
  background-attachment: fixed;
  box-shadow: 0 30px 40px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
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
  margin-bottom: 40px;
}

.group {
  margin-bottom: 30px;
}

.group .label {
  color: #aaa;
  font-size: 20px;
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

.foot-lnk p {
  color: #000000;
  text-decoration: none;
}

.foot-lnk a {
  color: #fff;
  text-decoration: none;
}

.foot-lnk a:hover {
  text-decoration: underline;
}
</style>
