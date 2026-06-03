/* ============================================================
   AFRITALENT — MAIN.JS
   Commit 6 : Dark mode + localStorage, Navbar dynamique,
               Bouton retour en haut, Année dynamique
   ============================================================ */
/*
   Ce fichier contient la logique JavaScript partagée par toutes les
   pages du site : navigation, thème sombre, animation au scroll,
   boutons interactifs et formulaires.
*/

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

/* ============================================================
   COMMIT 7 — À COLLER À LA FIN DE TON main.js
   Compteurs animés + Animations fade-in au scroll
   ============================================================ */


/* ============================================================
   COMPTEURS ANIMÉS AU SCROLL
   Les chiffres passent de 0 à leur valeur cible
   ============================================================ */

/*
   On sélectionne tous les éléments qui ont la classe stat-number.
   Ce sont les chiffres : 2500, 800, 12000 etc.
   Ils existent sur index.html et about.html.
*/
const counters = document.querySelectorAll('.stat-number');

/*
   animateCounter(element)
   → fait compter un chiffre de 0 jusqu'à sa valeur cible.

   Comment ça marche :
   - On lit la valeur cible depuis data-target (ex: 2500)
   - On divise par 50 pour avoir l'incrément à chaque étape
   - Toutes les 30ms, on ajoute l'incrément
   - Quand on atteint la cible, on s'arrête
*/
function animateCounter(element) {

  /* Lire la valeur cible depuis data-target="2500" */
  const target = parseInt(element.getAttribute('data-target'));

  /* Départ à 0 */
  let current = 0;

  /* Calcul du pas : cible divisée par 50 étapes */
  const increment = Math.ceil(target / 50);

  /*
     setInterval → répète toutes les 30 millisecondes.
     C'est ce qui crée l'effet de compteur animé.
  */
  const timer = setInterval(function () {

    current += increment;

    if (current >= target) {
      /* On a atteint la cible → afficher le nombre exact */
      element.textContent = target.toLocaleString('fr-FR');
      /* Arrêter le timer */
      clearInterval(timer);
    } else {
      /* Afficher le nombre intermédiaire */
      element.textContent = current.toLocaleString('fr-FR');
    }

  }, 30);
}

/*
   IntersectionObserver → surveille quand les compteurs
   deviennent visibles dans l'écran.

   Quand un compteur entre dans l'écran :
   → on lance l'animation
   → on arrête de l'observer (pour ne pas rejouer l'animation)
*/
const counterObserver = new IntersectionObserver(function (entries) {

  entries.forEach(function (entry) {

    /* entry.isIntersecting = true si l'élément est visible */
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }

  });

}, { threshold: 0.5 }); /* 0.5 = déclenche quand 50% visible */

/* On surveille chaque compteur */
counters.forEach(function (counter) {
  counterObserver.observe(counter);
});


/* ============================================================
   ANIMATIONS FADE-IN AU SCROLL
   Les sections apparaissent en fondu quand on les voit
   ============================================================ */

/*
   On sélectionne toutes les sections avec animate-section.
   Cette classe est sur toutes les sections de toutes les pages.
*/
const animatedSections = document.querySelectorAll('.animate-section');

/*
   IntersectionObserver → surveille quand les sections
   deviennent visibles dans l'écran.

   Quand une section entre dans l'écran :
   → on ajoute la classe CSS "visible"
   → le CSS fait apparaître la section en fondu
   → on arrête de l'observer
*/
const sectionObserver = new IntersectionObserver(function (entries) {

  entries.forEach(function (entry) {

    if (entry.isIntersecting) {
      /* Ajouter "visible" → le CSS déclenche la transition */
      entry.target.classList.add('visible');
      sectionObserver.unobserve(entry.target);
    }

  });

}, { threshold: 0.1 }); /* 0.1 = déclenche quand 10% visible */

/* On surveille chaque section */
animatedSections.forEach(function (section) {
  sectionObserver.observe(section);
});
/* ============================================================
   COMMIT 8 — À COLLER À LA FIN DE TON main.js
   (après le commit 7)

   Deux choses :
   1. Le filtrage des freelances (page freelances.html)
   2. La validation du formulaire (page contact.html)
   ============================================================ */


