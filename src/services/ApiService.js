// src/services/ApiService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000'; // Cambiar a la URL del backend

export default {
  async getUsers(){
    return axios.get(`${API_URL}/usuarios`);
  },

  async setUser(usuario) {
    try {
      const response = await axios.post(`${API_URL}/usuarios`, usuario);
      return response;  // Retorna la respuesta completa
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  },

  async login(credentials) {
    try{
      const response = await axios.post(`${API_URL}/loginUser`, credentials);
      return response.data;
    } catch(error){
      console.error('Error login', error.response || error.message)
    }
  },
  
   // Función para hacer solicitudes con autenticación
   async fetchData() {
    const token = localStorage.getItem('authToken'); // Obtener el token del localStorage
    try {
      const response = await axios.get(`${API_URL}/protected`, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Añadir el token en los encabezados
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos protegidos:', error);
      throw error;
    }
  }
};
