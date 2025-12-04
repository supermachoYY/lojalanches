import mongoose from 'mongoose'

const lancheSchema = new mongoose.Schema({
  nome: { type: String, required: true, index: true },
  preco: { type: Number, required: true },
  imagem: {type:Buffer, required:false,
    get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
    }}
})

export default mongoose.model('Lanche', lancheSchema)
