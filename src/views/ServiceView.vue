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
                  <button @click="registrarVenta" class="btn btn-info mt-3 w-100 mb-3 btn-block">Registrar venta</button>
                </div>
              </div>
            </div>

            <!-- Segundo cuadro para mostrar la información o formulario -->
            <div class="col-md-8">
              <!-- Formulario para registrar la venta -->
              <div v-if="registrarVentaFlag" class="card custom-card">
                <div class="card-body">
                  <h5 class="card-title">Registrar Venta</h5>
                  <div class="form-group">
                    <label for="productoSeleccionado">Seleccione un producto:</label>
                    <select v-model="venta.productoId" id="productoSeleccionado" class="form-control mb-3">
                      <option disabled value="">Seleccione un producto</option>
                      <option v-for="producto in productos" :key="producto.id" :value="producto.id">{{ producto.nombre }}</option>
                    </select>
                    
                    <label for="cantidadVendida">Cantidad vendida:</label>
                    <input v-model="venta.cantidad" type="number" min="1" id="cantidadVendida" placeholder="Cantidad vendida" class="form-control mb-3" />
                  </div>
                  <button @click="guardarVenta" class="btn btn-success w-100">Registrar Venta</button>
                </div>
              </div>

              <!-- Vista para mostrar productos o formulario de agregar producto -->
              <div v-else-if="mostrarInformacionFlag" class="card custom-card">
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
                          <button @click="actualizarProducto(producto.id, producto)" class="btn btn-success btn-action">Actualizar</button>
                          <button @click="eliminarProducto(producto.id)" class="btn btn-danger btn-action">Eliminar</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Formulario de agregar producto -->
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
const productos = ref([]);
const mostrarInformacionFlag = ref(true);
const registrarVentaFlag = ref(false);
const nuevoProducto = ref({
  nombre: '',
  descripcion: '',
  precio: '',
  cantidad_stock: ''
});
const venta = ref({
  productoId: '',
  cantidad: 1
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
    productos.value = response || [];
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const agregarProducto = () => {
  mostrarInformacionFlag.value = false;
  registrarVentaFlag.value = false;
};

const mostrarInformacion = () => {
  mostrarInformacionFlag.value = true;
  registrarVentaFlag.value = false;
};

const registrarVenta = () => {
  registrarVentaFlag.value = true;
  mostrarInformacionFlag.value = false;
};

const guardarVenta = async () => {
  if (venta.value.productoId && venta.value.cantidad > 0) {
    try {
      await ApiService.registrarVenta(venta.value);
      alert('Venta registrada con éxito');
      registrarVentaFlag.value = false;
      mostrarInformacionFlag.value = true;
      venta.value = { productoId: '', cantidad: 1 };
    } catch (error) {
      console.error('Error al registrar la venta:', error);
    }
  } else {
    alert('Seleccione un producto y una cantidad válida');
  }
};

const guardarNuevoProducto = async () => {
  if (nuevoProducto.value.nombre && nuevoProducto.value.precio) {
    try {
      await ApiService.guardarProducto(nuevoProducto.value);
      await obtenerProductos();
      alert('Producto guardado con éxito');
      nuevoProducto.value = { nombre: '', descripcion: '', precio: '', cantidad_stock: '' };
      mostrarInformacionFlag.value = true;
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  } else {
    alert('Nombre y precio son requeridos');
  }
};

const actualizarProducto = async (id, producto) => {
  try {
    await ApiService.actualizarProducto(id, producto);
    alert('Producto actualizado con éxito');
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
};

const eliminarProducto = async (id) => {
  if (confirm('¿Está seguro de eliminar este producto?')) {
    try {
      await ApiService.eliminarProducto(id);
      await obtenerProductos();
      alert('Producto eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
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

/* Botones de acción en las filas de productos */
.btn-action {
  width: 100px; /* Ajusta este valor según el tamaño deseado */
  margin: 0 5px; /* Opcional: Espacio entre botones */
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