// ==================== CONTROLLER PAGAMENTO ====================

import Pagamento from '../models/pagamento.js'
import Pedido from '../models/pedido.js'

export default class PagamentoController {

  // --- Abre a página de adicionar ---
  static openAdd = async (req, res) => {
    try {
      const pedidos = await Pedido.find().populate('usuario')
      res.render('pagamento/add', { pedidos })
    } catch (err) {
      console.error('Erro ao abrir página de pagamento:', err)
      res.status(500).send('Erro ao abrir página de pagamento')
    }
  }

  // --- Adiciona um novo pagamento ---
  static add = async (req, res) => {
    try {
      const { pedido, valor, forma, status } = req.body
      await Pagamento.create({ pedido, valor, forma, status })
      res.redirect('/pagamento')
    } catch (err) {
      console.error('Erro ao cadastrar pagamento:', err)
      res.status(500).send('Erro ao cadastrar pagamento')
    }
  }

  // --- Lista todos os pagamentos ---
  static list = async (req, res) => {
    try {
      const pagamentos = await Pagamento.find().populate({
        path: 'pedido',
        populate: { path: 'usuario', select: 'nome' }
      })
      res.render('pagamento/lst', { pagamentos })
    } catch (err) {
      console.error('Erro ao listar pagamentos:', err)
      res.status(500).send('Erro ao listar pagamentos')
    }
  }

  // --- Abre a página de edição ---
  static openEdit = async (req, res) => {
    try {
      const pagamento = await Pagamento.findById(req.params.id)
      const pedidos = await Pedido.find().populate('usuario')
      if (!pagamento) return res.status(404).send('Pagamento não encontrado')
      res.render('pagamento/edit', { pagamento, pedidos })
    } catch (err) {
      console.error('Erro ao abrir edição:', err)
      res.status(500).send('Erro ao abrir edição do pagamento')
    }
  }

  // --- Edita o pagamento ---
  static edit = async (req, res) => {
    try {
      const { pedido, valor, forma, status } = req.body
      await Pagamento.findByIdAndUpdate(req.params.id, { pedido, valor, forma, status })
      res.redirect('/pagamento')
    } catch (err) {
      console.error('Erro ao editar pagamento:', err)
      res.status(500).send('Erro ao editar pagamento')
    }
  }

  // --- Exclui um pagamento ---
  static delete = async (req, res) => {
    try {
      await Pagamento.findByIdAndDelete(req.params.id)
      res.redirect('/pagamento')
    } catch (err) {
      console.error('Erro ao excluir pagamento:', err)
      res.status(500).send('Erro ao excluir pagamento')
    }
  }
}
