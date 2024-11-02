// src/services/ApiService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000'; // Cambiar a la URL del backend

export default {
  async getUsers(){
    return axios.get(`${API_URL}/api/user/usuarios`);
  },

  async setUser(usuario) {
    try {
      const response = await axios.post(`${API_URL}/api/user/usuarios`, usuario);
      return response;  // Retorna la respuesta completa
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  },

  async login(credentials) {
    try{
      const response = await axios.post(`${API_URL}/api/user/loginUser`, credentials);
      return response.data;
    } catch(error){
      console.error('Error login', error.response || error.message)
    }
  },
  
   // Función para hacer solicitudes con autenticación
   async fetchData() {
    const token = localStorage.getItem('authToken'); // Obtener el token del localStorage
    try {
      const response = await axios.get(`${API_URL}/api/user/protected`, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Añadir el token en los encabezados
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos protegidos:', error);
      throw error;
    }
  },
    async obtenerProductos() {
      try {
        const response = await axios.get(`${API_URL}/api/producto/productos`);
        return response.data;  // Devuelve la lista de productos
      } catch (error) {
        console.error('Error al obtener productos', error.response || error.message);
      }
    },
    async agregarProducto(producto) {
      try {
        const response = await axios.post(`${API_URL}/api/producto/Guardaproducto`, producto);
        return response.data;  // Devuelve el producto recién agregado
      } catch (error) {
        console.error('Error al agregar producto', error.response || error.message);
      }
    },
    async eliminarProducto(id) {
      try {
        await axios.delete(`${API_URL}/api/producto/productos/${id}`);
        return true;  // Devuelve true si la eliminación fue exitosa
      } catch (error) {
        console.error('Error al eliminar producto', error.response || error.message);
      }
    },
    async actualizarProducto(id, producto) { // Cambié el orden para que el ID venga primero
      console.log("producto desde api", producto)
      console.log("id desdes el api", id)
      try {
        // Realiza una solicitud PUT al servidor para actualizar un producto
        const response = await axios.put(`${API_URL}/api/producto/productos/${id}`, producto);
        return response.data; // Retorna la respuesta del servidor si es exitosa
      } catch (error) {
        console.error('Error al actualizar el producto en ApiService:', error);
        throw error; // Lanza el error para que pueda ser manejado por el componente
      }
    }
  
};
