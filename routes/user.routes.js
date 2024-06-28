const router = require("express").Router();
const authController = require("../controllers/auth.controller.js");
const userController = require("../controllers/user.controller.js");
const authenticateUser = require("../middlewares/auth.middleware");

//methode post pour ajouter un utilisateur pour l'authentification
router.post("/signup", authController.signUp);
router.post("/login", authController.logIn);
router.get("/logout", authController.logOut);

//user db
router.get("/", authenticateUser, userController.getAllUsers);
router.get("/:id", authenticateUser, userController.getOneUser);
router.put("/:id", authenticateUser, userController.updateUser);
router.delete("/:id", authenticateUser, userController.deleteUser);

module.exports = router;
