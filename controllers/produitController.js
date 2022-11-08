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
    produit.prixTTC = (1+produit.TVA)*produit.prixHT

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


// UPDATE all Produits' TVA
exports.updateProduitsTVA = (req, res, next) => {

    const VariationTVA = require('../models/variationTVAModel.js');

    // get all Produits
    Produit.find()
    .then(async produits => {
        let today = Date.now();
        // get all past or current VariationTVAs of all products
        let allVariationTVAs = await VariationTVA.find({dateDébut:{$lt:today}}).sort({dateDébut:1});
        for (let p of produits) {
            // get all past or current VariationTVAs of each Produit
            var variationTVAs = allVariationTVAs.filter(tva => tva.idProduit.equals(p._id));
            for (let tva of variationTVAs) {
                // if past
                if (tva.dateFin != null && tva.dateFin < today) {
                    if (tva.nouvelleTVA == p.TVA) {
                        let nouveauPrixTTC = (1+tva.ancienneTVA)*p.prixHT;
                        await Produit.findByIdAndUpdate(p._id, {$set:{TVA: tva.ancienneTVA, prixTTC: nouveauPrixTTC}});
                    }
                }
                // if current
                else {
                    let nouveauPrixTTC = (1+tva.nouvelleTVA)*p.prixHT;
                    await Produit.findByIdAndUpdate(p._id, {$set:{TVA:tva.nouvelleTVA, prixTTC: nouveauPrixTTC}});
                }
            }
        }
    })
    .then(() => {
        next();        
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// FIND a Produit by name
exports.findByName = (req, res) => {
    Produit.findOne({nom: req.body.nom})
    .then(produit => {
        if(produit) {
            return res.status(404).send({
                message: "Produit not found with name " +
                req.body.nom
            });
        }
        res.send(produit);
    }).catch(() => {
        return res.status(500).send({
            message: "Error retrieving Produit with name " +
            req.body.nom
        });
    });
};

// UPDATE a Produit with id
exports.updateById = (req, res) => {
    // Find produit and update it
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.id);
    Produit.findByIdAndUpdate({ _id: id }, {
        ...req.body.changes
    })
    .then(produit => {
        if(!produit) {
            return res.status(404).send({
                message: "Produit not found with id " +
                req.body.id
            });
        }
        res.send("produit updated successfully");
    }).catch(() => {
        return res.status(500).send({
            message: "Error updating Produit with id " +
            req.body.id
        });
    });
};

// UPDATE a Produit with name
exports.updateByName = (req, res) => {
    // Find produit and update it
    Produit.findOneAndUpdate({ nom: req.body.nom }, {
        ...req.body.changes
    })
    .then(produit => {
        if(!produit) {
            return res.status(404).send({
                message: "Produit not found with name " +
                req.body.nom
            });
        }
        res.send("produit updated successfully");
    }).catch(() => {
        return res.status(500).send({
            message: "Error updating Produit with name " +
            req.body.nom
        });
    });
};