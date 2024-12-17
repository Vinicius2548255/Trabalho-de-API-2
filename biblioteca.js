let livros = [];
let idAtual = 1;

// Inserir um novo livro
const inserir = async (livro) => {
  const novoLivro = { id: idAtual++, ...livro };
  livros.push(novoLivro);
  return novoLivro;
};

// Listar todos os livros
const listarLivros = async () => livros;

// Buscar um livro por ID
const buscarPorId = async (id) => livros.find((livro) => livro.id === parseInt(id, 10));

// Atualizar um livro por ID
const atualizar = async (id, dadosAtualizados) => {
  const index = livros.findIndex((livro) => livro.id === parseInt(id, 10));
  if (index === -1) return null;
  livros[index] = { ...livros[index], ...dadosAtualizados };
  return livros[index];
};

// Deletar um livro por ID
const deletar = async (id) => {
  const index = livros.findIndex((livro) => livro.id === parseInt(id, 10));
  if (index === -1) return null;
  return livros.splice(index, 1)[0];
};

module.exports = { inserir, listarLivros, buscarPorId, atualizar, deletar };
