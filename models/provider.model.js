const mongoose = require("mongoose");
const Ingredient = require("./autreIngredients.model");
const Oil = require("./oil.model");

const providerSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, unique: true, trim: true },
    prenom: { type: String, required: true, unique: true, trim: true },
    contact: { type: String, required: true, trim: true },
    adresse: { type: String, required: true, trim: true },
    oils: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Oil",
          required: true,
        },
        quantite: { type: Number, required: true },
      },
    ],
    autresIngredients: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredient",
          required: true,
        },
        quantite: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Middleware to update oil and ingredient quantities after saving
providerSchema.post("save", async function (doc) {
  for (const oil of doc.oils) {
    await Oil.findByIdAndUpdate(oil.id, { $inc: { quantite: oil.quantite } });
  }

  for (const ingredient of doc.autresIngredients) {
    await Ingredient.findByIdAndUpdate(ingredient.id, {
      $inc: { quantite: ingredient.quantite },
    });
  }
});

// Method to check and notify for low stock
providerSchema.methods.checkAndNotifyLowStock = async function () {
  const oils = await Oil.find();
  const ingredients = await Ingredient.find();

  oils.forEach((oil) => {
    if (oil.quantite < oil.seuilQuantite) {
      console.log(`Low stock alert for oil: ${oil.nom}`);
      // Trigger notification logic here
    }
  });

  ingredients.forEach((ingredient) => {
    if (ingredient.quantite < ingredient.seuilQuantite) {
      console.log(`Low stock alert for ingredient: ${ingredient.nom}`);
      // Trigger notification logic here
    }
  });
};

// Static method to supply oil and ingredients
providerSchema.statics.supplyStock = async function (
  providerId,
  oilSupplies,
  ingredientSupplies
) {
  const provider = await this.findById(providerId);

  oilSupplies.forEach(async (supply) => {
    await Oil.findByIdAndUpdate(supply.id, {
      $inc: { quantite: supply.quantite },
    });
    provider.oils.push(supply);
  });

  ingredientSupplies.forEach(async (supply) => {
    await Ingredient.findByIdAndUpdate(supply.id, {
      $inc: { quantite: supply.quantite },
    });
    provider.autresIngredients.push(supply);
  });

  await provider.save();
};

const ProviderModel = mongoose.model("Provider", providerSchema);
module.exports = ProviderModel;
