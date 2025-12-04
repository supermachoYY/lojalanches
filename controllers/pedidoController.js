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
    const busca = req.query.busca || "";
    const statusFiltro = req.query.status || "";

    let filtro = {};

    // -------------------------
    // BUSCA POR NOME DO LANCHE
    // -------------------------
    if (busca) {
      const lanches = await Lanche.find({
        nome: { $regex: busca, $options: "i" }
      });

      const lancheIds = lanches.map(l => l._id);

      // Filtra pedidos contendo algum desses lanches
      filtro["itens.lanche"] = { $in: lancheIds };
    }

    // FILTRO POR STATUS
    if (statusFiltro) {
      filtro.status = statusFiltro;
    }

    const pedidos = await Pedido.find(filtro)
      .populate("usuario")
      .populate("itens.lanche")
      .sort({ data: -1 });

    res.render("pedido/lst", {
      page: "pedido",
      pedidos,
      busca,
      statusFiltro
    });
  } catch (err) {
    console.error("Erro ao listar pedidos:", err);
    res.status(500).send("Erro ao listar pedidos");
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

      res.redirect("/pedido/lst")
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
      res.redirect("/pedido/lst")
    } catch (err) {
      console.error("Erro ao excluir pedido:", err)
      res.status(500).send("Erro ao excluir pedido")
    }
  }

  // -------------------------------------------------------------
  // ADICIONAR PEDIDO A PARTIR DE UM LANCHE
  // -------------------------------------------------------------
  static addFromLanche = async (req, res) => {
    try {
      const lancheId = req.params.lancheId
      const quantidade = Number(req.body.quantidade) || 1

      const lanche = await Lanche.findById(lancheId)
      if (!lanche) {
        return res.status(404).send("Lanche não encontrado")
      }

      const subtotal = lanche.preco * quantidade
      const total = subtotal

      // Usa o primeiro usuário encontrado
      const usuario = await Usuario.findOne()
      if (!usuario) {
        return res.status(400).send("Nenhum usuário cadastrado")
      }

      const pedido = new Pedido({
        usuario: usuario._id,
        itens: [{
          lanche: lanche._id,
          quantidade,
          subtotal
        }],
        total
      })

      await pedido.save()

      res.redirect("/pedido/lst")

    } catch (err) {
      console.error("Erro ao criar pedido:", err)
      res.status(500).send("Erro ao criar pedido")
    }
  }


static listCliente = async (req, res) => 
 {
  const Pedido = require("../models/pedido.js");

  try {
    const pedido = await Pedido.findOne({ usuario: req.user._id })
      .populate("itens.lanche");

    res.render("pedido/pedidoclientelst", { pedido });
  } catch (error) {
    res.send("Erro ao carregar pedido");
  }
}
static removeItem = async(req, res) =>{
  const Pedido = require("../models/pedido.js");
  const { pedidoId, itemId } = req.params;

  try {
    const pedido = await Pedido.findById(pedidoId);

    pedido.itens = pedido.itens.filter(i => i._id.toString() !== itemId);

    // recalcula total
    pedido.total = pedido.itens.reduce((acc, item) => {
      return acc + (item.valor * item.quantidade);
    }, 0);

    await pedido.save();
    res.redirect("/pedido/cliente");
  } catch (error) {
    res.send("Erro ao remover item");
  }
}
static finalizarCompra = async (req, res) => {
 {
  const Pedido = require("../models/pedido.js");

  try {
    const pedido = await Pedido.findById(req.params.pedidoId);
    
    // Limpa o pedido quando finaliza
    pedido.itens = [];
    pedido.total = 0;
    await pedido.save();

    res.send("<script>alert('Compra finalizada com sucesso!'); window.location='/pedido/cliente';</script>");

  } catch (err) {
    res.send("Erro ao finalizar compra");
  }
}

}}
