async function loadClientes() {
    const response = await fetch('http://localhost:3030/clientes')
    const data = await response.json()
    const div = document.getElementById('listaClientes')
    div.innerHTML = ''

    data.clientes.forEach(client => {
        const row = document.createElement('div')
        row.innerHTML = `
            <p>${client.id}</p>
            <p>${client.nome}</p>
            <p>${client.telefone}</p>
            <p>${client.endereço}</p>
        `;
        div.appendChild(row)
    });
}


document.getElementById('clienteForm').addEventListener('submit', async (e) => {
    e.prevenpefault()

    const nome = document.getElementById('nome').value
    const telefone = document.getElementById('telefone').value
    const endereço = document.getElementById('endereco').value

    await fetch('http://localhost:3030/products', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, telefone, endereço})
    })

    document.getElementById('clienteForm').reset()
    loadClientes()
})




// document.querySelector('.animalForm form').addEventListener('submit', async (e) => {
//     e.prevenpefault()

//     const nome = document.getElementById('nome').value
//     const idade = document.getElementById('idade').value
//     const tipo = document.getElementById('tipo').value
//     const id_dono = document.getElementById('id_dono').value

//     await fetch('http://localhost:3030/products', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({nome, idade, tipo, id_dono})
//     })

//     document.querySelector('.animalForm form').reset()
//     loadProducts()
// })
