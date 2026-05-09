// tarefasRoutes.js — mapeia verbos HTTP do recurso /tarefas para o controller

import { Router } from 'express';
import * as controller from '../controllers/tarefasController.js';

const router = Router();

router.get('/', controller.listar);          // GET    /tarefas
router.get('/:id', controller.buscarPorId);  // GET    /tarefas/:id
router.post('/', controller.criar);          // POST   /tarefas
router.put('/:id', controller.atualizar);    // PUT    /tarefas/:id
router.delete('/:id', controller.remover);   // DELETE /tarefas/:id

export default router;
