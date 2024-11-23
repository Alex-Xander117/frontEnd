<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <!-- Navbar -->
    <nav class="navbar navbar-expand-custom navbar-mainbg">
      <div class="container-fluid d-flex justify-content-between align-items-center w-100">
        <!-- Logo -->
        <router-link to="/home" class="navbar-brand navbar-logo">
          <span style="color: #ffde59;">Inventory</span><span style="color: #fff;">Logistics</span>
        </router-link>
        
        <!-- Navbar Items -->
        <div class="d-flex align-items-center w-100">
          <ul class="navbar-nav d-flex align-items-center me-auto">
            <li class="nav-item">
              <router-link to="/service" class="nav-link"><i class="fas fa-tachometer-alt"></i>Servicios</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/team" class="nav-link"><i class="far fa-address-book"></i>Equipo</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0);"><i class="far fa-chart-bar"></i>Charts</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0);"><i class="far fa-copy"></i>Documents</a>
            </li>
          </ul>
          
          <!-- Cart and Profile -->
          <ul class="navbar-icons d-flex align-items-center">
            <li class="nav-item">
              <button @click="mostrarCarrito" class="nav-link position-relative btn btn-link">
                <i class="fas fa-shopping-cart"></i>
                <span v-if="carrito.length > 0" class="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {{ carrito.length }}
                </span>
              </button>
            </li>
            
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" @click="toggleDropdown">
                <img src="https://via.placeholder.com/40" class="rounded-circle" alt="User Icon">
              </a>
              <ul class="dropdown-menu" :class="{ show: isDropdownOpen }" aria-labelledby="userDropdown">
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
        <div class="mask"></div>

        <!-- Contenedor Principal -->
        <div class="container main-content mt-5">
          <div class="row">
            <!-- Primer cuadro con botones -->
            <div class="col-md-4">
              <div class="card custom-card product-options-card">
                <div class="card-body">
                  <h5 class="card-title text-yellow">Opciones de Producto</h5>
                  <button @click="agregarProducto" class="btn btn-gray mt-3 w-100 mb-3 btn-block">Agregar Producto</button>
                  <button @click="mostrarInformacion" class="btn btn-gray mt-3 w-100 mb-3 btn-block">Mostrar Información</button>
                  <button @click="registrarVenta" class="btn btn-gray mt-3 w-100 mb-3 btn-block">Registrar venta</button>
                </div>
              </div>
            </div>

            <!-- Segundo cuadro para mostrar la información o formulario -->
            <div class="col-md-8">

              <!-- Formulario para registrar la venta -->
              <div v-if="registrarVentaFlag" class="card custom-card">
                <div class="card-body">
                  <h5 class="card-title text-yellow">Registrar Venta</h5>

                  <!-- Mostrar tabla de productos para agregar al carrito -->
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Categoría</th>
                          <th scope="col">Precio</th>
                          <th scope="col">Cantidad disponible</th>
                          <th scope="col">Cantidad vendida</th>
                          <th scope="col">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="producto in productos" :key="producto.id">
                          <td>{{ producto.id }}</td>
                          <td>{{ producto.nombre }}</td>
                          <td>{{ producto.descripcion }}</td>
                          <td>{{ producto.precio }}</td>
                          <td>{{ producto.cantidad_stock }}</td>
                          <td>
                            <input v-model="producto.cantidadVendida" type="number" min="1" max="producto.cantidad_stock" class="form-control" />
                          </td>
                          <td>
                            <button @click="agregarAlCarrito(producto)" class="btn btn-primary">Agregar al Carrito</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button type="button" class="btn btn-primary" @click="guardarVenta">Finalizar Compra</button>
                </div>
              </div>

              <!-- Vista para mostrar productos o formulario de agregar producto -->
              <div v-else-if="mostrarInformacionFlag" class="card custom-card">
                <div class="card-body">
                  <h5 class="card-title text-yellow">Productos</h5>
                  <table class="table table-dark table-striped">
                    <thead>
                      <tr class="text-yellow">
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
                  <h5 class="card-title text-yellow">Agregar Producto</h5>
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
              <button type="button" class="btn btn-primary" @click="finalizarVenta">Finalizar Compra</button>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script setup>

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap


import { ref, onMounted } from 'vue'; 
import { useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';


const isNavbarOpen = ref(false);
const router = useRouter();
const nombre = ref('');
const productos =  ref([]);
const carrito = ref([]);
const mostrarInformacionFlag = ref(true); // Bandera para saber si mostrar productos o formulario
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
  try{
    await obtenerProductos();
  }catch(error){
    console.error('Error al cargar producto', error);
  }
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
    // Verifica si la respuesta es un arreglo
    if (Array.isArray(response)) {
      productos.value = response;
    } else {
      productos.value = [];
      console.warn('La respuesta no es un arreglo:', response);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    productos.value = []; // En caso de error, asegúrate de que sea un arreglo vacío
  }
};

