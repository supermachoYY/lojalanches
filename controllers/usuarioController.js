import Usuario from '../models/usuario.js'
import bcrypt from 'bcryptjs'

export default class UsuarioController {

 static list = async (req, res) => {
  try {
    const { q } = req.query
    const filtro = q ? { nome: { $regex: q, $options: 'i' } } : {}
    const usuarios = await Usuario.find(filtro).sort({ nome: 1 })

    res.render('usuario/lst', {
      usuarios,
      busca: q || ""
    })
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro')
  }
}

  static openAdd = (req, res) => res.render('usuario/add')

  static add = async (req, res) => {
    try {
      const { nome, email } = req.body
      await Usuario.create({ nome, email})
      res.redirect('/usuario')
    } catch (err) {
      console.error(err)
      res.redirect('/usuario')
    }
  }

  static openEdit = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id)
    res.render('usuario/edit', { usuario })
  }

  static edit = async (req, res) => {
    try {
      const { nome, email, senha } = req.body
      const update = { nome, email }
      if (senha) update.senha = await bcrypt.hash(senha, 10)

      await Usuario.findByIdAndUpdate(req.params.id, update)
      res.redirect('/usuario')
    } catch (err) {
      console.error(err)
      res.redirect('/usuario')
    }
  }

  static delete = async (req, res) => {
    try {
      await Usuario.findByIdAndDelete(req.params.id)
      res.redirect('/usuario')
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro')
    }
  }

  // LOGIN
  static openLogin = (req, res) => res.render('usuario/login')

  static login = async (req, res) => {
    try {
      const { email, senha } = req.body
      const user = await Usuario.findOne({ email })

      if (!user) return res.redirect('/usuario/login')

      const ok = await bcrypt.compare(senha, user.senha)
      if (!ok) return res.redirect('/usuario/login')

      req.session.usuario = {
        _id: user._id,
        nome: user.nome,
        isAdmin: user.isAdmin
      }

      res.redirect('/admin')
    } catch (err) {
      console.error(err)
      res.redirect('/usuario/login')
    }
  }

  static logout = (req, res) => {
    req.session.destroy(() => res.redirect('/usuario/login'))
  }
}
