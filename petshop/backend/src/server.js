const express = require('express');
const cors = require ('cors');
const connection = require ('./db_config');
const app = express();

app.use(cors());
app.use(express.json());

const port = 3030;

// Cadastrar cliente
app.post('/cadastroCliente', (req, res) => {
    const {nome, telefone, endereco} = req.body;
    const query = 'INSERT INTO clientes(nome, telefone, endereco) VALUES(?, ?, ?)'
    connection.query(query, [nome, telefone, endereco], (err, results) => {
        if (err){
            return res.status(500).json({success: false, message: 'Erro ao cadastrar cliente.'});
        }
        res.json({succes: true, message: 'Cliente cadastrado com sucesso!'})

    })
})

// Buscar os clientes no banco:
app.get('/clientes', (req, res) => {
    const query = 'SELECT * FROM clientes'
    connection.query(query, (err, results) => {
        if (err){
            return res.status(500).json({success: false, message: 'Erro ao buscar cliente.'});
        }
        res.json({succes: true, clientes: results})
    })
})


// // Criar um produto:
// app.post('/products', (req, res) => {
//     const {name, quantity, price} = req.body
//     const query = 'INSERT INTO products(name, quantity, price) VALUES(?, ?, ?)'
//     connection.query(query, [name, quantity, price], (err, result) => {
//         if (err){
//             return res.status(500).json({success: false, message: 'Erro ao inserir produto.'});
//         }
//         res.json({succes: true, message: 'Produto inserido com sucesso!', id:result.insertId})
//     })
// })




// // Editar produto:
// app.put('/products/:id', (req, res) => {
//     const {id} = req.params
//     const {name, quantity, price} = req.body
//     const query = 'UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ?'
//     connection.query(query, [name, quantity, price, id], (err) => {
//         if (err){
//             return res.status(500).json({success: false, message: 'Erro ao atualizar produto.'});
//         }
//         res.json({succes: true, message: 'Produto atualizado com sucesso!'})
//     })
// })

// // Deletar produto:
// app.delete('products/:id', (req, res) => {
//     const {id} = req.params
//     const query = 'DELETE FROM products WHERE id = ?'
//     connection.query(query, [id], (err) => {
//         if (err){
//             return res.status(500).json({success: false, message: 'Erro ao deletar produto.'});
//         }
//         res.json({succes: true, message: 'Produto deletado com sucesso!'})
//     })
// })

// Cadastrar animal
app.post('/cadastroAnimal', (req, res) => {
    const {nome, idade, tipo, id_dono} = req.body;
    const query = 'INSERT INTO animais(nome, idade, tipo, id_dono) VALUES(?, ?, ?)'
    connection.query(query, [nome, idade, tipo, id_dono], (err, results) => {
        if (err){
            return res.status(500).json({success: false, message: 'Erro ao cadastrar animal.'});
        }
        res.json({succes: true, message: 'Animal cadastrado com sucesso!'})

    })
})

// Buscar os animais no banco:
app.get('/animais', (req, res) => {
    const query = 'SELECT * FROM animais'
    connection.query(query, (err, results) => {
        if (err){
            return res.status(500).json({success: false, message: 'Erro ao buscar animal.'});
        }
        res.json({succes: true, clientes: results})
    })
})


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));