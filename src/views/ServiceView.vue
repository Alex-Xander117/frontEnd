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
               
              <!-- Formulario para registrar la venta -->
              <div v-if="registrarVentaFlag" class="card custom-card">
                <div class="card-body">
                  <h5 class="card-title">Registrar Venta</h5>

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
  </header>
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
const userId = ref('');




onMounted(async () => {
  nombre.value = localStorage.getItem('nombre');
  userId.value = JSON.parse(localStorage.getItem('session') ?? "{}").id;
  console.log(userId)
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
    localStorage.removeItem('nombre');
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
  // Validar que la cantidad vendida sea válida
  if (producto.cantidadVendida <= 0 || !producto.cantidadVendida) {
    alert('Por favor ingrese una cantidad válida');
    return;
  }

  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.value.find(item => item.id === producto.id);
  
  if (productoExistente) {
    // Si el producto ya existe en el carrito, actualizar la cantidad
    productoExistente.cantidad += producto.cantidadVendida;
  } else {
    // Si el producto no está en el carrito, agregarlo
    carrito.value.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: producto.cantidadVendida
    });
  }

  // Limpiar la cantidad vendida después de agregar al carrito
  producto.cantidadVendida = 0;
};

const finalizarVenta = async () => {
  console.log("aqui esto", userId.value)
  try {
    // Aquí puedes hacer el envío del carrito al servidor para registrar la venta
    const response = await ApiService.registrarVenta(carrito.value, userId.value);

    console.log(response)
    carrito.value = []
  } catch (error) {
    console.error('Error al finalizar la venta:', error);
    alert('Hubo un error al procesar la venta');
  }
};



const guardarVenta = async () => {
  try {
    // Crear un objeto con los productos vendidos y sus cantidades
    const productosVendidos = carrito.value.map(item => ({
      idProducto: item.id,
      cantidadVendida: item.cantidad,
      total: item.cantidad * item.precio
    }));

    // Llamar a un servicio que guarde la venta
    const response = await ApiService.registrarVenta(productosVendidos);
    console.log("Producto guardado:", response);

    // Limpiar el carrito y las cantidades de los productos
    carrito.value = [];
    productos.value.forEach(producto => {
      producto.cantidadVendida = 0; // Limpiar la cantidad vendida de cada producto
    });

    // Mostrar un mensaje de éxito
    alert('Compra registrada con éxito');
    // Redirigir a otra página o cerrar el formulario
    mostrarInformacionFlag.value = true;
    registrarVentaFlag.value = false;
  } catch (error) {
    console.error('Error al guardar la venta:', error);
    alert('Ocurrió un error al registrar la venta');
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





</script>

<style scoped>
.main-content {
  margin-top: 5%;
}

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

.btn-block {
  width: 100%;
}
</style>



