<template>
  <div class="container">
    <!-- Imagen de la puerta de garaje -->
    <div class="garage-door" :style="{ transform: `translateY(-${scrollPosition}px)` }">
      <img src="@/assets/imagenes/puertaGaraje3.png" alt="Puerta de Garaje" />

      <!-- Texto que se mueve junto con la puerta -->
      <div class="text-overlay" :style="{ transform: `translateY(-${scrollPosition}px)` }"></div>
    </div>

    <!-- Contenedor principal para los textos e imágenes -->
    <div class="content-sections">
      <!-- Contenedor de texto e imagen de fondo que aparece gradualmente -->
      <div class="text-image-container" :style="{ opacity: backgroundOpacity }">
        <div class="text-content">
          <h2>Quiénes somos</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.</p>
        </div>
        <div class="background-image">
          <img src="@/assets/imagenes/fondo1.jpg" alt="Fondo visible después del scroll" />
          <div class="gradient-overlay"></div>
        </div>
      </div>

      <!-- Nuevo contenedor: Texto a la derecha, imagen a la izquierda -->
      <div class="text-image-container" :style="{ opacity: backgroundOpacity }">
        <div class="background-image">
          <img src="@/assets/imagenes/fondo2.jpg" alt="Fondo visible después del scroll" />
          <div class="gradient-overlay right-gradient"></div>
        </div>
        <div class="text-content">
          <h2>Nuestra misión</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>
        </div>
      </div>

      <!-- Nuevo contenedor con dos textos -->
      <div class="dual-text-container">
        <div class="text-box">
          <h2>Gestionamiento de inventario</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel nisi nec magna posuere fringilla.</p>
          <RouterLink to="/login">
            <button>Administrar</button>
          </RouterLink>
        </div>
        <div class="text-box">
          <h2>Tienda</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel nisi nec magna posuere fringilla.</p>
          <button>Comprar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollPosition: 0,
      windowHeight: window.innerHeight,
      backgroundOpacity: 0, // Inicialmente el contenedor de texto es invisible
    };
  },
  methods: {
    onScroll() {
      this.scrollPosition = window.scrollY;

      if (this.scrollPosition > window.innerHeight) {
        this.scrollPosition = window.innerHeight;
      }

      this.backgroundOpacity = Math.min(this.scrollPosition / window.innerHeight, 1);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  position: relative;
  width: 100%;
  height: auto; /* Altura dinámica para incluir todos los contenedores */
}

.garage-door {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
  transition: transform 0.2s ease-out;
}

.garage-door img {
  width: 100%;
  object-fit: cover;
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  color: white;
  font-family: "Bokor", sans-serif;
  font-size: 3rem;
  font-weight: bold;
}

h2 {
  color: #ffde59;
}

.content-sections {
  margin-top: 100vh;
}

.text-image-container {
  width: 100%;
  height: 50vh;
  display: flex;
  transition: opacity 0.2s ease-out;
  box-sizing: border-box;
  background-color: black;
}

.text-content {
  width: 50%;
  padding: 20px;
  color: white;
}

.background-image {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.background-image img {
  width: 100%;
  height: 50vh;
  object-fit: cover;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgb(0, 0, 0), transparent);
  pointer-events: none;
}

.gradient-overlay.right-gradient {
  background: linear-gradient(to left, rgb(0, 0, 0), transparent);
}

/* Nuevo contenedor dual */
.dual-text-container {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Centra verticalmente los elementos */
  width: 100%;
  background-color: black;
  color: white;
  padding: 20px 0; /* Elimina el padding lateral */
  box-sizing: border-box;
}

.text-box {
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra horizontalmente los elementos */
  text-align: center; /* Centra el texto */
}

.text-box h2 {
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.text-box p {
  margin-bottom: 15px;
}

.text-box button {
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.text-box button:hover {
  background-color: #ffde59; /* Cambia el fondo a amarillo cuando el cursor pasa sobre el botón */
  color: black; /* Mantiene el texto en color negro */
}
</style>