import Usuario from "../models/usuario.js"
import Lanche from "../models/lanche.js"
import Pedido from "../models/pedido.js"

class AdminController {
  
  dashboard = async (req, res) => {
    const totalUsuarios = await Usuario.countDocuments()
    const totalLanches = await Lanche.countDocuments()
    const totalPedidos = await Pedido.countDocuments()

    const pedidos = await Pedido.find().populate("usuario").populate("itens.lanche")

    const totalVendido = pedidos.reduce((soma, p) => soma + p.total, 0)

    const ultimosPedidos = pedidos.slice(-5).reverse()

    res.render("admin/dashboard", {
      totalUsuarios,
      totalLanches,
      totalPedidos,
      totalVendido,
      ultimosPedidos
    })
  }
}

export default new AdminController()
