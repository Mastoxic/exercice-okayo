const mongoose = require('mongoose');

const ProduitSchema = mongoose.Schema({
    nom: { type: String, required: true },
    quantité: { type: Number, required: true },
    prixHT: { type: Number, required: true },
    TVA: { type: Number, required: true },
    prixTTC: { type: Number, default: 0 }
});

ProduitSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.idProduit = _id;
    return object;
});

module.exports = mongoose.model('Produit', ProduitSchema);