import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false }
} )

export default mongoose.model('Usuario', usuarioSchema)
