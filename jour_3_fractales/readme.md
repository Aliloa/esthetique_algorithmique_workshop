# Présentation
- Projet réalisé en JavaScript avec la bibliothèque three.js

Les figures fractales sont censées être infinies. Pour contourner ça, j’ai voulu générer un visuel qui se répète en boucle.
L’idée était de donner l’impression de se déplacer à l’intérieur d’une figure fractale : la scène se génère au fur et à mesure du déplacement et se supprime lorsqu’elle sort du champ de vision. 

Le cubes sont générés en spirale et autour des cubes d'autres cubes sont generés pour créer un motif. Il devait y en avoir plus mais avec la 3D quand on met trop d'élements ça commence à ramer, donc même en supprimant les éléments hors champs je n'ai pas pu trop développer la figure.

## Installation et exécution

- Ouvrir le fichier index.html avec go live

### crédits:
- [Threejs.org](https://threejs.org/) documentation
- ChatGPT pour poser des questions sur three.js