const ProviderModel = require("../models/provider.model");

// Créer un fournisseur
exports.createProvider = async (req, res) => {
  try {
    const fournisseur = await ProviderModel.create(req.body);
    res.status(201).json(fournisseur);
  } catch (error) {
    console.error("Erreur lors de la création du fournisseur :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};

// Obtenir tous les fournisseurs
exports.getAllProviders = async (req, res) => {
  try {
    const fournisseurs = await ProviderModel.find();
    res.status(200).json(fournisseurs);
  } catch (error) {
    console.error("Erreur lors de la récupération des fournisseurs :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};

// Obtenir un fournisseur par son ID
exports.getOneProvider = async (req, res) => {
  const { id } = req.params;
  try {
    const fournisseur = await ProviderModel.findById(id);
    if (!fournisseur) {
      return res.status(404).json({ error: "Fournisseur introuvable." });
    }
    res.status(200).json(fournisseur);
  } catch (error) {
    console.error("Erreur lors de la récupération du fournisseur :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};

// Mettre à jour un fournisseur
exports.updateProvider = async (req, res) => {
  const { id } = req.params;
  try {
    const fournisseur = await ProviderModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!fournisseur) {
      return res.status(404).json({ error: "Fournisseur introuvable." });
    }
    res.status(200).json(fournisseur);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du fournisseur :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};

// Supprimer un fournisseur
exports.deleteProvider = async (req, res) => {
  const { id } = req.params;
  try {
    const fournisseur = await ProviderModel.findByIdAndDelete(id);
    if (!fournisseur) {
      return res.status(404).json({ error: "Fournisseur introuvable." });
    }
    res.status(200).json({ message: "Fournisseur supprimé." });
  } catch (error) {
    console.error("Erreur lors de la suppression du fournisseur :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};

exports.checkLowStock = async (req, res) => {
  try {
    await Provider.checkAndNotifyLowStock();
    res.status(200).send("Low stock check completed.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.supplyStock = async (req, res) => {
  const { providerId, oilSupplies, ingredientSupplies } = req.body;

  try {
    await Provider.supplyStock(providerId, oilSupplies, ingredientSupplies);
    res.status(200).send("Stock supplied successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
