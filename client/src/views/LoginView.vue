<template>
  <div class="form-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit">Entrar</button>
    </form>
    <p class="link">
      Não tem uma conta? <router-link to="/register">Cadastre-se</router-link>
    </p>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../api/axios';
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const handleLogin = async () => {
  errorMessage.value = '';
  try {
    const response = await apiClient.post('/auth/login', { email: email.value, password: password.value, });
    const token = response.data.session.access_token;
    localStorage.setItem('authToken', token);
    router.push('/books');
  } catch (error) {
    errorMessage.value = 'Email ou senha inválidos. Tente novamente.';
    console.error('Falha no login:', error);
  }
};
</script>
<style scoped>
  .form-container { display: flex; flex-direction: column; gap: 1.5rem; animation: fadeIn 0.5s; max-width: 400px; margin: auto; padding: 2rem; background-color: var(--surface-color); border-radius: 12px; border: 1px solid var(--border-color); }
  .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  h2 { font-family: 'Lora', serif; text-align: center; margin-top: 0; }
  label { font-weight: 500; }
  input { padding: 0.8rem 1rem; border: 1px solid var(--border-color); border-radius: 8px; background-color: var(--background-color); color: var(--text-primary); font-size: 1rem; }
  button { padding: 0.8rem; border: none; border-radius: 8px; background-color: var(--primary-color); color: white; font-size: 1rem; font-weight: bold; cursor: pointer; }
  .error-message { color: #e57373; font-weight: 500; text-align: center; }
  .link { text-align: center; margin-top: 1rem; }
  .link a { color: var(--primary-color); text-decoration: none; font-weight: 500; }
</style>