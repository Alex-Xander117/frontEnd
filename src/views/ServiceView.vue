<template>
  <header>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    


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

          <li class="nav-item">
            <button @click="mostrarCarrito" class="nav-link position-relative btn btn-link">
              <i class="fas fa-shopping-cart"></i>
              <span v-if="carrito.length > 0" class="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {{ carrito.length }}
              </span>
            </button>
          </li>

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
            <!-- Cuadro de Opciones de Producto -->
            <div class="col-md-4">
              <div class="card custom-card">
                <div class="card-body">
                  <h5 class="card-title">Opciones de Producto</h5>
                  <button @click="agregarProducto" class="btn btn-primary mt-3 w-100 mb-3 btn-block">Agregar Producto</button>
                  <button @click="mostrarInformacion" class="btn btn-info mt-3 w-100 mb-3 btn-block">Mostrar Información</button>
                  <button @click="mostrarVentas" class="btn btn-success mt-3 w-100 mb-3 btn-block">Ventas</button>
                </div>
              </div>
            </div>

            <!-- Segundo cuadro para mostrar información, agregar producto o hacer venta -->
            <div class="col-md-8">
              <!-- Mostrar productos para venta -->
              <div v-if="modoVenta" class="card custom-card">
                <div class="card-body">
                  <h5 class="card-title">Venta de Productos</h5>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="producto in productos" :key="producto.id">
                        <td>{{ producto.id }}</td>
                        <td>{{ producto.nombre }}</td>
                        <td>{{ producto.precio }}</td>
                        <td>
                          <input v-model.number="producto.cantidadVenta" type="number" min="1" class="form-control" />
                        </td>
                        <td>
                          <button @click="agregarAlCarritoVenta(producto)" class="btn btn-primary">Añadir al Carrito</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button @click="finalizarVenta" class="btn btn-success w-100 mt-3">Finalizar Venta</button>
                </div>
              </div>

              <!-- Mostrar información de productos o agregar nuevo producto -->
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
                          <button @click="actualizarProducto(producto.id, producto)" class="btn btn-success btn-block">Actualizar</button>
                          <button @click="eliminarProducto(producto.id)" class="btn btn-danger btn-block">Eliminar</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Formulario para agregar nuevo producto -->
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

    <!-- Modal del Carrito -->
    <div class="modal fade" id="carritoModal" tabindex="-1" aria-labelledby="carritoModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="carritoModalLabel">Carrito de Compras</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in carrito" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.nombre }}</td>
                  <td>{{ item.cantidad }}</td>
                  <td>{{ item.precio }}</td>
                  <td>{{ item.cantidad * item.precio }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="finalizarVenta">Finalizar Venta</button>
          </div>
        </div>
      </div>
    </div>

  </header>
</template>

<script setup>

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import * as bootstrap from 'bootstrap'; // Importa las funcionalidades de JavaScript de Bootstrap

import { ref, onMounted } from 'vue'; 
import { useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';

const isNavbarOpen = ref(false);
const router = useRouter();
const nombre = ref('');
const productos = ref([]);
const mostrarInformacionFlag = ref(true);
const modoVenta = ref(false);
const carrito = ref([]);
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
  modoVenta.value = false;
};

const mostrarInformacion = () => {
  mostrarInformacionFlag.value = true;
  modoVenta.value = false;
};

const mostrarVentas = () => {
  modoVenta.value = true;
  mostrarInformacionFlag.value = false;
};

const guardarNuevoProducto = async () => {
  try {
    const response = await ApiService.agregarProducto(nuevoProducto.value);
    if (response) {
      productos.value.push(response);
      nuevoProducto.value = {
        nombre: '',
        descripcion: '',
        precio: '',
        cantidad_stock: ''
      };
    }
  } catch (error) {
    console.error(error);
  }
};

const mostrarCarrito = () => {
  const modal = new bootstrap.Modal(document.getElementById('carritoModal'));
  modal.show();
};

const actualizarProducto = async (id, producto) => {
  try {
    await ApiService.actualizarProducto(id, producto);
    alert('Producto actualizado');
  } catch (error) {
    console.error(error);
  }
};

const eliminarProducto = async (id) => {
  try {
    await ApiService.eliminarProducto(id);
    productos.value = productos.value.filter((producto) => producto.id !== id);
  } catch (error) {
    console.error(error);
  }
};

const agregarAlCarritoVenta = (producto) => {
  if (producto.cantidadVenta > 0) {
    const productoEnCarrito = carrito.value.find(item => item.id === producto.id);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad += producto.cantidadVenta;
    } else {
      carrito.value.push({ ...producto, cantidad: producto.cantidadVenta });
    }
  } else {
    alert('Debes ingresar una cantidad válida');
  }
};

const finalizarVenta = () => {
  if (carrito.value.length > 0) {
    alert('Venta finalizada');
    carrito.value = [];
  } else {
    alert('No hay productos en el carrito');
  }
};

</script>

<style scoped>
.main-content {
  margin-top: 5%;
}

.custom-card {
  border-radius: 15px;
}

.mask-custom {
  background: rgba(33, 37, 41, 0.75);
}

.btn-block {
  width: 100%;
}
</style>
