const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASSWORD +
      "@projectmernsoap.rtcztb2.mongodb.net/mern-soap-project"
  )
  .then(() => console.log("Connexion réussie à notre base de données MongoDB"))
  .catch((err) =>
    console.error("Erreur de connexion à notre base de données MongoDB:", err)
  );
