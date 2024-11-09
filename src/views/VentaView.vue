<template>
  <header>
    <!-- Navbar existente (se reutiliza) -->
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
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://via.placeholder.com/40" class="rounded-circle" alt="User Icon">
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li class="dropdown-item">
                  <strong>{{ nombre }}</strong>
                </li>
                <li><router-link class="dropdown-item" to="/profile">Ver perfil</router-link></li>
                <li><a class="dropdown-item" @click="handleLogout">Cerrar sesión</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Sección de registro de venta -->
    <section>
      <div id="intro" class="bg-image" style="background-image: url('https://www.ecommercenews.pe/wp-content/uploads/2022/02/Almacenes-para-logistica-y-centros-de-distribucion-crecen-en-Peru.jpg');">
        <div class="mask" style="background-color: rgba(250, 182, 162, 0.15);"></div>
          <div class="container main-content mt-5">
          <div class="row justify-content-center">
            <!-- Cambia col-md-8 a col-md-10 o col-md-12 -->
            <div class="col-md-10">
              <div class="card custom-card">
                <div class="card-body">
                  <h5 class="card-title">Registrar Venta</h5>
                  <form @submit.prevent="guardarVenta">
                    <!-- Seleccionar producto -->
                    <div class="form-group mb-3">
                      <label for="producto">Producto</label>
                      <select v-model="venta.producto" class="form-control" required>
                        <option value="" disabled selected>Selecciona un producto</option>
                        <option v-for="producto in productos" :key="producto.id" :value="producto.id">
                          {{ producto.nombre }}
                        </option>
                      </select>
                    </div>
    
                    <!-- Cantidad -->
                    <div class="form-group mb-3">
                      <label for="cantidad">Cantidad</label>
                      <input type="number" v-model="venta.cantidad" min="1" class="form-control" required />
                    </div>
    
                    <!-- Precio (se llena automáticamente al seleccionar producto) -->
                    <div class="form-group mb-3">
                      <label for="precio">Precio Unitario</label>
                      <input type="text" v-model="venta.precio" class="form-control" readonly />
                    </div>
    
                    <!-- Total -->
                    <div class="form-group mb-3">
                      <label for="total">Total</label>
                      <input type="text" v-model="calcularTotal" class="form-control" readonly />
                    </div>
    
                    <!-- Botón para registrar la venta -->
                    <button type="submit" class="btn btn-primary w-100">Guardar Venta</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ApiService from '@/services/ApiService';

const isNavbarOpen = ref(false);
const nombre = ref('');
const productos = ref([]);
const venta = ref({
  producto: '',
  cantidad: 1,
  precio: 0
});

// Obtener productos disponibles
const obtenerProductos = async () => {
  try {
    const response = await ApiService.obtenerProductos();
    productos.value = response || [];
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
};

// Calcular el total en función de la cantidad y el precio unitario
const calcularTotal = computed(() => venta.value.cantidad * venta.value.precio);

// Guardar venta
const guardarVenta = async () => {
  try {
    const nuevaVenta = {
      producto_id: venta.value.producto,
      cantidad: venta.value.cantidad,
      total: calcularTotal.value
    };
    await ApiService.registrarVenta(nuevaVenta);
    alert('Venta registrada exitosamente');
    venta.value = { producto: '', cantidad: 1, precio: 0 }; // Limpiar el formulario
  } catch (error) {
    console.error('Error al registrar la venta:', error);
  }
};

// Control de la barra de navegación
const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
};

// Inicializar los datos
onMounted(async () => {
  nombre.value = localStorage.getItem('nombre');
  await obtenerProductos();
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

.bg-image {
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
  height: 100vh; /* Asegura que ocupe toda la altura de la ventana */
  overflow: hidden; /* Evita el espacio blanco */
  box-shadow: inset 0 0 100px 50px rgba(0, 0, 0, 0.7);
}

.main-content {
  display: flex;
  justify-content: center; /* Centrado horizontal */
  align-items: center; /* Centrado vertical */
  min-height: 100vh;
  height: 100%; /* Asegura que ocupe toda la altura disponible */
  padding-top: 40px;
}

.custom-card {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 90vw; /* Ocupa el 90% del ancho de la ventana */
  max-width: 500px; /* Limita a un máximo de 1000px */
}
</style>