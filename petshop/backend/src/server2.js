const express = require('express');
const app = express();
const connection = require('./connection');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Cadastro de usuário
app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    connection.query(query, [nome, email, senha], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        }
        res.json({ message: 'Usuário cadastrado com sucesso!' });
    });
});

// Login de usuário
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    connection.query(query, [email, senha], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ error: 'Email ou senha incorretos.' });
        }
        res.json({ message: 'Login bem-sucedido!' });
    });
});

// Criar um post
app.post('/posts', (req, res) => {
    const { titulo, descricao, autor_id } = req.body;
    const query = 'INSERT INTO posts (titulo, descricao, autor_id) VALUES (?, ?, ?)';
    connection.query(query, [titulo, descricao, autor_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar o post.' });
        }
        res.json({ message: 'Post criado com sucesso!' });
    });
});

// Listar posts
app.get('/posts', (req, res) => {
    const query = 'SELECT posts.*, usuarios.nome AS autor FROM posts JOIN usuarios ON posts.autor_id = usuarios.id';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao listar posts.' });
        }
        res.json(results);
    });
});

// Editar post
app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
    const query = 'UPDATE posts SET titulo = ?, descricao = ? WHERE id = ?';
    connection.query(query, [titulo, descricao, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao editar o post.' });
        }
        res.json({ message: 'Post atualizado com sucesso!' });
    });
});

// Deletar post
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM posts WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar o post.' });
        }
        res.json({ message: 'Post deletado com sucesso!' });
    });
});

const port = 3030;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
