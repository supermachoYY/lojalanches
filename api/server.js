import {createServer} from 'http';

import flash from 'connect-flash'
import session from 'express-session'
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

// Importar rotas
import usuarioRoutes from '../routes/usuarioRoutes.js'
import pedidoRoutes from '../routes/pedidoRoutes.js'
import pagamentoRoutes from '../routes/pagamentoRoutes.js'
import adminRoutes from '../routes/adminRoutes.js'
import lancheRoutes from '../routes/lancheRoutes.js'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

//flash
app.use(
  session({
    secret: "escamboif-super-secreto",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});


// Configurações
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))

// Conexão MongoDB
const uri = 'mongodb+srv://joaogarcia:123@cluster0.esobk.mongodb.net/?appName=Cluster0'
mongoose.connect('mongodb://localhost:27017/lanchonete_escolar')
  .then(() => console.log('✅ MongoDBonectado'))
  .catch(err => console.error('Erro ao conectar:', err))

// Rotas principais
app.use('/usuario', usuarioRoutes)
app.use('/pedido', pedidoRoutes)
app.use('/pagamento', pagamentoRoutes)
app.use('/admin', adminRoutes)
app.use('/lanche', lancheRoutes)

// Início
app.listen(3001, () => console.log('Servidor rodando em http://localhost:3001'))
export default app