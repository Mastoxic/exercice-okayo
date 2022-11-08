const mongoose = require('mongoose');

const ProduitSchema = mongoose.Schema({
    nom: { type: String, required: true },
    quantité: { type: Number, required: true },
    prixHT: { type: Number, required: true },
    TVA: { type: Number, required: true }
});

ProduitSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.idProduit = _id;
    object.prixTTC = (1+object.TVA)*object.prixHT;
    return object;
});

module.exports = mongoose.model('Produit', ProduitSchema);