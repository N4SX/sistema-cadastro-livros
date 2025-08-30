# Sistema Distribuído de Cadastro de Livros

## 🎯 Objetivo

Este projeto implementa um sistema distribuído para o cadastro de livros, com cliente e servidor totalmente separados, utilizando uma aplicação web moderna e interativa. O objetivo é exercitar os conceitos de sistemas distribuídos como Middleware, APIs e autenticação.

Este trabalho faz parte da primeira unidade da disciplina de sistemas distribuidos do curso de sistemas de informação UFPI 2025.2

## ✨ Funcionalidades

A aplicação possui um sistema de CRUD (Create, Read, Update, Delete) completo para a gestão de livros, além de autenticação de usuários.

* **Autenticação de Usuários:**
    * Cadastro de novas contas com e-mail e senha.
    * Login de usuários existentes.
    * Rotas protegidas que só podem ser acessadas por usuários autenticados.

* **Gerenciamento de Livros (CRUD):**
    * **Criar:** Adicionar novos livros ao acervo pessoal do usuário.
    * **Ler:** Listar todos os livros cadastrados pelo usuário.
    * **Atualizar:** Editar as informações de um livro existente.
    * **Deletar:** Remover um livro do acervo.

* **Campos do Livro:**
    * Título do livro.
    * Autor principal.
    * Quantidade de páginas.
    * Ano de publicação.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias:

* **Frontend:** Vue 3 (com Axios para consumir a API).
* **Backend:** Node.js com Express.
* **Banco de Dados & Autenticação:** Supabase (PostgreSQL + Autenticação por e-mail/senha).

## 📂 Estrutura do Código

O repositório é um monorepo dividido em duas pastas principais, separando as responsabilidades do cliente e do servidor:

```
/trabalho01/
[cite_start]├── client/         # Contém toda a aplicação Frontend em Vue 3 [cite: 32]
[cite_start]└── server/         # Contém toda a API Backend em Node.js/Express [cite: 34]
└── README.md       # Este arquivo
```

## 🚀 Instalação e Execução

Siga os passos abaixo para rodar o projeto em sua máquina local.

### Pré-requisitos

* Node.js instalado.
* Uma conta gratuita no Supabase.

### Backend (Servidor)

1.  **Navegue até a pasta `server`:**
    ```bash
    cd server
    ```
2.  **Crie o arquivo de ambiente:**
    Crie um arquivo chamado `.env` na raiz da pasta `server` e adicione suas chaves do Supabase:
    ```env
    SUPABASE_URL=URL_DO_PROJETO_SUPABASE
    SUPABASE_KEY=API_KEY_ANON_DO_SUPABASE
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o servidor:**
    ```bash
    node index.js
    ```
    O servidor estará rodando em `http://localhost:3000`.

### Frontend (Cliente)

1.  **Abra um novo terminal** e navegue até a pasta `client`:
    ```bash
    cd client
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará acessível em `http://localhost:5173` (ou em outra porta indicada no terminal).

## 🖼️ Telas da Aplicação (Prints)

Abaixo estão as telas que demonstram o fluxo principal e as funcionalidades da aplicação.

**1. Tela de Login**
*Onde o usuário inicia a sessão para acessar o sistema.*
![Tela de Login](https://github.com/N4SX/sistema-cadastro-livros/blob/main/telas/tela-login.png)

**2. Tela de Cadastro de Usuário**
*Formulário para a criação de novas contas de usuário.*
![Tela de Cadastro de Usuário](https://github.com/N4SX/sistema-cadastro-livros/blob/main/telas/cadastra-usu%C3%A1rio.png)

**3. Tela de Listagem de Livros**
*Esta é a tela principal após o login. Ela exibe todos os livros do usuário e oferece as opções para adicionar um novo livro, editar um existente ou excluir.*
![Tela de Listagem de Livros](https://github.com/N4SX/sistema-cadastro-livros/blob/main/telas/tela-principal-gerencia-livro.png)

**4. Tela de Cadastro**
*Este é o formulário unificado usado tanto para **cadastrar um novo livro** quanto para **editar um livro** já existente.*
![Tela de Formulário de Livro](https://github.com/N4SX/sistema-cadastro-livros/blob/main/telas/tela-cad-livro.png)

**4. Tela de Edição de Livro**
*Este é o formulário unificado usado tanto para **editar um livro** já existente.*
![Tela de Formulário de Livro](https://github.com/N4SX/sistema-cadastro-livros/blob/main/telas/tela-edit-livro.png)

---
## 👨‍💻 Autores

* **David Natan Santos**
* **James de Sousa**
* **Vanderlei de Sousa Carvalho**














