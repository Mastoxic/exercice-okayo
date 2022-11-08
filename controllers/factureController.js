const Facture = require('../models/factureModel.js');

// POST a Facture
exports.create = async (req, res) => {
    const mongoose = require('mongoose');
    const Produit = require('../models/produitModel.js');

    let totalHT = 0;
    let totauxTVA = {};
    let totalTTC = 0;

    let listeProduits = [];
    for (const produit of req.body.listeProduits) {
        let id = mongoose.Types.ObjectId(produit.produit);
        let object = await Produit.findById(id);
        let p = {...object};
        p = p._doc;
        if (p.quantité < 1) {
            res.status(500).send({
                message: "the product " + p.nom + " in the bill isn't available at the moment"
            });
            return;
        }
        await Produit.findByIdAndUpdate(id, {$set:{quantité:p.quantité - produit.quantité}});
        p.quantité = produit.quantité;
        p.prixTotalHT = p.quantité*p.prixHT;
        p.prixTTC = p.prixTotalHT*(1+p.TVA);
        totalHT += p.prixTotalHT;
        totalTTC += p.prixTTC;
        if (p.TVA.toString() in totauxTVA){
            totauxTVA[p.TVA.toString()] += p.prixTotalHT*p.TVA;
        }
        else {
            totauxTVA[p.TVA.toString()] = p.prixTotalHT*p.TVA;
        }
        listeProduits.push(p);
    }

    let dateFacturation = Date.now();
    // Check if the user entered a date
    if (typeof req.body.dateFacturation != "undefined") {
        dateFacturation = new Date(req.body.dateFacturation);
    }

    // Create a Facture
    const facture = new Facture({
        ref: req.body.ref,
        dateEchéance: new Date(req.body.dateEchéance),
        dateFacturation: dateFacturation,
        codeClient: req.body.codeClient,
        listeProduits: listeProduits,
        totalHT: totalHT,
        totauxTVA: totauxTVA,
        totalTTC: totalTTC
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

// FIND a Facture
exports.findOne = (req, res) => {
    Facture.findOne({ref: req.body.ref})
    .then(facture => {
        if(!facture) {
            return res.status(404).send({
                message: "Facture not found with ref " +
                req.body.ref
            });
        }
        res.send(facture);
    }).catch(() => {
        return res.status(500).send({
            message: "Error retrieving Facture with ref " +
            req.body.ref
        });
    });
};