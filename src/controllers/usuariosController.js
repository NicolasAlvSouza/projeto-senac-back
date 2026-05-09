// usuariosController.js — concentra a lógica do recurso "usuários"
// cada função recebe (req, res) e é chamada pelas rotas em src/routes.

import { usuarios, contadores } from '../data/db.js';

// GET /usuarios — retorna o array completo
export function listar(req, res) {
  res.json(usuarios);
}

// GET /usuarios/:id — busca por id usando Array.find
export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  res.json(usuario);
}

// POST /usuarios — cria um novo usuário
export function criar(req, res) {
  const { nome, email, telefone, senha } = req.body;

  // validação simples dos campos obrigatórios
  if (!nome || !email || !telefone || !senha) {
    return res.status(400).json({
      erro: 'nome, email, telefone e senha são obrigatórios'
    });
  }

  const novoUsuario = {
    id: contadores.usuarios++, // pós-incremento: usa o valor atual e já incrementa
    nome,
    email,
    telefone,
    senha // armazenado em texto puro — só para estudo, NÃO use assim em produção
  };

  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
}

// PUT /usuarios/:id — atualiza campos do usuário
export function atualizar(req, res) {
  const id = Number(req.params.id);
  const indice = usuarios.findIndex(u => u.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  const { nome, email, telefone, senha } = req.body;

  // spread + short-circuit: só sobrescreve campos enviados no body
  usuarios[indice] = {
    ...usuarios[indice],
    ...(nome && { nome }),
    ...(email && { email }),
    ...(telefone && { telefone }),
    ...(senha && { senha })
  };

  res.json(usuarios[indice]);
}

// DELETE /usuarios/:id — remove o usuário
export function remover(req, res) {
  const id = Number(req.params.id);
  const indice = usuarios.findIndex(u => u.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  // splice retorna um array com os itens removidos; desestruturamos o primeiro
  const [removido] = usuarios.splice(indice, 1);
  res.json({ mensagem: 'Usuário removido', usuario: removido });
}