const registrarVenta = () => {
  registrarVentaFlag.value = true; // Muestra el formulario de registrar venta
  mostrarInformacionFlag.value = false; // Oculta la tabla de productos
};

const mostrarInformacion = () => {
  registrarVentaFlag.value = false; // Oculta el formulario de registrar venta
  mostrarInformacionFlag.value = true; // Muestra la tabla de productos
};

const agregarProducto = () => {
  registrarVentaFlag.value = false; // Oculta el formulario de registrar venta
  mostrarInformacionFlag.value = false; // Oculta la tabla de productos para mostrar el formulario de agregar
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


const agregarAlCarrito = (producto) => {
  // Lógica para agregar un producto al carrito
  carrito.value.push({
    id: producto.id,
    nombre: producto.nombre,
    cantidad: producto.cantidadVendida,
    precio: producto.precio
  });
};

const guardarVenta = async () => {
  try {
    // Llamar a la API para registrar la venta
    await ApiService.registrarVenta(venta.value);
    // Limpia el formulario
    venta.value = { productoId: '', cantidad: 1 };
  } catch (error) {
    console.error('Error al guardar la venta:', error);
  }
};

const mostrarCarrito = () => {
  const carritoModal = new window.bootstrap.Modal(document.getElementById('carritoModal'));
  carritoModal.show();

};


const actualizarProducto = async (id, producto) => {
  try {
    // Convertir valores al tipo correcto
    const productoActualizado = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: parseFloat(producto.precio), // Convertir precio a número de punto flotante
      cantidad_stock: parseInt(producto.cantidad_stock, 10), // Convertir cantidad_stock a entero
    };

    // Enviar solicitud al backend
    const response = await ApiService.actualizarProducto(id, productoActualizado);
    console.log("Producto actualizado:", response);

    // Actualizar localmente en la lista de productos
    const index = productos.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      productos.value[index] = response; // Usa la respuesta del backend para actualizar localmente
    }
  } catch (error) {
    console.error("Error al actualizar producto:", error.response?.data || error.message);
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





<style scoped>

.navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
  background-color: #000000;
  color: #ffffff;
  font-family: Arial, sans-serif;
}

/* Navbar Container to Group All Items */
.navbar-container {
  display: flex;
  align-items: center;
  gap: 20px; /* Space between brand and menu items */
  width: 100%;
}

/* Brand Styling */
.navbar-brand {
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap; /* Prevent text wrapping */
  color: #ffffff;
}

/* Navbar Links Styling */
.navbar-nav {
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px; /* Space between menu items */
}

.navbar-nav .nav-item .nav-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;
}

.navbar-nav .nav-item .nav-link i {
  margin-right: 5px;
}

.navbar-nav .nav-item .nav-link:hover {
  color: #000000;
  background-color: #ffde59;
  border-radius: 20px;
  padding: 5px 10px;
}

/* Navbar Icons Styling */
.navbar-icons {
  display: flex;
  align-items: center;
  gap: 15px; /* Space between icons */
  margin-left: auto; /* Push icons to the far right */
}

.navbar-icons .icon-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 20px;
  transition: all 0.3s ease-in-out;
}

.navbar-icons .icon-link:hover {
  color: #ffde59;
}

/* Adjust Navbar Alignment */
.navbar-container {
  justify-content: flex-start; /* Keep everything in one row */
}

.bg-image {
  background-size: cover;   /* La imagen cubre todo el contenedor */
  background-position: center center; /* Centra la imagen */
  height: 100vh;  /* Asegura que la imagen ocupe toda la altura de la ventana */
  width: 100%;    /* Asegura que ocupe todo el ancho de la pantalla */
  position: relative;  /* Para asegurar que el contenido se posicione sobre la imagen */
  margin-top: 0; /* Elimina cualquier margen superior */
  padding-top: 0; /* Elimina cualquier padding extra */
  display: flex; /* Usa flexbox para posicionar contenido de forma sencilla */
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: center; /* Centra el contenido verticalmente */
}

.card.custom-card {
  width: 100%; /* Ajusta al 100% del contenedor */
  max-width: 1000px; /* Limita el ancho de la tarjeta */
  margin: 20px; /* Añade espacio entre las tarjetas */
  background-color: rgba(0, 0, 0, 0.8); /* Fondo semi-transparente */
  color: #ffde59;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.product-options-card .btn {
  color: white !important; /* Asegura que el color del texto sea blanco */
}

.product-options-card .btn:hover {
  color: #ffde59 !important; /* Cambia el color del texto a rojo */
}

/* Input fields */
.form-control {
  background-color: hsl(0, 0%, 96%);
  border: 1px solid #ddd;
}

.btn-block {
  width: 100%;
}

/* Asegura que el contenido de la imagen esté alineado sobre la imagen */
#intro .mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(250, 182, 162, 0.15); /* Oscurecer el fondo ligeramente */
}

.mask-custom {
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, .15); /* Fondo difuso */
}
</style>