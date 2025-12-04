import { Router } from "express"
import PedidoController from "../controllers/pedidoController.js"

const router = Router()
// Listagem do pedido do cliente
router.get("/cliente", PedidoController.listCliente);

// Remover item do pedido do cliente (somente do array)
router.get("/removeItem/:pedidoId/:itemId", PedidoController.removeItem);

// Finalizar compra (mensagem e reset)
router.get("/finalizar/:pedidoId", PedidoController.finalizarCompra);

router.get("/lst", PedidoController.list)
router.get("/view/:id", PedidoController.view)

router.get("/edit/:id", PedidoController.openEdit)
router.post("/edit/:id", PedidoController.edit)


router.get("/delete/:id", PedidoController.delete)

// ⭐ NOVA ROTA PARA CRIAR PEDIDO A PARTIR DO LANCHE
router.post("/add/:lancheId", PedidoController.addFromLanche)

export default router
