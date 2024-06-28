const IngredientModel = require("../models/autreIngredients.model");

// Créer un ingrédient
exports.createIngredient = async (req, res) => {
  try {
    const ingredient = await IngredientModel.create(req.body);
    res.status(201).json(ingredient);
  } catch (error) {
    console.error("Erreur lors de la création de l'ingrédient :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};

// Obtenir tous les ingrédients
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await IngredientModel.find();
    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Erreur lors de la récupération des ingrédients :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};

// Obtenir un ingrédient par son ID
exports.getOneIngredient = async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await IngredientModel.findById(id);
    if (!ingredient) {
      return res.status(404).json({ error: "Ingrédient introuvable." });
    }
    res.status(200).json(ingredient);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'ingrédient :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};

// Mettre à jour un ingrédient
exports.updateIngredient = async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await IngredientModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ingredient) {
      return res.status(404).json({ error: "Ingrédient introuvable." });
    }
    res.status(200).json(ingredient);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'ingrédient :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};

// Supprimer un ingrédient
exports.deleteIngredient = async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await IngredientModel.findByIdAndDelete(id);
    if (!ingredient) {
      return res.status(404).json({ error: "Ingrédient introuvable." });
    }
    res.status(200).json({ message: "Ingrédient supprimé." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'ingrédient :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};
