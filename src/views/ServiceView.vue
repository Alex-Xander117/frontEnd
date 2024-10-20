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

            <li class="nav-item">
              <router-link to="/contact" class="nav-link">Contacto</router-link>
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

        <!-- Section: Card with Table -->
        <div class="container main-content">
          <div class="card custom-card">
            <div class="card-body">
              <h5 class="card-title">Productos</h5>

              <!-- Tabla para los productos -->
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="producto in productos" :key="producto.id">
                    <td>{{ producto.id }}</td>
                    <td><input v-model="producto.nombre" placeholder="Nombre del producto" /></td>
                    <td><input v-model="producto.categoria" placeholder="Categoría" /></td>
                    <td><input v-model="producto.precio" placeholder="Precio" /></td>
                    <td><input v-model="producto.descripcion" placeholder="Descripción" /></td>
                  </tr>
                </tbody>
              </table>

              <!-- Botones para agregar y eliminar productos -->
              <button @click="agregarProducto" class="btn btn-primary mt-3">+</button>
              <button @click="eliminarProducto" class="btn btn-danger mt-3">-</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Intro -->
    </section>
    <!-- Section: Design Block -->
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'; 
import { useRouter } from 'vue-router';

const isNavbarOpen = ref(false);
const router = useRouter();
const userName = ref(''); 

onMounted(() => {
  userName.value = localStorage.getItem('username') || 'Invitado';
});

const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
};

const handleLogout = () => {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    router.push('/login');
  }
};

const productos = ref([
  { id: 1, nombre: '', categoria: '', precio: '', descripcion: '' },
]);

const agregarProducto = () => {
  const newId = productos.value.length ? productos.value[productos.value.length - 1].id + 1 : 1; // Incrementa el ID basado en el último producto
  productos.value.push({
    id: newId,
    nombre: '',
    categoria: '',
    precio: '',
    descripcion: '',
  });
};

// Función para eliminar el último producto
const eliminarProducto = () => {
  if (productos.value.length > 0) {
    productos.value.pop(); // Elimina el último producto
  } else {
    alert('No hay productos para eliminar.');
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
  box-shadow: inset 0 0 100px 50px rgba(0, 0, 0, 0.7);
}

/* Main content container */
.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Card styling */
.custom-card {
  background-color: rgba(255, 255, 255, 0.925);
  width: 80%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
}

/* Table styling */
.table input {
  border: none;
  background: none;
  outline: none;
  width: 100%;
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
