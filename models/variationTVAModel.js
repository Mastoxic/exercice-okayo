const mongoose = require('mongoose');

const VariationTVASchema = mongoose.Schema({
    nouvelleTVA: { type: Number, required: true },
    ancienneTVA: { type: Number, required: true },
    dateDébut: { type: Date, default: Date.now },
    dateFin: { type: Date, required: true },
    idProduit: { type: mongoose.ObjectId, required: true }
});

module.exports = mongoose.model('VariationTVA', VariationTVASchema);