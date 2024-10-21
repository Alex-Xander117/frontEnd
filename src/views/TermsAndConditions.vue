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
  height: 100vh; /* Asegura que cubra toda la altura de la pantalla */
  position: relative;
  background: url(https://plus.unsplash.com/premium_photo-1661932036915-4fd90bec6e8a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) no-repeat center center fixed; /* Fija la imagen en el centro */
  background-size: cover; /* Ajusta para cubrir todo el contenedor */
  display: flex;
  justify-content: center;
  align-items: center; /* Centra vertical y horizontalmente */
  padding: 20px;
}

.terms-container {
  max-width: 800px; /* Ancho máximo para el cuadro de términos */
  width: 100%;
  padding: 30px;
  background: rgba(40, 57, 101, 0.9); /* Fondo semi-transparente similar al login */
  color: #ffffff; /* Color de texto blanco para mayor contraste */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* Sombra alrededor del cuadro */
}

h1 {
  text-align: center;
  color: #ffffff;
  margin-bottom: 20px; /* Espaciado inferior */
}

h2 {
  margin-top: 20px;
  color: #ffffff;
}

p {
  margin: 10px 0;
  color: #dddddd; /* Texto en un tono gris claro */
}

.router-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #00e5ff; /* Color del enlace similar al estilo de login */
}

.router-link:hover {
  text-decoration: underline; /* Subrayado al pasar el mouse */
}
</style>
