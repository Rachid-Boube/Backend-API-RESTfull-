const router = require("express").Router();
const ingredientController = require("../controllers/autreIngredient.controller.js");
const authenticateUser = require("../middlewares/auth.middleware");

// CRUD operations for Ingredients
router.post("/", authenticateUser, ingredientController.createIngredient);
router.get("/", authenticateUser, ingredientController.getAllIngredients);
router.get("/:id", authenticateUser, ingredientController.getOneIngredient);
router.put("/:id", authenticateUser, ingredientController.updateIngredient);
router.delete("/:id", authenticateUser, ingredientController.deleteIngredient);

module.exports = router;
