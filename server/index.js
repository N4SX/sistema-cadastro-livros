require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- ROTAS DE AUTENTICAÇÃO ---
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ error: error.message });
    res.json({ session: data.session });
});
app.post('/auth/register', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ user: data.user });
});

// --- MIDDLEWARE DE AUTENTICAÇÃO ---
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Acesso negado: Token não fornecido' });
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: 'Acesso negado: Token inválido' });
    req.user = user;
    next();
};
app.use('/api/books', authMiddleware);

// --- ROTAS CRUD DE LIVROS ---
app.get('/api/books', async (req, res) => {
    const { data, error } = await supabase.from('books').select('*').eq('user_id', req.user.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});
// ROTA ADICIONADA PARA BUSCAR UM ÚNICO LIVRO
app.get('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('books').select('*').eq('id', id).eq('user_id', req.user.id).single();
    if (error) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json(data);
});
app.post('/api/books', async (req, res) => {
    const { title, author, pages, publication_year } = req.body;
    const { data, error } = await supabase.from('books').insert([{ title, author, pages, publication_year, user_id: req.user.id }]).select();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data[0]);
});
app.put('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, pages, publication_year } = req.body;
    const { data, error } = await supabase.from('books').update({ title, author, pages, publication_year }).eq('id', id).eq('user_id', req.user.id).select();
    if (error) return res.status(400).json({ error: error.message });
    if (data.length === 0) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json(data[0]);
});
app.delete('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('books').delete().eq('id', id).eq('user_id', req.user.id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});