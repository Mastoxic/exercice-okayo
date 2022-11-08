const Facture = require('../models/factureModel.js');

// POST a Facture
exports.create = (req, res) => {
    
    const Produit = require('../models/produitModel.js');
    let listeProduits = [];
    for (const produit in req.body.facture.listeProduits) {
        let p = Produit.find({ idProduit: produit.produit })
        p.quantité = produit.quantité
        listeProduits.push(p);
    }

    // Create a Facture
    const facture = new Facture({
        ref: req.body.facture.ref,
        dateEchéance: req.body.facture.dateEchéance,
        codeClient: req.body.client,
        listeProduits: listeProduits
    });

    // Save a Facture in the MongoDB
    facture.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// FETCH all Factures
exports.findAll = (req, res) => {
    Facture.find()
    .then(factures => {
        res.send(factures);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};