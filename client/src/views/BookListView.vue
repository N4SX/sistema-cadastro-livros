<template>
  <div class="books-container">
    <header>
      <h1>Meus Livros</h1>
      <div>
        <router-link to="/books/add" class="button add-button">Adicionar Novo Livro</router-link>
        <button @click="handleLogout" class="button logout-button">Sair</button>
      </div>
    </header>
    <div class="books-list">
      <h2>Lista de Livros Cadastrados</h2>
      <ul v-if="books.length > 0">
        <li v-for="book in books" :key="book.id">
          <span>
            <strong>{{ book.title }}</strong> ({{ book.author }})
          </span>
          <div class="buttons">
            <router-link :to="{ name: 'book-edit', params: { id: book.id } }" class="button edit-button">Editar</router-link>
            <button @click="deleteBook(book.id)" class="button delete-button">Excluir</button>
          </div>
        </li>
      </ul>
      <p v-else>Nenhum livro cadastrado ainda.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../api/axios';

const books = ref([]);
const router = useRouter();

const fetchBooks = async () => {
  try {
    const response = await apiClient.get('/api/books');
    books.value = response.data;
  } catch (error) { console.error('Erro ao buscar livros:', error); }
};

const deleteBook = async (id) => {
  if (confirm('Tem certeza que deseja excluir este livro?')) {
    try {
      await apiClient.delete(`/api/books/${id}`);
      fetchBooks(); 
    } catch (error) { alert('Não foi possível excluir o livro.'); }
  }
};

const handleLogout = () => {
  localStorage.removeItem('authToken');
  router.push('/');
};

onMounted(fetchBooks);
</script>

<style scoped>
.books-container { width: 100%; max-width: 900px; margin: auto; }
header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color); }
h1 { font-family: 'Lora', serif; font-size: 2.5rem; }
.books-list { background-color: var(--surface-color); padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color); }
ul { list-style: none; padding: 0; }
li { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1rem; border-bottom: 1px solid var(--border-color); }
li:last-child { border-bottom: none; }
.button { cursor: pointer; padding: 0.8rem 1.2rem; border-radius: 8px; border: none; font-weight: 500; text-decoration: none; display: inline-block; margin-left: 1rem; }
.add-button { background-color: var(--primary-color); color: white; }
.logout-button { background-color: #c92a2a; color: white; }
.edit-button { background-color: #e67700; color: white; }
.delete-button { background-color: #a61e4d; color: white; }
</style>