const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send("Vous n'êtes pas authentifié");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(401).send("Utilisateur non trouvé");
    }
    next();
  } catch (err) {
    console.error("Erreur d'authentification :", err);
    res.status(401).send("Jeton d'authentification non valide");
  }
};

module.exports = authenticateUser;
