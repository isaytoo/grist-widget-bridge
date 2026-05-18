# Guide d'installation — Grist Widget Bridge

## Ce que fait cette extension

Elle débloque deux problèmes courants des widgets personnalisés Grist hébergés sur un domaine externe :

- ✅ **CORS** sur l'API Grist — l'upload de pièces jointes depuis le widget fonctionne
- ✅ **DOMException** sur `localStorage` — le widget peut mémoriser ses préférences (thème, réglages…)

L'extension est **agnostique de l'instance** : elle fonctionne avec n'importe quel serveur Grist (grist.numerique.gouv.fr, votre Grist auto-hébergé, etc.) et n'importe quel hébergeur de widget.

---

## Installation en 5 étapes (Chrome / Edge / Brave)

### Étape 1 — Récupérer le dossier

Téléchargez ou clonez le dossier `grist-widget-bridge-extension/` sur votre disque. **Ne le supprimez pas** après installation, l'extension en a besoin.

### Étape 2 — Ouvrir la page des extensions

Dans la barre d'adresse :

```
chrome://extensions
```

### Étape 3 — Activer le mode développeur

Bouton **« Mode développeur »** en haut à droite.

### Étape 4 — Charger l'extension

Cliquez **« Charger l'extension non empaquetée »** puis sélectionnez le dossier `grist-widget-bridge-extension/`.

### Étape 5 — Configurer vos URLs

Cliquez sur l'icône de l'extension dans la barre d'outils Chrome :

- **Sur la page de votre Grist** → bouton « + Comme instance Grist »
- **Sur la page de votre widget** → bouton « + Comme widget »

Rechargez les onglets concernés. C'est tout.

---

## Le menu (popup)

L'icône d'extension dans la barre d'outils ouvre un menu compact qui :

- Indique si l'onglet courant est reconnu (Grist actif / widget bridgé / aucune règle)
- Propose en un clic d'ajouter l'origine courante comme **instance Grist** ou comme **widget**
- Liste toutes les adresses configurées avec un × pour les retirer
- Ouvre la **configuration avancée** (page d'options) pour gérer la liste manuellement
- Permet de **recharger l'onglet** pour appliquer les changements

---

## Configuration avancée

Clic-droit sur l'icône → **« Options »**, ou bouton ⚙ Options dans le popup.

On peut y :

- ajouter manuellement plusieurs instances Grist (URL nue, sans `*`)
- ajouter manuellement plusieurs domaines de widgets (avec ou sans `/*` final, l'extension complète au besoin)
- supprimer des entrées
- réinitialiser la configuration par défaut

---

## Installation sur Firefox

1. `about:debugging` dans la barre d'adresse
2. Cliquez **« Ce Firefox »**
3. Cliquez **« Charger un module complémentaire temporaire »**
4. Sélectionnez le `manifest.json` du dossier

⚠️ Sur Firefox, l'extension temporaire disparaît à chaque redémarrage. Pour une installation permanente il faut passer par le Firefox Add-ons Store.

---

## Questions fréquentes

**« Comment ça fonctionne avec n'importe quelle instance Grist ? »**

L'extension n'a aucune URL en dur. Elle lit la liste de vos serveurs Grist et de vos widgets depuis sa configuration, puis :
- enregistre dynamiquement ses content scripts sur ces URLs (via `chrome.scripting`)
- pose dynamiquement les règles CORS sur l'API de chaque Grist (via `declarativeNetRequest`)

Ajouter un nouveau Grist se fait en un clic depuis le popup.

**« Mon navigateur dit que l'extension n'est pas vérifiée. »**

Normal : elle n'est pas (encore) publiée sur le Chrome Web Store. Le code est entièrement local et lisible — voir les fichiers `background.js`, `popup.js`, `grist-host-bridge.js` et `content-script.js`.

**« L'extension ralentit-elle mon navigateur ? »**

Non. Elle ne s'active **que** sur les URLs que vous avez explicitement configurées.

**« Comment la désinstaller ? »**

`chrome://extensions` → bouton **Supprimer**.
