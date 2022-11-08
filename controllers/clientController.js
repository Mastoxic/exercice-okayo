const Client = require('../models/clientModel.js');

// POST a Client
exports.create = (req, res) => {

    // Create a Client
    const client = new Client({
        codeClient: req.body.codeClient,
        nom: req.body.nom,
        adresse: req.body.adresse,
        téléphone: req.body.téléphone
    });

    // Save a Client in the MongoDB
    client.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// FETCH all Clients
exports.findAll = (req, res) => {
    Client.find()
    .then(clients => {
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// FIND a Client
exports.findOne = (req, res) => {
    Client.findOne({codeClient: req.body.codeClient})
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with codeClient " +
                req.body.codeClient
            });
        }
        res.send(client);
    }).catch(() => {
        return res.status(500).send({
            message: "Error retrieving Client with codeClient " +
            req.body.codeClient
        });
    });
};