<template>
  <div class="dashboard-container">
    <div class="header">
      <div class="username">
        Bienvenido, {{ username }}
      </div>
      <button @click="handleLogout">Cerrar sesión</button>
    </div>
    <h1 class="welcome-title">Bienvenido a nuestra herramienta de gestión</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Obtener el nombre del usuario desde localStorage
const username = ref(localStorage.getItem('username'));

// Usar el enrutador de Vue
const router = useRouter();

// Función para cerrar sesión
const handleLogout = () => {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    localStorage.removeItem('username'); // Eliminar el nombre del usuario
    router.push('/login'); // Redirigir al login
  }
};
</script>

<style scoped>
.dashboard-container {
  text-align: center;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.username {
  font-size: 18px;
  font-weight: bold;
}

.welcome-title {
  font-size: 32px;
  font-weight: bold;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #369b73;
}
</style>
