<template>
  <div class="terms-wrap">
    <div class="terms-container">
      <h1>Términos y Condiciones</h1>
      <p>
        Al utilizar esta aplicación, aceptas los siguientes términos y condiciones:
      </p>
      <h2>1. Aceptación de Términos</h2>
      <p>
        Al acceder y utilizar esta aplicación, aceptas estar sujeto a estos términos. Si no estás de acuerdo con algún término, no puedes utilizar la aplicación.
      </p>
      <h2>2. Uso de la Aplicación</h2>
      <p>
        Te comprometes a usar la aplicación solo con fines legales y de manera que no infrinja los derechos de otros.
      </p>
      <h2>3. Modificaciones</h2>
      <p>
        Nos reservamos el derecho de modificar estos términos en cualquier momento. Cualquier cambio se publicará en esta página y tu uso continuado de la aplicación constituye tu aceptación de los nuevos términos.
      </p>
      <h2>4. Limitación de Responsabilidad</h2>
      <p>
        No seremos responsables por cualquier daño indirecto, incidental o consecuente que surja del uso de la aplicación.
      </p>
      <p>
        Al utilizar esta aplicación, confirmas que has leído, entendido y aceptas estos términos y condiciones.
      </p>
      <router-link to="/register">Regresar al registro</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
body {
  margin: 0;
  color: #6a6f8c;
  font: 600 16px/18px 'Open Sans', sans-serif;
}

.terms-wrap {
  width: 100%;
  height: 100vh; /* Asegurarse de que cubra toda la altura de la ventana */
  position: relative;
  overflow: hidden; /* Evitar que la imagen se desborde */
  background: url(https://jit.com.co/wp-content/uploads/2023/06/Personal-capacitado-en-accion-en-la-bodega-logistica-1.jpg) no-repeat center center fixed; /* Fijar la imagen en el centro */
  background-size: cover; /* Cambiar a cover para cubrir todo el contenedor */
}
 
.terms-container {
  max-width: 800px; /* Ampliar el ancho del cuadro */
  margin: 20px auto; /* Centrar el cuadro */
  padding: 20px;
  background: rgba(255, 255, 255, 0.8); /* Fondo blanco semi-transparente */
  color: #333; /* Color de texto oscuro para mayor legibilidad */
  border-radius: 10px;
  border: 1px solid #ccc; /* Borde opcional */
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.5); /* Difuminado blanco alrededor */
}

h1 {
  text-align: center;
}

h2 {
  margin-top: 20px;
}

p {
  margin: 10px 0;
}

.router-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #00aaff; /* Color del enlace */
}

.router-link:hover {
  text-decoration: underline; /* Subrayado al pasar el mouse */
}
</style>
