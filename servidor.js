const { inserir, listarLivros, buscarPorId, atualizar, deletar } = require('../../crud');

// Inserir um novo livro
const criarLivro = async (req, res) => {
  try {
    const livro = req.body;
    const livroInserido = await inserir(livro);
    res.status(201).json(livroInserido);
  } catch (error) {
    console.error('Erro ao inserir livro:', error);
    res.status(500).json({ message: 'Erro ao inserir livro' });
  }
};

// Listar todos os livros
const obterLivros = async (req, res) => {
  try {
    const livros = await listarLivros();
    res.status(200).json(livros);
  } catch (error) {
    console.error('Erro ao listar livros:', error);
    res.status(500).json({ message: 'Erro ao listar livros' });
  }
};

// Buscar um livro pelo ID
const obterLivroPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await buscarPorId(id);
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.status(200).json(livro);
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    res.status(500).json({ message: 'Erro ao buscar livro' });
  }
};

// Atualizar um livro por ID
const atualizarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    const livroAtualizado = await atualizar(id, dadosAtualizados);
    if (!livroAtualizado) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.status(200).json(livroAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    res.status(500).json({ message: 'Erro ao atualizar livro' });
  }
};

// Deletar um livro por ID
const deletarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const livroDeletado = await deletar(id);
    if (!livroDeletado) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.status(200).json(livroDeletado);
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    res.status(500).json({ message: 'Erro ao deletar livro' });
  }const express = require('express');
  const app = express();
  const PORT = 3000;
  
  app.use(express.json()); // Middleware para lidar com JSON
  
  // Banco de dados simulado
  let livros = [];
  let idAtual = 1;
  
  // POST: Adicionar um novo livro
  app.post('/livros', (req, res) => {
    const { titulo, autor, ano, genero } = req.body;
  
    if (!titulo || !autor || !ano || !genero) {
      return res.status(400).json({ message: "Todos os campos (titulo, autor, ano, genero) são obrigatórios." });
    }
  
    const novoLivro = { id: idAtual++, titulo, autor, ano, genero };
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
  });
  
  // GET: Listar todos os livros
  app.get('/livros', (req, res) => {
    res.status(200).json(livros);
  });
  
  // GET: Obter um livro por ID
  app.get('/livros/:id', (req, res) => {
    const { id } = req.params;
    const livro = livros.find((livro) => livro.id === parseInt(id, 10));
  
    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }
  
    res.status(200).json(livro);
  });
  
  // PUT: Atualizar um livro por ID
  app.put('/livros/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, ano, genero } = req.body;
  
    const livroIndex = livros.findIndex((livro) => livro.id === parseInt(id, 10));
    if (livroIndex === -1) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }
  
    // Atualizando os dados
    livros[livroIndex] = {
      ...livros[livroIndex],
      titulo: titulo || livros[livroIndex].titulo,
      autor: autor || livros[livroIndex].autor,
      ano: ano || livros[livroIndex].ano,
      genero: genero || livros[livroIndex].genero,
    };
  
    res.status(200).json(livros[livroIndex]);
  });
  
  // Iniciar o servidor
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
  
};

module.exports = { criarLivro, obterLivros, obterLivroPorId, atualizarLivro, deletarLivro };
