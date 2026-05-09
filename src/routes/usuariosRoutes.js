// usuariosRoutes.js — mapeia verbos HTTP do recurso /usuarios para o controller

import { Router } from 'express';
import * as controller from '../controllers/usuariosController.js';

const router = Router();

router.get('/', controller.listar);          // GET    /usuarios
router.get('/:id', controller.buscarPorId);  // GET    /usuarios/:id
router.post('/', controller.criar);          // POST   /usuarios
router.put('/:id', controller.atualizar);    // PUT    /usuarios/:id
router.delete('/:id', controller.remover);   // DELETE /usuarios/:id

export default router;
