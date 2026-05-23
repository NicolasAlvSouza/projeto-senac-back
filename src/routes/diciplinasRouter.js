import { Router } from 'express'
import * as controller from '../controllers/diciplinasController.js'
import { autenticarJWT } from '../middlewares/autenticacao.js'

const router = Router()
router.use(autenticarJWT)
 
router.get('/', autenticarJWT, controller.listar);

export default router;