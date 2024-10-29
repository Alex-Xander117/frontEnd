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

    <!-- Section: Design Block -->
    <section>
      <div id="intro" class="bg-image" style="background-image: url('https://www.ecommercenews.pe/wp-content/uploads/2022/02/Almacenes-para-logistica-y-centros-de-distribucion-crecen-en-Peru.jpg');">
        <div class="mask" style="background-color: rgba(250, 182, 162, 0.15);"></div>

        <!-- Contenedor Principal -->
        <div class="container main-content mt-5">
          <div class="row">
            <!-- Primer cuadro con botones -->
            <div class="col-md-4">
              <div class="card custom-card">
                <div class="card-body">
                  <h5 class="card-title">Opciones de Producto</h5>
                  <button @click="agregarProducto" class="btn btn-primary mt-3 w-100 mb-3 btn-block">Agregar Producto</button>
                  <button @click="mostrarInformacion" class="btn btn-info mt-3 w-100 mb-3 btn-block">Mostrar Información</button>
                </div>
              </div>
            </div>

            <!-- Segundo cuadro para mostrar la información o formulario -->
            <div class="col-md-8">
              <div v-if="mostrarInformacionFlag" class="card custom-card">
                <div class="card-body">
                  <h5 class="card-title">Productos</h5>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="productos.length === 0">
                        <td colspan="6">No hay productos disponibles</td>
                      </tr>
                      <tr v-for="producto in productos" :key="producto.id">
                        <td>{{ producto.id }}</td>
                        <td><input v-model="producto.nombre" placeholder="Nombre del producto" class="form-control" /></td>
                        <td><input v-model="producto.descripcion" placeholder="Descripción" class="form-control" /></td>
                        <td><input v-model="producto.precio" placeholder="Precio" class="form-control" /></td>
                        <td><input v-model="producto.cantidad_stock" placeholder="Stock" class="form-control" /></td>
                        <td>
                          <button @click="actualizarProducto(producto.id, producto)" class="btn btn-success btn-block">Actualizar</button>
                          <button @click="eliminarProducto(producto.id)" class="btn btn-danger btn-block">Eliminar</button>
                        </td>
                      </tr>
                    </tbody>

                  </table>
                </div>
              </div>
              <div v-else class="card custom-card">
                <div class="card-body">
                  <h5 class="card-title">Agregar Producto</h5>
                  <div class="form-group">
                    <input v-model="nuevoProducto.nombre" placeholder="Nombre del producto" class="form-control mb-3" />
                    <input v-model="nuevoProducto.descripcion" placeholder="Descripción" class="form-control mb-3" />
                    <input v-model="nuevoProducto.precio" placeholder="Precio" class="form-control mb-3" />
                    <input v-model="nuevoProducto.cantidad_stock" placeholder="Cantidad Stock" class="form-control mb-3" />
                  </div>
                  <button @click="guardarNuevoProducto" class="btn btn-success w-100">Guardar Producto</button>
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
import { ref, onMounted } from 'vue'; 
import { useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';

const isNavbarOpen = ref(false);
const router = useRouter();
const nombre = ref('');
const productos =  ref([]);
const mostrarInformacionFlag = ref(true); // Bandera para saber si mostrar productos o formulario
const nuevoProducto = ref({
  nombre: '',
  descripcion: '',
  precio: '',
  cantidad_stock: ''
});

onMounted(async () => {
  nombre.value = localStorage.getItem('nombre');
  await obtenerProductos();
});

const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
};

const handleLogout = () => {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    localStorage.removeItem('userName');
    localStorage.removeItem('authToken');
    router.push('/login');
  }
};

// Funciones CRUD

const obtenerProductos = async () => {
  try {
    const response = await ApiService.obtenerProductos();
    console.log(response); // Verifica la respuesta aquí
    productos.value = response || []; // Asegúrate de manejar el caso de undefined
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const agregarProducto = async () => {
  mostrarInformacionFlag.value = false; // Cambia a formulario de agregar producto
};

const mostrarInformacion = () => {
  mostrarInformacionFlag.value = true; // Muestra la tabla de productos
};

const guardarNuevoProducto = async () => {
  try {
    const response = await ApiService.agregarProducto(nuevoProducto.value);
    productos.value.push(response);
    nuevoProducto.value = { nombre: '', descripcion: '', precio: '', cantidad_stock: '' }; // Limpiar el formulario
    mostrarInformacionFlag.value = true; // Regresar a la vista de productos
  } catch (error) {
    console.error('Error al agregar producto:', error);
  }
};


const actualizarProducto = async (id, producto) => {
  console.log("Producto a actualizar:", producto); // Verifica el objeto completo
  console.log("ID del producto:", id); // Verifica que el ID es el correcto
  producto.precio = parseFloat(producto.precio)
  producto.cantidad_stock = parseFloat(producto.cantidad_stock)
  try {
    const response = await ApiService.actualizarProducto(id, producto);
    console.log(response)
  } catch (error) {
    console.error('Error al agregar producto:', error);
  }

};




const eliminarProducto = async (id) => {
  try {
    await ApiService.eliminarProducto(id);
    productos.value = productos.value.filter(p => p.id !== id);
  } catch (error) {
    console.error('Error al eliminar producto:', error);
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

/* Main content container */
.main-content {
  display: flex;
  justify-content: center; /* Centrado horizontal */
  align-items: center; /* Centrado vertical */
  min-height: 100vh;
  height: 100%; /* Asegura que ocupe toda la altura disponible */
  padding-top: 40px;
}

/* Card styling */
.custom-card {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%; /* Permite que el card ocupe el 100% del ancho disponible */
  max-width: 1000px; /* Define un ancho máximo para evitar que el cuadro sea demasiado grande */
}

/* Input fields */
.form-control {
  background-color: hsl(0, 0%, 96%);
  border: 1px solid #ddd;
  
}

.form-control:focus {
  border-color: #65c7c2;
}




</style>