/* ============================================================
   PARTIE 1 : FILTRAGE DES FREELANCES
   Page : freelances.html

   COMMENT ÇA MARCHE SIMPLEMENT :
   - Tu cliques sur le bouton "Design"
   - JavaScript regarde toutes les cartes freelance
   - Il cache les cartes qui NE SONT PAS "Design"
   - Il montre seulement les cartes "Design"
   - Sans recharger la page !
   ============================================================ */
   /*
   On récupère tous les boutons de filtre.
   Ce sont les boutons : Tous, Développement Web, Design...
   Ils ont tous la classe "filter-btn".
*/
const filterBtns = document.querySelectorAll('.filter-btn');

/*
   On récupère toutes les cartes freelance.
   Chaque carte a la classe "freelance-item".
*/
const freelanceItems = document.querySelectorAll('.freelance-item');

/*
   On vérifie qu'on est bien sur la page freelances.html.
   Si les boutons n'existent pas → on ne fait rien.
   (Les autres pages n'ont pas ces boutons.)
*/
if (filterBtns.length > 0) {

  /*
     FONCTION : filterFreelances(categorie)
     → affiche les cartes de la catégorie choisie
     → cache toutes les autres cartes

     Exemple :
     filterFreelances('design')
     → montre seulement les designers
     → cache les développeurs, marketeurs, etc.
  */
  function filterFreelances(categorie) {

    /*
       On regarde chaque carte freelance une par une.
    */
    freelanceItems.forEach(function (carte) {

      /*
         On lit la catégorie de cette carte.
         Exemple : data-category="design" → 'design'
      */
      const categorieDeLoaCarte = carte.getAttribute('data-category');

      /*
         CONDITION :
         - Si la catégorie choisie est "tous" → montrer toutes les cartes
         - Si la carte a la même catégorie → la montrer
         - Sinon → la cacher
      */
      if (categorie === 'tous' || categorieDeLoaCarte === categorie) {

        /* Montrer la carte */
        carte.style.display = '';

        /* Petite animation d'apparition */
        carte.style.opacity = '0';
        setTimeout(function () {
          carte.style.opacity = '1';
          carte.style.transition = 'opacity 0.4s ease';
        }, 10);

      } else {

        /* Cacher la carte */
        carte.style.display = 'none';
      }

    });
  }
  

  /*
     On ajoute un écouteur de clic sur chaque bouton de filtre.
     Quand tu cliques sur un bouton, quelque chose se passe.
  */
  filterBtns.forEach(function (bouton) {

    bouton.addEventListener('click', function () {

      /*
         ÉTAPE 1 : Enlever le style "actif" de TOUS les boutons.
         On repart de zéro à chaque clic.
      */
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
      });

      /*
         ÉTAPE 2 : Mettre le style "actif" sur LE bouton cliqué.
         "this" = le bouton sur lequel on vient de cliquer.
      */
      this.classList.add('active');

      /*
         ÉTAPE 3 : Lire quelle catégorie ce bouton représente.
         Exemple : data-category="design" → on lit "design"
      */
      const categorieChoisie = this.getAttribute('data-category');

      /*
         ÉTAPE 4 : Filtrer les cartes avec la catégorie lue.
      */
      filterFreelances(categorieChoisie);

    });
  });

  /*
     Au chargement de la page : afficher toutes les cartes.
     Le bouton "Tous" est déjà actif dans le HTML.
  */
  filterFreelances('tous');

} /* fin du filtrage */
/* ============================================================
   PARTIE 2 : VALIDATION DU FORMULAIRE DE CONTACT
   Page : contact.html

   COMMENT ÇA MARCHE SIMPLEMENT :
   - Tu remplis le formulaire et tu cliques "Envoyer"
   - JavaScript vérifie chaque champ un par un
   - Si un champ est mal rempli → bordure ROUGE + message d'erreur
   - Si un champ est bien rempli → bordure VERTE
   - Si TOUT est bon → message de succès vert en bas
   ============================================================ */


/*
   On récupère le formulaire par son id="contactForm".
   Si on n'est pas sur contact.html → contactForm = null → on ne fait rien.
*/
const contactForm = document.getElementById('contactForm');

