// ==================== MODEL PAGAMENTO (models/pagamento.js) ====================
import mongoose from 'mongoose'

const pagamentoSchema = new mongoose.Schema({
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido',
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  forma: {
    type: String,
    enum: ['Dinheiro', 'Pix', 'Cartão'],
    required: true
  },
  dataPagamento: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pago', 'pendente', 'cancelado'],
    default: 'pendente'
  }
})

export default mongoose.model('Pagamento', pagamentoSchema)
