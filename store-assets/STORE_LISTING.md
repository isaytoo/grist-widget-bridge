# Chrome Web Store — Grist Widget Bridge

Tout le contenu à coller dans le formulaire de soumission Chrome Web Store.

---

## Nom de l'extension

```
Grist Widget Bridge
```

## Résumé court (132 caractères max)

```
Débloque les widgets personnalisés Grist : CORS, localStorage et upload de pièces jointes — sur n'importe quelle instance.
```
*(124 caractères)*

## Description détaillée

```
Grist Widget Bridge est une extension utilitaire qui débloque les widgets personnalisés Grist hébergés sur un domaine externe (La Forge, GitHub Pages, votre propre serveur…).

Sans cette extension, les widgets cross-origin rencontrent deux problèmes systématiques :
1. L'API Grist refuse les requêtes pour cause de CORS
2. localStorage est bloqué par le navigateur (DOMException "The operation is insecure")

Cette extension corrige ces deux problèmes de manière propre, sécurisée et configurable.

🚀 FONCTIONNALITÉS

✅ Multi-instances — fonctionne avec n'importe quel serveur Grist (grist.numerique.gouv.fr, votre Grist auto-hébergé, gristlabs.com…)
✅ Multi-widgets — accepte autant d'origines de widgets que vous voulez (forge.apps.education.fr, github.io, votre site…)
✅ Menu en un clic — l'icône d'extension détecte l'onglet courant et propose « + Comme instance Grist » ou « + Comme widget » sans configuration manuelle
✅ Pont d'upload natif — les pièces jointes envoyées depuis le widget sont relayées via la session Grist existante (cookie), pas besoin d'API key
✅ Proxy localStorage transparent — bascule automatiquement vers chrome.storage quand le navigateur bloque localStorage, sans rien changer dans le code du widget
✅ Aucune URL en dur — l'extension n'est active que sur les adresses que vous avez explicitement configurées

🛡️ SÉCURITÉ

• Aucune donnée n'est envoyée à un serveur tiers
• L'extension n'agit QUE sur les URLs que vous avez configurées
• Le pont d'upload n'accepte les messages que d'iframes enfants connues
• Vérification stricte de l'origine du message à chaque appel
• Pas d'accès aux données du document, uniquement à l'API d'attachement

📋 CAS D'USAGE

• Widgets personnalisés EBEP, Kanban, Calendrier, Gantt hébergés sur La Forge
• Widgets développés en interne hébergés sur votre intranet
• Tests locaux de widgets pendant le développement (localhost)
• Multi-tenant : plusieurs Grist d'organisations différentes

⚡ INSTALLATION RAPIDE

1. Installez l'extension
2. Ouvrez votre page Grist → cliquez l'icône → « + Comme instance Grist »
3. Ouvrez votre page widget → cliquez l'icône → « + Comme widget »
4. Rechargez les onglets — c'est tout

🔓 OPEN SOURCE

Le code source est entièrement local et lisible : aucun serveur distant, aucune télémétrie. Ouvrez n'importe quel fichier .js du dossier de l'extension pour vérifier ce qu'elle fait.

— Pour qui ?
Toute personne qui développe ou utilise des widgets personnalisés Grist sur un domaine externe : DSI, intégrateurs, formateurs, développeurs.
```

## Catégorie

`Productivité` (Productivity)

## Langue

`Français` — vous pouvez ajouter `Anglais` plus tard avec une description traduite.

## Site web (optionnel)

Si vous publiez le code sur GitHub : `https://github.com/<votre-user>/grist-widget-bridge-extension`

Sinon laissez vide.

## URL de la politique de confidentialité

⚠️ **Obligatoire**. L'extension ne collecte aucune donnée, mais Google exige une URL. Deux options :

1. Hébergez le fichier `PRIVACY.md` (fourni dans `store-assets/`) sur GitHub Pages, votre site, ou un Gist.
2. Utilisez un service gratuit comme [app-privacy-policy-generator.firebaseapp.com](https://app-privacy-policy-generator.firebaseapp.com).

## Email de contact

Votre email — il sera affiché publiquement sur la fiche.

---

## Justification des permissions (à coller dans la section « Single purpose »)

### Single purpose
```
Cette extension a un objectif unique : débloquer les widgets personnalisés Grist en injectant les en-têtes CORS nécessaires sur l'API Grist et en corrigeant l'accès à localStorage dans les iframes cross-origin. Elle ne fait rien d'autre que ce qui est nécessaire à cet objectif.
```

### Permissions justifiées

**`storage`**
```
Sauvegarde la liste des instances Grist et des domaines de widgets configurés par l'utilisateur, synchronisée via le compte Google.
```

**`tabs`**
```
Lit l'URL de l'onglet actif lorsque l'utilisateur ouvre le popup, afin d'afficher si l'onglet est reconnu et de proposer un bouton « Ajouter à la config ».
```

**`activeTab`**
```
Permet le bouton « Recharger l'onglet » dans le popup, pour appliquer les nouvelles règles après une modification de la config.
```

**`scripting`**
```
Enregistre dynamiquement les content scripts (le pont Grist et le proxy localStorage) sur les seules URLs configurées par l'utilisateur. Sans cette permission, l'extension devrait avoir des content scripts en dur dans le manifeste, ce qui empêcherait son fonctionnement multi-instances.
```

**`declarativeNetRequest` + `declarativeNetRequestWithHostAccess`**
```
Modifie deux en-têtes HTTP de réponse :
1. Sur l'API Grist : ajoute les en-têtes CORS pour permettre les requêtes depuis l'iframe widget.
2. Sur les pages widget : positionne « Origin-Agent-Cluster: ?0 » pour que localStorage redevienne accessible.
Aucune requête n'est bloquée ni redirigée. Seuls deux en-têtes sont ajoutés sur les URLs explicitement configurées par l'utilisateur.
```

**`host_permissions: <all_urls>`** *(le plus sensible — à bien justifier)*
```
L'extension est conçue pour fonctionner avec n'importe quelle instance Grist (grist.numerique.gouv.fr, instances auto-hébergées, organisations privées) et n'importe quel hébergeur de widget personnalisé. Comme nous ne pouvons pas connaître à l'avance les domaines de chaque utilisateur, l'extension demande l'accès large mais ne s'active QUE sur les URLs que l'utilisateur a explicitement ajoutées dans sa configuration. Aucun script n'est injecté et aucun en-tête n'est modifié sur les autres sites.
```

---

## Screenshots à fournir (1280×800 — minimum 1, max 5)

Voir les templates HTML dans `store-assets/` :

| Fichier | Sujet |
|---|---|
| `screenshot-1-popup-active.html` | Popup affichant « Instance Grist active » sur une page Grist réelle |
| `screenshot-2-popup-add.html`    | Popup affichant les boutons « + Comme instance Grist » et « + Comme widget » |
| `screenshot-3-options.html`      | Page de configuration avancée avec plusieurs URLs configurées |
| `screenshot-4-architecture.html` | Schéma simple « Widget → Bridge → Grist API » |

## Image promo Marquee (optionnelle, 1400×560)

Fichier : `promo-marquee.html` — bandeau hero pour fiche en avant.

## Image promo Small Tile (recommandée, 440×280)

Fichier : `promo-small.html` — vignette dans les listings du store.

## Comment convertir les HTML en PNG

Voir `store-assets/README.md`.
