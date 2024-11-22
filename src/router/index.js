import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/UserLogin.vue';
import Register from '../views/UserRegister.vue';
import HomeView from '../views/HomeView.vue';
import TermsAndConditions from '../views/TermsAndConditions.vue';
import ServiceView from '../views/ServiceView.vue';
import TeamView from '@/views/TeamView.vue';
import VentaView from '@/views/VentaView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/terms',
    name: 'TermsAndConditions',
    component: TermsAndConditions,
  },
  {
    path: '/service',
    name: 'Service',
    component: ServiceView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/team',
    name: 'Team',
    component: TeamView,
  },
  {
    path: '/venta',
    name: 'Venta',
    component: VentaView,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Middleware para verificar autenticación y autorización
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Aquí verificamos si hay un token en localStorage

  // Verifica si la ruta requiere autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // Si no está autenticado, redirige al login
      next({ name: 'Login' });
    } else {
      // Si está autenticado, redirige a la vista solicitada
      next();
    }
  } else {
    // Si la ruta no requiere autenticación, simplemente sigue adelante
    next();
  }
});


export default router;
