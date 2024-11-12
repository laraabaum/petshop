CREATE DATABASE db_pet;

USE db_pet;

CREATE TABLE  clientes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    telefone VARCHAR(255) NOT NULL,
    endereço VARCHAR(255) NOT NULL
    
);

CREATE TABLE animais(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    id_dono INT  NOT NULL,
    FOREIGN KEY (id_dono) REFERENCES clientes(id)
);

