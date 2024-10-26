<template>
    <header>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top mask-custom shadow-0">
            <div class="container">
                <router-link to="/home" class="navbar-brand">
                    <span style="color: #65c7c2;">Inventory</span><span style="color: #fff;">Logistics</span>
                </router-link>

                <button class="navbar-toggler" type="button" @click="toggleNavbar">
                    <i class="fas fa-bars"></i>
                </button>

                <div class="collapse navbar-collapse" :class="{ show: isNavbarOpen }" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <router-link to="/service" class="nav-link">Servicios</router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/team" class="nav-link">Equipo</router-link>
                        </li>
                    </ul>

                    <ul class="navbar-nav d-flex flex-row">
                        <!-- Usuario dropdown -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://via.placeholder.com/40" class="rounded-circle" alt="User Icon">
                            </a>

                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                <li class="dropdown-item">
                                    <strong>{{ userName }}</strong> <!-- Muestra el nombre del usuario aquí -->
                                </li>

                                <li><router-link class="dropdown-item" to="/profile">Ver perfil</router-link></li>

                                <li><a class="dropdown-item" @click="handleLogout">Cerrar sesión</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Navbar -->

        <section>
            <div id="intro" class="bg-image vh-100" style="background-image: url('https://www.ecommercenews.pe/wp-content/uploads/2022/02/Almacenes-para-logistica-y-centros-de-distribucion-crecen-en-Peru.jpg');">
                <div class="mask" style="background-color: rgba(250, 182, 162, 0.15);"></div>
            </div>
        </section>

        <div id="cards-container" class="cards-container">
            <div v-for="(personal, index) in personalData" :key="index" class="card">
                <img :src="personal.imagen" :alt="'Imagen de ' + personal.nombre" class="card-image">
                <div class="content">
                    <div class="card-title">{{ personal.nombre }} {{ personal.apellidos }}</div>
                    <div class="card-details">
                        <p><strong>Edad:</strong> {{ personal.edad }}</p>
                        <p><strong>Profesión:</strong> {{ personal.profesion }}</p>
                        <p><strong>Universidad:</strong> {{ personal.universidad }}</p>
                        <p><strong>Email:</strong> {{ personal.email }}</p>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import personalDataJson from '@/assets/Equipo/Team.json';  // Ajustamos la ruta para cargar el archivo correctamente

const personalData = ref([]);

onMounted(() => {
    personalData.value = personalDataJson;
});
</script>

<style scoped>
.navbar .nav-link {
  color: #fff !important; 
  transition: color 0.3s ease; 
}

.navbar .nav-link:hover {
  color: #65c7c2 !important; 
}

.mask-custom {
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.062);
}

.navbar-brand {
  font-size: 1.75rem;
  letter-spacing: 3px;
}

.bg-image {
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
  height: 100vh; /* Asegura que ocupe toda la altura de la ventana */
  overflow: hidden; /* Evita el espacio blanco */
  box-shadow: inset 0 0 100px 50px rgba(0, 0, 0, 0.7);
}

#cards-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center; /* Centra las tarjetas horizontalmente */
    align-items: center; /* Centra las tarjetas verticalmente */
    gap: 20px; /* Espacio entre las tarjetas */
    flex-wrap: wrap; /* Permite que las tarjetas se envuelvan en múltiples líneas si es necesario */
    z-index: 2; /* Asegurarse de que esté sobre la imagen de fondo */
    width: 100%; /* Asegura que ocupe el ancho completo */
    padding: 20px;
}

.card {
    flex: 0 1 300px; /* Cada tarjeta ocupa un ancho fijo de 300px y puede reducirse si es necesario */
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 20px 30px rgba(20, 226, 209, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.card img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    display: block;
    border-radius: 8px 8px 0 0;
}

.content {
    padding: 10px;
}

.card-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
}

.card-details p {
    font-size: 14px;
    color: #333;
    margin: 5px 0;
}
</style>
