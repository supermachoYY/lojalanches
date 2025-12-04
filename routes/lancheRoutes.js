import { Router } from "express";
import LancheController from "../controllers/lancheController.js";
import multer from 'multer';
const router = Router();

// Configuração do Multer

const storage = multer.memoryStorage();
const upload = multer({ storage });



router.get("/", LancheController.listar);

router.get("/add", LancheController.openAdd);
router.post('/add',upload.single('imagem'), LancheController.add);

router.get("/edit/:id", LancheController.openEdit);
router.post("/edit/:id", upload.single('imagem'), LancheController.edit);

router.get("/delete/:id", LancheController.delete);

export default router;
