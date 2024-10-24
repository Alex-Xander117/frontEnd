import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/UserLogin.vue';
import Register from '../views/UserRegister.vue';
import HomeView from '../views/HomeView.vue';
import TermsAndConditions from '../views/TermsAndConditions.vue';
import SeriviceView from '../views/ServiceView.vue';
import TeamView from '@/views/TeamView.vue';

//hola que hace
const routes = [
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
    path: '/home',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/terms',
    name: 'TermsAndConditions',
    component: TermsAndConditions,
  },
  {
    path: '/',
    redirect: '/login', 
  },
  {
    path: '/service',
    name: 'Service',
    component: SeriviceView,
  },
  {
    path: '/team',
    name: 'Team',
    component: TeamView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
