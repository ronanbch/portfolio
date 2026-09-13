# Portfolio de Ronan Benec'h

Site statique HTML/CSS/JavaScript, en français et en anglais.

## Prévisualisation locale

Avec Node.js installé, depuis ce dossier :

```powershell
node ./serve-local.mjs
```

Ouvrir http://127.0.0.1:4173/ (français) ou http://127.0.0.1:4173/en/ (anglais).
Arrêter avec `Ctrl+C`. Pour choisir un autre port dans PowerShell :

```powershell
$env:PORT = '4174'
node ./serve-local.mjs
```

Le serveur écoute uniquement sur la boucle locale et cible le dossier du script,
quel que soit le répertoire de lancement. Il sert les URL sans extension et les
redirections explicites de `vercel.json`. Ce n'est pas un émulateur complet de Vercel.
Aucune installation de dépendances, compilation ou publication n'est nécessaire.

Ne pas utiliser `../serve-portfolio.mjs` : il cible `portfolio_iteration`, absent.
