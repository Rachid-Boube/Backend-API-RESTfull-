const UserModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;
  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    res.status(500).send("Une erreur est survenue lors de l'inscription");
  }
};

module.exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user || !(await user.isPasswordValid(password))) {
      res.status(401).send("Identifiants incorrects");
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    res.status(200).json({ user: user._id });
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).send("Une erreur est survenue lors de la connexion");
  }
};

module.exports.logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).send("Déconnexion réussie");
};
