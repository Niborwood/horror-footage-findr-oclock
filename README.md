# Horror Footage Findr

Une poignée de questions. Votre found footage dispo.

 Créé par :

- Kevin Bazillio
- Corentin Couzigou
- Arnaud Delperier
- Sophie Meignon
- Robin Souriau
  
 License GNU General Public License v3.0.

## Table des matières

1. [**Contexte du projet**](#1-contexte-du-projet)
2. [**Choix des technologies**](#2-choix-des-technologies)
3. [**Liste des fonctionnalités**](#3-liste-des-fonctionnalités)
4. [**Détail des fonctionnalités**](#4-détail-des-fonctionnalités)
5. [**Spécificités**](#5-spécificités)
6. [**Ressources**](#6-ressources)

---

## 1. Contexte du projet

### 1.1 Qui sommes-nous ?

Après 5 mois de formation intensives en développement web au sein de l'école O'Clock, un projet d'apothéose nous est confié.

Nous avons donc un tout petit peu moins d'un mois pour concevoir et développer une application, en situation professionnelle. Notre groupe est composé de cinq personnes :

#### Spécialistation Front/React

- Corentin Couzigou
- Arnaud Delperier
- Robin Souriau

#### Spécialisation Back/API

- Kevin Bazillio
- Sophie Meignon

Tous les individus du groupe sont développeurs fullstack JS, et sont donc capables d'intervenir sur n'importe quelle fonctionnalité de l'application à développer.

Leurs rôles précis au sein de l'équipe sont [développés ici](#16-rôles-de-léquipe).

### 1.2 Pourquoi ce projet ?

Dans la vie, il y a deux types de personnes. Ceux qui demandent conseil pour voir des films, et ceux qui donnent des conseils à ceux qui veulent voir des films. Lorsque l'on se place dans la seconde situation, la passion laisse souvent place à quelques obstables : oublis, filmographie incomplète, définition des goûts de son interlocuteur...

Pourquoi ne pas confier ça à une application ? Horror Footage Finder propose de lier les goûts et les envies aux algorithmes et aux base de données pour fournir des recommandations pertinentes et exhaustives aux curieux et aux cinéphiles.

Ce genre d'application existe déjà de manière générale pour des personnalités et figures publiques, mais ne fait pas encore ses preuves sur des éléments culturels précis comme le cinéma, ou ici, le cinéma d'horreur.

Dans un premier temps, Horror Footage Finder limite ses résultats à un sous-genre précis de l'horreur, les found footage, pour des raisons d'échelle et de délai de projet.

### 1.3 Qu'est-ce que Horror Footage Finder ?

L'application propose de poser quelques questions à un user pour qu'il puisse choisir son found footage à voir, parmi une liste de 100+ found footages.  

Elle est appelée par le nom :

- **[ &#8227; ] HORROR FOOTAGE FINDR.**
- Le nom **HORROR FOOTAGE FINDER** peut être également raccourci en tant que : ( **[&#8227;HFF]** ).

### 1.4 Quelle est la cible du projet ?

La cible du projet est un public cinéphile. Plus particulièrement, l'application s'adresse :

- aux amoureux des films de genre qui souhaitent avoir des recommandations pointues sur un genre ou des critères bien précis,
- aux curieux qui souhaitent découvrir le genre via leurs goûts personnels.

### 1.5 L'existant

Un prototype, sans base de données ni framework JavaScript existe en tant que démo fonctionnelle du projet. Elle est accessible ici :

[Found Footage Finder, GitHub](https://niborwood.github.io/found-footage-finder/)

### 1.6 Rôles de l'équipe

#### Product Owner

Tranche s'il y a des désaccords

- WWW

#### Scrum Master

Garant de la méthode du projet : il gère le respect des conventions définies dans le groupe. Il s'assure que toutes les tâches sont bien attribuées, suivies et accomplies.

Il gère l'outil de suivi du projet et vérifie que tout le monde possède les bonnes informations. Il anime la réunion du matin et l'avancement du projet.

- XXX

#### Lead Dev

Il y a un Lead Dev Front, et un Lead Dev Back. Il choisit les orientations et les choix techniques importants, et s'assure du bon fonctionnement de sa partie du projet.

##### Lead Dev Front

- YYYAAA

##### Lead Dev Back

- YYYBBB

#### Git Master

Garant du bon fonctionnement du versionning de Git. Il vérifie les Pull Request, et gère les conflits.

- ZZZ

#### Référent technique

Chaque référent est celui qui s'informe, se documente sur une technologie, sa sémantique, son utilisation... Il restitue les informations au groupe.

- React : XXX
- Redux : YYY
- PSQL : ZZZ

## 2. Choix des technologies

L'application gère à la fois le front et le back grâce aux technologies suivantes :

### 2.1 Partie front

#### HTML/CSS

#### React/Redux

### 2.2 Partie back

#### API > NodeJS/Express

#### PSQL ? Mongo ?

#### API : TMdB (The Movie DataBase)

### 2.3 Navigateurs compatibles

L'application doit être camptaible avec l'ensemble des navigateurs du marché, sans plug-in ni module supplémentaire à installer, autant sur desktop que sur tablette ou mobile.

## 3. Liste des fonctionnalités

### 3.1 Légende

- **[MVP]** : Minimum Viable Product
- [I] : Important
- *[S]* : Secondaire

### 3.2 Fonctionnalités

1. **[MVP]** **Poser des questions au user pour trouver un found footage qui correspond à ses envies**
2. **[MVP]** **Afficher le found footage suivant un modèle front**
3. **[MVP]** **Créer un compte utilisateur pour stocker ses derniers résultats et ses films favoris (watchlist)**
4. [I] Afficher les métadonnées du film grâce à une base de données externe
5. [I] Pouvoir laisser des notes par utilisateur, par film, pour générer une moyenne interne au site
6. *[S] Exporter en une image ses résultats pour les réseaux sociaux*
7. *[S] Traduire l'application en français et en anglais*
8. *[S] Permettre de passer les animations, pour l'accessibilité et le confort de réutilisation*
9.  *[S] Exclure les films déjà vus pour les utilisateurs connectés*

### 3.3 Arborescence de l'application

- Splash
- Login/Register
  - Account
  - Watchlist
  - My Answers
- Home
- Quiz
  - Question
  - QuizEnd
  - Result

### 3.4 User Stories

| Thème  | En tant que... | J'ai besoin de... | Afin de... |
|---|---|---|---|
| Login  | Utilisateur non connecté  | choisir si je me connecte  | enregistrer mes futurs réponses |
| Accueil | Utilisateur | lancer le quiz | obtenir des films à regarder |
| ... | ... | ... | ... |

## 4. Détail des fonctionnalités

### 4.1 **[MVP]** Poser des questions au user pour trouver un found footage qui correspond à ses envies

L'application a pour but de poser une série de questions d'ordre général puis de plus en plus précises sur les goûts du user pour l'aiguiller vers une réponse qui correspond à ses attentes.

Le questionnaire n'est pas fixe : suivant les réponses aux questions, les questions sont gérées dynamiquement. Cela se traduit par le fait que le user ne tombe jamais sur un résultat vide.

### 4.2 [MVP] Afficher le found footage suivant un modèle front

Une fois les questions répondues et analysées via l'algorithme de l'application, l'application affiche le film suivant un modèle esthétique et technique cohérent.

### 4.3 [MVP] Créer un compte utilisateur pour stocker ses derniers résultats et ses films favoris

Chaque internaute peut parcourir le site de manière anonyme, mais peut également s'inscrire/se connecter. En ce cas, chacun de ses passages dans le quiz est enregistré.

Sur sa page de profil, il peut consulter ses derniers quizs, revoir leurs résultats. Pour chaque résultat, il peut sauvegarder chaque film dans sa *watchlist*.

### 4.4 [I] Afficher les métadonnées du film grâce à une base de données externes

L'application utilise une API externe pour accéder aux données des films. Cette API est celle de [The Movie Database](https://www.themoviedb.org/?language=fr).

L'API TMDB complète la base de données locale de films que nous crééons, indispensable pour certaines données précises.

### 4.5  [I] Pouvoir laisser des notes par utilisateur, par film, pour générer une moyenne interne au site

Lorsque l'utilisateur a déjà vu un film proposé, il peut le noter comme "déjà vu" et y apposer une note. Cette note sera aggrégée par l'ensemble des utilisateurs pour générer une note spécifique à l'application.

### 4.6  [S] Exporter en une image ses résultats pour les réseaux sociaux

A l'instar de fonctionnalités que le Year Review de Spotify, l'application proposera d'exporter une image des résultats de son quiz sous forme d'image pour les réseaux sociaux.

### 4.7 [S] Traduire l'application en français et en anglais

Au début de l'utilisation de l'application, l'utilisateur a le choix de traduire l'application en français ou en anglais.

Cette traduction impacte également la langue des données de l'API TMDB.

### 4.8 [S] Permettre de passer les animations, pour l'accessibilité et le confort de réutilisation

En début d'application, l'utilisateur peut passer les animations et les différents artefacts visuels (clignotements, gifs, animations) pour une navigation plus rapide ou pour des questions d'accessibilité du contenu.

### 4.9 [S] Exclure les films déjà vus pour les utilisateurs connectés

En lien avec la fonctionnalité **4.5. Pouvoir laisser des notes par utilisateur, par film**, au moment d'afficher les résultats de ses questions, l'utilisateur peut choisir d'exclure les films qu'il a déjà vus.

## 5. Prestations attendues

### 5.1 Charte graphique et éditoriale

L'application a pour but de prendre une esthétique reprenant les codes de celle VHS/90's. L'ensemble doit être le plus ludique et original possible, sans jamais perdre de vue son aspect fonctionnel. 

Dans l'idéal, la même idée de tension qu'un film d'horreur doit transparaître du site, tout en veillant à réaliser des choix pertinents au niveau de l'UI pour que l'utilisateur navigue sans accroc entre les différentes fonctionnalités du site.

#### Quelques inspirations visuelles

![The House Abandon - Stories Untold, NoCode](https://cdn.cloudflare.steamstatic.com/steam/apps/558420/ss_ac4195725ed0a72e03223055303b912d36ed364c.1920x1080.jpg?t=1568650809)
> The House Abandon - Stories Untold, NoCode

![The Blair Witch Project, Daniel Myrick, Eduardo Sanchez](https://filmschoolrejects.com/wp-content/uploads/2019/01/blair-witch-project.jpg)
> The Blair Witch Project, Daniel Myrick, Eduardo Sanchez

![Found Footage Gifs, WiffleGif](https://38.media.tumblr.com/f734163fa35816f30ae696b44f5bffe5/tumblr_ns9efs0onX1qco1x4o1_400.gif)
> Found Footage Gifs, WiffleGif

### 5.2 Responsive

**Horror Footage Finder** est une application mobile-first et doit être entièrement responsive pour respecter les usages nomades du web.

## 6. Ressources

- Police : [VCR OSD Mono](https://www.dafont.com/vcr-osd-mono.font)
- Data des films : [The Movie Database](https://www.themoviedb.org/?language=fr)

[Retour en haut de document](#horror-footage-findr)