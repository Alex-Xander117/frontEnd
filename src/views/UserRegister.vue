<template>
  <div class="register-wrap">
    <div class="register-html">

      <h2 class="title">Registro</h2>

      <form @submit.prevent="handleRegister">
        <div class="group">
          <label for="nombre" class="label">Nombre</label>
          <input type="text" id="nombre" class="input" v-model="nombre" required />
        </div>

        <div class="group">
          <label for="correo" class="label">Email</label>
          <input type="email" id="correo" class="input" v-model="correo" required />
        </div>

        <div class="group">
          <label for="cedula" class="label">Cédula</label>
          <input type="text" id="cedula" class="input" v-model="cedula" required />
        </div>

        <div class="group">
          <label for="telefono" class="label">Teléfono</label>
          <input type="text" id="telefono" class="input" v-model="telefono" />
        </div>

        <div class="group">
          <label for="password" class="label">Password</label>
          <input type="password" id="password" class="input" v-model="password" required />
        </div>

        <div class="group">
          <label>
            <input type="checkbox" v-model="acceptTerms" required />
            Acepto los <a href="/terms">términos y condiciones</a>
          </label>
        </div>

        <div class="group">
          <button type="submit" class="button" :disabled="!acceptTerms">Registrar</button>
        </div>
      </form>

      <div class="foot-lnk">
        <p>¿Ya tienes cuenta? <router-link to="/login">Inicia sesión aquí</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ApiService from '../services/ApiService';

// Definir variables reactivas
const nombre = ref('');
const correo = ref('');
const cedula = ref('');
const telefono = ref('');
const password = ref('');
const acceptTerms = ref(false);
const router = useRouter();

// Función para manejar el registro de usuario
const handleRegister = async () => {
  try {
    const user = {
      nombre: nombre.value,
      correo: correo.value,
      password: password.value,
      cedula: cedula.value,
      telefono: telefono.value,
      creadoPor: 'system',  // Valor por defecto o variable según sea necesario
      editadoPor: 'system',
      aceptaterminos: acceptTerms.value
    };

    // Llamar al servicio API para registrar el usuario
    const response = await ApiService.setUser(user);
    
    if (response.status === 201) {
      console.log('Usuario registrado con éxito:', response.data);
      localStorage.setItem('userName', nombre.value);
      router.push('/login');
    } else {
      console.error('Error en el registro:', response.status);
    }
  } catch (error) {
    console.error('Error durante el registro:', error);
  }
};
</script>

<style scoped>
body {
  margin: 0;
  color: #6a6f8c;
  background: #c8c8c8;
  font: 600 16px/18px 'Open Sans', sans-serif;
}

*,
:after,
:before {
  box-sizing: border-box;
}

.register-wrap {
  width: 100%;
  height: 100vh; /* Asegura que cubra toda la altura de la ventana */
  display: flex; /* Utiliza flexbox para centrar el contenido */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  background: url(https://i.makeagif.com/media/3-18-2016/pStRpD.gif) no-repeat center;
  background-size: cover; /* Ajusta para cubrir todo el contenedor */
  background-attachment: fixed;
}

.register-html {
  width: 100%;
  max-width: 450px; /* Ajustado para que sea un poco más ancho */
  padding: 30px; /* Aumentado el padding para un mejor espaciado */
  background: rgba(40, 57, 101, 0.9); /* Fondo semi-transparente para consistencia con el login */
  border-radius: 10px; /* Bordes redondeados para un diseño suave */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* Sombra para dar profundidad */
}

.title {
  text-align: center;
  color: #ffffff; /* Color blanco para contraste con el fondo */
  margin-bottom: 20px;
}

.group {
  margin-bottom: 20px; /* Espaciado entre cada grupo de formulario */
}

.group label {
  color: #ffffff; /* Cambiado a blanco */
  font-size: 16px; /* Ajustar el tamaño de la fuente si es necesario */
}


.group .input {
  width: 100%;
  padding: 12px 20px; /* Ajuste del padding para mejor legibilidad */
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1); /* Fondo translúcido para estilo consistente */
  color: #ffffff;
}

.group .input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.2); /* Cambio ligero de fondo al enfocarse */
}

.group .button {
  width: 100%;
  padding: 15px 20px; /* Botón con mayor padding para facilidad de uso */
  border: none;
  border-radius: 25px;
  background: #1161ee; /* Color de botón consistente con el estilo general */
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}

.group .button:hover {
  background-color: #0e4bcc; /* Cambio de color en hover para dar retroalimentación visual */
}

.foot-lnk {
  text-align: center;
  margin-top: 15px; /* Ajustado el margen superior */
}

.foot-lnk p {
  color: #dddddd; /* Texto gris claro */
}

.foot-lnk a {
  color: #00e5ff; /* Color del enlace consistente con el login */
  text-decoration: none;
}

.foot-lnk a:hover {
  text-decoration: underline; /* Subrayado al pasar el mouse */
}
</style>
