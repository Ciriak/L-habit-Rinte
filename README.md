# L-habit-Rinte

Tp traitant de la génération ET résolution d'un labyrinthe.

Langage : **Javascript**

Algo de génération : **Exploration récursive**

Algo de résolution : **Backtracking**


##Preview
Une preview est disponible sur [ce codepen](http://codepen.io/Cyriaqu3/pen/YWPwMR).

##Installation
Dans ce repo j'utilise une serveur NodeJS mais vous pouvez simplement c/c les fichiers, du moment qu'ils soient dans le même repo.

Sinon

```npm install```

```node app.js```

##Génération du labyrinthe

![Illustration de l'algorythme utilisé](https://raw.githubusercontent.com/Cyriaqu3/L-habit-Rinte/master/public/img/maze_demo.gif)

- On génère un tableau ou toutes les cellules sont considérées comme **fermées** et **non visitées**

- On démarre à la cellule **0**

- On ajoute la cellule courante à l'**historique**.

- On regarde les cellules voisines non visitées

- S'il y a au moins une possibilité, on en choisit une au hasard, on ouvre le mur et on recommence avec la nouvelle cellule.

*A noter qu'étant donné la structure du JSON utilise (Bas ou droite), il faut ouvrir le mur du parent concerné le cas échéant CAD si il sagit d'un parent en Haut OU à Gauche)*

- S'il n'y en pas, on revient à la case précédente de l'historique et on recommence.

- Lorsque l'on est revenu à la case de départ et qu'il n'y a plus de possibilités, le labyrinthe est terminé.

##Résolution du Labyrinthe

[Lui l'explique mieux que moi](https://fr.wikipedia.org/wiki/Retour_sur_trace)
