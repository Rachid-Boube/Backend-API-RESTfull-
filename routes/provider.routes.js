const router = require("express").Router();
const providerController = require("../controllers/provider.controller");
const authenticateUser = require("../middlewares/auth.middleware");
// CRUD operations for Provider
router.post("/", authenticateUser, providerController.createProvider);
router.get("/", authenticateUser, providerController.getAllProviders);
router.get("/:id", authenticateUser, providerController.getOneProvider);
router.put("/:id", authenticateUser, providerController.updateProvider);
router.delete("/:id", authenticateUser, providerController.deleteProvider);

router.get(
  "/check-low-stock",
  authenticateUser,
  providerController.checkLowStock
);
router.post("/supply-stock", authenticateUser, providerController.supplyStock);

module.exports = router;
