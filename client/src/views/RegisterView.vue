<template>
  <div class="form-container">
    <h2>Criar Conta</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <p v-if="message" :class="isError ? 'error-message' : 'success-message'">{{ message }}</p>
      <button type="submit">Cadastrar</button>
    </form>
    <p class="link">
      Já tem uma conta? <router-link to="/">Faça o login</router-link>
    </p>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../api/axios';
const email = ref('');
const password = ref('');
const message = ref('');
const isError = ref(false);
const router = useRouter();
const handleRegister = async () => {
  message.value = '';
  isError.value = false;
  try {
    await apiClient.post('/auth/register', { email: email.value, password: password.value });
    message.value = 'Conta criada com sucesso! Redirecionando para o login...';
    setTimeout(() => { router.push('/'); }, 2000);
  } catch (error) {
    isError.value = true;
    message.value = error.response?.data?.error || 'Erro ao criar a conta. Tente novamente.';
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
  .success-message { color: #81c784; font-weight: 500; text-align: center; }
  .link { text-align: center; margin-top: 1rem; }
  .link a { color: var(--primary-color); text-decoration: none; font-weight: 500; }
</style>