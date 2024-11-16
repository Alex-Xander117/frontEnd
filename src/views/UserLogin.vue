<template>
  <div class="grid-background">
    <!-- Fondo de cuadros dinámicos -->
    <div v-for="n in rows * columns" :key="n" class="grid-item" @mouseover="hoverSquare"></div>

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
const rows = 12;  // Número de filas de la cuadrícula
const columns = 12;  // Número de columnas de la cuadrícula

// Función para manejar el inicio de sesión
const handleLogin = async () => {
  try {
    const response = await ApiService.login({ email: email.value, password: password.value });
    if (response && response.data) {
      localStorage.setItem('email', email.value);
      localStorage.setItem('nombre', response.nombre);
      router.push('/home');
    } else {
      console.error('Error al iniciar sesión');
    }
    
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error.response ? error.response.data : error.message);
    alert(error.response ? error.response.data.error : 'Error durante el inicio de sesión');
  }
};



const hoverSquare = (event) => {
  event.target.style.backgroundColor = '#65c7c2'; // Cambia el color al pasar el cursor
  setTimeout(() => {
    event.target.style.backgroundColor = ''; // Restablece el color después de un tiempo
  }, 500); // El tiempo que permanece el color
};
</script>

<style scoped>
/* Fondo de cuadrícula */
.grid-background {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 100vw;
  height: 100vh;
  background-color: #111111;
  position: relative;
}

.grid-item {
  border: 1px solid rgba(255, 0, 0, 0.1);
  transition: background-color 0.2s ease;
  animation: gradientBorder 3s linear infinite; /* Animación de borde */
}

/* Definición de la animación para el gradiente */
@keyframes gradientBorder {
  0% {
    border-color: rgba(20, 20, 20, 1);
  }
  50% {
    border-color: rgb(255, 255, 255);
  }
  100% {
    border-color: rgba(20, 20, 20, 1);
  }
}

/* Formulario de inicio de sesión */
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