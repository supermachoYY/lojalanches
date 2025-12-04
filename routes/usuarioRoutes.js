import express from 'express'
import UsuarioController from '../controllers/usuarioController.js'
const router = express.Router()
router.get('/', UsuarioController.list)
router.get('/add', UsuarioController.openAdd)
router.post('/add', UsuarioController.add)
router.get('/edit/:id', UsuarioController.openEdit)
router.post('/edit/:id', UsuarioController.edit)
router.get('/delete/:id', UsuarioController.delete)
router.get('/login', UsuarioController.openLogin)
router.post('/login', UsuarioController.login)
router.get('/logout', UsuarioController.logout)


export default router
