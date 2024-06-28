const router = require("express").Router();
const recipeController = require("../controllers/recipe.Controller.js");
const authenticateUser = require("../middlewares/auth.middleware");
// Route pour créer une recette
router.post("/", authenticateUser, recipeController.createRecipe);

// Route pour obtenir toutes les recettes
router.get("/", authenticateUser, recipeController.getAllRecipes);

// Route pour obtenir une recette par ID
router.get("/:id", authenticateUser, recipeController.getRecipeById);

module.exports = router;
