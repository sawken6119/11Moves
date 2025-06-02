// Quand le document HTML est entièrement chargé, on lance le script
document.addEventListener('DOMContentLoaded', () => {

  // Récupère les paramètres présents dans l'URL (par exemple : ?register)
  const params = new URLSearchParams(window.location.search);

  // Vérifie si l'URL contient "register" (pour savoir s'il faut afficher le formulaire d'inscription)
  const isRegister = params.get('register') !== null;

  // Ciblage des deux blocs de formulaire dans le HTML
  const loginBlock = document.getElementById('login');
  const registerBlock = document.getElementById('register');

  // Fonction qui bascule l'affichage entre login et register
  function toggleForm() {
    loginBlock.style.display = loginBlock.style.display === 'none' ? 'block' : 'none';
    registerBlock.style.display = registerBlock.style.display === 'none' ? 'block' : 'none';
  }

  // Si le paramètre 'register' est présent dans l'URL, on affiche le formulaire d'inscription
  if (isRegister) {
    toggleForm();
  }

  // GESTION DE LA CONNEXION

  // Ajout d'un écouteur d'événement sur le bouton de connexion
  document.querySelector('#login button').addEventListener('click', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupération des valeurs des champs
    const email = document.querySelector('#login input[type="email"]').value.trim();
    const password = document.querySelector('#login input[type="password"]').value.trim();

    // Vérification que les champs ne sont pas vides
    if (!email || !password) {
      alert('Merci de remplir tous les champs');
      return;
    }

    // Récupération des utilisateurs depuis le localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Recherche d'un utilisateur correspondant aux identifiants saisis
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Connexion réussie : on enregistre l'utilisateur connecté et on redirige
      alert(`Bienvenue, ${user.nom} !`);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = 'accueil.html';
    } else {
      // Aucun utilisateur correspondant
      alert("Identifiants incorrects");
    }
  });

  // GESTION DE L’INSCRIPTION

  // Ajout d'un écouteur d'événement sur le bouton d'inscription
  document.querySelector('#register button').addEventListener('click', (e) => {
    e.preventDefault();

    // Récupération des valeurs des champs du formulaire d'inscription
    const nom = document.querySelector('#register input[placeholder="Nom"]').value.trim();
    const prenoms = document.querySelector('#register input[placeholder="Prénoms"]').value.trim();
    const email = document.querySelector('#register input[placeholder="Email"]').value.trim();
    const password = document.querySelector('#register input[placeholder="Mot de passe"]').value.trim();
    const confirm = document.querySelector('#register input[placeholder="Confirmer le mot de passe"]').value.trim();

    // Vérification que tous les champs sont remplis
    if (!nom || !prenoms || !email || !password || !confirm) {
      alert('Merci de remplir tous les champs');
      return;
    }

    // Vérification que les mots de passe sont identiques
    if (password !== confirm) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // Récupération des utilisateurs déjà enregistrés
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Vérification qu'aucun utilisateur n'a déjà cet email
    if (users.find(u => u.email === email)) {
      alert("Un compte avec cet email existe déjà");
      return;
    }

    // Ajout du nouvel utilisateur
    users.push({ nom, prenoms, email, password });

    // Enregistrement dans le localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Message de succès et redirection vers le formulaire de connexion
    alert("Inscription réussie. Vous pouvez maintenant vous connecter.");
    window.location.href = 'connexion.html';
  });

  // Rend la fonction toggleForm accessible depuis les balises HTML (onclick="toggleForm()")
  window.toggleForm = toggleForm;
});
