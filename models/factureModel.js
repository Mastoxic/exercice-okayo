const mongoose = require('mongoose');

const FactureSchema = mongoose.Schema({
    ref: { type: String, required: true, unique: true },
    dateFacturation: { type: Date, default: Date.now },
    dateEchéance: { type: Date, required: true },
    codeClient: { type: String, required: true },
    listeProduits: { type: Array, default: [] },
    totalHT: { type: Number, default: 0 },
    totauxTVA: {type: Object, default: {} },
    totalTTC: { type: Number, default: 0 },
    état: { type: String, default: "non payée" },
    émetteur: {
        type: Object,
        default: {
            nom: "Okayo SAS",
            adresse: "35 Rue du Général Foy 75008 Paris",
            téléphone: "0180886300",
            web: "https://www.okayo.fr/",
            informationsBancaires: {
                domiciliation: "BRED",
                propriétaire: "OKAYO",
                codeIBAN: "FR76 0000 0000 0000 0000 0000 097",
                codeBIC: "BREDFRPPXXX"
            },
            typeSociété: "Société par actions simplifiée (SAS)",
            capital: 10000,
            SIRET: " 82255940700017",
            NAF_APE: "6201Z",
            numTVA: "FR 76 822559407"
        }
    }
});

module.exports = mongoose.model('Facture', FactureSchema);