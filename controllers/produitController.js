const Produit = require('../models/produitModel.js');

// POST a Produit
exports.create = (req, res) => {

    // Create a Produit
    const produit = new Produit({
        nom: req.body.nom,
        quantité: req.body.quantité,
        prixHT: req.body.prixHT,
        TVA: req.body.TVA
    });

    // Save a Produit in the MongoDB
    produit.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// FETCH all Produits
exports.findAll = (req, res) => {
    Produit.find()
    .then(produits => {
        res.send(produits);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};