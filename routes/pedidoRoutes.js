import { Router } from "express"
import PedidoController from "../controllers/pedidoController.js"

const router = Router()

router.get("/", PedidoController.list)
router.get("/view/:id", PedidoController.view)

router.get("/edit/:id", PedidoController.openEdit)
router.post("/edit/:id", PedidoController.edit)

router.get("/delete/:id", PedidoController.delete)

export default router
