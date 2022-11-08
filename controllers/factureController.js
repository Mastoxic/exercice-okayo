const Facture = require('../models/factureModel.js');

// POST a Facture
exports.create = async (req, res) => {
    
    const Produit = require('../models/produitModel.js');
    let listeProduits = [];
    for (const produit in req.body.facture.listeProduits) {
        let p = await Produit.find({ idProduit: produit.produit });
        if (p.quantité < 1) {
            res.status(500).send({
                message: "the product " + p.nom + " in the bill isn't available at the moment"
            });
        }
        await Produit.updateOne({idProduit:p.idProduit}, {$set:{quantité:p.quantité - 1}});
        p.quantité = produit.quantité;
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