// /client/src/api/axios.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000', // A URL do seu backend que está rodando
    headers: {
        'Content-Type': 'application/json',
    },
});

// Este trecho de código é muito importante.
// Ele intercepta cada requisição que o frontend faz...
apiClient.interceptors.request.use(config => {
    // ...busca o token de autenticação que salvaremos no localStorage após o login...
    const token = localStorage.getItem('authToken');
    
    // ...e se o token existir, ele o adiciona no cabeçalho de autorização.
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config; // Continua com a requisição
}, error => {
    return Promise.reject(error);
});

export default apiClient;