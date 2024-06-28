const mongoose = require("mongoose");

const oilSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    nom_scientifique: {
      type: String,
      trim: true,
    },
    naoh: {
      type: Number,
      required: true,
    },
    koh: {
      type: Number,
      required: true,
    },
    iode: {
      type: Number,
      required: true,
    },
    ins: {
      type: Number,
      required: true,
    },
    laurique: {
      type: Number,
      required: true,
    },
    myristique: {
      type: Number,
      required: true,
    },
    palmitique: {
      type: Number,
      required: true,
    },
    stearique: {
      type: Number,
      required: true,
    },
    ricinoleique: {
      type: Number,
      required: true,
    },
    oleique: {
      type: Number,
      required: true,
    },
    linoleique: {
      type: Number,
      required: true,
    },
    linolenique: {
      type: Number,
      required: true,
    },
    durete: {
      type: Number,
      required: true,
    },
    nettoyant: {
      type: Number,
      required: true,
    },
    condition: {
      type: Number,
      required: true,
    },
    moussant: {
      type: Number,
      required: true,
    },
    cremeux: {
      type: Number,
      required: true,
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

const OilModel = mongoose.model("oil", oilSchema);

module.exports = OilModel;
