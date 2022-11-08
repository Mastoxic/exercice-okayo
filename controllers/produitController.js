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
exports.updateProduitsTVA = (req, res) => {

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
        res.send("TVA des produits actualisée");
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};