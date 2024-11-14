// URL do backend
const baseURL = 'http://localhost:3030';

// Função para registrar um novo usuário
async function registerUser(nome, email, senha) {
    const response = await fetch(`${baseURL}/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
    });
    const data = await response.json();
    alert(data.message);
}

// Função para fazer login do usuário
async function loginUser(email, senha) {
    const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });
    const data = await response.json();
    if (data.message === 'Login bem-sucedido!') {
        alert('Login realizado com sucesso!');
        loadPosts(); // Carrega os posts após o login bem-sucedido
    } else {
        alert('Falha no login. Verifique suas credenciais.');
    }
}

// Função para criar um novo post
async function createPost(titulo, descricao, autor_id) {
    const response = await fetch(`${baseURL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descricao, autor_id })
    });
    const data = await response.json();
    alert(data.message);
    loadPosts(); // Atualiza a timeline após criar um novo post
}

// Função para carregar todos os posts
async function loadPosts() {
    const response = await fetch(`${baseURL}/posts`);
    const posts = await response.json();
    const postsDiv = document.getElementById('timeline');
    postsDiv.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h3>${post.titulo}</h3>
            <p>${post.descricao}</p>
            <p>Autor: ${post.autor}</p>
            <p>Data: ${new Date(post.data_criacao).toLocaleString()}</p>
            <button onclick="editPost(${post.id}, '${post.titulo}', '${post.descricao}')">Editar</button>
            <button onclick="deletePost(${post.id})">Excluir</button>
        `;
        postsDiv.appendChild(postDiv);
    });
}

// Função para editar um post
async function editPost(id, titulo, descricao) {
    const novoTitulo = prompt('Novo título:', titulo);
    const novaDescricao = prompt('Nova descrição:', descricao);

    if (novoTitulo && novaDescricao) {
        const response = await fetch(`${baseURL}/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: novoTitulo, descricao: novaDescricao })
        });
        const data = await response.json();
        alert(data.message);
        loadPosts(); // Atualiza a timeline após editar um post
    }
}

// Função para deletar um post
async function deletePost(id) {
    if (confirm('Deseja realmente excluir este post?')) {
        const response = await fetch(`${baseURL}/posts/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        alert(data.message);
        loadPosts(); // Atualiza a timeline após excluir um post
    }
}

// Formulário de cadastro
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    await registerUser(nome, email, senha);
});

// Formulário de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;
    await loginUser(email, senha);
});

// Formulário de criação de post
document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const autor_id = 1; // Substitua pelo ID do usuário logado
    await createPost(titulo, descricao, autor_id);
    document.getElementById('postForm').reset();
});
