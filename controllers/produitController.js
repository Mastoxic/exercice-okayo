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


// UPDATE all Produits' TVA
exports.updateProduitsTVA = (req, res) => {

    const VariationTVA = require('../models/variationTVAModel.js');

    // get all Produits
    Produit.find()
    .then(async produits => {
        let today = Date.now();
        // get all past or current VariationTVAs of all products
        let allVariationTVAs = await VariationTVA.find({dateDébut:{$lt:today}},{dateDébut:1,_id:0}).sort({dateDébut:1});
        for (let p in produits) {
            // get all past or current VariationTVAs of each Produit
            var variationTVAs = allVariationTVAs.filter(tva => tva.idProduit == p.idProduit);
            for (let tva in variationTVAs) {
                // if past
                if (tva.dateFin < today) {
                    if (tva.nouvelleTVA == p.TVA) {
                        p.TVA = tva.ancienneTVA;
                    }
                }
                // if current
                else {
                    p.TVA = tva.nouvelleTVA;
                }

            }
            await Produit.updateOne({idProduit:p.idProduit}, {$set:{TVA:p.TVA}});
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