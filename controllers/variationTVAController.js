const VariationTVA = require('../models/variationTVAModel.js');

// POST a VariationTVA
exports.create = async (req, res) => {

    const Produit = require('../models/produitModel.js');

    let dateDébut = Date.now();
    // Check if the user entered a starting date
    if (typeof req.body.dateDébut != "undefined") {
        dateDébut = new Date(req.body.dateDébut);
    }

    let dateFin = null;
    // Check if the user entered a final date
    if (typeof req.body.dateFin != "undefined") {
        dateFin = new Date(req.body.dateFin);
    }

    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.idProduit);
    let p = await Produit.findById(id);

    // Create a VariationTVA
    const variationTVA = new VariationTVA({
        nouvelleTVA: req.body.nouvelleTVA,
        ancienneTVA: p.TVA,
        dateDébut: dateDébut,
        dateFin: dateFin,
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