# Projet Front End

L'objectif du projet sera de réaliser un frontend, de préférence en React.js/Next.js mais dans l'absolu avec n'importe quel framework frontend en utilisant ce backend comme API Rest.

## Fonctionnalités attendues 
* Afficher la liste des recettes paginée
* Afficher une recette spécifique
* Afficher les ingrédients d'une recette
* Mettre à jour la quantité d'ingredients lorsqu'on change le nombre de servings (uniquement côté client, sans sauvegarder en bdd ou autre)
* Ajouter une nouvelle recette avec des ingrédients
* Créer un conteneur docker pour lancer le backend et pour lancer les tests de celui ci


## Comment utiliser le backend
1. Cloner le projet
2. Modifier les `.env.dev` et `.env.test` pour y mettre les informations de votre database ou du conteneur. Vous pouvez aussi redéfinir le `SERVER_URL` si votre projet ne tourne pas sur http://localhost:8000
3. Faire un `composer install` pour installer les dépendances
4. Créer la bdd et charger les données : 
```
php bin/console do:da:cr
php bin/console do:mi:mi -q
php bin/console do:fi:lo -q
```
5. Pour préparer l'environnement de test :
```
php bin/console do:da:cr --env=test
php bin/console do:mi:mi -q --env=test
php bin/console do:fi:lo -q --env=test
```
6. Lancer les tests avec `php bin/phpunit`
7. Lancer le projet avec `symfony server:start` ou `php -t -S public localhost:8000` pour lancer le serveur sur http://localhost:8000

## Entités de l'application
```plantuml

class Recipe {
    
    id: int
    title:string
    category: string
    steps: string
    picture: string
    servings: int
}

class Ingredient {
    
    id: int
    label:string
    unit: string
    quantity: string
}

Recipe "1" -- "*" Ingredient
```

## Endpoints
Les endpoints sont consultables et testables sur http://localhost:8000/api

Seul la recipe possède des endpoint, la création/suppression d'ingredient se fait via la recipe directement tout comme la récupération des ingrédients d'une recette qui passe par la route http://localhost:8000/api/recipes/{id}/ingredients


## Conteneurisation de l'application
Il va probablement falloir plusieurs conteneurs/configuration pour le développement et le déploiement.

### Dév
Pour le dev, on peut partir sur une image php cli alpine qu'il faudra personnaliser dans un Dockerfile pour lui faire installer avec `docker-php-ext-install` au moins pdo et pdo_mysql (si on part sur une bdd mysql/mariadb).
Il faudra ensuite partager un volume pour rendre le code source disponible dans le conteneur et placer le terminal du conteneur dans le dossier en question avec `working_dir`.
La commande du conteneur de dév pourra être un `php -t public -S 0.0.0.0:8000` puis faire en sorte d'exposer le port 8000 sur le port qu'on veut de notre machine.

Pour la base de données, on peut partir sur une bdd de type mysql/mariadb, si jamais on part sur autre chose, alors il faut supprimer la [migration Version20251205154525](migrations/Version20251205154525.php) et refaire un `make:migration`

### Pour les tests en CI
La base du conteneur pourra être la même, mais il faudra changer la configuration pour exécuter au lancement du conteneur les `php bin/console do:mi:mi -q` et ` php bin/console do:fi:lo -q` suivis du `php bin/phpunit`.

À noter que dans la configuration du conteneur de base de données, il faudra également changer le nom de la bdd créée par le conteneur pour rajouter `_test` à la fin, car symfony rajoute ce suffixe à la bdd de test automatiquement

### Pour l'idée du déploiement
Pour déployer le projet, on partir plutôt d'une image php apache en créant un volume qui mettra le code source sur le conteneur. Ensuite dans le Dockerfile on fera comme indiqué dans [cette partie de la doc](https://hub.docker.com/_/php#changing-documentroot-or-other-apache-configuration) puis en indiquant la variable d'environnement `APACHE_DOCUMENT_ROOT` dans le docker-compose pour la faire pointer vers le dossier public de notre projet (par exemple, si on fait un volume `.:/app`, alors le `APACHE_DOCUMENT_ROOT` devra pointer sur `/app/public`).

Pas de commande spécifique à lancer à l'exécution du conteneur, car l'application tournera dans le apache qui est déjà exécuté par défaut.
