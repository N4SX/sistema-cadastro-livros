// /src/router/index.js - VERSÃO COMPLETA E ATUALIZADA
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import BookListView from '../views/BookListView.vue'
import BookFormView from '../views/BookFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    {
      path: '/books',
      name: 'book-list',
      component: BookListView,
      meta: { requiresAuth: true }
    },
    {
      path: '/books/add',
      name: 'book-add',
      component: BookFormView,
      meta: { requiresAuth: true }
    },
    {
      path: '/books/edit/:id',
      name: 'book-edit',
      component: BookFormView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('authToken');
  if (to.meta.requiresAuth && !loggedIn) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router