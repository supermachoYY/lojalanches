import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
  lanche: { type: mongoose.Schema.Types.ObjectId, ref: 'Lanche', required: true },
  quantidade: { type: Number, required: true },
  subtotal: { type: Number, required: true }
})

const pedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  itens: [ItemSchema],
  total: { type: Number, required: true },
 
  
})

export default mongoose.model('Pedido', pedidoSchema)
