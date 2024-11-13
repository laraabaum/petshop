//CADASTRO CLIENTE
async function loadClientes() {
    const response = await fetch('http://localhost:3030/clientes')
    const data = await response.json()
    console.log(data)
    const div = document.getElementById('listaClientes')
    div.innerHTML = ''

//cria oq mostra os clientes
    data.clientes.forEach(cliente => {
        const row = document.createElement('div')
        row.innerHTML = `
            <p>${cliente.id}</p>
            <p>${cliente.nome}</p>
            <p>${cliente.telefone}</p>
            <p>${cliente.endereco}</p>
        `;
        div.appendChild(row)
    });
}

document.getElementById('clienteForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const telefone = document.getElementById('telefone').value
    const endereco = document.getElementById('endereco').value

    await fetch('http://localhost:3030/cadastroCliente', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, telefone, endereco})
    })

    document.getElementById('clienteForm').reset()
    loadClientes()
})
loadClientes()





//CADASTRO ANIMAIS
async function loadAnimais() {
    const response = await fetch('http://localhost:3030/animais')
    const data = await response.json()
    console.log(data)
    const div = document.getElementById('listaAnimais')
    div.innerHTML = ''

//cria oq mostra os animais
    data.animais.forEach(animal => {
        const row = document.createElement('div')
        row.innerHTML = `
            <p>${animal.id}</p>
            <p>${animal.nome}</p>
            <p>${animal.idade}</p>
            <p>${animal.tipo}</p>
            <p>${animal.id_dono}</p>
        `;
        div.appendChild(row)
    });
}

document.getElementById('animalForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const idade = document.getElementById('idade').value
    const tipo = document.getElementById('tipo').value
    const id_dono = document.getElementById('id_dono').value

    await fetch('http://localhost:3030/cadastroAnimal', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, idade, tipo, id_dono})
    })

    document.getElementById('animalForm').reset()
    loadAnimais()
})

const selectDono = document.getElementById('id_dono');
        selectDono.innerHTML = '<option value="">Selecione um dono</option>';
        data.clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nome;
            selectDono.appendChild(option);
        });

// // Selecionar id dono
// async function loadDonos() {
//     const response = await fetch('http://localhost:3030/clientes');
//     const data = await response.json();
//     const selectDono = document.getElementById('id_dono');

//     // Limpa as opções existentes
//     selectDono.innerHTML = '<option value="">Selecione um dono</option>';

//     // Adiciona as opções de donos no select
//     data.clientes.forEach(cliente => {
//         const option = document.createElement('option');
//         option.value = cliente.id; // ID do cliente
//         option.textContent = cliente.nome; // Nome do cliente
//         selectDono.appendChild(option);
//     });
// }

// Chama a função para carregar os donos quando a página for carregada
loadDonos();

loadAnimais()