if (contactForm) {

  /* --------------------------------------------------------
     OUTILS : 3 petites fonctions pour afficher les erreurs
     -------------------------------------------------------- */

  /*
     showError(idChamp, message)
     → met une BORDURE ROUGE sur le champ
     → affiche le message d'erreur en dessous

     Exemple :
     showError('email', 'Format email invalide')
     → le champ email devient rouge
     → "Format email invalide" apparaît en dessous
  */
  function showError(idChamp, message) {
    const champ = document.getElementById(idChamp);
    const zoneErreur = document.getElementById(idChamp + '-error');

    if (champ) {
      champ.classList.add('is-invalid');    /* bordure rouge Bootstrap */
      champ.classList.remove('is-valid');
    }
    if (zoneErreur) {
      zoneErreur.textContent = message;    /* écrire le message d'erreur */
    }
  }

  /*
     showSuccess(idChamp)
     → met une BORDURE VERTE sur le champ
     → efface le message d'erreur

     Exemple :
     showSuccess('nom')
     → le champ nom devient vert
  */
  function showSuccess(idChamp) {
    const champ = document.getElementById(idChamp);
    const zoneErreur = document.getElementById(idChamp + '-error');

    if (champ) {
      champ.classList.remove('is-invalid');
      champ.classList.add('is-valid');     /* bordure verte Bootstrap */
    }
    if (zoneErreur) {
      zoneErreur.textContent = '';         /* effacer le message d'erreur */
    }
  }

  /*
     clearValidation(idChamp)
     → remet le champ à son état NEUTRE (ni rouge, ni vert)
     → utilisé avant chaque validation pour recommencer proprement
  */
  function clearValidation(idChamp) {
    const champ = document.getElementById(idChamp);
    const zoneErreur = document.getElementById(idChamp + '-error');

    if (champ) {
      champ.classList.remove('is-invalid', 'is-valid');
    }
    if (zoneErreur) {
      zoneErreur.textContent = '';
    }
  }

  /*
     verifierEmail(email)
     → vérifie que le format de l'email est correct.
     → retourne true (correct) ou false (incorrect)

     Un email valide doit avoir :
     - Du texte avant @
     - Le symbole @
     - Du texte après @
     - Un point
     - Une extension (.com, .fr, .africa...)

     La regex (expression régulière) fait cette vérification
     automatiquement.
     /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     Tu n'as pas besoin de la comprendre en détail,
     retiens juste qu'elle vérifie le format email.
  */
  function verifierEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email); /* true si valide, false sinon */
  }


  /* --------------------------------------------------------
     VALIDATION AU CLIC SUR "ENVOYER"
     -------------------------------------------------------- */

  /*
     Quand l'utilisateur clique sur le bouton "Envoyer" :
     → on intercepte l'envoi avec preventDefault()
     → on vérifie chaque champ
     → si tout est bon : message de succès
     → si erreur : messages d'erreur rouges
  */
  contactForm.addEventListener('submit', function (event) {

    /*
       event.preventDefault()
       → BLOQUE l'envoi normal du formulaire.
       Sans ça, la page se rechargerait et on perdrait tout.
       On contrôle nous-mêmes ce qui se passe.
    */
    event.preventDefault();

    /*
       Variable "toutEstValide" :
       → commence à true (on suppose que tout va bien)
       → passe à false dès qu'on trouve une erreur
    */
    let toutEstValide = true;

    /*
       Lire les valeurs de chaque champ.
       .value → ce que l'utilisateur a tapé
       .trim() → enlève les espaces au début et à la fin
       Exemple : "  Ravi  " → "Ravi"
    */
    const valeurNom     = document.getElementById('nom').value.trim();
    const valeurPrenom  = document.getElementById('prenom').value.trim();
    const valeurEmail   = document.getElementById('email').value.trim();
    const valeurSujet   = document.getElementById('sujet').value;
    const valeurMessage = document.getElementById('message').value.trim();

    /*
       Réinitialiser tous les champs (enlever rouge/vert)
       avant de recommencer la validation.
    */
    clearValidation('nom');
    clearValidation('prenom');
    clearValidation('email');
    clearValidation('sujet');
    clearValidation('message');


    /* --- VÉRIFICATION DU NOM --- */
    if (valeurNom === '') {
      /* Champ vide → erreur */
      showError('nom', 'Le nom est obligatoire.');
      toutEstValide = false;
    } else if (valeurNom.length < 2) {
      /* Trop court → erreur */
      showError('nom', 'Le nom doit avoir au moins 2 caractères.');
      toutEstValide = false;
    } else {
      /* Tout va bien → vert */
      showSuccess('nom');
    }


    /* --- VÉRIFICATION DU PRÉNOM --- */
    if (valeurPrenom === '') {
      showError('prenom', 'Le prénom est obligatoire.');
      toutEstValide = false;
    } else if (valeurPrenom.length < 2) {
      showError('prenom', 'Le prénom doit avoir au moins 2 caractères.');
      toutEstValide = false;
    } else {
      showSuccess('prenom');
    }


    /* --- VÉRIFICATION DE L'EMAIL --- */
    if (valeurEmail === '') {
      showError('email', "L'email est obligatoire.");
      toutEstValide = false;
    } else if (!verifierEmail(valeurEmail)) {
      /*
         verifierEmail() retourne false → format invalide.
         Le ! devant inverse : false devient true → on entre dans le if.
      */
      showError('email', "Format invalide. Exemple : contact@gmail.com");
      toutEstValide = false;
    } else {
      showSuccess('email');
    }


    /* --- VÉRIFICATION DU SUJET --- */
    /*
       Le menu déroulant a une option par défaut avec value="".
       Si l'utilisateur n'a pas choisi → value est vide.
    */
    if (valeurSujet === '') {
      showError('sujet', 'Veuillez choisir un sujet.');
      toutEstValide = false;
    } else {
      showSuccess('sujet');
    }


    /* --- VÉRIFICATION DU MESSAGE --- */
    if (valeurMessage === '') {
      showError('message', 'Le message est obligatoire.');
      toutEstValide = false;
    } else if (valeurMessage.length < 20) {
      /*
         .length → nombre de caractères tapés.
         Le sujet exige minimum 20 caractères.
         On affiche combien l'utilisateur en a tapé.
      */
      showError('message',
        'Minimum 20 caractères. Tu en as : ' + valeurMessage.length + '.');
      toutEstValide = false;
    } else {
      showSuccess('message');
    }


    /* --- RÉSULTAT FINAL --- */

    if (toutEstValide) {

      /*
         Tout est valide !
         → On affiche le message de succès vert.
         → On vide le formulaire.
         → On masque le message après 5 secondes.
      */

      /* Afficher le message de succès */
      const messageSucces = document.getElementById('successMessage');
      if (messageSucces) {
        messageSucces.style.display = 'flex';

        /* Faire défiler jusqu'au message pour le voir */
        messageSucces.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      /* Vider tous les champs du formulaire */
      contactForm.reset();

      /* Retirer les bordures vertes */
      clearValidation('nom');
      clearValidation('prenom');
      clearValidation('email');
      clearValidation('sujet');
      clearValidation('message');

      /*
         Cacher le message de succès après 5 secondes.
         5000 = 5000 millisecondes = 5 secondes.
      */
      setTimeout(function () {
        if (messageSucces) {
          messageSucces.style.display = 'none';
        }
      }, 5000);

    }
    /* Si toutEstValide = false :
       Les messages d'erreur rouges sont déjà affichés.
       Le formulaire ne s'envoie pas. */

  });


  /* --------------------------------------------------------
     VALIDATION EN DIRECT (pendant la frappe)
     Quand l'utilisateur quitte un champ,
     on vérifie ce champ immédiatement.
     -------------------------------------------------------- */

  /*
     "blur" = l'utilisateur quitte un champ
     (clique ailleurs ou appuie sur Tab).
     On vérifie le champ dès qu'il le quitte.
  */

  /* Vérification live du nom */
  const champNom = document.getElementById('nom');
  if (champNom) {
    champNom.addEventListener('blur', function () {
      const val = this.value.trim();
      if (val === '') {
        showError('nom', 'Le nom est obligatoire.');
      } else if (val.length < 2) {
        showError('nom', 'Au moins 2 caractères.');
      } else {
        showSuccess('nom');
      }
    });
  }

  /* Vérification live du prénom */
  const champPrenom = document.getElementById('prenom');
  if (champPrenom) {
    champPrenom.addEventListener('blur', function () {
      const val = this.value.trim();
      if (val === '') {
        showError('prenom', 'Le prénom est obligatoire.');
      } else if (val.length < 2) {
        showError('prenom', 'Au moins 2 caractères.');
      } else {
        showSuccess('prenom');
      }
    });
  }

  /* Vérification live de l'email */
  const champEmail = document.getElementById('email');
  if (champEmail) {
    champEmail.addEventListener('blur', function () {
      const val = this.value.trim();
      if (val === '') {
        showError('email', "L'email est obligatoire.");
      } else if (!verifierEmail(val)) {
        showError('email', "Format invalide. Exemple : contact@gmail.com");
      } else {
        showSuccess('email');
      }
    });
  }

  /* Vérification live du message + compteur de caractères */
  const champMessage = document.getElementById('message');
  if (champMessage) {

    /* Quand l'utilisateur quitte le champ */
    champMessage.addEventListener('blur', function () {
      const val = this.value.trim();
      if (val === '') {
        showError('message', 'Le message est obligatoire.');
      } else if (val.length < 20) {
        showError('message', 'Minimum 20 caractères. Tu en as : ' + val.length + '.');
      } else {
        showSuccess('message');
      }
    });

    /* Pendant la frappe : compteur en temps réel */
    champMessage.addEventListener('input', function () {
      const val = this.value.trim();
      const zoneErreur = document.getElementById('message-error');

      if (val.length > 0 && val.length < 20 && zoneErreur) {
        /* Afficher le compteur pendant qu'il tape */
        zoneErreur.textContent = 'Encore ' + (20 - val.length) + ' caractères à écrire.';
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
      } else if (val.length >= 20) {
        /* 20 caractères atteints → vert */
        showSuccess('message');
      }
    });
  }

} /* fin de la validation du formulaire */


