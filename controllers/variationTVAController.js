const VariationTVA = require('../models/variationTVAModel.js');

// POST a VariationTVA
exports.create = (req, res) => {

    const Produit = require('../models/produitModel.js');
    
    let dateDébut = Date.now;
    // Check if the user entered a date
    if (typeof req.body.dateDébut != "undefined") {
        dateDébut = req.body.dateDébut
    }

    // Create a VariationTVA
    const variationTVA = new VariationTVA({
        nouvelleTVA: req.body.nouvelleTVA,
        ancienneTVA: Produit.find({ idProduit: req.body.idProduit }).TVA,
        dateDébut: dateDébut,
        dateFin: req.body.dateFin,
        idProduit: req.body.idProduit
    });

    // Save a VariationTVA in the MongoDB
    variationTVA.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// FETCH all VariationTVAs
exports.findAll = (req, res) => {
    VariationTVA.find()
    .then(variationTVAs => {
        res.send(variationTVAs);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};