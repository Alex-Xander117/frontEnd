<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Iniciar Sesión</button>
    </form>

    <p>¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ApiService from '../services/ApiService';

// Variables reactivas
const email = ref('');
const password = ref('');

// Router para redirigir
const router = useRouter();

// Función para manejar inicio de sesión
const handleLogin = async () => {
  try {
    const response = await ApiService.loginUser({ email: email.value, password: password.value });
    
    if (response.status === 200) {
      // Guardar el nombre de usuario en el localStorage o vuex si tienes configurado
      const userName = response.data.nombre;
      localStorage.setItem('userName', userName);
      
      // Redirigir al dashboard
      router.push('/dashboard');
    } else {
      console.error('Error al iniciar sesión');
    }
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

p {
  text-align: center;
}
</style>
