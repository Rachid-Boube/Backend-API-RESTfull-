const RecipeModel = require("../models/recipe.model");

exports.createRecipe = async (req, res) => {
  const {
    nom,
    unités,
    type_de_soude,
    poids_de_lipides,
    ratio_eau_lipides,
    pourcentage_surgras,
    ratio_parfum,
    oils,
    ingrédients,
  } = req.body;

  try {
    const newRecipe = new RecipeModel({
      nom,
      unités,
      type_de_soude,
      poids_de_lipides,
      ratio_eau_lipides,
      pourcentage_surgras,
      ratio_parfum,
      oils,
      ingrédients,
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find()
      .populate("oils.nom")
      .populate("ingrédients.ingrédient");
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await RecipeModel.findById(id)
      .populate("oils.nom")
      .populate("ingrédients.ingrédient");
    if (!recipe) {
      return res.status(404).json({ message: "Recette non trouvée" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
