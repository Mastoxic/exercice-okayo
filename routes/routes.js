module.exports = function(app) {

    let clients = require('../controllers/clientController.js');
    let factures = require('../controllers/factureController.js');
    let produits = require('../controllers/produitController.js');
    let variationTVAs = require('../controllers/variationTVAController.js');

    // test route
    app.get("/", (req, res) => {
    res.json({ message: "hi :)" });
    });
    
    // clients Routes
    app.post('/api/clientCreate', clients.create);
    app.get('/api/clients', clients.findAll);
    app.get('/api/client', clients.findOne);

    // factures Routes
    app.post('/api/factureCreate', produits.updateProduitsTVA, factures.create);
    app.get('/api/factures', factures.findAll);
    app.get('/api/facture', factures.findOne);

    // produits Routes
    app.post('/api/produitCreate', produits.create);
    app.get('/api/produits', produits.updateProduitsTVA, produits.findAll);
    app.get('/api/produit', produits.findByName);

    // variationTVAs Routes
    app.post('/api/variationTVACreate', variationTVAs.create);
    app.get('/api/variationTVAs', variationTVAs.findAll);
}