# exercice-okayo

Dans le cadre de cet exercice, j'ai fait une api permettant de stocker et consulter des factures.
Elle permet donc aussi d'ajouter et consulter des clients et pareil pour les produits.
On peut aussi modifier la TVA, à une date précise ou pour une période donnée.
On peut aussi modifier le nom ou le prix d'un produit/prestation.


## Utilisation

Ouvrir l'invite de commande et aller à l'emplacement du projet puis entrer la commande suivante:
```npm start
```
Cela permet de lancer l'api en local.

Ensuite, on peut utiliser l'api et ses différentes requêtes, comme:
```http://localhost:5000/api/factures``` qui donnera la liste de toutes les factures,
```http://localhost:5000/api/factureCreate``` qui permet de créer et stocker une facture,
```http://localhost:5000/api/updateProduitWithName``` qui permet de modifier un produit à partir de son nom


Thomas Casasnovas
