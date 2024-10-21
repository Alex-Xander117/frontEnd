<template>
  <div>
    <h1>{{ message }}</h1>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import ApiService from '../services/ApiService';

export default {
  data() {
    return {
      message: ''
    };
  },
  
  async mounted() {
    try {
      const response = await ApiService.getUsers();
      // Actualizamos el estado con la respuesta del backend
      this.message = JSON.stringify(response.data); // Ajusta según lo que necesites renderizar
    } catch (error) {
      console.error('Error al obtener la información:', error);
    }
  }
};
</script>
