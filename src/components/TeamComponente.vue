<template>
    <div>
      <p><strong>Nombre:</strong> {{ info.nombre }}</p>
      <p><strong>Edad:</strong> {{ info.edad }}</p>
      <p><strong>Profesión:</strong> {{ info.profesion }}</p>
    </div>
  </template>
  
  <script>
  import personalData from '@/assets/Json/InfoPersonal.json';
  
  export default {
    data() {
      return {
        info: {} // Definimos un objeto vacío que se llenará con los datos
      };
    },
    mounted() {
      // Al montar el componente, asignamos los datos del JSON al objeto `info`
      this.info = personalData;
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  