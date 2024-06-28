const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    unités: {
      type: String,
      enum: ["Onces", "Grammes"],
      required: true,
    },
    type_de_soude: {
      type: String,
      enum: ["NaOH", "KOH"],
      required: true,
    },
    poids_de_lipides: {
      type: Number,
      required: true,
    },
    ratio_eau_lipides: {
      type: Number,
      required: true,
    },
    pourcentage_surgras: {
      type: Number,
      required: true,
    },
    ratio_parfum: {
      type: Number,
      required: true,
    },
    oils: [
      {
        nom: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "oil",
          required: true,
        },
        quantité: {
          type: Number,
          required: true,
        },
        unité: {
          type: String,
          enum: ["pourcentage", "gramme"],
          required: true,
        },
      },
    ],
    ingrédients: [
      {
        ingrédient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ingredient",
          required: true,
        },
        quantité: {
          type: Number,
          required: true,
        },
        unité: {
          type: String,
          enum: ["pourcentage", "gramme"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const checkAndUpdateStock = async (model, itemId, quantity) => {
  let item = await mongoose.model(model).findById(itemId);
  if (item.quantite < quantity) {
    throw new Error(`Not enough stock for ${model}: ${item.nom}`);
  }
  item.quantite -= quantity;
  await item.save();
};

recipeSchema.pre("save", async function (next) {
  try {
    for (let item of this.oils) {
      await checkAndUpdateStock("oil", item.nom, item.quantité);
    }

    for (let item of this.ingrédients) {
      await checkAndUpdateStock("ingredient", item.ingrédient, item.quantité);
    }

    next();
  } catch (error) {
    next(error);
  }
});

const RecipeModel = mongoose.model("recipe", recipeSchema);

module.exports = RecipeModel;
