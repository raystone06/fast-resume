# Fast Resume — Éditeur CV IA

Éditeur de CV en ligne propulsé par l'IA. Créez, optimisez et exportez votre CV en PDF en quelques minutes.

## Fonctionnalités

- **Éditeur en temps réel** — modifications visibles instantanément dans l'aperçu
- **6 templates** — Modern, Classic, Minimal, Creative, Executive, Tech
- **IA (Gemini 2.5 Flash)** :
  - Amélioration automatique de chaque champ texte du CV
  - Analyse ATS avec score de compatibilité face à une offre d'emploi
  - Import CV depuis PDF ou image (extraction automatique des données)
- **Export PDF** — génération depuis l'aperçu rendu
- **Import/Export JSON** — sauvegarde et rechargement des données CV

## Prérequis

- Node.js 18+
- Clé API Google Gemini ([obtenir ici](https://aistudio.google.com/app/apikey))

## Installation

```bash
git clone git@github.com:raystone06/fast-resume.git
cd fast-resume
npm install
```

Copier et configurer les variables d'environnement :

```bash
cp .env.example .env
```

Éditer `.env` :

```env
# Obligatoire — toutes les fonctions IA en dépendent
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Mode : development | production | staging
VITE_APP_MODE=development
```

## Lancement

```bash
npm run dev      # Serveur de développement → http://localhost:5173
npm run build    # Build production (tsc + vite)
npm run preview  # Prévisualiser le build de production
```

## Utilisation

### Édition du CV

La sidebar gauche permet de naviguer entre les sections :
- **Profil** — infos personnelles, titre, résumé, coordonnées
- **Expériences** — postes, entreprises, dates, descriptions
- **Formation** — diplômes, établissements
- **Compétences** — nom, niveau (débutant / intermédiaire / avancé / expert), catégorie
- **Style** — choix du template et personnalisation visuelle

Chaque champ texte dispose d'un bouton IA pour améliorer automatiquement le contenu.

### Fonctions IA (header)

| Bouton | Fonction |
|--------|----------|
| **Analyse ATS** | Coller une offre d'emploi → score + mots-clés manquants + suggestions |
| **Import IA** | Uploader un PDF ou image de CV → extraction automatique de toutes les données |
| **Import JSON** | Recharger un CV exporté précédemment |
| **Export PDF** | Générer un PDF depuis l'aperçu actuel |

### Templates disponibles

| Template | Style |
|----------|-------|
| Modern | Épuré, coloré, mise en page contemporaine |
| Classic | Traditionnel, sobre, adapté aux secteurs formels |
| Minimal | Ultra-minimaliste, typographie seule |
| Creative | Design différenciant, pour les profils créatifs |
| Executive | Prestige, pour les profils senior/direction |
| Tech | Orienté développeurs, lisible par les ATS techniques |

## Docker (optionnel)

```bash
docker compose up --build
```

Nginx sert le build sur le port 80. Les scripts npm ne gèrent pas Docker — build manuel requis avant.

## Notes

- Aucune persistance — données perdues au rechargement (pas de backend ni localStorage)
- UI entièrement en français
- Clé Gemini exposée côté client (préfixe `VITE_`) — usage personnel uniquement, ne pas déployer publiquement sans proxy backend
