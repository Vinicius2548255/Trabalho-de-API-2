const { Client } = require('pg');

// Configuração de conexão com o banco de dados
const config = {
  user: 'postgres',
  password: '123sql',  
  host: 'localhost',
  port: 5432,
  database: 'livros'  // Nome do banco de dados
};

// Criar uma instância de cliente
const cliente = new Client(configuração);

module.exports = configuração;