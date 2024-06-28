const router = require("express").Router();
const oilController = require("../controllers/oil.controller.js");
const authenticateUser = require("../middlewares/auth.middleware");
// CRUD operations for Oils
router.post("/", authenticateUser, oilController.createOil);
router.get("/", authenticateUser, oilController.getAllOils);
router.get("/:id", authenticateUser, oilController.getOneOil);
router.put("/:id", authenticateUser, oilController.updateOil);
router.delete("/:id", authenticateUser, oilController.deleteOil);

module.exports = router;
