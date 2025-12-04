// routes/routes.js
import express from "express";
const router = express.Router();

// 🔹 Controllers
import AuthController from "../controllers/adminController.js";
import Controller from "../controllers/controller.js";

// 🔹 Middlewares
import { verificarLogin } from "../middlewares/auth.js";

// 🔹 Instâncias dos controladores
const auth = new AuthController();
const controle = new Controller();

// ============================================================
// 🔹 ROTAS DE AUTENTICAÇÃO (sem middleware)
// ============================================================

// Página de login
router.get("/login", auth.loginPage);

// Página de cadastro
router.get("/cadastro", auth.registerPage);

// Cadastro de novo usuário
router.post("/cadastro", auth.register);

// Login de usuário
router.post("/login", auth.login);

// Logout do usuário
router.get("/logout", auth.logout);

// ============================================================
// 🔹 ROTAS PROTEGIDAS (exigem login)
// ============================================================

// Exemplo de rota protegida principal
router.get("/", verificarLogin, (req, res) => {
  res.render("index", {
    sucesso: `Bem-vindo, ${req.session.usuario.nome}!`,
    erro: null,
  });
});

// Caso você tenha rotas adicionais de módulos (animais, adoção, etc.),
// importe e use-as aqui com o middleware verificarLogin
// Exemplo:
// import animalRoutes from "./animalRoutes.js"
// router.use("/animal", verificarLogin, animalRoutes)

// ============================================================
// 🔹 EXPORTA AS ROTAS
// ============================================================
export default router;
