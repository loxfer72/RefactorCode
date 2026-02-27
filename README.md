# RefactorCode

## Description

Ce projet est un refactoring progressif du système legacy de génération de rapports de commandes.  
L'objectif est de rendre le code **lisible, maintenable et testable** sans modifier le comportement existant, validé par un **Golden Master**.

Le legacy reste intact dans `legacy/orderReportLegacy.ts`. Le refactoring est effectué progressivement dans `src/`.

---

## Structure du projet

order-report-legacy/
│
├── README.md
├── .gitignore
├── package.json
├── legacy/
│ ├── orderReportLegacy.ts # Script legacy original
│ ├── data/ # CSVs pour clients, commandes, produits, zones, promos
│ └── expected/ # Rapport Golden Master
│ └── report.txt
│
├── src/
│ ├── domain/ # Interfaces/types
│ │ ├── customer.ts
│ │ ├── index.ts
│ │ ├── order.ts
│ │ ├── product.ts
│ │ ├── shippingZone.ts
│ │ ├── promotion.ts
│ │ └── report.ts
│ │
│ └── services/ # Fonctions pures refactorées
│ ├── discountService.ts # Calcul des volume discounts
│ ├── loyaltyService.ts # Calcul points de fidélité et remise associée
│ ├── reportBuilder.ts # Construction de CustomerReport
│ ├── reportFormatter.ts # Formatage texte du rapport
│ └── generateReport.ts # Génération complète du rapport
│
└── tests/ # Tests unitaires Jest
└── services/
├── discountService.test.ts
├── loyaltyService.test.ts
├── reportBuilder.test.ts
└── generateReport.test.ts


---

## Scripts disponibles

| Commande                  | Description |
|----------------------------|-------------|
| `npm run legacy`           | Exécute le script legacy `orderReportLegacy.ts` directement avec ts-node |
| `npm test`                 | Exécute tous les tests Jest |
| `npm run test:watch`       | Exécute Jest en mode watch (reteste automatiquement les fichiers modifiés) |
| `npm run format`           | Formatte le code `src/**/*.ts` avec Prettier selon `.prettierrc` |

---

## Choix de refactoring réalisés

1. **Typage fort**  
   - Tous les types du legacy (`Customer`, `Order`, `Product`, `ShippingZone`, `Promotion`, `CustomerReport`) ont été définis dans `src/domain`.  
   - Plus d’utilisation de `any`.  

2. **Séparation des responsabilités**  
   - **Parsing / I/O** : reste côté legacy ou isolé dans les futurs adapters  
   - **Calculs métier** : déplacés dans des services purs et testables (`discountService`, `loyaltyService`)  
   - **Construction du rapport** : `reportBuilder`  
   - **Formatage du texte** : `reportFormatter`  
   - **Génération complète** : `generateReport`  

3. **Golden Master**  
   - Les tests garantissent que le refactor ne change pas le comportement legacy.  
   - Tests basés sur des données fixes et sorties comparées au Golden Master (`legacy/expected/report.txt`).  

4. **Fonctions pures et testables**  
   - Aucun effet de bord dans `discountService`, `loyaltyService`, `reportBuilder` et `reportFormatter`.  
   - Les tests unitaires sont déterministes.  

5. **Bug legacy documenté**  
   - Le calcul des remises par palier (`volumeDiscount`) **écrase les paliers précédents**, ce comportement est conservé pour le Golden Master.  
   - Commentaires ajoutés dans `discountService.ts`.  

6. **Refactoring progressif**  
   - Chaque étape du refactor est isolée en commit pour garantir les tests verts et la compatibilité avec le legacy.

---

## Comment contribuer / déroulement du refactoring

1. **Étape 1 :** Lecture et compréhension du legacy  
2. **Étape 2 :** Mise en place du **Golden Master** avec tests Jest  
3. **Étape 3 :** Refactoring itératif :
   - → Typage fort (`domain/`)  
   - → Extraction `discountService`  
   - → Extraction `loyaltyService`  
   - → Construction `CustomerReport` (`reportBuilder`)  
   - → Formatage et génération (`reportFormatter`, `generateReport`)  
4. **Étape 4 :** Tests unitaires additionnels pour valider chaque fonction pure  
5. **Étape 5 :** Documentation (README, commentaires, choix de refacto)  
6. **Étape 6 :** Relecture, nettoyage, validation finale  

---

## Tests

- Les tests sont dans `tests/services/`  
- Exécuter `npm test` pour vérifier le comportement refactoré  
- Tous les tests sont **indépendants des fichiers réels du legacy**, mais permettent de valider la logique métier et les calculs exacts.

---

## Formatage

- Prettier est utilisé pour standardiser le code.  
- Exécuter `npm run format` avant chaque commit recommandé.

---

Ce README peut évoluer au fur et à mesure que le refactor progresse et que de nouvelles fonctionnalités ou tests sont ajoutés.