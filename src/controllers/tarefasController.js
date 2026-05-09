// tarefasController.js — lógica do recurso "tarefas"
// cada tarefa pertence a um usuário (relação via usuarioId).

import { tarefas, usuarios, contadores } from '../data/db.js';

// GET /tarefas — lista todas
export function listar(req, res) {
  res.json(tarefas);
}

// GET /tarefas/:id
export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
  res.json(tarefa);
}

// POST /tarefas — cria nova tarefa vinculada a um usuário existente
export function criar(req, res) {
  const { titulo, usuarioId, concluida = false } = req.body;

  if (!titulo || !usuarioId) {
    return res.status(400).json({ erro: 'titulo e usuarioId são obrigatórios' });
  }

  // valida integridade referencial: usuário precisa existir no array
  const usuarioExiste = usuarios.some(u => u.id === Number(usuarioId));
  if (!usuarioExiste) {
    return res.status(400).json({ erro: 'Usuário informado não existe' });
  }

  const novaTarefa = {
    id: contadores.tarefas++,
    titulo,
    concluida: Boolean(concluida),
    usuarioId: Number(usuarioId)
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
}

// PUT /tarefas/:id — atualização parcial
export function atualizar(req, res) {
  const id = Number(req.params.id);
  const indice = tarefas.findIndex(t => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  const { titulo, concluida, usuarioId } = req.body;

  tarefas[indice] = {
    ...tarefas[indice],
    ...(titulo && { titulo }),
    ...(concluida !== undefined && { concluida: Boolean(concluida) }),
    ...(usuarioId && { usuarioId: Number(usuarioId) })
  };

  res.json(tarefas[indice]);
}

// DELETE /tarefas/:id
export function remover(req, res) {
  const id = Number(req.params.id);
  const indice = tarefas.findIndex(t => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  const [removida] = tarefas.splice(indice, 1);
  res.json({ mensagem: 'Tarefa removida', tarefa: removida });
}
