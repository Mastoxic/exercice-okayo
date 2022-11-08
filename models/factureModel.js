const mongoose = require('mongoose');

const FactureSchema = mongoose.Schema({
    ref: { type: String, required: true, unique: true},
    dateFacturation: { type: Date, default: Date.now},
    dateEchéance: { type: Date, required: true},
    codeClient: { type: String, required: true},
    listeProduits: { type: Array, default: []},
    état: { type: String, default: "non payée"}
});

module.exports = mongoose.model('Facture', FactureSchema);