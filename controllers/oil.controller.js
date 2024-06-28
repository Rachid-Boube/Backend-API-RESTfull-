const OilModel = require("../models/oil.model");
const ProviderModel = require("../models/provider.model");

// Créer une huile
exports.createOil = async (req, res) => {
  try {
    const oil = await OilModel.create(req.body);
    // Vérifier si le stock est inférieur au seuil
    if (oil.quantite <= oil.seuilQuantite) {
      const fournisseur = await ProviderModel.findById(oil.fournisseur);
      if (fournisseur) {
        // Informer le fournisseur
        console.log(
          `Le stock d'huile ${oil.nom} est faible. Veuillez réapprovisionner.`
        );
        // Ici, vous pouvez envoyer un email ou une notification au fournisseur
      }
    }
    res.status(201).json(oil);
  } catch (error) {
    console.error("Erreur lors de la création de l'huile :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};

// Obtenir toutes les huiles
exports.getAllOils = async (req, res) => {
  try {
    const oils = await OilModel.find();
    res.status(200).json(oils);
  } catch (error) {
    console.error("Erreur lors de la récupération des huiles :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};

// Obtenir une huile par son ID
exports.getOneOil = async (req, res) => {
  const { id } = req.params;
  try {
    const oil = await OilModel.findById(id);
    if (!oil) {
      return res.status(404).json({ error: "Huile introuvable." });
    }
    res.status(200).json(oil);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'huile :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};

// Mettre à jour une huile
exports.updateOil = async (req, res) => {
  const { id } = req.params;
  try {
    const oil = await OilModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    // Vérifier si le stock est inférieur au seuil
    if (oil.quantite <= oil.seuilQuantite) {
      const fournisseur = await ProviderModel.findById(oil.fournisseur);
      // Informer le fournisseur si le stock est faible
      if (fournisseur) {
        console.log(
          `Le stock d'huile ${oil.nom} est faible. Veuillez réapprovisionner.`
        );
        // Ici, vous pouvez envoyer un email ou une notification au fournisseur
      }
    }
    res.status(200).json(oil);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'huile :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};

// Supprimer une huile
exports.deleteOil = async (req, res) => {
  const { id } = req.params;
  try {
    const oil = await OilModel.findByIdAndDelete(id);
    if (!oil) {
      return res.status(404).json({ error: "Huile introuvable." });
    }
    res.status(200).json({ message: "Huile supprimée." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'huile :", error);
    res.status(500).json({ error: "Erreur de serveur." });
  }
};
