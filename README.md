# Casa Loan - Comida Callejera Latina 🌮

Un site web vitrine immersif et interactif conçu pour **Casa Loan**, un restaurant de street-food latino-américaine (comida callejera). Le site arbore une direction artistique unique sur le thème du **carton froissé et du papier kraft**, inspiré de leur identité Instagram.

## Features 🚀

- 📦 **DA Carton & Kraft Réaliste :** Texture haute résolution de carton froissé sur l'arrière-plan avec un effet de relief 3D.
- 📋 **Ticket de Caisse Interactif :** Menu de navigation stylisé en reçu de caisse qui glisse hors de l'écran lors du défilement et se rouvre via un bouton flottant minimaliste.
- 🍽️ **Système de Réservation de Table :** Formulaire interactif intégré dans une étiquette d'expédition postale pour réserver une table.
- 📸 **Galerie Polaroid / Instagram :** Photos de plats (birria tacos, margaritas, churros) présentées sous forme de clichés Polaroid scotchés, avec un compteur de likes interactif.
- 📱 **100% Responsive :** Adaptabilité complète sur mobile (boutons tactiles, ajustement typographique) et sur les grands écrans.

## Structure du Projet 📁

- `index.html` : Squelette HTML5 sémantique du site.
- `style.css` : Styles CSS3 personnalisés (DA carton, animations, responsive).
- `app.js` : Interactions dynamiques (filtrage du menu, scroll, likes interactifs).
- `assets/` : Dossier contenant les images générées de plats et la texture de carton.
- `Dockerfile` : Fichier pour conteneuriser le site.

## Comment lancer le projet localement ? 💻

### Avec un serveur Python local
Pour lancer un serveur de test rapide sur votre machine, exécutez la commande suivante dans le dossier du projet :
```bash
python3 -m http.server 8000
```
Puis ouvrez votre navigateur à l'adresse [http://localhost:8000](http://localhost:8000).

---

## Utilisation avec Docker 🐳

Vous pouvez facilement conteneuriser le site en utilisant Docker.

### 1. Construire l'image Docker
Dans le dossier contenant le `Dockerfile`, lancez :
```bash
docker build -t casa-loan-website .
```

### 2. Lancer le conteneur
Démarrez le conteneur en associant le port 80 à votre port local (ex: 8080) :
```bash
docker run -d -p 8080:80 casa-loan-website
```
Vous pouvez maintenant prévisualiser le site sur [http://localhost:8080](http://localhost:8080).

---

## Déploiement sur Netlify 🌐

Ce projet est prêt à être déployé en un clic sur Netlify.
1. Connectez-vous sur votre compte [Netlify](https://www.netlify.com/).
2. Choisissez **"Add a new site"** puis **"Import an existing project"**.
3. Sélectionnez votre dépôt GitHub `casa-loan-website`.
4. Laissez les paramètres de construction vides (le site est entièrement statique) et cliquez sur **Deploy**.
