<template>
    <div class="not-found">
      <h1>Error 404</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <router-link to="/">Volver a la página principal</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  };
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: #111;
    color: #fff;
  }
  
  .not-found h1 {
    font-size: 4rem;
    margin-bottom: 20px;
  }
  
  .not-found p {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  .not-found a {
    padding: 10px 20px;
    background-color: #ffde59;
    color: #111;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .not-found a:hover {
    background-color: #e5c146;
  }
  </style>
  