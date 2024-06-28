const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Erreur de serveur.", details: err.message });
  }
};

module.exports.getOneUser = async (req, res) => {
  console.log(req.params);

  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID invalide." });
  }

  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Erreur lors de la récupération de l'utilisateur :", err);
    res.status(500).json({ error: "Erreur de serveur.", details: err.message });
  }
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID invalide." });
  }

  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
    res.status(500).json({ error: "Erreur de serveur.", details: err.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID invalide." });
  }

  try {
    const deletedUser = await UserModel.findOneAndDelete({
      _id: req.params.id,
    }).exec();

    if (!deletedUser) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }

    res.status(200).json({ message: "Utilisateur supprimé." });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'utilisateur :", err);
    res.status(500).json({ error: "Erreur de serveur.", details: err.message });
  }
};
