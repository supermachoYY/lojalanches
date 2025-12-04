// ========================= CONTROLLER DE PEDIDO =========================

import Pedido from '../models/pedido.js'
import Lanche from '../models/lanche.js'
import Usuario from '../models/usuario.js'

export default class PedidoController {

  // -------------------------------------------------------------
  // LISTAGEM DE PEDIDOS COM BUSCA E FILTRO
  // -------------------------------------------------------------
  static list = async (req, res) => {
    try {
      const busca = req.query.busca || ""
      const statusFiltro = req.query.status || ""

      // Busca usuário pelo nome
      const usuarios = await Usuario.find({
        nome: { $regex: busca, $options: "i" }
      })

      const usuariosIds = usuarios.map(u => u._id)

      const filtro = {}

      if (busca) {
        filtro.usuario = { $in: usuariosIds }
      }

      if (statusFiltro) {
        filtro.status = statusFiltro
      }

      const pedidos = await Pedido.find(filtro)
        .populate("usuario")
        .populate("itens.lanche")
        .sort({ data: -1 })

      res.render("pedido/lst", { pedidos, busca, statusFiltro, usuarios })
    } catch (err) {
      console.error("Erro ao listar pedidos:", err)
      res.status(500).send("Erro ao listar pedidos")
    }
  }

  // -------------------------------------------------------------
  // VER PEDIDO COMPLETO
  // -------------------------------------------------------------
  static view = async (req, res) => {
    try {
      const pedido = await Pedido.findById(req.params.id)
        .populate("usuario")
        .populate("itens.lanche")

      if (!pedido) {
        return res.status(404).send("Pedido não encontrado")
      }

      res.render("pedido/view", { pedido })
    } catch (err) {
      console.error("Erro ao exibir pedido:", err)
      res.status(500).send("Erro ao exibir pedido")
    }
  }

  // -------------------------------------------------------------
  // EDITAR STATUS DO PEDIDO
  // -------------------------------------------------------------
  static openEdit = async (req, res) => {
    try {
      const pedido = await Pedido.findById(req.params.id)
        .populate("usuario")

      if (!pedido) {
        return res.status(404).send("Pedido não encontrado")
      }

      res.render("pedido/edit", { pedido })
    } catch (err) {
      console.error("Erro ao abrir edição do pedido:", err)
      res.status(500).send("Erro ao abrir edição")
    }
  }

  static edit = async (req, res) => {
    try {
      await Pedido.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status }
      )

      res.redirect("/pedido")
    } catch (err) {
      console.error("Erro ao editar pedido:", err)
      res.status(500).send("Erro ao editar pedido")
    }
  }

  // -------------------------------------------------------------
  // EXCLUIR PEDIDO
  // -------------------------------------------------------------
  static delete = async (req, res) => {
    try {
      await Pedido.findByIdAndDelete(req.params.id)
      res.redirect("/pedido")
    } catch (err) {
      console.error("Erro ao excluir pedido:", err)
      res.status(500).send("Erro ao excluir pedido")
    }
  }
}