/* ============================================================
   MODAL PROFIL FREELANCE
   À COLLER À LA FIN DE TON main.js
   ============================================================ */

/*
   On récupère le modal par son id="profileModal".
   Ce modal existe seulement sur freelances.html.
   Si on est sur une autre page → profileModal = null → on ne fait rien.
*/
const profileModal = document.getElementById('profileModal');

if (profileModal) {

  /*
     Événement 'show.bs.modal'
     → se déclenche JUSTE AVANT que le modal s'ouvre.
     C'est le bon moment pour mettre à jour son contenu.

     event.relatedTarget
     → c'est le BOUTON "Voir le profil" qui a été cliqué.
     On peut lire ses data-nom, data-photo, data-tarif...
  */
  profileModal.addEventListener('show.bs.modal', function (event) {

    /* Le bouton cliqué */
    const bouton = event.relatedTarget;

    /* Lecture des informations depuis les attributs data- */
    const nom        = bouton.getAttribute('data-nom');
    const specialite = bouton.getAttribute('data-specialite');
    const tarif      = bouton.getAttribute('data-tarif');
    const note       = bouton.getAttribute('data-note');
    const bio        = bouton.getAttribute('data-bio');
    const photo      = bouton.getAttribute('data-photo');

    /* Mise à jour du titre du modal */
    document.getElementById('profileModalLabel').textContent = 'Profil de ' + nom;

    /* Mise à jour de la photo */
    const photoEl = document.getElementById('modal-photo');
    if (photoEl) {
      photoEl.src = photo;
      photoEl.alt = 'Photo de ' + nom;
    }

    /* Mise à jour du nom */
    document.getElementById('modal-nom').textContent = nom;

    /* Mise à jour de la spécialité */
    document.getElementById('modal-specialite').textContent = specialite;

    /* Mise à jour du tarif */
    document.getElementById('modal-tarif-valeur').textContent = tarif;

    /* Mise à jour de la note */
    document.getElementById('modal-note').textContent = '⭐ Note : ' + note;

    /* Mise à jour de la biographie */
    document.getElementById('modal-bio').textContent = bio;
  });
}
/* ============================================================
   FIN DU CODE MODAL
   ============================================================ */
