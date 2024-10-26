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

    <!-- Section: Design Block -->
    <section>
      <!-- Intro -->
      <div id="intro" class="bg-image vh-100" style="background-image: url('https://www.ecommercenews.pe/wp-content/uploads/2022/02/Almacenes-para-logistica-y-centros-de-distribucion-crecen-en-Peru.jpg');">
        <div class="mask" style="background-color: rgba(250, 182, 162, 0.15);"></div>

        <!-- Section: Cards -->
        <div class="container position-absolute custom-position">
          <div class="row">
            <div class="col-md-6 mb-4">
              <div class="card h-100 shadow-0 border">
                <div class="card-body">
                  <h5 class="card-title">Sobre Nosotros</h5>
                  <p class="card-text">
                    Somos un equipo especializado en brindar seguimiento de inventario desde el momento de su fabricación hasta los almacenes, y desde estas hasta el punto de venta.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-4">
              <div class="card h-100 shadow-0 border">
                <div class="card-body">
                  <h5 class="card-title">Servicios</h5>
                  <p class="card-text">
                    Ofrecemos control de la cantidad del producto a la venta, las mercancías acabadas son liberadas para tramitar los pedidos, los productos son enviados a los clientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Section: Cards -->

      </div>
      <!-- Intro -->
    </section>
    <!-- Section: Design Block -->
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // Importa onMounted para cargar el nombre al montar
import { useRouter } from 'vue-router';

const isNavbarOpen = ref(false);
const router = useRouter();
const userName = ref(''); // Almacenar el nombre del usuario

// Función para cargar el nombre del usuario al montar el componente
onMounted(() => {
  userName.value = localStorage.getItem('username') || 'Invitado';
  console.log('Nombre de usuario cargado:', userName.value); // Para depurar
});


// Función para alternar la visibilidad del menú de navegación
const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
};

// Función para cerrar sesión
const handleLogout = () => {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    localStorage.removeItem('username'); // Eliminar el nombre del usuario
    localStorage.removeItem('authToken'); // También eliminar el token de autenticación
    router.push('/login'); // Redirigir al login
  }
};
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

/* Tarjetas */
.card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 0.75rem;
}

.card-body {
  padding: 2rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #65c7c2;
}

.card-text {
  font-size: 1.1rem; /* Aumentado para mejor visibilidad */
  color: #333;
}

/* Posicionamiento de las tarjetas */
.custom-position {
  top: 50%; /* Centrado vertical */
  left: 50%; /* Centrado horizontal */
  transform: translate(-50%, -50%); /* Centrando completamente */
}

section .container {
  margin-top: 0; /* Eliminamos el margen superior */
}

section.container {
  margin-bottom: 2rem;
}

/* Estilo para el dropdown de usuario */
img.rounded-circle {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.dropdown-menu {
  text-align: center;
}
</style>