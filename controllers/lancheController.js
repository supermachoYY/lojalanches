import Lanche from "../models/lanche.js";

export default class LancheController {

  // LISTAR + BUSCA + FILTRO
  static async listar(req, res) {
    try {
      const busca = req.query.busca || "";
      const categoria = req.query.categoria || "";

      let filtro = {};

      if (busca) {
        filtro.nome = { $regex: busca, $options: "i" };
      }

      if (categoria && categoria !== "todas") {
        filtro.categoria = categoria;
      }

      const lanches = await Lanche.find(filtro).sort({ nome: 1 });
      const categorias = await Lanche.distinct("categoria");

      res.render("lanche/lst", {
        lanches,
        busca,
        categoria,
        categorias
      });

    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao listar lanches");
    }
  }

  // FORM ADD
  static async openAdd(req, res) {
    const categorias = await Lanche.distinct("categoria");
    res.render("lanche/add", {
      categorias
    });
  }


  // ADD
  static async add(req, res) {
    try {
      const { nome, preco, categoria } = req.body;

      await Lanche.create({
        nome,
        preco,
        categoria,
        imagem: req.file.buffer
      });

      res.redirect("/lanche");

    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao adicionar lanche");
    }
  }

  // FORM EDIT
  static async openEdit(req, res) {
    try {
      const lanche = await Lanche.findById(req.params.id);
      const categorias = await Lanche.distinct("categoria");

      res.render("lanche/edit", {
        lanche,
        categorias
      });

    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao abrir edição");
    }
  }

  // EDIT
  static async edit(req, res) {
    try {
      const { nome, preco, categoria } = req.body;

      const update = { nome, preco, categoria };

      if (req.file) {
        update.imagem = req.file.filename;
      }

      await Lanche.findByIdAndUpdate(req.params.id, update);
      res.redirect("/lanche");

    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao editar lanche");
    }
  }

  // DELETE
  static async delete(req, res) {
    try {
      await Lanche.findByIdAndDelete(req.params.id);
      res.redirect("/lanche");

    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao excluir lanche");
    }
  }
}
