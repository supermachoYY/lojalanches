
// ==================== ROTA PAGAMENTO (routes/pagamentoRoutes.js) ====================
import express from 'express'
import PagamentoController from '../controllers/pagamentoController.js'

const router = express.Router()
const controller = PagamentoController  // ✅ sem 'new'

router.get('/', controller.list)
router.get('/add', controller.openAdd)
router.post('/add', controller.add)
router.get('/edit/:id', controller.openEdit)
router.post('/edit/:id', controller.edit)
router.get('/delete/:id', controller.delete)

export default router
