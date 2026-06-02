/* ============================================================
   AFRITALENT — MAIN.JS
   Commit 6 : Dark mode + localStorage, Navbar dynamique,
               Bouton retour en haut, Année dynamique
   ============================================================ */


/* ============================================================
   1. ANNÉE DYNAMIQUE DANS LE FOOTER
   ============================================================ */

/*
   document.getElementById('currentYear')
   → cherche l'élément HTML qui a l'attribut id="currentYear".
   C'est le <span id="currentYear"> dans le footer de chaque page.

   new Date().getFullYear()
   → crée un objet Date (date actuelle) et extrait l'année (ex: 2026).

   .textContent = ...
   → insère l'année dans le span.
   Résultat : <span id="currentYear">2026</span>
   Le copyright s'actualise automatiquement chaque année.
*/
const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

/* ============================================================
   2. DARK MODE / LIGHT MODE
   Toggle depuis la navbar + sauvegarde dans localStorage
   ============================================================ */

/*
   Récupération du bouton dark mode (id="darkModeToggle")
   présent dans la navbar de TOUTES les pages.
*/
const darkModeToggle = document.getElementById('darkModeToggle');


/*
   Fonction applyTheme(theme)
   → applique le thème 'dark' ou 'light' sur la page.

   Paramètre : theme = 'dark' ou 'light'

   Actions :
   1. Ajoute data-theme="dark" ou "light" sur le <body>
      → le CSS [data-theme="dark"] change toutes les couleurs
   2. Change l'icône du bouton (lune ↔ soleil)
   3. Change la couleur du bouton (gris ↔ jaune)
*/
function applyTheme(theme) {

  /* Étape 1 : appliquer l'attribut sur le body */
  document.body.setAttribute('data-theme', theme);

  /* Étape 2 : récupérer l'icône <i> dans le bouton */
  const icon = darkModeToggle ? darkModeToggle.querySelector('i') : null;

  if (theme === 'dark') {

    /* MODE SOMBRE : lune → soleil, bouton gris → jaune */
    if (icon) {
      icon.classList.remove('bi-moon-fill');
      icon.classList.add('bi-sun-fill');
    }
    if (darkModeToggle) {
      darkModeToggle.classList.remove('btn-outline-secondary');
      darkModeToggle.classList.add('btn-outline-warning');
    }

  } else {

    /* MODE CLAIR : soleil → lune, bouton jaune → gris */
    if (icon) {
      icon.classList.remove('bi-sun-fill');
      icon.classList.add('bi-moon-fill');
    }
    if (darkModeToggle) {
      darkModeToggle.classList.remove('btn-outline-warning');
      darkModeToggle.classList.add('btn-outline-secondary');
    }
  }
}
/*
   Lecture du thème sauvegardé au CHARGEMENT de chaque page.

   localStorage.getItem('theme')
   → lit la valeur stockée dans le navigateur sous la clé 'theme'.
   Retourne null si l'utilisateur n'a jamais choisi de thème.

   || 'light'
   → si null (première visite), utilise 'light' par défaut.

   C'est ce qui permet au thème de PERSISTER entre les pages :
   chaque page lit localStorage au démarrage et applique le thème.
*/
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

/*
   Écouteur de clic sur le bouton dark mode.

   À chaque clic :
   1. On lit le thème actuel depuis data-theme du body
   2. On calcule le nouveau thème (l'opposé)
   3. On applique le nouveau thème
   4. On sauvegarde dans localStorage

   localStorage.setItem('theme', newTheme)
   → stocke 'dark' ou 'light' sous la clé 'theme'.
   Persiste même après fermeture du navigateur.
*/
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', function () {

    /* Lire le thème actuel */
    const currentTheme = document.body.getAttribute('data-theme') || 'light';

    /* Calculer le nouveau thème (inverse de l'actuel) */
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    /* Appliquer visuellement */
    applyTheme(newTheme);

    /* Sauvegarder pour persistance entre les pages */
    localStorage.setItem('theme', newTheme);
  });
}

/* ============================================================
   3. NAVBAR DYNAMIQUE AU SCROLL
   Effet "shrink" après 50px de défilement
   ============================================================ */

/*
   Récupération de la navbar par son id="navbar".
*/
const navbar = document.getElementById('navbar');

/*
   Fonction handleNavbarScroll()
   → adapte le style de la navbar selon la position de scroll.

   window.scrollY
   → nombre de pixels scrollés depuis le haut de la page.
   0 = en haut, augmente quand on descend.

   Si scrollY > 50 :
   → ajoute la classe CSS 'scrolled' à la navbar.
   → le CSS .navbar.scrolled réduit le padding (effet shrink)
     et renforce l'ombre.

   Sinon :
   → retire la classe 'scrolled' → navbar taille normale.
*/
function handleNavbarScroll() {
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

/*
   Écoute du scroll sur toute la fenêtre.
   handleNavbarScroll() s'exécute à chaque mouvement de scroll.
*/
window.addEventListener('scroll', handleNavbarScroll);

/*
   Appel immédiat au chargement.
   Si l'utilisateur recharge la page en bas, la navbar
   aura déjà le bon style sans attendre un scroll.
*/
handleNavbarScroll();

/* ============================================================
   4. BOUTON RETOUR EN HAUT
   Apparaît après 300px de scroll, remonte en douceur au clic
   ============================================================ */

/*
   Récupération du bouton id="backToTop".
*/
const backToTopBtn = document.getElementById('backToTop');






/*
   Fonction handleBackToTop()
   → affiche ou masque le bouton selon la position de scroll.

   Si scrollY > 300 : display = 'flex' → bouton visible.
   On utilise 'flex' (pas 'block') pour centrer l'icône
   grâce aux propriétés align-items et justify-content du CSS.

   Sinon : display = 'none' → bouton caché.
*/
function handleBackToTop() {
  if (!backToTopBtn) return;

  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
}

/* Écoute du scroll pour gérer l'affichage du bouton */
window.addEventListener('scroll', handleBackToTop);

/* Vérification initiale au chargement */
handleBackToTop();

/*
   Clic sur le bouton → remonter en haut de page.

   window.scrollTo({ top: 0, behavior: 'smooth' })
   → défile jusqu'au pixel 0 (haut de page).
   behavior: 'smooth' → animation fluide et progressive.
   Sans 'smooth', le saut serait instantané et brutal.
*/
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

