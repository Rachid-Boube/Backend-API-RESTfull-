const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const homeRoutes = require("./routes/home.routes.js");
const userRoutes = require("./routes/user.routes.js");
const providerRoutes = require("./routes/provider.routes.js");
const oilRoutes = require("./routes/oil.routes.js");
const autresIngredientsRoutes = require("./routes/autresIngredients.routes.js");
const recipeRoutes = require("./routes/recipeRoutes.routes.js");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt authentication routes
app.use("/api/home", homeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/oil", oilRoutes);
app.use("/api/autresIngredients", autresIngredientsRoutes);
app.use("/api/recipe", recipeRoutes);

//lancer le serveur
app.listen(process.env.PORT, () => {
  console.log(`Server demarre sur le port ${process.env.PORT}`);
});
