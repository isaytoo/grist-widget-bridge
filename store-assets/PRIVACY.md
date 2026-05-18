# Politique de confidentialité — Grist Widget Bridge

*Dernière mise à jour : 2026-05-05*

## Résumé

**Cette extension ne collecte, ne stocke et n'envoie aucune donnée personnelle à un quelconque serveur tiers.**

## Données stockées localement

L'extension stocke uniquement deux listes d'URLs configurées par vous-même :

- `gristUrls` — la liste de vos serveurs Grist
- `widgetUrls` — la liste de vos domaines de widgets autorisés

Ces données sont enregistrées via `chrome.storage.sync`, ce qui signifie qu'elles peuvent être synchronisées entre vos appareils si vous êtes connecté à un compte Google et avez activé la synchronisation Chrome. Elles ne quittent jamais votre navigateur ni le service de synchronisation Google.

## Données traitées en mémoire (non stockées)

Lorsque vous utilisez un widget Grist :

- L'extension lit le contenu des messages `postMessage` envoyés par les iframes widgets
- Lors d'un upload, les fichiers sélectionnés transitent en mémoire avant d'être envoyés à l'API Grist via la session déjà authentifiée du navigateur (cookies)

Aucun fichier, aucun contenu de message et aucune session n'est jamais transmis ailleurs qu'à votre serveur Grist configuré.

## Permissions et leur usage

| Permission | Usage |
|---|---|
| `storage` | Sauvegarde des listes d'URLs configurées |
| `tabs`, `activeTab` | Détection de l'URL de l'onglet actif depuis le popup |
| `scripting` | Injection des scripts de pont sur les URLs configurées |
| `declarativeNetRequest*` | Ajout d'en-têtes CORS et `Origin-Agent-Cluster` sur les URLs configurées |
| `host_permissions: <all_urls>` | Permettre la configuration de **n'importe quelle** instance Grist ; l'extension n'agit que sur les URLs explicitement ajoutées |

## Cookies

L'extension n'écrit ni ne lit directement aucun cookie. Lors d'un upload, les requêtes vers votre serveur Grist incluent automatiquement les cookies de session déjà présents dans votre navigateur (`credentials: 'include'`), comme le ferait n'importe quel onglet de votre navigateur — c'est ce qui permet l'authentification.

## Tiers

L'extension ne contacte **aucun service tiers**. Toutes les communications sont :

- Locales (entre l'iframe widget et le contexte parent Grist)
- Vers votre propre serveur Grist (uniquement pour les uploads d'attachement)

Aucune analytics, aucun tracking, aucune télémétrie.

## Mises à jour

Toute modification matérielle de cette politique fera l'objet d'une nouvelle version de l'extension publiée sur le Chrome Web Store, avec une note dans le changelog.

## Contact

Pour toute question relative à la confidentialité, contactez l'auteur via l'email indiqué sur la fiche du Chrome Web Store.

## Code source

Le code source de l'extension est entièrement lisible. Vous pouvez vérifier vous-même chacune de ces affirmations en lisant les fichiers `background.js`, `popup.js`, `grist-host-bridge.js`, `content-script.js` et `options.js` du dossier de l'extension.
