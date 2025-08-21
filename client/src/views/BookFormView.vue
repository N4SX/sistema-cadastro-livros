<template>
  <div class="form-container">
    <header>
      <h1>{{ isEditing ? 'Editar Livro' : 'Adicionar Novo Livro' }}</h1>
      <router-link to="/books" class="button cancel-button">Voltar para a Lista</router-link>
    </header>
    <div class="book-form">
      <form @submit.prevent="saveBook">
        <input type="text" placeholder="Título do livro" v-model="form.title" required />
        <input type="text" placeholder="Autor principal" v-model="form.author" required />
        <input type="number" placeholder="Quantidade de páginas" v-model.number="form.pages" />
        <input type="number" placeholder="Ano de publicação" v-model.number="form.publication_year" />
        <button type="submit" class="button submit-button">{{ isEditing ? 'Atualizar' : 'Salvar Livro' }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiClient from '../api/axios';

const router = useRouter();
const route = useRoute();
const isEditing = ref(false);
const form = ref({ title: '', author: '', pages: null, publication_year: null });

const saveBook = async () => {
  try {
    if (isEditing.value) {
      await apiClient.put(`/api/books/${route.params.id}`, form.value);
    } else {
      await apiClient.post('/api/books', form.value);
    }
    router.push('/books');
  } catch (error) { alert('Não foi possível salvar o livro.'); }
};

onMounted(async () => {
  const bookId = route.params.id;
  if (bookId) {
    isEditing.value = true;
    try {
      const response = await apiClient.get(`/api/books/${bookId}`);
      form.value = response.data;
    } catch (error) {
      alert('Não foi possível carregar os dados do livro.');
      router.push('/books');
    }
  }
});
</script>

<style scoped>
.form-container { width: 100%; max-width: 900px; margin: auto; }
header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color); }
h1 { font-family: 'Lora', serif; font-size: 2.5rem; }
.book-form { background-color: var(--surface-color); padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color); }
form { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
input { padding: 0.8rem 1rem; border: 1px solid var(--border-color); border-radius: 8px; background-color: var(--background-color); color: var(--text-primary); font-size: 1rem; }
.button { cursor: pointer; padding: 0.8rem 1.2rem; border-radius: 8px; border: none; font-weight: 500; text-decoration: none; }
.submit-button { background-color: var(--primary-color); color: white; grid-column: 1 / -1; }
.cancel-button { background-color: #495057; color: white; }
</style>