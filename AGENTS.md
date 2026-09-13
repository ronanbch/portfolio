# Portfolio — consignes Codex

## Projet
Site statique HTML/CSS/JavaScript dans `D:\_Mes sites\portfolio`, avec pages françaises, dossier `en`, images et documents. Lire les fichiers concernés avant de modifier une page. Le README documente le démarrage local via `node ./serve-local.mjs`.

## Préservation
- Inspecter `git status` avant toute modification ; préserver les changements de l'utilisateur.
- Conserver la structure des pages, les liens, les versions linguistiques et `vercel.json` (URLs sans extension et redirections de `old`).
- Ne pas introduire de framework ni de gestionnaire de dépendances pour une simple modification du site.
- Ne pas modifier `old` ou `base figma` sans besoin explicite.
- Une modification locale ne vaut pas demande de publication. Ne pas pousser ni déployer sans demande correspondante.

## Publication (réglages Vercel confirmés par l'utilisateur le 10 septembre 2026)
- Dépôt connecté : `ronanbch/portfolio` ; branche suivie par l'environnement Production : `main`.
- Un push sur `main` déclenche donc le circuit de production Vercel, associé à `www.ronanbch.com` et quatre autres domaines affichés dans Vercel.
- Pas de préproduction dédiée. Vercel configure les Preview pour « All unassigned git branches » ; cela ne constitue pas un passage obligatoire avant la production.
- Valider les changements localement avant toute publication explicitement demandée. Ne pas créer de préproduction ni modifier les réglages distants sans demande.

## Vérifications
- Aucun package.json ou test automatisé n'est actuellement présent à la racine.
- Vérifier les ressources locales et les liens des pages modifiées, puis leur rendu dans le navigateur, y compris sur écran étroit et dans la version anglaise concernée.
- Attention : `../serve-portfolio.mjs` pointe actuellement vers `portfolio_iteration`, dossier absent. Ne pas le présenter comme une prévisualisation fonctionnelle de ce projet. Utiliser un serveur local ciblant explicitement ce dossier ; reproduire les URLs sans extension de Vercel si nécessaire.

## Contexte Claude
La configuration commune est conservée dans `../.claude`. Les instructions SEO/marketing de ce dossier ciblent Addict Helper et ne doivent pas être appliquées aveuglément au portfolio. Les conversations Claude ne sont pas automatiquement reprises : demander un résumé des décisions manquantes si les fichiers ne suffisent pas.
