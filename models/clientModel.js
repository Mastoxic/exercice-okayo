const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    codeClient: { type: String, required: true, unique: true},
    nom: { type: String, required: true},
    adresse: { type: String, required: true},
    téléphone: { type: String, required: true},
    listeFactures: { type: Array, default: []}
});

module.exports = mongoose.model('Client', ClientSchema);