const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "soude",
        "eau",
        "huile essentielle",
        "colorant naturel",
        "additif",
      ],
    },
    sousType: {
      type: String,
      trim: true,
    },
    quantite: {
      type: Number,
      required: true,
    },
    seuilQuantite: {
      type: Number,
      required: true,
    },
    dateApprovisionnement: {
      type: Date,
      required: true,
    },
    fournisseur: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

// Middleware de pré-validation
ingredientSchema.pre("validate", function (next) {
  if (this.type === "soude") {
    if (!["koh", "naoh"].includes(this.sousType.toLowerCase())) {
      this.invalidate(
        "sousType",
        `${this.sousType} is not a valid sous-type for ${this.type}!`
      );
    }
  } else if (this.type === "huile essentielle") {
    if (
      !["citron", "menthe", "lavande"].includes(this.sousType.toLowerCase())
    ) {
      this.invalidate(
        "sousType",
        `${this.sousType} is not a valid sous-type for ${this.type}!`
      );
    }
  } else if (this.type === "colorant naturel") {
    if (
      !["curcuma", "betterave", "spiruline"].includes(
        this.sousType.toLowerCase()
      )
    ) {
      this.invalidate(
        "sousType",
        `${this.sousType} is not a valid sous-type for ${this.type}!`
      );
    }
  } else if (this.type === "additif") {
    if (
      !["hydratant", "exfoliant", "apaisant"].includes(
        this.sousType.toLowerCase()
      )
    ) {
      this.invalidate(
        "sousType",
        `${this.sousType} is not a valid sous-type for ${this.type}!`
      );
    }
  }
  next();
});

const IngredientModel = mongoose.model("ingredient", ingredientSchema);

module.exports = IngredientModel;
