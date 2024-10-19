<template>
  <header>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top mask-custom shadow-0">
      <div class="container">
        <router-link to="/home" class="navbar-brand">
          <span style="color: #5e9693;">Inventory</span><span style="color: #fff;">Logistics</span>
        </router-link>

        <button class="navbar-toggler" type="button" @click="toggleNavbar">
          <i class="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" :class="{ show: isNavbarOpen }" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/register" class="nav-link">Servicios</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/team" class="nav-link">Equipo</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/contact" class="nav-link">Contacto</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/contact" class="nav-link">Cuenta</router-link>
            </li>
          </ul>

          <ul class="navbar-nav d-flex flex-row">
            <li class="nav-item me-3 me-lg-0">
              <router-link to="/cart" class="nav-link">
                <i class="fas fa-shopping-cart"></i>
              </router-link>
            </li>

            <li class="nav-item me-3 me-lg-0">
              <a class="nav-link" href="https://twitter.com" target="_blank">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            
            <li class="nav-item me-3 me-lg-0">
              <a class="nav-link" href="https://instagram.com" target="_blank">
                <i class="fab fa-instagram"></i>
              </a>
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
import { ref } from 'vue';

const isNavbarOpen = ref(false);

// Función para alternar la visibilidad del menú de navegación
const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
};
</script>

<style scoped>
/* Color of the links BEFORE scroll */
.navbar-scroll .nav-link,
.navbar-scroll .navbar-toggler-icon,
.navbar-scroll .navbar-brand {
  color: #fff;
}

/* Color of the links AFTER scroll */
.navbar-scrolled .nav-link,
.navbar-scrolled .navbar-toggler-icon,
.navbar-scrolled .navbar-brand {
  color: #fff;
}

/* Color of the navbar AFTER scroll */
.navbar-scroll,
.navbar-scrolled {
  background-color: #cbbcb1;
}

.mask-custom {
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, .15);
}

.navbar-brand {
  font-size: 1.75rem;
  letter-spacing: 3px;
}

.bg-image {
  background-size: cover;
  background-position: center;
}

/* Tarjetas */
.card {
  background-color: rgba(255, 255, 255, 0.9); /* transparentencia */
  border-radius: 0.75rem;
}

.card-body {
  padding: 2rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #5e9693;
}

.card-text {
  font-size: 1rem;
  color: #333;
}

.custom-position {
  top: 60%;  /* Ajusta este valor para mover las tarjetas hacia abajo o hacia arriba */
  left: 7%; /* Ajusta este valor para mover las tarjetas hacia la izquierda o derecha */
  transform: none; /* Elimina la transformación de centrado si no quieres que estén centradas */
}

section .container {
  margin-top: 0; /* Eliminamos el margen superior */
}

section.container {
  margin-bottom: 2rem;
}
</style>